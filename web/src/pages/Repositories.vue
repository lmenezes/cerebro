<!-- 对应 public/repositories/index.html（内联了 repositories/{fs,url,s3,gcs,azure,hdfs}.html）和 RepositoriesController（repositories/*.js） -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { onMounted, reactive, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { ModalService } from '../services/modal';
import { readValue, selectValue } from './snapshot/select';

type Repository = { name: string; type: string; settings: Record<string, any> };

const TYPES = ['fs', 'url', 's3', 'gcs', 'hdfs', 'azure'];

const name = ref('');
const type = ref<string | null>('');
const settings = reactive<Record<string, any>>({});
const repositories = ref<Repository[]>([]);
const update = ref(false);
const validationError = undefined;

watch(
  name,
  (newValue) => {
    const names = repositories.value.map((r) => r.name);
    update.value = names.indexOf(newValue) !== -1;
  },
  { deep: true, immediate: true },
);

// ng-true-value 复选框：勾选时取 trueValue，取消时取 false（ng-false-value 默认）
const check = (key: string, trueValue: boolean, e: Event) => {
  settings[key] = (e.target as HTMLInputElement).checked ? trueValue : false;
};

const create = (name: string, type: string | null, settings: Record<string, any>) => {
  DataService.send('repositories/create', { name: name, type: type, settings: settings },
    (response) => {
      setup();
      AlertService.info('Repository successfully created', response);
    },
    (error) => {
      AlertService.error('Error creating repository', error);
    },
  );
};

// angular.copy(src, dst)：清空 dst 再深拷贝
const edit = (newName: string, newType: string, newSettings: Record<string, any>) => {
  name.value = newName;
  type.value = newType;
  Object.keys(settings).forEach((key) => delete settings[key]);
  Object.assign(settings, JSON.parse(JSON.stringify(newSettings)));
};

const remove = (name: string) => {
  ModalService.promptConfirmation(
    'Delete repository ' + name + '?',
    () => {
      DataService.send('repositories/delete', { name: name },
        (data) => {
          setup();
          AlertService.success('Operation successfully executed', data);
        },
        (data) => {
          AlertService.error('Operation failed', data);
        },
      );
    },
  );
};

const save = (name: string, type: string | null, settings: Record<string, any>) => {
  ModalService.promptConfirmation(
    'Save settings for repository ' + name + '?',
    () => {
      DataService.send('repositories/create', { name: name, type: type, settings: settings },
        (response) => {
          setup();
          AlertService.info('Successfully updated', response);
        },
        (error) => {
          AlertService.error('Error updating repository', error);
        },
      );
    },
  );
};

const setup = () => {
  DataService.send('repositories', {},
    (response) => {
      repositories.value = response;
    },
    (error) => {
      AlertService.error('Error loading repositories', error);
    },
  );
};

onMounted(setup);
</script>

<template><div class="row">
  <div class="col-md-6">
    <h4>existing repositories</h4>
    <table class="table">
      <tbody><tr v-for="(repository, $index) in repositories" :key="$index" v-show="repository">
        <td>
          <i class="fa fa-database"></i> {{repository.name}} <span class="info-text"> of type </span> {{repository.type}}
          <i class="fa fa-trash normal-action alert-danger pull-right"
             v-show="!ClusterInfo.readOnly"
             @click="remove(repository.name)"
             data-toggle="modal"
             href="#confirm_dialog">
          </i>
          <i class="fa fa-pencil normal-action pull-right"
             @click="edit(repository.name, repository.type, repository.settings)">
          </i>
        </td>
      </tr></tbody>
    </table>
  </div>

  <div class="col-md-6">
    <h4 v-show="!update">create new repository</h4>
    <h4 v-show="update">update repository</h4>
    <div class="row">
      <div class="form-group col-md-6">
        <label class="form-label">repository name</label>
        <input v-model.trim="name" class="form-control" placeholder="repository name">
      </div>
      <div class="form-group col-md-6">
        <label class="form-label">type</label>
        <select class="form-control" :value="selectValue(type, TYPES)" @change="type = readValue($event)"><option v-if="TYPES.indexOf(type as string) === -1" value="?" selected></option><option v-for="t in TYPES" :key="t" :value="'string:' + t" :label="t">{{t}}</option></select>
      </div>
    </div>
    <div class="row" v-show="type == 'fs'"><div class="form-group col-xs-12">
  <label class="form-label">location</label>
  <input v-model.trim="settings.location" class="form-control" placeholder="location of the snapshots">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max_restore_bytes_per_sec</label>
  <input v-model.trim="settings.max_restore_bytes_per_sec" class="form-control" placeholder="Throttles per node restore rate. Defaults to 20mb per second.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max_snapshot_bytes_per_sec</label>
  <input v-model.trim="settings.max_snapshot_bytes_per_sec" class="form-control" placeholder="Throttles per node snapshot rate. Defaults to 20mb per second.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">chunk size</label>
  <input v-model.trim="settings.chunk_size" class="form-control" placeholder="chunk size(1g, 10m, 5k). defaults to unlimited">
</div>
<div class="form-group col-md-6">
  <label class="form-label">compress snapshot files(defaults to true)</label>

  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === true" @change="check('compress', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === false" @change="check('compress', false, $event)"> False
      </label>
    </div>
  </div>
</div></div>
    <div class="row" v-show="type == 'url'"><div class="form-group col-xs-12">
  <label class="form-label">location</label>
  <input v-model.trim="settings.url" class="form-control" placeholder="location of snapshots">
</div></div>
    <div class="row" v-show="type == 's3'"><div class="col-xs-12">
  <div class="row">
    <div class="form-group col-md-6">
      <label class="form-label">region</label>
      <input v-model.trim="settings.region" class="form-control" placeholder="Region where bucket is located. Defaults to US Standard">
    </div>
    <div class="form-group col-md-6">
      <label class="form-label">bucket</label>
      <input v-model.trim="settings.bucket" class="form-control" placeholder="name of bucket to be used for snapshots">
    </div>
  </div>
</div>
<div class="form-group col-xs-12">
  <label class="form-label">base path</label>
  <input v-model.trim="settings.base_path" class="form-control" placeholder="Path within bucket to repository data(defaults to root dir)">
</div>
<div class="form-group col-md-6">
  <label class="form-label">access key</label>
  <input v-model.trim="settings.access_key" class="form-control" placeholder="The access key to use for authentication. Defaults to value of cloud.aws.access_key.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">secret key</label>
  <input v-model.trim="settings.secret_key" class="form-control" placeholder="The secret key to use for authentication. Defaults to value of cloud.aws.secret_key.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">chunk size</label>
  <input v-model.trim="settings.chunk_size" class="form-control" placeholder="chunk size(1g, 10m, 5k). defaults to unlimited">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max retries</label>
  <input v-model.trim="settings.max_retries" class="form-control" placeholder="Number of retries in case of S3 errors. Defaults to 3.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max_restore_bytes_per_sec</label>
  <input v-model.trim="settings.max_restore_bytes_per_sec" class="form-control" placeholder="Throttles per node restore rate. Defaults to 20mb per second.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max_snapshot_bytes_per_sec</label>
  <input v-model.trim="settings.max_snapshot_bytes_per_sec" class="form-control" placeholder="Throttles per node snapshot rate. Defaults to 20mb per second.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">compress snapshot files(defaults to false)</label>

  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === true" @change="check('compress', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === false" @change="check('compress', false, $event)"> False
      </label>
    </div>
  </div>
</div>
<div class="form-group col-md-6">
  <label class="form-label">server side encryption</label>

  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.server_side_encryption === true" @change="check('server_side_encryption', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.server_side_encryption === false" @change="check('server_side_encryption', false, $event)"> False
      </label>
    </div>
  </div>
</div></div>
    <div class="row" v-show="type == 'gcs'"><div class="col-xs-12">
  <div class="row">
    <div class="form-group col-md-6">
      <label class="form-label">bucket</label>
      <input v-model.trim="settings.bucket" class="form-control" placeholder="The name of bucket to be used for snapshots">
    </div>
    <div class="form-group col-md-6">
      <label class="form-label">client</label>
      <input v-model.trim="settings.client" class="form-control" placeholder="The name of the client to use to connect to Google Cloud Storage. Defaults to: default">
    </div>
  </div>
</div>
<div class="form-group col-xs-12">
  <label class="form-label">base path</label>
  <input v-model.trim="settings.base_path" class="form-control" placeholder="Specifies the path within bucket to repository data. Defaults to the root of the bucket.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">chunk size</label>
  <input v-model.trim="settings.chunk_size" class="form-control" placeholder="Chunk size (1g, 10m, 5k). Defaults to the maximum size of a blob which is 5TB">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max_restore_bytes_per_sec</label>
  <input v-model.trim="settings.max_restore_bytes_per_sec" class="form-control" placeholder="Throttles per node restore rate. Defaults to unlimited.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">max_snapshot_bytes_per_sec</label>
  <input v-model.trim="settings.max_snapshot_bytes_per_sec" class="form-control" placeholder="Throttles per node snapshot rate. Defaults to 40mb per second.">
</div>
<div class="form-group col-md-6">
  <label class="form-label">application name</label>
  <input v-model.trim="settings.application_name" class="form-control" placeholder="Name used by the client when it uses the Google Cloud Storage service">
</div>
<div class="form-group col-md-6">
  <label class="form-label">compress snapshot files (defaults to false)</label>
  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === true" @change="check('compress', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === false" @change="check('compress', false, $event)"> False
      </label>
    </div>
  </div>
</div>
<div class="form-group col-md-6">
  <label class="form-label">make repository read-only (defaults to false)</label>
  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.readonly === true" @change="check('readonly', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.readonly === false" @change="check('readonly', false, $event)"> False
      </label>
    </div>
  </div>
</div>
<div class="col-xs-12">
  <div class="row">
    <p>Documentation: <a class="text-primary" href="https://www.elastic.co/guide/en/elasticsearch/plugins/current/repository-gcs.html">Google Cloud Storage Repository Plugin</a></p>
  </div>
</div>
</div>
    <div class="row" v-show="type == 'azure'"><div class="form-group col-xs-6">
  <label class="form-label">container</label>
  <input v-model.trim="settings.container" class="form-control" placeholder="Container name. Defaults to elasticsearch-snapshots">
</div>
<div class="form-group col-xs-6">
  <label class="form-label">base_path</label>
  <input v-model.trim="settings.base_path" class="form-control" placeholder="Path within container to data(defaults to root dir.)">
</div>
<div class="form-group col-md-6">
  <label class="form-label">concurrent_streams</label>
  <input v-model.trim="settings.concurrent_streams" class="form-control" placeholder="Number of streams(per node). Defaults to 5">
</div>
<div class="form-group col-md-6">
  <label class="form-label">chunk_size</label>
  <input v-model.trim="settings.chunk_size" class="form-control" placeholder="Defaults to 64m (64m max)">
</div>
<div class="form-group col-md-6">
  <label class="form-label">compress data(defaults to false)</label>

  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === true" @change="check('compress', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === false" @change="check('compress', false, $event)"> False
      </label>
    </div>
  </div>
</div></div>
    <div class="row" v-show="type == 'hdfs'"><div class="form-group col-xs-12">
  <label class="form-label">path</label>
  <input v-model.trim="settings.path" class="form-control" placeholder="path with the file-system where data is stored/loaded">
</div>
<div class="form-group col-xs-6">
  <label class="form-label">uri</label>
  <input v-model.trim="settings.uri" class="form-control" placeholder="Hadoop file-system URI(hdfs://<host>:<port>/)">
</div>
<div class="form-group col-xs-6">
  <label class="form-label">conf_location</label>
  <input v-model.trim="settings.conf_location" class="form-control" placeholder="Hadoop XML config(use commas for multi values)">
</div>
<div class="form-group col-md-6">
  <label class="form-label">concurrent_streams</label>
  <input v-model.trim="settings.concurrent_streams" class="form-control" placeholder="the number of concurrent streams(defaults to 5)">
</div>
<div class="form-group col-md-6">
  <label class="form-label">chunk_size</label>
  <input v-model.trim="settings.chunk_size" class="form-control" placeholder="chunk size: 10mb, 1gb (disabled by default).">
</div>
<div class="form-group col-md-6">
  <label class="form-label">compress data</label>

  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === true" @change="check('compress', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.compress === false" @change="check('compress', false, $event)"> False
      </label>
    </div>
  </div>
</div>
<div class="form-group col-md-6">
  <label class="form-label">load default Hadoop configuration</label>

  <div class="row">
    <div class="col-xs-12">
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.load_defaults === true" @change="check('load_defaults', true, $event)"> True
      </label>
      <label class="cluster-map-node-type">
        <input type="checkbox" :checked="settings.load_defaults === false" @change="check('load_defaults', false, $event)"> False
      </label>
    </div>
  </div>
</div></div>
    <div class="row">
      <div class="col-lg-12 action-buttons">
        <span class="validation-error">{{validationError}}</span>
        <button type="submit" class="btn btn-success pull-right" @click="create(name, type, settings)" v-show="!update && !ClusterInfo.readOnly">
          <i class="fa fa-file-o"> </i> create
        </button>
        <button type="submit"
                class="btn btn-success pull-right"
                @click="save(name, type, settings)"
                v-show="update && !ClusterInfo.readOnly"
                data-toggle="modal"
                href="#confirm_dialog">
          <i class="fa fa-floppy-o"> </i> update
        </button>
      </div>
    </div>
  </div>
</div></template>
