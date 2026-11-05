<!-- SLM 快照策略（_slm/policy） -->
<script setup lang="ts">
import JsonResourcePage, { type ResourceConfig } from '../../components/JsonResourcePage.vue';

const config: ResourceConfig = {
  listTitle: 'snapshot policies',
  newTitle: 'create new snapshot policy',
  updateTitle: 'update snapshot policy',
  icon: 'fa fa-clock-o',
  namePlaceholder: 'policy name',
  detailPlaceholder: 'repository',
  listPath: 'slm/policies',
  savePath: 'slm/policies/save',
  deletePath: 'slm/policies/delete',
  bodyField: 'policy',
  sample: {
    schedule: '0 30 1 * * ?',
    name: '<nightly-snap-{now/d}>',
    repository: 'my_repository',
    config: { indices: ['*'], include_global_state: false },
    retention: { expire_after: '30d', min_count: 5, max_count: 50 },
  },
  detail: (p) => {
    const policy = p.policy || {};
    const last = p.last_success ? ' - last success ' + new Date(p.last_success.time).toISOString() : '';
    return policy.schedule + ' to ' + policy.repository + last;
  },
  body: (p) => p.policy,
  extraAction: {
    icon: 'fa fa-play',
    title: 'execute now',
    path: 'slm/policies/execute',
    confirm: (name) => 'Take a snapshot with policy ' + name + ' now?',
    done: 'Snapshot started',
  },
};
</script>

<template><JsonResourcePage :config="config" editor-id="slm-policy-editor" /></template>
