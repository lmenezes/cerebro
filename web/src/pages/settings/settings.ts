// 对应 src/app/components/cluster_settings/dynamic_settings.js、
// index_settings/dynamic_index_settings.js、index_settings/valid_index_setttings.js

// 可以在线修改的集群设置，其他的都按 static 处理
const DYNAMIC_SETTINGS = new Set([
  'cluster.blocks.read_only',
  'cluster.blocks.read_only_allow_delete',
  'cluster.indices.close.enable',
  'cluster.info.update.interval',
  'cluster.info.update.timeout',
  'cluster.routing.allocation.allow_rebalance',
  'cluster.routing.allocation.awareness.attributes',
  'cluster.routing.allocation.balance.index',
  'cluster.routing.allocation.balance.shard',
  'cluster.routing.allocation.balance.threshold',
  'cluster.routing.allocation.cluster_concurrent_rebalance',
  'cluster.routing.allocation.disk.include_relocations',
  'cluster.routing.allocation.disk.reroute_interval',
  'cluster.routing.allocation.disk.threshold_enabled',
  'cluster.routing.allocation.disk.watermark.high',
  'cluster.routing.allocation.disk.watermark.low',
  'cluster.routing.allocation.enable',
  'cluster.routing.allocation.node_concurrent_incoming_recoveries',
  'cluster.routing.allocation.node_concurrent_outgoing_recoveries',
  'cluster.routing.allocation.node_concurrent_recoveries',
  'cluster.routing.allocation.node_initial_primaries_recoveries',
  'cluster.routing.allocation.same_shard.host',
  'cluster.routing.allocation.snapshot.relocation_enabled',
  'cluster.routing.allocation.total_shards_per_node',
  'cluster.routing.rebalance.enable',
  'cluster.service.slow_task_logging_threshold',
  'discovery.zen.commit_timeout',
  'discovery.zen.minimum_master_nodes',
  'discovery.zen.no_master_block',
  'discovery.zen.publish_diff.enable',
  'discovery.zen.publish_timeout',
  'gateway.initial_shards',
  'indices.breaker.fielddata.limit',
  'indices.breaker.fielddata.overhead',
  'indices.breaker.request.limit',
  'indices.breaker.request.overhead',
  'indices.breaker.total.limit',
  'indices.mapping.dynamic_timeout',
  'indices.recovery.internal_action_long_timeout',
  'indices.recovery.internal_action_timeout',
  'indices.recovery.max_bytes_per_sec',
  'indices.recovery.recovery_activity_timeout',
  'indices.recovery.retry_delay_network',
  'indices.recovery.retry_delay_state_sync',
  'indices.store.throttle.max_bytes_per_sec',
  'indices.store.throttle.type',
  'indices.ttl.interval',
  'ingest.new_date_format',
  'network.breaker.inflight_requests.limit',
  'network.breaker.inflight_requests.overhead',
  'script.max_compilations_per_minute',
  'search.default_search_timeout',
  'search.low_level_cancellation',
  'transport.tracer.exclude.0',
  'transport.tracer.exclude.1',
  'xpack.ml.node_concurrent_job_allocations',
  'xpack.monitoring.collection.cluster.state.timeout',
  'xpack.monitoring.collection.cluster.stats.timeout',
  'xpack.monitoring.collection.index.recovery.active_only',
  'xpack.monitoring.collection.index.recovery.timeout',
  'xpack.monitoring.collection.index.stats.timeout',
  'xpack.monitoring.collection.interval',
  'xpack.monitoring.collection.ml.job.stats.timeout',
  'xpack.monitoring.history.duration',
  'xpack.security.http.filter.enabled',
  'xpack.security.transport.filter.enabled',
  'xpack.watcher.history.cleaner_service.enabled',
  'action.auto_create_index',
  'action.destructive_requires_name',
  'action.search.shard_count.limit',
]);

