<!-- 对应 public/connect.html 和 ConnectController -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { appVersion } from '../shared/version';
import { orderBy } from '../shared/filters';

const route = useRoute();
const router = useRouter();

const hosts = ref<string[]>();
const host = ref<string>();
const username = ref<string>();
const password = ref<string>();
const apiKey = ref<string>();
const connecting = ref(false);
const unauthorized = ref(false);
const feedback = ref<string>();

onMounted(() => {
  DataService.raw('GET', 'connect/hosts')
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        hosts.value = response.body;
      } else {
        AlertService.error('Error while fetching list of known hosts', response.body);
      }
    })
    .catch((error) => AlertService.error('Error while fetching list of known hosts', error?.body));
  host.value = route.query.host as string | undefined;
  unauthorized.value = !!route.query.unauthorized;
});

const goOverview = (h: string, user?: string, pwd?: string) => {
  DataService.setHost(h, user, pwd);
  router.push({ path: '/overview', query: { host: h } });
};

const connect = (h?: string) => {
  feedback.value = undefined;
  host.value = h;
  connecting.value = true;
  DataService.raw('POST', 'connect', { host: h })
    .then((response) => {
      connecting.value = false;
      switch (response.status) {
        case 200:
          goOverview(h as string);
          break;
        case 401:
          unauthorized.value = true;
          break;
        default:
          feedback.value = 'Unexpected response status: [' + response.status + ']';
      }
    })
    .catch((data) => {
      connecting.value = false;
      AlertService.error('Error connecting to [' + h + ']', data);
    });
};

// 填了 API Key 就用 API Key（后端把以 "ApiKey " 开头的密码当作 API Key）
const authorizeWithForm = () => {
  if (apiKey.value && apiKey.value.trim()) {
    authorize(host.value, undefined, 'ApiKey ' + apiKey.value.trim());
  } else {
    authorize(host.value, username.value, password.value);
  }
};

const authorize = (h?: string, user?: string, pwd?: string) => {
  feedback.value = undefined;
  connecting.value = true;
  DataService.raw('POST', 'connect', { host: h, username: user, password: pwd })
    .then((response) => {
      connecting.value = false;
      switch (response.status) {
        case 401:
          feedback.value = 'Invalid username or password';
          break;
        case 200:
          goOverview(h as string, user, pwd);
          break;
        default:
          feedback.value = 'Unexpected response status: [' + response.status + ']';
      }
    })
    .catch((data) => {
      connecting.value = false;
      AlertService.error('Error connecting to [' + h + ']', data);
    });
};
</script>

<template><div class="row" style="padding-top: 80px; padding-bottom: 60px;">
  <div class="col-xs-12 text-center">
    <img src="img/logo.png" height="160px">
    <h4>Cerebro
      <small>{{appVersion}}</small>
    </h4>
  </div>
</div>

<div style="max-width: 400px; margin-left: auto; margin-right: auto">
  <div class="text-center">
    <span>
      <p>
        <span v-show="connecting">
          <i class="fa fa-fw fa-circle-o-notch fa-spin"> </i> Connecting...
        </span>&nbsp;
        <span class="text-danger" v-show="feedback">
          {{feedback}}
        </span>
      </p>
    </span>
  </div>
  <div v-show="!unauthorized">
    <div v-show="hosts && hosts.length > 0">
      <table class="table">
        <thead>
        <tr>
          <th>Known clusters</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(h, i) in orderBy(hosts)" :key="i">
          <td class="normal-action" @click="connect(h)">
            <span>{{h}}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <form @submit.prevent>
      <div class="form-group">
        <label for="host">Node address</label>
        <input id="host" type="text" v-model="host"
               class="form-control form-control-sm"
               placeholder="e.g.: http://localhost:9200"
               @keyup.enter="connect(host)">
      </div>
      <button type="submit" class="btn btn-success pull-right"
              @click="connect(host)"
              :disabled="!host">
        Connect
      </button>
    </form>
  </div>
  <div v-show="unauthorized">
    <form @submit.prevent>
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username"
               class="form-control form-control-sm"
               placeholder="admin"
               @keyup.enter="authorizeWithForm()">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password"
               class="form-control form-control-sm"
               @keyup.enter="authorizeWithForm()">
      </div>
      <div class="form-group">
        <label for="apikey">API key <small class="info-text">(instead of username and password)</small></label>
        <input id="apikey" type="password" v-model="apiKey"
               class="form-control form-control-sm"
               placeholder="id:api_key or encoded key"
               @keyup.enter="authorizeWithForm()">
      </div>
      <button type="submit" class="btn btn-success pull-right"
              @click="authorizeWithForm()">
        Authenticate
      </button>
    </form>
  </div>
</div></template>
