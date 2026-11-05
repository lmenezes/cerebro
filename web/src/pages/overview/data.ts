// 对应 src/app/components/overview/data.js（OverviewDataService），接口路径和参数不变。
import { DataService } from '../../services/data';

type Callback = (body: any) => void;

export const OverviewDataService = {
  getOverview(success: Callback, error: Callback) {
    DataService.send('overview', {}, success, error);
  },

  closeIndex(index: string, success: Callback, error: Callback) {
    const data = { indices: index };
    DataService.send('overview/close_indices', data, success, error);
  },

  openIndex(index: string, success: Callback, error: Callback) {
    const data = { indices: index };
    DataService.send('overview/open_indices', data, success, error);
  },

  forceMerge(index: string, success: Callback, error: Callback) {
    const data = { indices: index };
    DataService.send('overview/force_merge', data, success, error);
  },

  refreshIndex(index: string, success: Callback, error: Callback) {
    const data = { indices: index };
    DataService.send('overview/refresh_indices', data, success, error);
  },

  flushIndex(index: string, success: Callback, error: Callback) {
    const data = { indices: index };
    DataService.send('overview/flush_indices', data, success, error);
  },

  clearIndexCache(index: string, success: Callback, error: Callback) {
    const params = { indices: index };
    DataService.send('overview/clear_indices_cache', params, success, error);
  },

  deleteIndex(index: string, success: Callback, error: Callback) {
    const data = { indices: index };
    DataService.send('overview/delete_indices', data, success, error);
  },

  enableShardAllocation(success: Callback, error: Callback) {
    DataService.send('overview/enable_shard_allocation', {}, success, error);
  },

  disableShardAllocation(kind: string, success: Callback, error: Callback) {
    DataService.send('overview/disable_shard_allocation', { kind: kind }, success, error);
  },

  getShardStats(index: string, node: string, shard: number, success: Callback, error: Callback) {
    const data = { index: index, node: node, shard: shard };
    DataService.send('overview/get_shard_stats', data, success, error);
  },

  relocateShard(shard: number, index: string, from: string, to: string, success: Callback, error: Callback) {
    const data = { shard: shard, index: index, from: from, to: to };
    DataService.send('overview/relocate_shard', data, success, error);
  },

  nodeStats(node: string, success: Callback, error: Callback) {
    DataService.send('commons/get_node_stats', { node: node }, success, error);
  },

  indexStats(index: string, success: Callback, error: Callback) {
    const data = { index: index };
    DataService.send('commons/get_index_stats', data, success, error);
  },

  getIndexMapping(index: string, success: Callback, error: Callback) {
    const data = { index: index };
    DataService.send('commons/get_index_mapping', data, success, error);
  },

  getIndexSettings(index: string, success: Callback, error: Callback) {
    const data = { index: index };
    DataService.send('commons/get_index_settings', data, success, error);
  },
};
