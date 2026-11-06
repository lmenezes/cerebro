<!-- 对应 public/aliases.html 和 AliasesController（src/app/components/aliases/controller.js） -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { AceEditorService, type AceEditor } from '../services/aceEditor';
import { Paginator } from '../shared/paginator';
import { Alias, AliasFilter } from '../shared/filters_model';
import Pagination from '../components/Pagination.vue';
import { orderBy as ngOrderBy } from '../shared/filters';

let editor: AceEditor | undefined = undefined;

const paginator = reactive(new Paginator<any>(1, 15, [], new AliasFilter('', ''))) as Paginator<any> & { filter: AliasFilter };
const page = ref(paginator.getPage());

const new_alias = ref(new Alias('', '', '', '', ''));
const displayAliasFilter = ref(false);

const changes = ref<any[]>([]);
const indices = ref<string[]>();

watch(paginator, () => {
  page.value = paginator.getPage();
}, { deep: true });

// angular ngOptions：model 不是 null/undefined 又不在选项里时，在最前面补一个空白的 unknown option 并选中它
// （所以初始的 '' 显示空白而不是 select index）；选空选项时 model 是 null
const isUnknownIndex = (value: unknown) => value != null && !(indices.value || []).includes(value as string);

// angular 的 json 过滤器：缩进 2 格，undefined 输出空串
const json = (value: unknown) => (value === undefined ? '' : JSON.stringify(value, undefined, 2));

const initEditor = () => {
  if (!editor) {
    editor = AceEditorService.init('alias-filter-editor');
  }
};

const addAlias = () => {
  try {
    const alias = new_alias.value;
    alias.filter = editor!.getValue();
    try {
      alias.validate();
      new_alias.value = new Alias('', '', '', '', '');
      changes.value.push({ add: alias.toJson() });
    } catch (error) {
      AlertService.error(error as string);
    }
  } catch (error) {
    AlertService.error('Malformed filter', error);
  }
};

const removeIndexAlias = (alias: any) => {
  alias.removed = true;
  changes.value.push({ remove: alias });
};

const loadAliases = () => {
  DataService.getAliases(
    (aliases) => {
      paginator.setCollection(aliases);
      page.value = paginator.getPage();
    },
    (error) => AlertService.error('Error while fetching aliases', error),
  );
};

// 旧页面的 apply 按钮
const saveChanges = () => {
  const success = (body: any) => {
    changes.value = [];
    loadAliases();
    AlertService.success('Aliases successfully updated', body);
  };
  const error = (body: any) => AlertService.error('Error while updating aliases', body);
  const data = changes.value.map((a) => {
    if (a.remove) {
      const alias = a.remove;
      return { remove: { index: alias.index, alias: alias.alias } };
    }
    return a;
  });
  DataService.updateAliases(data, success, error);
};

const loadIndices = () => {
  DataService.getIndices(
    (value) => {
      indices.value = value;
    },
    (error) => AlertService.error('Error loading indices', error),
  );
};

const setup = () => {
  loadIndices();
  loadAliases();
  initEditor();
};

const revertChange = (change: any, position: number) => {
  if (change.remove) {
    change.remove.removed = false;
  }
  changes.value.splice(position, 1);
};

onMounted(setup);

// 离开页面时销毁编辑器，避免泄漏 worker 和定时器
onBeforeUnmount(() => editor?.destroy());
</script>

