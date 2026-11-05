<!-- 组合索引模板（_index_template） -->
<script setup lang="ts">
import JsonResourcePage, { type ResourceConfig } from '../../components/JsonResourcePage.vue';
import { withoutReadOnlyFields } from './common';

const config: ResourceConfig = {
  listTitle: 'composable index templates',
  newTitle: 'create new index template',
  updateTitle: 'update index template',
  icon: 'fa fa-book',
  namePlaceholder: 'template name',
  detailPlaceholder: 'index pattern',
  listPath: 'index_templates',
  savePath: 'index_templates/create',
  deletePath: 'index_templates/delete',
  bodyField: 'template',
  sample: {
    index_patterns: ['index_name_*'],
    priority: 100,
    composed_of: [],
    template: { settings: {}, mappings: {}, aliases: {} },
  },
  detail: (t) => {
    const it = t.index_template || {};
    const composed = (it.composed_of || []).length ? ' composed of ' + it.composed_of.join(',') : '';
    return 'with patterns ' + (it.index_patterns || []).join(',') + composed;
  },
  body: (t) => withoutReadOnlyFields(t.index_template),
};
</script>

<template><JsonResourcePage :config="config" editor-id="index-template-editor" /></template>
