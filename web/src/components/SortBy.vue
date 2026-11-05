<!-- 对应 ngSortBy 指令：表头排序链接，图标随当前排序变化 -->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ property: string; text: string; sortBy: string; reverse: boolean }>();
const emit = defineEmits<{ (e: 'sort', property: string): void }>();

const iconClass = computed(() => {
  if (props.sortBy !== props.property) {
    return 'fa fa-fw';
  }
  return props.reverse ? 'fa fa-fw fa-sort-desc' : 'fa fa-fw fa-sort-asc';
});
</script>

<template><ng-sort-by><a href="" target="_self" @click.prevent="emit('sort', property)">{{text}}<i :class="iconClass"></i></a></ng-sort-by></template>
