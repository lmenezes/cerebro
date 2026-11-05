// 对应旧前端 ClusterChangesService：每次刷新比对索引和节点，提示新增或消失的。
import { watch } from 'vue';
import { AlertService } from './alerts';
import { RefreshService } from './refresh';
import { DataService } from './data';

const current = {
  indices: undefined as string[] | undefined,
  nodes: undefined as string[] | undefined,
  clusterName: undefined as string | undefined,
};

const difference = (set1: string[], set2: string[] = []) => set1.filter((s) => set2.indexOf(s) < 0);
const info = (elements: string[], text: string) => AlertService.info(elements.length + text, elements.join(',\n'));
const warn = (elements: string[], text: string) => AlertService.warn(elements.length + text, elements.join(',\n'));

function process() {
  DataService.clusterChanges(
    (data: { cluster_name: string; nodes: string[]; indices: string[] }) => {
      if (current.clusterName === data.cluster_name) {
        const joined = difference(data.nodes, current.nodes);
        const left = difference(current.nodes || [], data.nodes);
        if (joined.length > 0) {
          info(joined, ' nodes joined the cluster');
        }
        if (left.length > 0) {
          warn(left, ' nodes left the cluster');
        }
        current.nodes = data.nodes;
        const created = difference(data.indices, current.indices);
        const deleted = difference(current.indices || [], data.indices);
        if (created.length > 0) {
          info(created, ' indices created');
        }
        if (deleted.length > 0) {
          warn(deleted, ' indices deleted');
        }
        current.indices = data.indices;
      } else {
        current.clusterName = data.cluster_name;
        current.indices = data.indices;
        current.nodes = data.nodes;
      }
    },
    () => {},
  );
}

export function startClusterChanges() {
  watch(() => RefreshService.lastUpdate(), process, { immediate: true });
}
