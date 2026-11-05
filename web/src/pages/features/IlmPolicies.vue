<!-- ILM 生命周期策略（_ilm/policy） -->
<script setup lang="ts">
import JsonResourcePage, { type ResourceConfig } from '../../components/JsonResourcePage.vue';

const config: ResourceConfig = {
  listTitle: 'lifecycle policies',
  newTitle: 'create new lifecycle policy',
  updateTitle: 'update lifecycle policy',
  icon: 'fa fa-recycle',
  namePlaceholder: 'policy name',
  detailPlaceholder: 'phase',
  listPath: 'ilm/policies',
  savePath: 'ilm/policies/save',
  deletePath: 'ilm/policies/delete',
  bodyField: 'policy',
  sample: {
    phases: {
      hot: { actions: { rollover: { max_primary_shard_size: '50gb', max_age: '30d' } } },
      delete: { min_age: '90d', actions: { delete: {} } },
    },
  },
  detail: (p) => {
    const phases = Object.keys(p.policy?.phases || {});
    const used = (p.in_use_by?.indices || []).length;
    return 'phases ' + phases.join(',') + (used ? ' - used by ' + used + ' indices' : '');
  },
  body: (p) => p.policy,
};
</script>

<template><JsonResourcePage :config="config" editor-id="ilm-policy-editor" /></template>
