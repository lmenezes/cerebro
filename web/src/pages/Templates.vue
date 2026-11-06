<!-- 对应 public/templates/index.html 和 TemplatesController、TemplatesDataService -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { ModalService } from '../services/modal';
import { AceEditorService, type AceEditor } from '../services/aceEditor';
import { Paginator, type Page } from '../shared/paginator';
import Pagination from '../components/Pagination.vue';
import { IndexTemplateFilter, templatePatterns } from './templates/indexTemplateFilter';

type Callback = (body: any) => void;

const TemplatesDataService = {
  getTemplates: (success: Callback, error: Callback) => DataService.send('templates', {}, success, error),
  delete: (name: string, success: Callback, error: Callback) =>
    DataService.send('templates/delete', { name: name }, success, error),
  create: (name: string | undefined, template: unknown, success: Callback, error: Callback) =>
    DataService.send('templates/create', { name: name, template: template }, success, error),
};

const TemplateBase = JSON.stringify(
  {
    index_patterns: ['index_name_*'],
    settings: {},
    mappings: {},
    aliases: {},
  },
  undefined,
  2,
);

let editor: AceEditor | undefined;
const editMode = ref(false);
const name = ref<string>();

const paginator = reactive(new Paginator<any>(1, 10, [], new IndexTemplateFilter('', ''))) as Paginator<any> & {
  filter: IndexTemplateFilter;
};
const page = ref<Page<any>>(paginator.getPage());

// 筛选条件或页码变化时重新分页；getPage 抛异常时（旧版按模式筛选）保持原来的页面
watch(paginator, () => {
  page.value = paginator.getPage();
}, { deep: true });

watch(name, (current) => {
  let isExistingTemplate = false;
  const templates = paginator.getCollection();
  templates.forEach((t) => {
    if (t.name === current) {
      isExistingTemplate = true;
    }
  });
  editMode.value = isExistingTemplate;
});

const initEditor = () => {
  if (!editor) {
    editor = AceEditorService.init('template-body-editor');
    editor.setValue(TemplateBase);
  }
};

const loadTemplates = () => {
  TemplatesDataService.getTemplates(
    (templates) => {
      paginator.setCollection(templates);
      page.value = paginator.getPage();
    },
    (error) => AlertService.error('Error while loading templates', error),
  );
};

const edit = (n: string, template: unknown) => {
  name.value = n;
  editor!.setValue(JSON.stringify(template, undefined, 2));
};

const create = (n: string | undefined) => {
  try {
    const template = editor!.getValue();
    const success = () => {
      if (editMode.value) {
        AlertService.info('Template successfully updated');
      } else {
        AlertService.info('Template successfully created');
      }
      loadTemplates();
    };
    const errorCallback = (response: unknown) => AlertService.error('Error creating template', response);
    TemplatesDataService.create(n, template, success, errorCallback);
  } catch (error) {
    AlertService.error('Malformed template', error);
  }
};

const deleteTemplate = (n: string) => {
  const success = () => {
    AlertService.info('Template successfully deleted');
    loadTemplates();
  };
  const errorCallback = (response: unknown) => AlertService.error('Error deleting template', response);
  ModalService.promptConfirmation('Delete template ' + n + '?', () => TemplatesDataService.delete(n, success, errorCallback));
};

const setup = () => {
  loadTemplates();
  initEditor();
};

onMounted(setup);

// 离开页面时销毁编辑器，避免泄漏 worker 和定时器
onBeforeUnmount(() => editor?.destroy());
</script>

<template><div class="row">
  <div class="col-md-6">
    <h4>existing templates</h4>
    <div class="row">
      <div class="col-md-8">
        <div class="row" v-show="paginator.getCollection().length">
          <div class="col-md-6 form-group">
            <input type="text" v-model.trim="paginator.filter.name" class="form-control" placeholder="template name">
          </div>
          <div class="col-md-6 form-group">
            <input type="text" v-model.trim="paginator.filter.pattern" class="form-control"
                   placeholder="template pattern">
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <Pagination :page="page" :paginator="paginator"></Pagination>
      </div>
      <div class="col-xs-12">
        <table class="table">
          <tbody><tr v-for="(template, $index) in page.elements" :key="$index" v-show="template">
            <td>
              <i class="fa fa-book"></i> {{template?.name}} <span class="info-text"> with pattern</span>
              {{templatePatterns(template?.template)}}
              <i class="fa fa-trash normal-action alert-danger pull-right" @click="deleteTemplate(template.name)"
                 v-show="!template?.removed && !ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self"></i>
              <i class="fa fa-trash alert-danger pull-right disabled" v-show="template?.removed"></i>
              <i class="fa fa-pencil normal-action pull-right" v-show="!template?.removed" @click="edit(template.name, template.template)"></i>
            </td>
          </tr>
        </tbody></table>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <h4 v-show="!editMode">create new template</h4>
    <h4 v-show="editMode">update template {{name}}</h4>
    <div class="row">
      <div class="col-xs-12">
        <div class="form-group">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="name" v-model.trim="name">
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="form-group">
          <div id="template-body-editor" class="ace-cerebro" style="height: 600px"></div>
        </div>
      </div>
      <div class="col-xs-12 text-right">
        <button type="submit" class="btn btn-success" @click="create(name)" v-show="!editMode && !ClusterInfo.readOnly">
          <i class="fa fa-file-o normal-action alert-success"> </i> create
        </button>
        <button type="submit" class="btn btn-warning" @click="create(name)" v-show="editMode && !ClusterInfo.readOnly">
          <i class="fa fa-floppy-o normal-action alert-warning"> </i> update
        </button>
      </div>
    </div>
  </div>
</div></template>
