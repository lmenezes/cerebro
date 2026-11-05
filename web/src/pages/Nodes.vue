<!-- 对应 public/nodes/index.html 和 NodesController（src/app/components/nodes/） -->
<!-- Vue 会删掉元素首尾的纯空白文本，{{' '}} 是补回旧模板里会影响排版的空格 -->
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { RefreshService } from '../services/refresh';
import { NodeFilter } from '../shared/filters_model';
import { bytes, number, timeInterval } from '../shared/filters';
import SortBy from '../components/SortBy.vue';
import { orderBy as ngOrderBy } from '../shared/filters';

let _nodes: any[] | undefined = undefined; // 未筛选的全部节点
const nodes = ref<any[]>();

const sortBy = ref('name');
const reverse = ref(false);

const filter = reactive(new NodeFilter('', true, true, true, true, 0));

const setSortBy = (field: string) => {
  if (sortBy.value === field) {
    reverse.value = !reverse.value;
  }
  sortBy.value = field;
};

const refreshVisibleNodes = () => {
  if (_nodes) {
    nodes.value = _nodes.filter((node) => filter.matches(node));
  } else {
    nodes.value = undefined;
  }
};

const setNodes = (value: any[] | undefined) => {
  _nodes = value;
  refreshVisibleNodes();
};

const refresh = () => {
  DataService.send(
    'nodes',
    {},
    (value) => setNodes(value),
    (error) => {
      setNodes(undefined);
      AlertService.error('Error while loading nodes data', error);
    },
  );
};

watch(() => RefreshService.lastUpdate(), refresh, { immediate: true });
watch(filter, refreshVisibleNodes, { deep: true });
</script>

<template><div class="row">
  <div class="col-lg-3 col-md-4 col-sm-5 col-xs-12 form-group">
    <input type="text" v-model.trim="filter.name"
           class="form-control form-control-sm"
           placeholder="filter nodes by name">
  </div>
  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 noselect">
    <div class="checkbox">
      <label class="checkbox-inline">
        <input type="checkbox" v-model="filter.master">
        <i class="fa fa-star"></i> master
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" v-model="filter.data">
        <i class="fa fa-hdd-o"></i> data
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" v-model="filter.ingest">
        <i class="fa fa-crop"></i> ingest
      </label>
      <label class="checkbox-inline">
        <input type="checkbox" v-model="filter.coordinating">
        <i class="fa fa-crosshairs"></i> coordinating
      </label>
    </div>
  </div>
</div>

<table class="table table-bordered">
  <thead>
  <tr>
    <th>
      <SortBy property="name" text="name" :sort-by="sortBy" :reverse="reverse" @sort="setSortBy"></SortBy>
    </th>
    <th>
      <SortBy property="cpu.load" text="load" :sort-by="sortBy" :reverse="reverse" @sort="setSortBy"></SortBy>
    </th>
    <th>
      <SortBy property="cpu.process" text="process cpu %" :sort-by="sortBy" :reverse="reverse" @sort="setSortBy"></SortBy>
    </th>
    <th>
      <SortBy property="heap.percent" text="heap usage %" :sort-by="sortBy" :reverse="reverse" @sort="setSortBy"></SortBy>
    </th>
    <th>
      <SortBy property="disk.percent" text="disk usage %" :sort-by="sortBy" :reverse="reverse" @sort="setSortBy"></SortBy>
    </th>
    <th>
      <SortBy property="uptime" text="uptime" :sort-by="sortBy" :reverse="reverse" @sort="setSortBy"></SortBy>
    </th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(node, index) in ngOrderBy(nodes, sortBy, reverse)" :key="index">
    <td>
      <div class="row">
        <div class="col-lg-12">
          <div class="node-badges title">
            <div v-show="node.master">
              <i v-show="node.current_master" class="fa fa-fw fa-star" title="current master"></i>
              <i v-show="!node.current_master" class="fa fa-fw fa-star-o" title="master eligible"></i>
            </div>
            <div v-show="node.data">
              <i class="fa fa-fw fa-hdd-o" title="data node"></i>
            </div>
            <div v-show="node.coordinating">
              <i class="fa fa-fw fa-crosshairs" title="coordinating node"></i>
            </div>
            <div v-show="node.ingest">
              <i class="fa fa-fw fa-crop" title="ingest node"></i>
            </div>
          </div>
          <div class="node-info">
            <div class="title">
                  <span>
                    {{node.name}}
                  </span>
            </div>
            <div>
              <small>{{node.host}}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 node-attrs">
            <span v-for="(value, attr) in node.attributes" :key="attr">{{' '}}
              <span class="label label-success" :title="String(attr)">{{value}}</span>
            {{' '}}</span>
        </div>
      </div>
      <div class="node-labels">
        <span class="label label-primary" v-show="node.jvm">JVM: {{node.jvm}}</span>
        <span class="label label-primary">ES: {{node.version}}</span>
      </div>
    </td>
    <td>
      <div>
        <span class="main-stat">{{number(node.cpu?.load, 2)}}</span>
      </div>
    </td>
    <td>
      <div>
        <span class="main-stat">{{node.cpu?.process}}%</span>
        <span class="detail-stat">
          <div>os cpu: {{node.cpu?.os}}%</div>
        </span>
      </div>
    </td>
    <td>
      <div>
        <span class="main-stat">{{node.heap?.percent}}%</span>
        <span class="detail-stat">
          <div>used: {{node.heap?.used}}</div>
          <div>max: {{node.heap?.max}}</div>
        </span>
      </div>
    </td>
    <td>
      <div v-show="node.disk">
        <span class="main-stat">{{node.disk?.percent}}%</span>
        <span class="detail-stat">
          <div>available: {{bytes(node.disk?.available)}}</div>
          <div>total: {{bytes(node.disk?.total)}}</div>
        </span>
      </div>
      <div class="empty-stat" v-show="!node.disk">
        -
      </div>
    </td>
    <td>
      <div>
        <span class="main-stat">{{timeInterval(node.uptime)}}</span>
      </div>
    </td>
  </tr>
  </tbody>
</table>
</template>
