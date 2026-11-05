<!-- 第三阶段新页面共用：左边是带筛选和分页的列表，右边是 JSON 编辑器。布局和 class 沿用旧的 index templates 页面。 -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { ModalService } from '../services/modal';
import { ClusterInfo } from '../services/clusterInfo';
import { AceEditor } from '../services/aceEditor';
import { Paginator, type Filter } from '../shared/paginator';
import Pagination from './Pagination.vue';

export interface ResourceConfig {
  // 页面文字
  listTitle: string;
  newTitle: string;
  updateTitle: string;
  icon: string;
  namePlaceholder: string;
  detailPlaceholder: string;
  // 接口
  listPath: string;
  savePath: string;
  deletePath: string;
  bodyField: string;
  // 新建时编辑器里的示例内容
  sample: unknown;
  // 列表项：名字、用于展示和筛选的说明、编辑器里的内容
  detail: (item: any) => string;
  body: (item: any) => unknown;
  // 额外的行操作（如 SLM 立即执行）
  extraAction?: { icon: string; title: string; path: string; confirm: (name: string) => string; done: string };
}

const props = defineProps<{ config: ResourceConfig; editorId: string }>();
const c = props.config;

class ResourceFilter implements Filter<any> {
  constructor(public name: string, public detail: string) {}
  getSorting() {
    return (a: any, b: any) => a.name.localeCompare(b.name);
  }
  isBlank() {
    return !this.name && !this.detail;
  }
  matches(item: any) {
    return (!this.name || item.name.indexOf(this.name) != -1) && (!this.detail || c.detail(item).indexOf(this.detail) != -1);
  }
}

const paginator = reactive(new Paginator<any>(1, 10, [], new ResourceFilter('', '')));
const page = ref(paginator.getPage());
const name = ref('');
const editMode = ref(false);
let editor: AceEditor | undefined;

watch(paginator, () => (page.value = paginator.getPage()), { deep: true });
watch(name, (current) => {
  editMode.value = paginator.getCollection().some((t: any) => t.name === current);
});

const load = () =>
  DataService.send(
    c.listPath,
    {},
    (items) => {
      paginator.setCollection(items);
      page.value = paginator.getPage();
    },
    (error) => AlertService.error('Error while loading ' + c.listTitle, error),
  );

const edit = (item: any) => {
  name.value = item.name;
  editor?.setValue(JSON.stringify(c.body(item), undefined, 2));
};

const save = () => {
  try {
    const body = editor?.getValue();
    const wasEdit = editMode.value;
    DataService.send(
      c.savePath,
      { name: name.value, [c.bodyField]: body },
      () => {
        AlertService.info(wasEdit ? 'Successfully updated' : 'Successfully created');
        load();
      },
      (error) => AlertService.error('Error while saving ' + name.value, error),
    );
  } catch (error) {
    AlertService.error('Malformed JSON', String(error));
  }
};

const remove = (item: string) =>
  ModalService.promptConfirmation('Delete ' + item + '?', () =>
    DataService.send(
      c.deletePath,
      { name: item },
      () => {
        AlertService.info('Successfully deleted');
        load();
      },
      (error) => AlertService.error('Error while deleting ' + item, error),
    ),
  );

const extra = (item: string) => {
  const a = c.extraAction!;
  ModalService.promptConfirmation(a.confirm(item), () =>
    DataService.send(a.path, { name: item }, () => AlertService.info(a.done), (error) => AlertService.error(a.title + ' failed', error)),
  );
};

onMounted(() => {
  load();
  editor = new AceEditor(props.editorId);
  editor.setValue(JSON.stringify(c.sample, undefined, 2));
});

// 离开页面时销毁编辑器，避免泄漏 worker 和定时器
onBeforeUnmount(() => editor?.destroy());
</script>

<template><div class="row">
  <div class="col-md-6">
    <h4>{{c.listTitle}}</h4>
    <div class="row">
      <div class="col-md-8">
        <div class="row" v-show="paginator.getCollection().length">
          <div class="col-md-6 form-group">
            <input type="text" v-model.trim="(paginator.filter as any).name" class="form-control" :placeholder="c.namePlaceholder">
          </div>
          <div class="col-md-6 form-group">
            <input type="text" v-model.trim="(paginator.filter as any).detail" class="form-control" :placeholder="c.detailPlaceholder">
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <Pagination :page="page" :paginator="paginator" />
      </div>
      <div class="col-xs-12">
        <table class="table">
          <tr v-for="(item, i) in page.elements" :key="i" v-show="item">
            <td v-if="item">
              <i :class="c.icon"></i> {{item.name}} <span class="info-text">{{c.detail(item)}}</span>
              <i class="fa fa-trash normal-action alert-danger pull-right" @click="remove(item.name)"
                 v-show="!ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self"></i>
              <i class="fa fa-pencil normal-action pull-right" @click="edit(item)"></i>
              <i :class="c.extraAction.icon + ' normal-action pull-right'" :title="c.extraAction.title" v-if="c.extraAction"
                 v-show="!ClusterInfo.readOnly" @click="extra(item.name)" data-toggle="modal" href="#confirm_dialog" target="_self"></i>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <h4 v-show="!editMode">{{c.newTitle}}</h4>
    <h4 v-show="editMode">{{c.updateTitle}} {{name}}</h4>
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
          <div :id="editorId" class="ace-cerebro" style="height: 600px"></div>
        </div>
      </div>
      <div class="col-xs-12 text-right" v-show="!ClusterInfo.readOnly">
        <button type="submit" class="btn btn-success" @click="save()" v-show="!editMode">
          <i class="fa fa-file-o normal-action alert-success"> </i> create
        </button>
        <button type="submit" class="btn btn-warning" @click="save()" v-show="editMode">
          <i class="fa fa-floppy-o normal-action alert-warning"> </i> update
        </button>
      </div>
    </div>
  </div>
</div></template>
