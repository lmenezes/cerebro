<!-- 对应 public/overview.html（内联 public/stats.html）和 src/app/components/overview/controller.js -->
<!-- Vue 会删掉元素首尾的纯空白文本，模板里的 {{' '}} 是补回旧模板中会影响排版的空格 -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { ShardInfo } from '../services/shardInfo';
import { markRaw, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '../components/Pagination.vue';
import Progress from '../components/Progress.vue';
import { AlertService } from '../services/alerts';
import { ModalService } from '../services/modal';
import { RefreshService } from '../services/refresh';
import { bytes, number, orderBy, show } from '../shared/filters';
import { IndexFilter, NodeFilter } from '../shared/filters_model';
import { Paginator, type Page } from '../shared/paginator';
import { OverviewDataService } from './overview/data';

const route = useRoute();
const router = useRouter();

const data = shallowRef<any>();

const nodes = ref<any[]>();
const unassigned_shards = ref(0);
const relocating_shards = ref(0);
const initializing_shards = ref(0);
const closed_indices = ref(0);
const special_indices = ref(0);
const shardAllocation = ref(true);
const expandedView = ref<boolean>();
const relocatingShard = ref<any>();

const indices_filter = reactive(new IndexFilter('', false, false, true, true, 0));
const nodes_filter = reactive(new NodeFilter('', true, false, false, false, 0));

const getPageSize = () => Math.max(Math.round(window.innerWidth / 280), 1);

const paginator = reactive(new Paginator<any>(1, getPageSize(), [], indices_filter)) as Paginator<any>;

const page = shallowRef<Page<any>>(paginator.getPage());

const onResize = () => paginator.setPageSize(getPageSize());
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));

// angular 的 orderBy 过滤器（模板里元素类型按 any 处理）
const ordered = (items: any[] | undefined, key: string): any[] => orderBy(items, key);

// angular 的 lowercase 过滤器
const lowercase = (s: unknown) => (typeof s === 'string' ? s.toLowerCase() : show(s));

const setIndices = (indices: any[]) => {
  paginator.setCollection(indices);
  page.value = paginator.getPage();
};

const setNodes = (all: any[]) => {
  nodes.value = all.filter((node) => nodes_filter.matches(node));
};

const refresh = () => {
  OverviewDataService.getOverview(
    (d) => {
      // 索引列表每次整体替换、不需要深层响应式，大集群时省掉代理开销
      markRaw(d.indices);
      data.value = d;
      setIndices(d.indices);
      setNodes(d.nodes);
      unassigned_shards.value = d.unassigned_shards;
      relocating_shards.value = d.relocating_shards;
      initializing_shards.value = d.initializing_shards;
      closed_indices.value = d.closed_indices;
      special_indices.value = d.special_indices;
      shardAllocation.value = d.shard_allocation;
      if (!unassigned_shards.value && !relocating_shards.value && !initializing_shards.value) {
        indices_filter.healthy = true;
      }
    },
    (error) => {
      AlertService.error('Error while loading data', error);
      data.value = undefined;
      nodes.value = undefined;
      unassigned_shards.value = 0;
      relocating_shards.value = 0;
      initializing_shards.value = 0;
      closed_indices.value = 0;
      special_indices.value = 0;
      shardAllocation.value = true;
    },
  );
};

watch(() => RefreshService.lastUpdate(), refresh, { immediate: true });

// 旧版深度 watch paginator（angular.equals 忽略 $collection 等 $ 开头的字段）
watch(
  [
    () => paginator.page,
    () => paginator.pageSize,
    () => indices_filter.name,
    () => indices_filter.closed,
    () => indices_filter.special,
    () => indices_filter.healthy,
    () => indices_filter.asc,
    () => indices_filter.timestamp,
    () => indices_filter.sort,
  ],
  () => {
    if (data.value) {
      setIndices(data.value.indices);
    }
  },
);

