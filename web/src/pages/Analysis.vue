<!-- 对应 public/analysis/index.html 和 AnalysisController（src/app/components/analysis/） -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import AnalysisTokens from './analysis/AnalysisTokens.vue';
import { orderBy as ngOrderBy } from '../shared/filters';

const indices = ref<string[]>([]);
const fields = ref<string[]>([]);
const analyzers = ref<string[]>([]);

const fieldAnalysisIndex = ref<string>();
const field = ref<string>();
const fieldText = ref<string>();
const field_tokens = ref<any[]>();

const analyzerAnalysisIndex = ref<string>();
const analyzer = ref<string>();
const analyzerText = ref<string>();
const analyzer_tokens = ref<any[]>();

const loadAnalyzers = (index: string | undefined) => {
  DataService.send(
    'analysis/analyzers',
    { index },
    (value) => {
      analyzers.value = value;
    },
    (error) => {
      analyzers.value = [];
      AlertService.error('Error loading index analyzers', error);
    },
  );
};

const loadFields = (index: string | undefined) => {
  DataService.send(
    'analysis/fields',
    { index },
    (value) => {
      fields.value = value;
    },
    (error) => {
      fields.value = [];
      AlertService.error('Error loading index fields', error);
    },
  );
};

// 原版条件写成了 text && field && text，没检查索引
const analyzeByField = (index?: string, f?: string, text?: string) => {
  if (index && f && text) {
    field_tokens.value = undefined;
    DataService.send(
      'analysis/analyze/field',
      { index, field: f, text },
      (response) => {
        field_tokens.value = response;
      },
      (error) => AlertService.error('Error analyzing text by field', error),
    );
  }
};

const analyzeByAnalyzer = (index?: string, a?: string, text?: string) => {
  if (index && a && text) {
    analyzer_tokens.value = undefined;
    DataService.send(
      'analysis/analyze/analyzer',
      { index, analyzer: a, text },
      (response) => {
        analyzer_tokens.value = response;
      },
      (error) => AlertService.error('Error analyzing text by analyzer', error),
    );
  }
};

const setup = () => {
  DataService.send(
    'analysis/indices',
    {},
    (value) => {
      indices.value = value;
    },
    (error) => AlertService.error('Error loading indices', error),
  );
};

onMounted(setup);
</script>

<!-- 旧模板的 orderBy:field / orderBy:analyzer 用的是当前选中的值做谓词（选中后变成按原顺序），照搬；没有匹配的选项时 angular 会补一个空的 unknown option -->
<template><div class="row">
  <div class="col-md-6">
    <h4>
      analyze by field type
    </h4>
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label class="form-label">index name</label>
          <select class="form-control" v-model="fieldAnalysisIndex"
                  @change="loadFields(fieldAnalysisIndex)"
          >
          <option v-if="!indices.includes(fieldAnalysisIndex!)" :value="fieldAnalysisIndex"></option><option v-for="index in ngOrderBy(indices, undefined)" :key="index" :value="index">{{index}}</option></select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label class="form-label">field name</label>
          <select class="form-control" v-model="field">
          <option v-if="!fields.includes(field!)" :value="field"></option><option v-for="f in ngOrderBy(fields, field)" :key="f" :value="f">{{f}}</option></select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label class="form-label">&nbsp;</label>
          <input type="text" class="form-control"
                 placeholder="text to analyze"
                 v-model.trim="fieldText">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 text-right">
        <button type="submit" class="btn btn-success"
                @click="analyzeByField(fieldAnalysisIndex, field, fieldText)">
          <i class="fa fa-bolt"></i> analyze
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <AnalysisTokens :tokens="field_tokens"></AnalysisTokens>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <h4>
      analyze by analyzer
    </h4>
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label class="form-label">index name</label>
          <select class="form-control"
                  v-model="analyzerAnalysisIndex"
                  @change="loadAnalyzers(analyzerAnalysisIndex)"
          >
          <option v-if="!indices.includes(analyzerAnalysisIndex!)" :value="analyzerAnalysisIndex"></option><option v-for="index in ngOrderBy(indices, undefined)" :key="index" :value="index">{{index}}</option></select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label class="form-label">analyzer name</label>
          <select class="form-control"
                  v-model="analyzer">
          <option v-if="!analyzers.includes(analyzer!)" :value="analyzer"></option><option v-for="a in ngOrderBy(analyzers, analyzer)" :key="a" :value="a">{{a}}</option></select>
        </div>
      </div>
      <div class="col-sm-4"></div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label class="form-label">&nbsp;</label>
          <input type="text" class="form-control"
                 placeholder="text to analyze"
                 v-model.trim="analyzerText">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 text-right">
        <button type="submit" class="btn btn-success"
                @click="analyzeByAnalyzer(analyzerAnalysisIndex, analyzer, analyzerText)">
          <i class="fa fa-bolt"></i> analyze
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <AnalysisTokens :tokens="analyzer_tokens"></AnalysisTokens>
      </div>
    </div>
  </div>
</div>
</template>
