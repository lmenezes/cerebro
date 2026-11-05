<!-- 对应 public/alerts.html -->
<script setup lang="ts">
import { AlertService } from '../services/alerts';
</script>

<template><div class="alerts"><div class="alert-block" :id="a.id" v-for="a in AlertService.alerts" :key="a.id">
  <div class="alert" :class="a.cls">
		<span class="pull-right normal-action" @click="AlertService.remove(a.id)">
			<i class="fa fa-times-circle"></i>
		</span>
    <i :class="a.icon">&nbsp;</i>
    <a :class="a.cls" data-toggle="collapse" :data-parent="'#alert_box_' + a.id" target="_self" :href="'#alert_details_' + a.id" v-show="a.hasResponse()">
      <span :class="a.cls">{{a.message}}</span>
    </a>
    <span v-show="!a.hasResponse()">{{a.message}}</span>
    <div v-show="a.hasResponse()" :id="'alert_details_' + a.id" class="panel-collapse collapse">
      <pre class="alert">{{a.getResponse()}}</pre>
    </div>
  </div>
</div></div></template>
