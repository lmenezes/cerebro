<!-- 对应 public/navbar.html 和 NavbarController -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { DataService } from '../services/data';
import { RefreshService } from '../services/refresh';
import { PageService } from '../services/page';
import { timeInterval } from '../shared/filters';

const status = ref<string>();
const clusterName = ref<string>();
const host = ref<string>();
const username = ref<string>();
const refreshInterval = ref(RefreshService.getInterval());
const intervals = [5000, 10000, 15000, 30000, 60000];

const setRefreshInterval = (interval: number) => {
  RefreshService.setInterval(interval);
  refreshInterval.value = interval;
};

const disconnect = () => {
  status.value = undefined;
  clusterName.value = undefined;
  host.value = undefined;
  username.value = undefined;
  DataService.disconnect();
};

watch(
  () => RefreshService.lastUpdate(),
  () => {
    DataService.getNavbarData(
      (data) => {
        status.value = data.status;
        clusterName.value = data.cluster_name;
        username.value = data.username;
        host.value = DataService.getHost();
        PageService.setup(clusterName.value, status.value);
      },
      () => {
        status.value = undefined;
        clusterName.value = undefined;
        host.value = undefined;
        PageService.setup();
      },
    );
  },
  { immediate: true },
);

const link = (page: string) => '#!/' + page + '?host=' + (host.value ?? '');
</script>

<template><div><nav :class="'navbar navbar-default navbar-fixed-top navbar-' + (status ?? '')" v-show="host">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href=""><img src="./img/favicon.png" width="28" style="padding-top:6px;"></a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav" v-show="host">
        <li><a class="nav-item nav-link" :href="link('overview')"><i class="fa fa-sitemap"></i> overview</a></li>
        <li><a class="nav-item nav-link" :href="link('nodes')"><i class="fa fa-server"></i> nodes</a></li>
        <li><a class="nav-item nav-link" :href="link('rest')"><i class="fa fa-edit"></i> rest</a></li>
        <li>
          <a target="_self" href="#" data-toggle="dropdown" class="dropdown-toggle">
            <i class="fa fa-fw fa-magic"></i> more <i class="fa fa-fw fa-caret-down"></i>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a class="nav-item nav-link" :href="link('create')">
                <i class="fa fa-file-o"></i> create index
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('cluster_settings')">
                <i class="fa fa-cogs"></i> cluster settings
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('aliases')">
                <i class="fa fa-tags"></i> aliases
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('analysis')">
                <i class="fa fa-puzzle-piece"></i> analysis
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('templates')">
                <i class="fa fa-book"></i> index templates
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('repository')">
                <i class="fa fa-database"></i> repositories
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('snapshot')">
                <i class="fa fa-camera"></i> snapshot
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('cat')">
                <i class="fa fa-list"></i> cat apis
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a class="nav-item nav-link" :href="link('index_templates')">
                <i class="fa fa-book"></i> composable templates
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('component_templates')">
                <i class="fa fa-puzzle-piece"></i> component templates
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('data_streams')">
                <i class="fa fa-database"></i> data streams
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('ilm')">
                <i class="fa fa-recycle"></i> lifecycle policies
              </a>
            </li>
            <li>
              <a class="nav-item nav-link" :href="link('slm')">
                <i class="fa fa-clock-o"></i> snapshot policies
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a target="_self" href="#" data-toggle="dropdown" class="dropdown-toggle">
            <i class="fa fa-fw fa-refresh"></i> {{timeInterval(refreshInterval)}} <i class="fa fa-fw fa-caret-down"></i>
          </a>
          <ul class="dropdown-menu" style="min-width: 60px;">
            <li v-for="i in intervals" :key="i">
              <a class="nav-item nav-link" @click="setRefreshInterval(i)">
                {{timeInterval(i)}}
              </a>
            </li>
          </ul>
        </li>
        <li class="hidden-xs">
          <a class="nav-item nav-link">
            <span v-show="host">{{host}} [{{status}}]</span>
          </a>
        </li>
        <li>
          <a href="#!/connect" class="nav-item nav-link hidden-xs" @click="disconnect()">
            <i class="fa fa-plug"></i>
          </a>
        </li>
        <li>
          <form action="auth/logout" method="POST" v-show="username">
            <button class="btn btn-lg btn-link" type="submit">
              <i class="fa fa-power-off"></i>
            </button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</nav></div></template>
