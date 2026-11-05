<!-- 对应 public/create_index.html 和 CreateIndexController -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { RefreshService } from '../services/refresh';
import { AceEditorService, type AceEditor } from '../services/aceEditor';
import { orderBy } from '../shared/filters';

let editor: AceEditor | undefined;
const shards = ref('');
const replicas = ref('');
const name = ref('');
const indices = ref<string[]>();
const index = ref<string>();

const setup = () => {
  if (!editor) {
    editor = AceEditorService.init('index-settings');
  }
  DataService.getIndices(
    (i) => {
      indices.value = i;
    },
    (error) => AlertService.error('Error loading indices', error),
  );
};

// ng-options="i as i for i in indices | orderBy:i"：选项值为 string:<索引名>，选中后去掉空的 unknown 选项
const onIndexChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  if (value.indexOf('string:') === 0) {
    index.value = value.substring('string:'.length);
    loadIndexMetadata(index.value);
  }
};

const loadIndexMetadata = (i: string) => {
  DataService.getIndexMetadata(
    i,
    (meta) => {
      const body = { settings: meta.settings, mappings: meta.mappings };
      editor!.setValue(JSON.stringify(body, null, 2));
    },
    (error) => AlertService.error('Error while loading index settings', error),
  );
};

const createIndex = () => {
  if (name.value.trim()) {
    try {
      let data = editor!.getValue() || {};
      if (Object.keys(data).length === 0) {
        data = { settings: { index: {} } };
        if (shards.value.trim()) {
          data.settings.index.number_of_shards = shards.value;
        }
        if (replicas.value.trim()) {
          data.settings.index.number_of_replicas = replicas.value;
        }
      }
      DataService.createIndex(
        name.value,
        data,
        () => {
          RefreshService.refresh();
          AlertService.success('Index successfully created');
        },
        (error) => AlertService.error('Error while creating index', error),
      );
    } catch (error) {
      AlertService.error('Malformed settings', error);
    }
  } else {
    AlertService.error('You must specify a valid index name');
  }
};

onMounted(setup);

// 离开页面时销毁编辑器，避免泄漏 worker 和定时器
onBeforeUnmount(() => editor?.destroy());
</script>

<template><div>
  <div class="content-panel">
    <div class="row">
      <div class="col-sm-6">
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <label class="form-label">name</label>
              <input type="text" v-model.trim="name" class="form-control" placeholder="index name">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label class="form-label">number of shards</label>
              <input type="text" v-model.trim="shards" class="form-control" placeholder="# of shards">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label class="form-label">number of replicas</label>
              <input type="text" v-model.trim="replicas" class="form-control" placeholder="# of replicas">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <label class="form-label">load settings from existing index</label>
              <select class="form-control" @change="onIndexChange"><option v-if="index === undefined" value="?" selected></option><option v-for="i in orderBy(indices)" :key="i" :label="i" :value="'string:' + i">{{i}}</option></select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-label">settings</label>
          <div id="index-settings" class="ace-cerebro" style="height: 600px"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
				<span class="pull-right">
					<a href="#!cluster" class="btn btn-default">back</a>
					<button type="button" class="btn btn-primary" @click="createIndex()" v-show="!ClusterInfo.readOnly"><i class="fa fa-check"></i> Create</button>
				</span>
      </div>
    </div>
  </div>
</div></template>