// 可以在线修改的索引设置
const DYNAMIC_INDEX_SETTINGS = new Set([
  'index.mapper.dynamic',
  'index.max_refresh_listeners',
  'index.number_of_replicas',
  'index.allocation.max_retries',
  'index.auto_expand_replicas',
  'index.blocks.metadata',
  'index.blocks.read',
  'index.blocks.read_only',
  'index.blocks.read_only_allow_delete',
  'index.blocks.write',
  'index.compound_format',
  'index.gc_deletes',
  'index.indexing.slowlog.level',
  'index.indexing.slowlog.reformat',
  'index.indexing.slowlog.source',
  'index.indexing.slowlog.threshold.index.debug',
  'index.indexing.slowlog.threshold.index.info',
  'index.indexing.slowlog.threshold.index.trace',
  'index.indexing.slowlog.threshold.index.warn',
  'index.mapping.depth.limit',
  'index.mapping.nested_fields.limit',
  'index.mapping.total_fields.limit',
  'index.max_adjacency_matrix_filters',
  'index.max_rescore_window',
  'index.max_result_window',
  'index.max_slices_per_scroll',
  'index.merge.policy.expunge_deletes_allowed',
  'index.merge.policy.floor_segment',
  'index.merge.policy.max_merge_at_once',
  'index.merge.policy.max_merge_at_once_explicit',
  'index.merge.policy.max_merged_segment',
  'index.merge.policy.reclaim_deletes_weight',
  'index.merge.policy.segments_per_tier',
  'index.merge.scheduler.auto_throttle',
  'index.merge.scheduler.max_merge_count',
  'index.merge.scheduler.max_thread_count',
  'index.optimize_auto_generated_id',
  'index.priority',
  'index.recovery.initial_shards',
  'index.refresh_interval',
  'index.requests.cache.enable',
  'index.routing.allocation.enable',
  'index.routing.allocation.total_shards_per_node',
  'index.routing.rebalance.enable',
  'index.search.slowlog.level',
  'index.search.slowlog.threshold.fetch.debug',
  'index.search.slowlog.threshold.fetch.info',
  'index.search.slowlog.threshold.fetch.trace',
  'index.search.slowlog.threshold.fetch.warn',
  'index.search.slowlog.threshold.query.debug',
  'index.search.slowlog.threshold.query.info',
  'index.search.slowlog.threshold.query.trace',
  'index.search.slowlog.threshold.query.warn',
  'index.shared_filesystem.recover_on_any_node',
  'index.store.throttle.max_bytes_per_sec',
  'index.store.throttle.type',
  'index.translog.durability',
  'index.translog.flush_threshold_size',
  'index.ttl.disable_purge',
  'index.unassigned.node_left.delayed_timeout',
  'index.warmer.enabled',
  'index.write.wait_for_active_shards',
]);

// 不在页面上显示的索引设置（包含这些字符串的都排除）
const INVALID_INDEX_SETTINGS = ['index.creation_date', 'index.provided_name', 'index.uuid', 'index.version.created'];

export const DynamicSettings = {
  valid: (setting: string) => DYNAMIC_SETTINGS.has(setting),
};

export const DynamicIndexSettings = {
  valid: (setting: string) => DYNAMIC_INDEX_SETTINGS.has(setting),
};

export const ValidIndexSettings = {
  valid: (setting: string) => INVALID_INDEX_SETTINGS.every((invalid) => setting.indexOf(invalid) == -1),
};

// angular 文本框 ng-model 的格式化：空值（undefined/null/''/NaN）显示空串，其他 toString()（数组即逗号连接）
export function viewValue(value: unknown): string {
  return value === undefined || value === null || value === '' || value !== value ? '' : String(value);
}

// 设置值输入框的视图值（angular 的 $viewValue）：模型值被程序改动时才按模型重新显示，
// 和 angular 一样不会把用户输入的首尾空格抹掉
export function syncViews(views: Record<string, string>, oldForm: Record<string, unknown> | undefined,
  newForm: Record<string, unknown>) {
  new Set([...Object.keys(views), ...Object.keys(newForm)]).forEach((name) => {
    if (!oldForm || oldForm[name] !== newForm[name]) {
      views[name] = viewValue(newForm[name]);
    }
  });
}
