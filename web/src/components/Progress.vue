<!-- 对应 public/shared/progress.html 和 ngProgress 指令 -->
<script setup lang="ts">
defineProps<{ value: number; max: number; text: string; tooltip: string }>();
</script>

<template><ng-progress><span :title="tooltip">
<span class="detail"><small>{{text}}</small></span>
<div class="progress progress-thin">
  <div
    class="progress-bar-info"
    :style="'width: ' + ((value / max) * 100) + '%'"
    :class="{'progress-bar-danger': ((value / max) > 0.75)}">
    {{value}}%
  </div>
</div>
</span>
</ng-progress></template>