watch(
  nodes_filter,
  () => {
    if (data.value) {
      setNodes(data.value.nodes);
    }
  },
  { deep: true },
);

// 索引名筛选框：等价于 ng-model-options="{ debounce: 250 }"
const indicesName = ref(indices_filter.name);
let debounce: number | undefined;
watch(indicesName, (value) => {
  clearTimeout(debounce);
  debounce = window.setTimeout(() => {
    indices_filter.name = value;
  }, 250);
});
onBeforeUnmount(() => clearTimeout(debounce));

const success = (body: any) => {
  RefreshService.refresh();
  AlertService.success('Operation successfully executed', body);
};

const error = (body: any) => {
  AlertService.error('Operation failed', body);
};

const displayInfo = (info: any) => {
  ModalService.showInfo(info);
};

const openIndex = (index: string) => {
  ModalService.promptConfirmation('Open ' + index + '?', () => {
    OverviewDataService.openIndex(index, success, error);
  });
};

const closeIndex = (index: string) => {
  ModalService.promptConfirmation('Close ' + index + '?', () => {
    OverviewDataService.closeIndex(index, success, error);
  });
};

const deleteIndex = (index: string) => {
  ModalService.promptConfirmation('Delete ' + index + '?', () => {
    OverviewDataService.deleteIndex(index, success, error);
  });
};

const clearIndexCache = (index: string) => {
  ModalService.promptConfirmation('Clear ' + index + ' cache?', () => {
    OverviewDataService.clearIndexCache(index, success, error);
  });
};

const refreshIndex = (index: string) => {
  ModalService.promptConfirmation('Refresh index ' + index + '?', () => {
    OverviewDataService.refreshIndex(index, success, error);
  });
};

const flushIndex = (index: string) => {
  ModalService.promptConfirmation('Flush index ' + index + '?', () => {
    OverviewDataService.flushIndex(index, success, error);
  });
};

const forceMerge = (index: string) => {
  ModalService.promptConfirmation('Optimize index ' + index + '?', () => {
    OverviewDataService.forceMerge(index, success, error);
  });
};

// 批量操作：作用于当前筛选出的全部索引

const selectedIndices = () => paginator.getResults().map((index) => index.name);

const closeIndices = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Close all ' + indices.length + ' selected indices?', () => {
    OverviewDataService.closeIndex(indices.join(','), success, error);
  });
};

const openIndices = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Open all ' + indices.length + ' selected indices?', () => {
    OverviewDataService.openIndex(indices.join(','), success, error);
  });
};

const forceMerges = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Optimize all ' + indices.length + ' selected indices?', () => {
    OverviewDataService.forceMerge(indices.join(','), success, error);
  });
};

const refreshIndices = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Refresh all ' + indices.length + ' selected indices?', () => {
    OverviewDataService.refreshIndex(indices.join(','), success, error);
  });
};

const flushIndices = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Flush all ' + indices.length + ' selected indices?', () => {
    OverviewDataService.flushIndex(indices.join(','), success, error);
  });
};

const clearIndicesCache = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Clear all ' + indices.length + ' selected indices cache?', () => {
    OverviewDataService.clearIndexCache(indices.join(','), success, error);
  });
};

const deleteIndices = () => {
  const indices = selectedIndices();
  ModalService.promptConfirmation('Delete all ' + indices.length + ' selected indices?', () => {
    OverviewDataService.deleteIndex(indices.join(','), success, error);
  });
};

const shardStats = (index: string, node: string, shard: number) => {
  OverviewDataService.getShardStats(index, node, shard, displayInfo, error);
};

// 第三阶段：点未分配分片时显示 ES 给出的分配原因
const explainShard = (shard: { index: string; shard: number; primary: boolean }) => {
  ShardInfo.explain(shard.index, shard.shard, shard.primary, displayInfo, error);
};
ShardInfo.track(() => page.value.elements.filter((i: any) => i && !i.closed).map((i: any) => i.name));

