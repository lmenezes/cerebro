<!-- 组件模板（_component_template） -->
<script setup lang="ts">
import JsonResourcePage, { type ResourceConfig } from '../../components/JsonResourcePage.vue';
import { withoutReadOnlyFields } from './common';

const config: ResourceConfig = {
  listTitle: 'component templates',
  newTitle: 'create new component template',
  updateTitle: 'update component template',
  icon: 'fa fa-puzzle-piece',
  namePlaceholder: 'template name',
  detailPlaceholder: 'description',
  listPath: 'component_templates',
  savePath: 'component_templates/create',
  deletePath: 'component_templates/delete',
  bodyField: 'template',
  sample: { template: { settings: {}, mappings: {}, aliases: {} }, _meta: { description: '' } },
  detail: (t) => {
    const ct = t.component_template || {};
    const parts = [];
    if (ct.version !== undefined) {
      parts.push('version ' + ct.version);
    }
    if (ct._meta?.description) {
      parts.push(ct._meta.description);
    }
    return parts.join(' - ');
  },
  body: (t) => withoutReadOnlyFields(t.component_template),
};
</script>

<template><JsonResourcePage :config="config" editor-id="component-template-editor" /></template>
