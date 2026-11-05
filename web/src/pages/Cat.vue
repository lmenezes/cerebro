<!-- 对应 public/cat/index.html 和 CatController（src/app/components/cat/） -->
<script setup lang="ts">
import { ref } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { show } from '../shared/filters';
import { orderBy as ngOrderBy } from '../shared/filters';

const api = ref<string>();

const apis = [
  'aliases',
  'allocation',
  'count',
  'fielddata',
  'health',
  'indices',
  'master',
  'nodeattrs',
  'nodes',
  'pending tasks',
  'plugins',
  'recovery',
  'repositories',
  'thread pool',
  'shards',
  'segments',
];

const headers = ref<string[]>();
const data = ref<any[]>();
const sortCol = ref<string>();
const sortAsc = ref(true);

const sort = (col: string) => {
  if (sortCol.value === col) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortAsc.value = true;
  }
  sortCol.value = col;
};

const get = (value: string | undefined) => {
  DataService.send(
    'cat',
    { api: value!.replace(/ /g, '_') }, // thread pool → thread_pool
    (body) => {
      if (body.length) {
        headers.value = Object.keys(body[0]);
        sort(headers.value[0]);
        data.value = body;
      } else {
        headers.value = [];
        data.value = [];
      }
    },
    (error) => AlertService.error('Error executing request', error),
  );
};
</script>

<!-- 注意旧模板 orderBy:sortCol:sortAsc 把 sortAsc 当作 reverse，照搬。
     Vue 会删掉元素首尾的纯空白文本，{{' '}} 是补回旧模板里会影响排版的空格 -->
<template><h4>cat apis</h4>
<div class="row">
  <div class="col-xs-12">
    <div class="form-group">
      <select v-model="api" class="form-control">
      <option v-if="api === undefined" :value="undefined"></option><option v-for="a in apis" :key="a" :value="a">{{a}}</option></select>
    </div>
  </div>
  <div class="col-xs-12">
    <button class="btn btn-success pull-right" @click="get(api)">
      execute
    </button>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h4 class="text-center" v-show="data?.length === 0">No data available</h4>
    <table class="table">
      <thead>
      <tr>
        <th v-for="(col, index) in headers" :key="index" v-show="col" @click="sort(col)" class="normal-action">
          {{col}}<span v-show="col === sortCol">{{' '}}
          <i class="fa fa-caret-down" v-show="sortAsc"></i>
          <i class="fa fa-caret-up" v-show="!sortAsc"></i>
        {{' '}}</span>
        </th>
      </tr>
      </thead>
      <tbody><tr v-for="(row, index) in ngOrderBy(data, sortCol, sortAsc)" :key="index" v-show="row">
        <td v-for="(col, index2) in headers" :key="index2" v-show="col">
          {{show(row[col])}}
        </td>
      </tr>
    </tbody></table>
  </div>
</div>
</template>