const nodeStats = (node: string) => {
  OverviewDataService.nodeStats(node, displayInfo, error);
};

const indexStats = (index: string) => {
  OverviewDataService.indexStats(index, displayInfo, error);
};

const getIndexSettings = (index: string) => {
  OverviewDataService.getIndexSettings(index, displayInfo, error);
};

const getIndexMapping = (index: string) => {
  OverviewDataService.getIndexMapping(index, displayInfo, error);
};

const disableShardAllocation = (kind: string) => {
  OverviewDataService.disableShardAllocation(kind, success, error);
};

const enableShardAllocation = () => {
  OverviewDataService.enableShardAllocation(success, error);
};

// $location.path('index_settings').search('index', index)：保留 host 等已有参数
const showIndexSettings = (index: string) => {
  router.push({ path: '/index_settings', query: { ...route.query, index } });
};

const select = (shard?: any) => {
  relocatingShard.value = shard;
};

const relocateShard = (node: any) => {
  const s = relocatingShard.value;
  OverviewDataService.relocateShard(
    s.shard,
    s.index,
    s.node,
    node.id,
    (response) => {
      relocatingShard.value = undefined;
      RefreshService.refresh();
      AlertService.info('Relocation successfully started', response);
    },
    (error) => {
      AlertService.error('Error while starting relocation', error);
    },
  );
};

const isSelected = (shard: any) => {
  const relocating = relocatingShard.value;
  return (
    relocating && shard.index === relocating.index && shard.node === relocating.node && shard.shard === relocating.shard
  );
};

const canReceiveShard = (index: any, node: any) => {
  const shard = relocatingShard.value;
  if (shard && index) {
    // 索引数少于列数时 index 为 null
    if (shard.node !== node.id && shard.index === index.name) {
      const shards = index.shards[node.id];
      if (shards) {
        const sameShard = (s: any) => s.shard === shard.shard;
        if (shards.filter(sameShard).length === 0) {
          return true;
        }
      } else {
        return true;
      }
    }
  }
  return false;
};
</script>

