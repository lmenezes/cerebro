<!-- 对应 public/pagination.html 和 ngPagination 指令：外层保留 <ng-pagination> 标签，DOM 与旧前端一致 -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import type { Page, Paginator } from '../shared/paginator';
import { number } from '../shared/filters';

const props = defineProps<{ paginator: Paginator<any>; page: Page<any>; label?: string }>();

// 左右方向键翻页，输入框里不处理
const handler = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    return;
  }
  if (event.keyCode == 39 && props.page.next) {
    props.paginator.nextPage();
    event.preventDefault();
  }
  if (event.keyCode == 37 && props.page.previous) {
    props.paginator.previousPage();
    event.preventDefault();
  }
};
onMounted(() => document.addEventListener('keydown', handler));
onBeforeUnmount(() => document.removeEventListener('keydown', handler));
</script>

<template><ng-pagination><div class="row">
  <div class="col-lg-12">

    <nav class="pull-right">
      <ul class="pager noselect">
        <li>
          <span class="pager-text">{{number(page.first, 0)}}-{{number(page.last, 0)}} of {{number(page.total, 0)}}</span>
        </li>
        <li class="normal-action" v-show="page.previous" @click="paginator.previousPage()"><a target="_self">&larr;</a></li>
        <li class="disabled" v-show="!page.previous"><a target="_self">&larr;</a></li>
        <li class="normal-action" v-show="page.next" @click="paginator.nextPage()"><a target="_self">&rarr;</a></li>
        <li class="disabled" v-show="!page.next"><a target="_self">&rarr;</a></li>
      </ul>
    </nav>

  </div>
</div>
</ng-pagination></template>
