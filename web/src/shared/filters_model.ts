// 对应旧前端 shared/index_filter.js、node_filter.js、alias_filter.js、alias.js、grouped_settings.js。
import type { Filter } from './paginator';

export class IndexFilter implements Filter<any> {
  sort = 'name';

  constructor(
    public name: string,
    public closed: boolean,
    public special: boolean,
    public healthy: boolean,
    public asc: boolean,
    public timestamp: number,
  ) {}

  getSorting() {
    const asc = this.asc;
    switch (this.sort) {
      case 'name':
        return (a: any, b: any) => (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
      default:
        return undefined;
    }
  }

  clone() {
    return new IndexFilter(this.name, this.closed, this.special, this.healthy, this.asc, this.timestamp);
  }

  equals(other: IndexFilter | null) {
    return (
      other !== null &&
      this.name === other.name &&
      this.closed === other.closed &&
      this.special === other.special &&
      this.healthy === other.healthy &&
      this.asc === other.asc &&
      this.timestamp === other.timestamp
    );
  }

  isBlank() {
    return !this.name && this.closed && this.special && this.healthy && this.asc;
  }

  matches(index: any) {
    let matches = true;
    if (!this.special && index.special) {
      matches = false;
    }
    if (!this.closed && index.closed) {
      matches = false;
    }
    // 隐藏健康的 == 只显示不健康的
    if (!this.healthy && !index.unhealthy) {
      matches = false;
    }
    if (matches && this.name) {
      try {
        const regExp = new RegExp(this.name.trim(), 'i');
        matches = regExp.test(index.name);
        if (!matches && index.aliases) {
          for (let idx = 0; idx < index.aliases.length; idx++) {
            if ((matches = regExp.test(index.aliases[idx]))) {
              break;
            }
          }
        }
      } catch {
        // 不是合法正则时按普通字符串匹配
        matches = index.name.indexOf(this.name.toLowerCase()) != -1;
        if (!matches) {
          for (let idx = 0; idx < index.aliases.length; idx++) {
            const alias = index.aliases[idx].toLowerCase();
            if ((matches = alias.indexOf(this.name.toLowerCase()) != -1)) {
              break;
            }
          }
        }
      }
    }
    return matches;
  }
}

export class NodeFilter implements Filter<any> {
  constructor(
    public name: string,
    public data: boolean,
    public master: boolean,
    public ingest: boolean,
    public coordinating: boolean,
    public timestamp?: number,
  ) {}

  clone() {
    return new NodeFilter(this.name, this.data, this.master, this.ingest, this.coordinating);
  }

  getSorting() {
    return undefined;
  }

  equals(other: NodeFilter | null) {
    return (
      other !== null &&
      this.name == other.name &&
      this.data == other.data &&
      this.master == other.master &&
      this.ingest == other.ingest &&
      this.coordinating == other.coordinating &&
      this.timestamp == other.timestamp
    );
  }

  isBlank() {
    return !this.name && this.data && this.master && this.ingest && this.coordinating;
  }

  matches(node: any) {
    if (this.isBlank()) {
      return true;
    }
    return this.matchesName(node.name) && this.matchesType(node);
  }

  matchesType(node: any) {
    return (
      (node.data && this.data) ||
      (node.master && this.master) ||
      (node.ingest && this.ingest) ||
      (node.coordinating && this.coordinating)
    );
  }

  matchesName(name: string) {
    if (this.name) {
      return name.toLowerCase().indexOf(this.name.toLowerCase()) != -1;
    }
    return true;
  }
}

export class AliasFilter implements Filter<any> {
  constructor(public index: string, public alias: string) {}

  clone() {
    return new AliasFilter(this.index, this.alias);
  }

  getSorting() {
    return (a: any, b: any) => {
      if (a.alias === b.alias) {
        return a.index.localeCompare(b.index);
      }
      return a.alias.localeCompare(b.alias);
    };
  }

  equals(other: AliasFilter | null) {
    return other !== null && this.index == other.index && this.alias == other.alias;
  }

  isBlank() {
    return !this.index && !this.alias;
  }

  matches(alias: any) {
    if (this.isBlank()) {
      return true;
    }
    let matches = true;
    if (this.index) {
      matches = alias.index.indexOf(this.index) != -1;
    }
    if (matches && this.alias) {
      matches = alias.alias.indexOf(this.alias) != -1;
    }
    return matches;
  }
}

const cleanInput = (input: string) => (input ? input.trim() : undefined);

export class Alias {
  alias: string;
  index: string;
  filter: any;
  index_routing: string;
  search_routing: string;

  constructor(alias?: string, index?: string, filter?: any, indexRouting?: string, searchRouting?: string) {
    this.alias = alias ? alias.toLowerCase() : '';
    this.index = index ? index.toLowerCase() : '';
    this.filter = filter ? filter : '';
    this.index_routing = indexRouting ? indexRouting : '';
    this.search_routing = searchRouting ? searchRouting : '';
  }

  validate() {
    if (!this.alias) {
      throw 'Alias must have a non empty name';
    }
    if (!this.index) {
      throw 'Alias must have a valid index name';
    }
  }

  toJson() {
    return {
      alias: this.alias,
      index: this.index,
      filter: this.filter,
      index_routing: cleanInput(this.index_routing),
      search_routing: cleanInput(this.search_routing),
    };
  }
}

export class GroupedSettings {
  groups: { name: string; settings: any[] }[];

  constructor(settings: { name: string }[]) {
    const groups: Record<string, { name: string; settings: any[] }> = {};
    settings.forEach((setting) => {
      const group = setting.name.split('.')[1];
      if (!groups[group]) {
        groups[group] = { name: group, settings: [] };
      }
      groups[group].settings.push(setting);
    });
    this.groups = Object.values(groups);
  }
}
