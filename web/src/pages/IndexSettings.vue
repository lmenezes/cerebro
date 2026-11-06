<!-- 对应 public/index_settings/index.html 和 IndexSettingsController（index_settings/*.js） -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { GroupedSettings } from '../shared/filters_model';
import { orderBy, show } from '../shared/filters';
import { DynamicIndexSettings, ValidIndexSettings, syncViews } from './settings/settings';

type Setting = { name: string; static: boolean };

const form = ref<Record<string, any>>();
const settings = ref<Record<string, any>>();
const groupedSettings = ref<GroupedSettings>();
const changes = ref<Record<string, any>>();
const pendingChanges = ref(0);
const settingsFilter = reactive({ name: '', showStatic: false });
// 各输入框的视图值，模型值（form）是去掉首尾空白后的视图值
const views = reactive<Record<string, string>>({});
const index = useRoute().query.index as string | undefined;

const set = (setting: string) => {
  const value = form.value![setting];
  if (value !== settings.value![setting]) {
    // 原版用真假判断，改成空值后会重复计数，这里按“是否已有这一项”判断
    if (setting in changes.value!) {
      changes.value![setting] = value;
    } else {
      changes.value![setting] = value;
      pendingChanges.value += 1;
    }
  } else {
    removeChange(setting);
  }
};

// ng-model + ng-change：模型值变了才调用 set
const input = (setting: string) => {
  const value = views[setting].trim();
  if (value !== form.value![setting]) {
    form.value![setting] = value;
    set(setting);
  }
};

const removeChange = (property: string) => {
  if (property in changes.value!) {
    pendingChanges.value -= 1;
    delete changes.value![property];
  }
};

const revertSetting = (setting: string) => {
  const old = { ...form.value };
  form.value![setting] = settings.value![setting];
  syncViews(views, old, form.value!);
  removeChange(setting);
};

const displayGroup = (group: { settings: Setting[] }) => {
  let matchedSettings = 0;
  group.settings.forEach((s) => {
    matchedSettings += displaySetting(s) ? 1 : 0;
  });
  return matchedSettings > 0;
};

const displaySetting = (setting: Setting) => {
  const matchesName = setting.name.indexOf(settingsFilter.name) >= 0;
  const matchesType = (!setting.static || settingsFilter.showStatic);
  return matchesName && matchesType;
};

const save = () => {
  DataService.send('index_settings/update', { index: index, settings: changes.value },
    (response) => {
      AlertService.info('Settings successfully saved', response);
      setup();
    },
    (error) => {
      AlertService.error('Error while saving settings', error);
    },
  );
};

const setup = () => {
  DataService.send('index_settings', { index: index },
    (response) => {
      const oldForm = form.value;
      settings.value = {};
      form.value = {};
      changes.value = {};
      pendingChanges.value = 0;
      const indexSettings = response[index as string];
      ['defaults', 'settings'].forEach((group) => {
        Object.entries(indexSettings[group] || {}).forEach(([setting, value]) => {
          if (ValidIndexSettings.valid(setting)) {
            settings.value![setting] = value;
            form.value![setting] = value;
          }
        });
      });
      syncViews(views, oldForm, form.value);
      if (!groupedSettings.value) {
        groupedSettings.value = new GroupedSettings(
          Object.keys(form.value).map((setting) => {
            const dynamic = DynamicIndexSettings.valid(setting);
            return { name: setting, static: !dynamic };
          }),
        );
      }
    },
    (error) => {
      AlertService.error('Error loading index settings', error);
    },
  );
};

onMounted(setup);
</script>

<template><!-- filter -->
<div class="row query-container">
  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <input type="text" class="form-control" v-model.trim="settingsFilter.name"
           placeholder="filter settings by name"/>
  </div>
  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <div class="checkbox">
      <label>
        <input type="checkbox" v-model="settingsFilter.showStatic"> show static settings <i class="fa fa-lock alert-warning"></i>
      </label>
    </div>
  </div>
</div>

<!-- settings form -->
<div class="row form-group" v-for="group in orderBy(groupedSettings?.groups.filter(displayGroup), 'name')" :key="group.name">
  <div class="col-xs-12">
    <h6><b>{{group.name?.toUpperCase()}}</b></h6>
    <hr class="header">
  </div>
  <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" v-for="setting in orderBy(group.settings.filter(displaySetting), 'name')" :key="setting.name">
    <div class="form-group">
      <label class="form-label">
        {{setting.name}} <i class="fa fa-lock alert-warning" v-show="setting.static"> </i>
      </label>
      <input type="text" class="form-control" v-model="views[setting.name]"
             @input="input(setting.name)" :disabled="setting.static"/>
    </div>
  </div>
</div>
<!-- pending changes -->
<div class="row" v-show="pendingChanges" :style="'padding-top: ' + ((pendingChanges * 40) + 90) + 'px;'">
  <div class="pending-changes">
    <div class="col-xs-12">
      <table class="table">
        <thead>
        <tr class="text-center">
          <td>{{pendingChanges}} pending changes</td>
        </tr>
        </thead>
        <tbody><tr v-for="(value, setting, $index) in changes" :key="$index">
          <td>
            <i class="fa fa-cog"></i>
            {{setting}} <span class="info-text">updated to</span> {{show(value)}}
            <i class="fa fa-undo normal-action pull-right" @click="revertSetting(setting)"></i>
          </td>
        </tr></tbody>
      </table>
    </div>
    <div class="col-lg-12 text-right">
      <div class="form-group">
        <div class="btn-group">
          <button class="btn btn-success" @click="save()" v-show="!ClusterInfo.readOnly">
            save
          </button>
        </div>
      </div>
    </div>
  </div>
</div></template>
