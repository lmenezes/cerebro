<!-- 对应 public/snapshot/index.html（每行的恢复表单 restore_snapshot.html 在 snapshot/RestoreSnapshot.vue）和 SnapshotController（snapshot/*.js） -->
<script setup lang="ts">
import { ClusterInfo } from '../services/clusterInfo';
import { onMounted, reactive, ref, watch } from 'vue';
import { DataService } from '../services/data';
import { AlertService } from '../services/alerts';
import { ModalService } from '../services/modal';
import { orderBy } from '../shared/filters';
import { formatDate } from './snapshot/date';
import { keepSelected, readValue, selectValue, selectedValues } from './snapshot/select';
import RestoreSnapshot from './snapshot/RestoreSnapshot.vue';

type Index = { name: string; special: boolean };

const _indices = ref<Index[]>([]);
const indices = ref<Index[]>([]);
const repositories = ref<string[]>([]);

const showSpecialIndices = ref(false);

const repository = ref<string | null>();
const snapshots = ref<any[]>([]);
const form = reactive<Record<string, any>>({
  snapshot: '',
  repository: '',
  ignoreUnavailable: false,
  includeGlobalState: true,
});

watch(repository, (newValue) => {
  loadSnapshots(newValue);
}, { deep: true });

watch(showSpecialIndices, () => {
  refreshIndices();
}, { immediate: true });

watch(indices, () => {
  form.indices = keepSelected(form.indices, orderBy(indices.value, 'name').map((i) => i.name));
});

const loadSnapshots = (repo: string | null | undefined) => {
  if (repo) {
    DataService.send('snapshots/load', { repository: repo },
      (response) => {
        snapshots.value = response;
      },
      (error) => {
        AlertService.error('Error loading snapshots', error);
      },
    );
  }
};

const create = (repo: string | null, snapshot: string, ignoreUnavailable: boolean,
  includeGlobalState: boolean, indices: string[] | undefined) => {
  DataService.send('snapshots/create', {
    repository: repo,
    snapshot: snapshot,
    ignoreUnavailable: ignoreUnavailable,
    includeGlobalState: includeGlobalState,
    indices: indices,
  },
  (response) => {
    loadSnapshots(repository.value);
    AlertService.info('Snapshot successfully created', response);
  },
  (error) => {
    AlertService.error('Error creating snapshot', error);
  });
};

const deleteSnapshot = (repo: string | null | undefined, snapshot: string) => {
  ModalService.promptConfirmation(
    'Delete snapshot ' + snapshot + '?',
    () => {
      DataService.send('snapshots/delete', { repository: repo, snapshot: snapshot },
        () => {
          loadSnapshots(repository.value);
          AlertService.info('Snapshot successfully deleted');
        },
        (error) => {
          AlertService.error('Error deleting snapshot', error);
        },
      );
    },
  );
};

const restore = (repo: string | null | undefined, snapshot: string, form: Record<string, any>) => {
  DataService.send('snapshots/restore', {
    repository: repo,
    snapshot: snapshot,
    renamePattern: form.renamePattern,
    renameReplacement: form.renameReplacement,
    ignoreUnavailable: form.ignoreUnavailable,
    includeAliases: form.includeAliases,
    includeGlobalState: form.includeGlobalState,
    indices: form.indices,
  },
  (response) => {
    AlertService.info('Snapshot successfully restored', response);
  },
  (error) => {
    AlertService.error('Error restoring snapshot', error);
  });
};

const refreshIndices = () => {
  if (!showSpecialIndices.value) {
    indices.value = _indices.value.filter((i) => !i.special);
  } else {
    indices.value = _indices.value;
  }
};

const setup = () => {
  DataService.send('snapshots', {},
    (data) => {
      _indices.value = data.indices;
      refreshIndices();
      repositories.value = data.repositories;
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
    <h4>
      existing snapshots
      <div class="form-inline form-group pull-right">
        <div class="form-group">
          <select class="form-control" :value="selectValue(repository, repositories)" @change="repository = readValue($event)"><option v-if="selectValue(repository, repositories) === '?'" value="?" selected></option>
            <option value="">select repository</option>
          <option v-for="r in orderBy(repositories)" :key="r" :value="'string:' + r" :label="r">{{r}}</option></select>
        </div>
      </div>
    </h4>
    <table class="table">
      <tbody><tr v-for="(snapshot, $index) in snapshots" :key="$index" v-show="snapshot">
        <td>
          <div>
            <i class="fa fa-database"></i> {{snapshot.snapshot}} 
            <span class="info-text"> created at </span> {{formatDate(snapshot.start_time)}} 
            <span class="info-text"> state </span> {{snapshot.state }}
            <i class="fa fa-trash normal-action alert-danger pull-right"
               v-show="!ClusterInfo.readOnly"
               @click="deleteSnapshot(repository, snapshot.snapshot)"
               data-toggle="modal"
               href="#confirm_dialog">
            </i>
            <i class="fa fa-download normal-action pull-right"
               data-toggle="collapse" :href="'#' + snapshot.uuid + '_details'">
            </i>
          </div>
          <div class="collapse" :id="snapshot.uuid + '_details'">
            <RestoreSnapshot :snapshot="snapshot" :restore="(f) => restore(repository, snapshot.snapshot, f)" />
          </div>
        </td>
      </tr></tbody>
    </table>
  </div>
  <div class="col-md-6">
    <h4>create new snapshot</h4>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-label">repository</label>
          <select class="form-control" :value="selectValue(form.repository, repositories)" @change="form.repository = readValue($event)"><option v-if="selectValue(form.repository, repositories) === '?'" value="?" selected></option>
            <option value="">select repository</option>
          <option v-for="r in orderBy(repositories)" :key="r" :value="'string:' + r" :label="r">{{r}}</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">snapshot name</label>
          <input v-model.trim="form.snapshot" class="form-control" placeholder="snapshot name">
        </div>
        <div class="form-group">
          <label class="form-label">
            <input type="checkbox" v-model="form.ignoreUnavailable"> ignore unavailable indices
          </label>
        </div>
        <div class="form-group">
          <label class="form-label">
            <input type="checkbox" v-model="form.includeGlobalState"> include global state
          </label>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label class="form-label">
            indices (defaults to all if none is selected)
            <label class="cluster-map-node-type">
              <input type="checkbox" v-model="showSpecialIndices"> show special indices
            </label>
          </label>
          <select multiple @change="form.indices = selectedValues($event)"
                  class="form-control" size="13">
          <option v-for="i in orderBy(indices, 'name')" :key="i.name" :value="'string:' + i.name" :label="i.name" :selected="form.indices?.includes(i.name)">{{i.name}}</option></select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button type="submit" class="btn btn-success pull-right" v-show="!ClusterInfo.readOnly"
                @click="create(form.repository, form.snapshot, form.ignoreUnavailable, form.includeGlobalState, form.indices)">
          <i class="fa fa-file-o"></i> create
        </button>
      </div>
    </div>
  </div>
</div>

</template>
