// 第三阶段的分片视图增强：分片大小、文档数、恢复（迁移）进度，随刷新一起更新。
// 只用于分片的 title 提示和统计弹窗，不改变默认界面。
import { reactive, watch } from 'vue';
import { DataService } from './data';
import { RefreshService } from './refresh';
import { bytes } from '../shared/filters';

interface CatShard {
  index: string;
  shard: string;
  prirep: string;
  state: string;
  node: string | null;
  store: string | null;
  docs: string | null;
  'unassigned.reason': string | null;
}

interface CatRecovery {
  index: string;
  shard: string;
  type: string;
  stage: string;
  source_node: string;
  target_node: string;
  bytes_percent: string;
}

const state = reactive({
  shards: new Map<string, CatShard>(),
  recoveries: new Map<string, CatRecovery>(),
});

const key = (index: string, shard: string | number, primary: boolean, node?: string | null) =>
  `${index}/${shard}/${primary ? 'p' : 'r'}/${node ?? ''}`;

// 只查当前页显示的索引，避免大集群每次刷新都拉全量分片信息
function load(indices: string[]) {
  if (!DataService.getHost() || indices.length === 0) {
    return;
  }
  const host = DataService.getHost();
  const data = { indices: indices.join(',') };
  DataService.send(
    'overview/shards',
    data,
    (rows: CatShard[]) => {
      if (host !== DataService.getHost()) {
        return;
      }
      const m = new Map<string, CatShard>();
      rows.forEach((r) => m.set(key(r.index, r.shard, r.prirep === 'p', r.node), r));
      state.shards = m;
    },
    () => {},
  );
  DataService.send(
    'overview/recovery',
    data,
    (rows: CatRecovery[]) => {
      if (host !== DataService.getHost()) {
        return;
      }
      const m = new Map<string, CatRecovery>();
      rows.forEach((r) => m.set(`${r.index}/${r.shard}/${r.target_node}`, r));
      state.recoveries = m;
    },
    () => {},
  );
}

// 切换集群时清掉旧集群的数据
watch(
  () => DataService.state.host,
  () => {
    state.shards = new Map();
    state.recoveries = new Map();
  },
);

export const ShardInfo = {
  // 在 overview 页面的 setup 里调用：随刷新和翻页拉取当前页索引的分片信息，离开页面时 watch 自动停止
  track(indices: () => string[]) {
    watch(
      () => [RefreshService.lastUpdate(), indices().join(',')] as const,
      () => load(indices()),
      { immediate: true },
    );
  },
  // 分片的提示文字：主/副、大小、文档数、未分配原因、恢复进度
  title(shard: { index: string; shard: number; primary: boolean; node?: string | null; state: string }, nodeName?: string) {
    const parts = [`shard ${shard.shard} (${shard.primary ? 'primary' : 'replica'}) ${shard.state.toLowerCase()}`];
    const info = state.shards.get(key(shard.index, shard.shard, shard.primary, nodeName ?? null));
    if (info?.store) {
      parts.push(`size: ${bytes(Number(info.store))}`);
    }
    if (info?.docs) {
      parts.push(`docs: ${info.docs}`);
    }
    if (info?.['unassigned.reason']) {
      parts.push(`unassigned reason: ${info['unassigned.reason']}`);
    }
    const recovery = nodeName ? state.recoveries.get(`${shard.index}/${shard.shard}/${nodeName}`) : undefined;
    if (recovery) {
      parts.push(`${recovery.type.toLowerCase()} recovery from ${recovery.source_node}: ${recovery.stage.toLowerCase()} ${recovery.bytes_percent}`);
    }
    return parts.join('\n');
  },
  // 未分配分片的统计弹窗改为显示 allocation explain
  explain(index: string, shard: number, primary: boolean, success: (data: unknown) => void, error: (e: unknown) => void) {
    DataService.send('overview/allocation_explain', { index, shard, primary }, success, error);
  },
};