<template><div v-show="nodes">
  <div><div class="row">
  <div class="col-xs-12">
    <div class="stats">
      <div class="row">
        <div class="col-lg-2">
      <span class="stat">
        <span class="stat-value">
            {{show(data?.cluster_name)}}
        {{' '}}</span>
      </span>
        </div>
        <div class="col-lg-2">
      <span class="stat">
        <span class="stat-value">
            {{number(data?.number_of_nodes, 0)}}
        {{' '}}</span>
        <span>
          nodes
        </span>
      </span>
        </div>
        <div class="col-lg-2">
      <span class="stat">
        <span class="stat-value">
            {{number(data?.indices?.length, 0)}}
        {{' '}}</span>
        <span>
          indices
        </span>
      </span>
        </div>
        <div class="col-lg-2">
      <span class="stat">
        <span class="stat-value">
            {{number(data && data.active_shards + data.initializing_shards + data.relocating_shards + data.unassigned_shards, 0)}}
        {{' '}}</span>
        <span>
          shards
        </span>
      </span>
        </div>
        <div class="col-lg-2">
      <span class="stat">
        <span class="stat-value">
            {{number(data?.docs_count, 0)}}
        {{' '}}</span>
        <span>
          docs
        </span>
      </span>
        </div>
        <div class="col-lg-2">
      <span class="stat">
        <span class="stat-value">
            {{bytes(data?.size_in_bytes)}}
        {{' '}}</span>
      </span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  <div class="row">
    <div class="col-lg-4">
      <div class="row">
        <div class="col-lg-6 col-sm-6 form-group">
          <input type="text" v-model="indicesName" class="form-control form-control-sm"
                 placeholder="filter indices by name or aliases">
        </div>
        <div class="col-lg-3 col-sm-3 col-xs-6 form-group">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="indices_filter.closed"> closed ({{closed_indices}})
            </label>
          </div>
        </div>
        <div class="col-lg-3 col-sm-3 col-xs-6 form-group">
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="indices_filter.special"> .special ({{special_indices}})
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="row">
        <div class="col-lg-6 col-sm-6 form-group">
          <input type="text" v-model="nodes_filter.name" class="form-control form-control-sm"
                 placeholder="filter nodes by name">
        </div>
      </div>
    </div>
    <div class="col-lg-4 form-group">
      <Pagination :page="page" :paginator="paginator" :label="'selected indices'"></Pagination>
    </div>
  </div>

  <table class="table table-bordered table-condensed table-rounded table-inverse shard-map">
    <thead>
    <tr>
      <td>
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <div class="dropdown" v-show="shardAllocation">
              <span class="title normal-action" type="button" id="dropallocation" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false" title="disable shard allocation">
                <i class="fa fa-unlock fa-2x table-control"></i>
              </span>
              <ul class="dropdown-menu" aria-labelledby="dropallocation" v-show="!ClusterInfo.readOnly">
                <li @click="disableShardAllocation('none')" data-toggle="modal" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-lock"> </i> none (default)</a>
                </li>
                <li @click="disableShardAllocation('primaries')" data-toggle="modal" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-lock"> </i> primaries</a>
                </li>
                <li @click="disableShardAllocation('new_primaries')" data-toggle="modal" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-lock"> </i> new primaries</a>
                </li>
              </ul>
            </div>
            <i class="fa fa-lock fa-2x table-control red normal-action" title="enable shard allocation" @click="!ClusterInfo.readOnly && enableShardAllocation()"
               v-show="!shardAllocation"></i>
          </div>
          <div class="col-lg-3 col-md-6">
            <i class="fa fa-expand fa-2x normal-action table-control" v-show="!expandedView"
               title="expand view" @click="expandedView = true"></i>
            <i class="fa fa-compress fa-2x normal-action table-control" v-show="expandedView"
               title="condense view" @click="expandedView = false"></i>
          </div>
          <div class="col-lg-3 col-md-6">
            <i class="fa fa-sort-alpha-asc fa-2x normal-action table-control" title="sort ascending"
               v-show="indices_filter.asc" @click="indices_filter.asc = false"></i>
            <i class="fa fa-sort-alpha-desc fa-2x normal-action table-control" title="sort descending"
               v-show="!indices_filter.asc" @click="indices_filter.asc = true"></i>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="dropdown">
              <span class="title normal-action" type="button" id="dropcluster" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" title="more options">
                <i class="fa fa-caret-down fa-2x table-control"></i>
              </span>
              <ul class="dropdown-menu" aria-labelledby="dropcluster" v-show="!ClusterInfo.readOnly">
                <li @click="closeIndices()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-folder"> </i> close selected</a>
                </li>
                <li @click="openIndices()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-folder-open"> </i> open selected</a>
                </li>
                <li @click="forceMerges()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-wrench"> </i> force merge selected</a>
                </li>
                <li @click="refreshIndices()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-refresh"> </i> refresh selected</a>
                </li>
                <li @click="flushIndices()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-gavel"> </i> flush selected</a>
                </li>
                <li @click="clearIndicesCache()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-circle-o"> </i> clear selected caches</a>
                </li>
                <li class="divider" role="separator">
                </li>
                <li @click="deleteIndices()" data-toggle="modal" href="#confirm_dialog" target="_self">
                  <a target="_self"><i class="fa fa-fw fa-trash red"> </i> delete selected</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </td>
      <td v-for="(index, i) in page.elements" :key="i" :class="{'closed-index': index?.closed}">
        <div v-show="index">
          <div class="dropdown">
              <span class="title normal-action" type="button" :id="'drop_' + show(index?.name)" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" :title="show(index?.name)">
                <i class="fa fa-caret-down pull-right"></i>{{index?.name}}
              </span>
            <ul class="dropdown-menu" :aria-labelledby="'drop_' + show(index?.name)">
              <li @click="getIndexSettings(index.name)" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-info-circle"> </i> show settings</a>
              </li>
              <li @click="getIndexMapping(index.name)" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-code"> </i> show mappings</a>
              </li>
              <li @click="indexStats(index.name)" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-info"> </i> show stats</a>
              </li>
              <li v-show="index?.closed && !ClusterInfo.readOnly" @click="openIndex(index.name)" data-toggle="modal" href="#confirm_dialog"
                  target="_self">
                <a target="_self"><i class="fa fa-fw fa-folder-open"> </i> open index</a>
              </li>
              <li v-show="!index?.closed && !ClusterInfo.readOnly" @click="closeIndex(index.name)" data-toggle="modal" href="#confirm_dialog"
                  target="_self">
                <a target="_self"><i class="fa fa-fw fa-folder"> </i> close index</a>
              </li>
              <li @click="forceMerge(index.name)" v-show="!ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-wrench"> </i> force merge</a>
              </li>
              <li @click="refreshIndex(index.name)" v-show="!ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-refresh"> </i> refresh index</a>
              </li>
              <li @click="flushIndex(index.name)" v-show="!ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-gavel"> </i> flush index</a>
              </li>
              <li @click="clearIndexCache(index.name)" v-show="!ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-circle-o"> </i> clear cache</a>
              </li>
              <li @click="showIndexSettings(index.name)">
                <a target="_self"><i class="fa fa-fw fa-cog"> </i> index settings</a>
              </li>
              <li class="divider" v-show="!ClusterInfo.readOnly"></li>
              <li @click="deleteIndex(index.name)" v-show="!ClusterInfo.readOnly" data-toggle="modal" href="#confirm_dialog" target="_self">
                <a target="_self"><i class="fa fa-fw fa-trash red"> </i> delete index</a>
              </li>
            </ul>
          </div>
          <div class="subtitle" v-show="index?.aliases?.length">
            <div class="title">
              <i class="fa fa-tag"></i> {{index?.aliases?.[0]}}
              <span v-show="index?.aliases?.length > 1">(+{{index?.aliases?.length - 1}})</span>
            </div>
          </div>
          <div class="detail">
            <span v-show="!index?.closed">
              <span><small>shards: {{index?.num_shards}} * {{index?.num_replicas + 1}} |</small></span>
              <span><small>docs: {{number(index?.doc_count)}} |</small></span>
              <span><small>size: {{bytes(index?.size_in_bytes)}}</small></span>
            </span>
            <span v-show="index?.closed">
              <span><small><i>index closed</i></small></span>
            </span>
          </div>
        </div>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-show="unassigned_shards > 0 || relocating_shards > 0 || initializing_shards > 0">
      <td>
        <div class="subtitle" v-show="unassigned_shards > 0">
          <i class="fa fa-warning alert-warning"> </i> {{unassigned_shards}} unassigned shards
        </div>
        <div class="subtitle" v-show="relocating_shards > 0">
          <i class="fa fa-refresh fa-spin"> </i> {{relocating_shards}} relocating shards
        </div>
        <div class="subtitle" v-show="initializing_shards > 0">
          <i class="fa fa-spinner fa-spin"> </i> {{initializing_shards}} initializing shards
        </div>
        <div>
          <span class="normal-action" v-show="indices_filter.healthy" @click="indices_filter.healthy = false"><i><small>show only affected indices</small></i></span>
          <span class="normal-action" v-show="!indices_filter.healthy" @click="indices_filter.healthy = true"><i><small>show all indices</small></i></span>
        </div>
      </td>
      <td v-for="(index, i) in page.elements" :key="i">
        <span v-for="(shard, j) in ordered(index?.shards?.unassigned, 'shard')" :key="j">{{' '}}
          <span class="shard shard-unassigned" :title="ShardInfo.title(shard)" style="cursor: pointer"
                @click="explainShard(shard)" data-toggle="modal" href="#confirm_dialog" target="_self">{{' '}}
            <small>{{shard.shard}}</small>
          {{' '}}</span>
        {{' '}}</span>
      </td>
    </tr>
    <tr v-for="(node, n) in ordered(nodes, 'name')" :key="n">
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
              <div v-show="node.ingest">
                <i class="fa fa-fw fa-crop" title="ingest node"></i>
              </div>
            </div>
            <div class="node-info">
              <div class="title">
                  <span class="normal-action" type="button" @click="nodeStats(node.id)" data-toggle="modal"
                        href="#confirm_dialog" target="_self">
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
        <div v-show="expandedView" class="node-labels">
          <span class="label label-primary">JVM: {{node.jvm_version}}</span>
          <span class="label label-primary">ES: {{node.es_version}}</span>
        </div>
        <div class="row row-condensed">
          <div class="col-lg-3 col-condensed">
            <Progress
              :value="node.heap?.used_percent"
              :max="100"
              :text="'heap'"
              :tooltip="'used: ' + bytes(node.heap?.used) + '\nmax: ' + bytes(node.heap?.max)"
            />
          </div>
          <div class="col-lg-3 col-condensed">
            <Progress
              :value="node.disk?.used_percent"
              :max="100"
              :text="'disk'"
              :tooltip="'free: ' + bytes(node.disk?.free) + '\ntotal: ' + bytes(node.disk?.total)"
            />
          </div>
          <div class="col-lg-3 col-condensed">
            <Progress
              :value="node.cpu_percent"
              :max="100"
              :text="'cpu'"
              :tooltip="'process cpu: ' + show(node.cpu_percent) + '%'"
            />
          </div>
          <div class="col-lg-3 col-condensed">
            <Progress
              :value="node.load_average"
              :max="node.available_processors"
              :text="'load'"
              :tooltip="'1min avg.: ' + number(node.load_average, 2)"
            />
          </div>
        </div>
      </td>
      <td v-for="(index, i) in page.elements" :key="i">
        <span v-for="(shard, j) in ordered(index?.shards?.[node.id], 'shard')" :key="j">{{' '}}
          <span class="dropdown">
            <span :class="['shard shard-' + lowercase(shard.state) + ' normal-action', {'shard-replica': !shard.primary && shard.node}]"
                  data-toggle="dropdown" :title="ShardInfo.title(shard, node.name)"
                  :id="show(shard.shard) + '_' + show(shard.node) + '_' + show(shard.index)" v-show="!index.closed">
              <small>{{shard.shard}}</small>
            </span>
            <span :class="['shard shard-' + lowercase(shard.state) + ' shard-closed', {'shard-replica': !shard.primary && shard.node}]"
                  v-show="index.closed">
            <small>{{shard.shard}}</small>
          </span>
            <ul class="dropdown-menu"
                :aria-labelledby="show(shard.shard) + '_' + show(shard.node) + '_' + show(shard.index)">
            <li @click="shardStats(shard.index, shard.node, shard.shard)" data-toggle="modal" href="#confirm_dialog" target="_self">
              <a target="_self"><i class="fa fa-fw fa-info-circle"> </i> display shard stats</a>
            </li>
            <li @click="select(shard)" v-show="!isSelected(shard) && !ClusterInfo.readOnly">
              <a target="_self"><i class="fa fa-fw fa-arrows"> </i> select for relocation</a>
            </li>
            <li @click="select()" v-show="isSelected(shard) && !ClusterInfo.readOnly">
              <a target="_self"><i class="fa fa-fw fa-arrows"> </i> unselect for relocation</a>
            </li>
          </ul>
          </span>
        {{' '}}</span>
        <span class="shard shard-spot normal-action" @click="relocateShard(node)"
              v-show="canReceiveShard(index, node)">
          <i class="fa fa-download"></i>
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>
