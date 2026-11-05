<!-- 对应 public/analysis/tokens.html 和 analysisTokens 指令：外层保留 <analysis-tokens> 标签 -->
<script setup lang="ts">
defineProps<{ tokens?: any[] }>();
</script>

<template><component is="analysis-tokens"><table class="table" v-show="tokens">
  <thead>
  <tr>
    <th>token</th>
    <th>position</th>
    <th>start offset</th>
    <th>end offset</th>
  </tr>
  </thead>
  <tbody><tr v-for="(token, index) in tokens" :key="index">
    <td>{{token.token}}</td>
    <td>{{token.position}}</td>
    <td>{{token.start_offset}}</td>
    <td>{{token.end_offset}}</td>
  </tr>
</tbody></table></component></template>