<template><div class="row">
  <div class="col-md-6">
    <h4>current aliases</h4>
    <div class="row">
      <div class="col-md-6">
        <div class="row" v-show="paginator.getCollection().length">
          <div class="col-md-6 form-group">
            <input type="text" v-model.trim="paginator.filter.alias" class="form-control" placeholder="filter by alias">
          </div>
          <div class="col-md-6 form-group">
            <input type="text" v-model.trim="paginator.filter.index" class="form-control" placeholder="filter by index">
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <Pagination :page="page" :paginator="paginator"></Pagination>
      </div>
      <div class="col-xs-12">
        <table class="table"><tbody>
          <tr v-for="(alias, index) in page.elements" :key="index" v-show="alias">
            <td>
              <span class="normal-action" data-toggle="collapse" :data-target="'#aliasDetails' + index">
                <i class="fa fa-tag"></i> {{alias?.alias}} <span class="info-text"> assigned to index</span> {{alias?.index}}
                <span v-show="alias?.search_routing">
                  <span class="info-text">with search routing</span> {{alias?.search_routing}}
                </span>
                <span v-show="alias?.index_routing">
                  <span class="info-text">
                    <span v-show="alias?.search_routing">and</span>
                    <span v-show="!alias?.search_routing">with</span>
                    index routing
                  </span>
                  {{alias?.index_routing}}
                </span>
                <i class="fa fa-trash normal-action alert-danger pull-right" @click.stop="removeIndexAlias(alias)" v-show="!alias?.removed && !ClusterInfo.readOnly"></i>
                <i class="fa fa-trash alert-danger pull-right disabled" v-show="alias?.removed"></i>
              </span>
              <div class="col-xs-12 collapse " :id="'aliasDetails' + index">
                <div class="row" v-show="alias?.filter">
                  <div class="col-xs-12">
                    <span class="info-text">with filter:</span>
                    <pre>{{json(alias?.filter)}}</pre>
                  </div>
                </div>
                <div>
                  <div class="col-xs-12" v-show="!alias?.filter">
                    <span class="info-text">no filter set</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody></table>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <h4>changes</h4>
    <div class="row">
      <div class="col-xs-12">
        <div class="form-inline form-group">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="alias" v-model.trim="new_alias.alias">
          </div>
          <span class="info-text">assigned to index </span>
          <div class="form-group">
            <select class="form-control" v-model="new_alias.index">
              <option v-if="isUnknownIndex(new_alias.index)" :value="new_alias.index"></option><option :value="null">select index</option>
              <option v-for="i in ngOrderBy(indices, undefined)" :key="i" :value="i">{{i}}</option>
            </select>
          </div>
            <span data-toggle="collapse" data-target="#collapseAliasFilter"
                  @click="displayAliasFilter = !displayAliasFilter">
            <i class="fa normal-action"
               :class="{'fa-expand': !displayAliasFilter, 'fa-compress': displayAliasFilter}"></i>
            </span>
          <div class="form-group pull-right">
            <button type="submit" class="btn btn-info" @click="addAlias()" v-show="!ClusterInfo.readOnly">
              <i class="fa fa-plus normal-action alert-info"></i>
            </button>
          </div>
        </div>
        <div class="col-xs-12 collapse form-group" id="collapseAliasFilter">
          <div class="row">
            <div class="col-md-3">
              <div class="row">
                <div class="col-xs-12 form-group">
                  <label class="form-label">index routing</label>
                  <input type="text" class="form-control" v-model.trim="new_alias.index_routing">
                </div>
                <div class="col-xs-12 form-group">
                  <label class="form-label">search routing</label>
                  <input type="text" class="form-control" v-model.trim="new_alias.search_routing">
                </div>
              </div>
            </div>
            <div class="col-md-9">
              <label class="form-label">filter</label>
              <div id="alias-filter-editor" class="ace-cerebro" style="height: 225px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <table class="table"><tbody>
          <tr v-for="(change, index) in changes" :key="index" v-show="change">
            <td>
          <span v-show="change.add">
            <i class="fa fa-tag alert-info"></i> <b>{{change.add?.alias}}</b> <span
            class="info-text"> assigned to index</span> <b>{{change.add?.index}}</b>
        </span>
        <span v-show="change.remove">
          <i class="fa fa-tag alert-danger"></i> <b>{{change.remove?.alias}}</b> <span
          class="info-text"> unassigned from index</span> <b>{{change.remove?.index}}</b>
        </span>
          <span class="pull-right">
            <i class="fa fa-undo normal-action" @click="revertChange(change, index)"></i>
          </span>
            </td>
          </tr>
        </tbody></table>
      </div>
      <div class="col-lg-12 text-right">
        <div class="form-group">
          <div class="btn-group">
            <button type="submit" class="btn btn-success" @click="saveChanges()" v-show="changes.length && !ClusterInfo.readOnly">
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
