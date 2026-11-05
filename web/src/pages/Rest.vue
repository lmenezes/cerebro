<!-- 对应 public/rest/index.html 和 RestController、RestDataService；路径输入的 uib-typeahead 见 rest/typeahead.ts -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { AceEditorService, type AceEditor } from '../services/aceEditor';
import { ClipboardService } from '../services/clipboard';
import { URLAutocomplete } from '../shared/urlAutocomplete';
import { startsWith } from '../shared/filters';
import { highlight, useTypeahead } from './rest/typeahead';

interface HistoryEntry {
  path: string;
  method: string;
  body: string;
  created_at: string;
}

type Callback = (body: any) => void;

const RestDataService = {
  load: (success: Callback, error: Callback) => DataService.send('rest', {}, success, error),
  history: (success: Callback, error: Callback) => DataService.send('rest/history', {}, success, error),
  execute: (method: string, path: string, data: unknown, success: Callback, error: Callback) =>
    DataService.send('rest/request', { method: method, data: data, path: path }, success, error),
};

let editor: AceEditor;
const response = ref<string>();

let indices: string[] | undefined;
let host: string | undefined;

const method = ref('GET');
const path = ref('');
const options = ref<string[]>([]);
const history = ref<HistoryEntry[]>();

const pathInput = ref<HTMLInputElement>();
const popup = ref<HTMLElement>();

// uib-typeahead="url for url in options | startsWith:$viewValue | limitTo:10"，typeahead-wait-ms="20"
const typeahead = useTypeahead({
  input: pathInput,
  popup,
  waitMs: 20,
  source: (viewValue) => (startsWith(options.value, viewValue) as string[]).slice(0, 10),
  viewValue: () => viewValue,
  select: (model) => {
    path.value = model;
  },
});

// ng-model 的视图值：angular 会去掉首尾空白，只有用户输入才触发 typeahead 和 ng-change
let viewValue = '';
let composing = false;
const onPathInput = (e: Event) => {
  if (composing) {
    return;
  }
  const value = (e.target as HTMLInputElement).value.trim();
  if (value === viewValue) {
    return;
  }
  viewValue = value;
  typeahead.parse(value);
  if (path.value !== value) {
    path.value = value;
    updateOptions(path.value);
  }
};
const onCompositionEnd = (e: Event) => {
  composing = false;
  onPathInput(e);
};
// 代码里改了 path（选中建议、载入历史）才回写输入框，和 ngModel 的 $render 一样
watch(path, (value) => {
  if (value !== viewValue) {
    viewValue = value;
    if (pathInput.value) {
      pathInput.value.value = value;
    }
  }
});

const success = (resp: unknown) => {
  response.value = JSONTree.create(resp);
  loadHistory();
};

const failure = (resp: unknown) => {
  response.value = JSONTree.create(resp);
};

const execute = () => {
  let data: unknown = editor.getStringValue();
  const m = method.value;
  response.value = undefined;
  try {
    data = editor.getValue();
  } catch {
    // 不是 JSON 就按原始字符串发送（_bulk 等）
  }
  RestDataService.execute(m, path.value, data, success, failure);
};

const setup = () => {
  editor = AceEditorService.init('rest-client-editor');
  editor.setValue('{}');
  RestDataService.load(
    (resp) => {
      host = resp.host;
      indices = resp.indices;
      updateOptions(path.value);
    },
    (error) => AlertService.error('Error while loading cluster indices', error),
  );
  loadHistory();
};

const loadRequest = (request: HistoryEntry) => {
  method.value = request.method;
  path.value = request.path;
  editor.setValue(request.body);
  editor.format();
};

const loadHistory = () => {
  RestDataService.history(
    (h) => {
      history.value = h;
    },
    (error) => AlertService.error('Error while loading request history', error),
  );
};

const updateOptions = (text: string) => {
  if (indices) {
    const autocomplete = new URLAutocomplete(indices);
    options.value = autocomplete.getAlternatives(text);
  }
};

