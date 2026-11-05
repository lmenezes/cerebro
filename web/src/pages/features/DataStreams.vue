<!-- data streams：列表、按名字筛选、rollover、删除。表格样式沿用 cat apis 页面。 -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DataService } from '../../services/data';
import { AlertService } from '../../services/alerts';
import { ModalService } from '../../services/modal';
import { RefreshService } from '../../services/refresh';
import { ClusterInfo } from '../../services/clusterInfo';
import { bytes, orderBy } from '../../shared/filters';

interface DataStream {
  name: string;
  status: string;
  template: string;
  ilm_policy?: string;
  generation: number;
  indices: string[];
  timestamp_field: string;
  hidden: boolean;
  system: boolean;
  store_size_bytes?: number;
  maximum_timestamp?: number;
}

const streams = ref<DataStream[]>();
const filter = ref('');
const showHidden = ref(false);

const load = () =>
  DataService.send(
    'data_streams',
    {},
    (data) => (streams.value = data),
    (error) => AlertService.error('Error while loading data streams', error),
  );
watch(() => RefreshService.lastUpdate(), load, { immediate: true });

const visible = computed(() =>
  orderBy(streams.value, 'name').filter(
    (s) => (showHidden.value || (!s.hidden && !s.system)) && (!filter.value || s.name.indexOf(filter.value) != -1),
  ),
);

const statusClass = (status: string) =>
  ({ GREEN: 'text-success', YELLOW: 'text-warning', RED: 'text-danger' })[status?.toUpperCase()] || '';

const lastEvent = (ts?: number) => (ts ? new Date(ts).toISOString().replace('T', ' ').replace(/\.\d+Z$/, '') : '-');

const confirm = (text: string, path: string, name: string, done: string) =>
  ModalService.promptConfirmation(text, () =>
    DataService.send(
      path,
      { name },
      () => {
        AlertService.info(done);
        RefreshService.refresh();
      },
      (error) => AlertService.error('Operation failed', error),
    ),
  );
</script>

<template><h4>data streams</h4>
<div class="row">
  <div class="col-md-6 form-group">
    <input type="text" v-model.trim="filter" class="form-control" placeholder="filter data streams by name">
  </div>
  <div class="col-md-6 form-group">
    <div class="checkbox">
      <label><input type="checkbox" v-model="showHidden"> show hidden and system data streams</label>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h4 class="text-center" v-show="streams && visible.length === 0">No data streams</h4>
    <table class="table" v-show="visible.length">
      <thead>
      <tr>
        <th>name</th>
        <th>status</th>
        <th>template</th>
        <th>lifecycle policy</th>
        <th>generation</th>
        <th>backing indices</th>
        <th>size</th>
        <th>last event</th>
        <th></th>
      </tr>
      </thead>
      <tr v-for="s in visible" :key="s.name">
        <td><i class="fa fa-database"></i> {{s.name}}</td>
        <td :class="statusClass(s.status)">{{s.status?.toLowerCase()}}</td>
        <td>{{s.template}}</td>
        <td>{{s.ilm_policy || '-'}}</td>
        <td>{{s.generation}}</td>
        <td :title="s.indices.join('\n')">{{s.indices.length}}</td>
        <td>{{s.store_size_bytes !== undefined && s.store_size_bytes !== null ? bytes(s.store_size_bytes) : '-'}}</td>
        <td>{{lastEvent(s.maximum_timestamp)}}</td>
        <td class="text-right">
          <span v-show="!ClusterInfo.readOnly">
            <i class="fa fa-refresh normal-action" title="rollover" data-toggle="modal" href="#confirm_dialog" target="_self"
               @click="confirm('Rollover data stream ' + s.name + '?', 'data_streams/rollover', s.name, 'Data stream rolled over')"></i>
            &nbsp;
            <i class="fa fa-trash normal-action alert-danger" title="delete" data-toggle="modal" href="#confirm_dialog" target="_self"
               @click="confirm('Delete data stream ' + s.name + ' and all its backing indices?', 'data_streams/delete', s.name, 'Data stream deleted')"></i>
          </span>
        </td>
      </tr>
    </table>
  </div>
</div></template>
