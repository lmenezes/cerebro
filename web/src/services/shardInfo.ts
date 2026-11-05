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

function load() {
  if (!DataService.getHost()) {
    return;
  }
  DataService.send(
    'overview/shards',
    {},
    (rows: CatShard[]) => {
      const m = new Map<string, CatShard>();
      rows.forEach((r) => m.set(key(r.index, r.shard, r.prirep === 'p', r.node), r));
      state.shards = m;
    },
    () => {},
  );
  DataService.send(
    'overview/recovery',
    {},
    (rows: CatRecovery[]) => {
      const m = new Map<string, CatRecovery>();
      rows.forEach((r) => m.set(`${r.index}/${r.shard}/${r.target_node}`, r));
      state.recoveries = m;
    },
    () => {},
  );
}

let started = false;

export const ShardInfo = {
  // 由 overview 页面调用，开始随刷新拉取
  start() {
    if (!started) {
      started = true;
      watch(() => RefreshService.lastUpdate(), load, { immediate: true });
    }
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