const copyAsCURLCommand = () => {
  const m = method.value;
  let p = encodeURI(path.value);
  if (p.substring(0, 1) !== '/') {
    p = '/' + p;
  }

  const matchesAPI = (p: string, api: string) => p.indexOf(api) === p.length - api.length;

  let contentType = 'application/json';
  let body = '';

  try {
    if (matchesAPI(p, '_bulk') || matchesAPI(p, '_msearch')) {
      contentType = 'application/x-ndjson';
      body = editor
        .getStringValue()
        .split('\n')
        .map((line) => (line === '' ? '\n' : JSON.stringify(JSON.parse(line))))
        .join('\n');
    } else {
      body = JSON.stringify(editor.getValue(), undefined, 1);
    }
  } catch {
    AlertService.error('Unexpected content format for [' + p + ']');
    return;
  }

  let curl = 'curl';
  curl += " -H 'Content-type: " + contentType + "'";
  curl += ' -X' + m + " '" + host + p + "'";
  if (['POST', 'PUT'].indexOf(m) >= 0) {
    curl += " -d '" + body + "'";
  }
  ClipboardService.copy(
    curl,
    () => AlertService.info('cURL request successfully copied to clipboard'),
    () => AlertService.error('Error while copying request to clipboard'),
  );
};

onMounted(setup);

// 离开页面时销毁编辑器，避免泄漏 worker 和定时器
onBeforeUnmount(() => editor?.destroy());
</script>

<template><div class="row">
  <div class="col-md-6">
    <div class="row">
      <div class="col-lg-10 col-md-9 typeahead-demo form-group">
        <input type="text"
               ref="pathInput"
               class="form-control form-control-sm"
               placeholder="path (eg: indexName/_search)"
               @input="onPathInput"
               @compositionstart="composing = true"
               @compositionend="onCompositionEnd"
               @keydown="typeahead.onKeydown"
               @focus="typeahead.onFocus"
               @blur="typeahead.onBlur"
               aria-autocomplete="list"
               :aria-expanded="typeahead.state.matches.length > 0"
               :aria-owns="typeahead.popupId"
               :aria-activedescendant="typeahead.activeDescendant()"><div class="custom-popup-wrapper"
       ref="popup"
       :style="typeahead.state.position && {top: typeahead.state.position.top+'px', left: typeahead.state.position.left+'px'}"
       style="display: block;" :id="typeahead.popupId">
    <ul class="dropdown-menu typeahead" role="listbox">
      <li v-for="(match, $index) in typeahead.state.matches" :key="$index" :class="{active: typeahead.isActive($index) }"
          @mouseenter="typeahead.selectActive($index)" @click="typeahead.selectMatch($index)" role="option" :id="match.id">
        <a>
    <span v-html="highlight(match.label, typeahead.state.query)"></span>
  </a>
      </li>
    </ul>
  </div>
      </div>
      <div class="col-lg-2 col-md-3 form-group">
        <select v-model="method" class="form-control">
          <option value="GET">GET</option>
          <option value="PUT">PUT</option>
          <option value="POST" selected>POST</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <a data-toggle="collapse" data-parent="#restAccordion" target="_self" href="#restHistory">
          <i class="fa fa-history"></i> previous requests
        </a>
      </div>
      <div class="col-xs-12 panel-collapse collapse" id="restHistory" v-show="history?.length">
        <a data-toggle="collapse" data-parent="#restAccordion" target="_self" href="#restHistory">
        <span>
          <table class="table table-condensed">
            <tbody><tr v-for="(h, i) in history" :key="i" class="normal-action" @click="loadRequest(h)">
              <td style="width: 100px">{{h.created_at}}</td>
              <td style="width: 60px">{{h.method}}</td>
              <td>{{h.path}}</td>
            </tr>
          </tbody></table>
        </span>
        </a>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-12">
        <div id="rest-client-editor" class="ace-cerebro" style="height: 600px;"></div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-12 text-right">
        <div class="btn-group">
          <button type="submit" class="btn btn-default" @click="copyAsCURLCommand()">
            <i class="fa fa-clipboard"></i> cURL
          </button>
        </div>
        <div class="btn-group">
          <button type="submit" class="btn btn-default" @click="editor.format()">
            <i class="fa fa-align-left"></i> format
          </button>
        </div>
        <div class="btn-group">
          <button type="submit" class="btn btn-success" @click="execute()">
            <i class="fa fa-bolt"></i> send
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div style="border: 1px solid #55595c; min-height: 647px; overflow: auto; display: block;">
      <div class="modal-body" v-html="response"></div>
    </div>
  </div>
</div></template>
