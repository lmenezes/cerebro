<!-- 对应 public/snapshot/restore_snapshot.html：快照列表每一行里的 ng-include，form 是这一行自己的（onload 里初始化） -->
<script setup lang="ts">
import { ClusterInfo } from '../../services/clusterInfo';
import { reactive, watch } from 'vue';
import { orderBy } from '../../shared/filters';
import { keepSelected, selectedValues } from './select';

const props = defineProps<{
  snapshot: { indices?: string[] };
  restore: (form: Record<string, any>) => void;
}>();

const form = reactive<Record<string, any>>({ includeAliases: true, includeGlobalState: true, ignoreUnavailable: true });

watch(() => props.snapshot.indices, (indices) => {
  form.indices = keepSelected(form.indices, orderBy(indices));
});
</script>

<template><ng-include><div class="row">
  <div class="col-lg-6">
    <div class="form-group">
      <label class="form-label">rename pattern</label>
      <input v-model.trim="form.renamePattern" class="form-control" placeholder="index_(.+)">
    </div>
    <div class="form-group">
      <label class="form-label">rename replacement</label>
      <input v-model.trim="form.renameReplacement" class="form-control" placeholder="restored_index_$1">
    </div>
    <div class="form-group">
      <label>
        <input type="checkbox" v-model="form.ignoreUnavailable"> ignore unavailable indices
      </label>
    </div>
    <div class="form-group">
      <label>
        <input type="checkbox" v-model="form.includeAliases"> include aliases
      </label>
    </div>
    <div class="form-group">
      <label>
        <input type="checkbox" v-model="form.includeGlobalState"> include global state
      </label>
    </div>
  </div>
  <div class="col-lg-6">
    <div class="form-group">
      <label class="form-label">indices (defaults to all if none is selected)</label>
      <select multiple @change="form.indices = selectedValues($event)"
              class="form-control" size="13">
        <option value="">Default is All</option>
      <option v-for="i in orderBy(props.snapshot.indices)" :key="i" :value="'string:' + i" :label="i" :selected="form.indices?.includes(i)">{{i}}</option></select>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-12 action-buttons">
    <button type="submit" class="btn btn-success pull-right" @click="restore(form)" v-show="!ClusterInfo.readOnly">
      <i class="fa fa-download"></i> restore
    </button>
  </div>
</div>


</ng-include></template>
