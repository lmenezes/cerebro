// 旧前端里各个 angular filter 的等价实现，输出格式保持一致。

const BYTE_UNITS = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];

export function bytes(value: number): string {
  if (value > 0) {
    const e = Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, e)).toFixed(2) + BYTE_UNITS[e];
  }
  return 0 + BYTE_UNITS[0];
}

const TIME_UNITS = ['yr', 'mo', 'd', 'h', 'min', 'sec'] as const;
const TIME_MEASURE: Record<string, number> = {
  yr: 31536000000, mo: 2678400000, wk: 604800000, d: 86400000, h: 3600000, min: 60000, sec: 1000,
};

export function timeInterval(millis: number): string {
  for (const unit of TIME_UNITS) {
    const amount = Math.floor(millis / TIME_MEASURE[unit]);
    if (amount) {
      return amount + unit;
    }
  }
  return '0sec';
}

export function startsWith(elements: unknown[] | undefined, prefix: string): unknown[] {
  return (elements || []).filter((e) => (e + '').indexOf(prefix) === 0);
}

// angular 的 number 过滤器：千分位、四舍五入到 fractionSize 位；非数字输出空串
export function number(value: unknown, fractionSize = 0): string {
  const n = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
  if (typeof n !== 'number' || !isFinite(n)) {
    return '';
  }
  const factor = Math.pow(10, fractionSize);
  const rounded = Math.round(Math.abs(n) * factor) / factor;
  const text = rounded.toLocaleString('en-US', {
    minimumFractionDigits: fractionSize,
    maximumFractionDigits: fractionSize,
  });
  return (n < 0 && rounded !== 0 ? '-' : '') + text;
}

// angular 插值对 undefined/null 输出空串，对象输出 JSON
export function show(value: unknown): string {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

// angular 1.8 的 orderBy：key 是属性路径（'cpu.load' 取嵌套属性，取不到为 undefined），为空时按元素本身排；
// 字符串不分大小写按码点比较；不同类型按类型名排，undefined、null 在最后；
// 相等时按原顺序，倒序时连同相等元素一起倒过来（angular 把 tieBreaker 也乘了 descending）。
export function orderBy<T>(items: T[] | undefined, key?: string | ((item: T) => unknown), reverse = false): T[] {
  const path = typeof key === 'string' && key ? key.split('.') : [];
  const get =
    typeof key === 'function'
      ? key
      : (item: any) => path.reduce((v: any, k) => (v === undefined || v === null ? undefined : v[k]), item);
  const typeOf = (v: unknown) => (v === null ? 'null' : typeof v);
  const indexed = (items || []).map((item, index) => ({ item, index, value: get(item) }));
  indexed.sort((a, b) => {
    let result = 0;
    const ta = typeOf(a.value);
    const tb = typeOf(b.value);
    if (ta === tb) {
      let x: any = a.value;
      let y: any = b.value;
      if (ta === 'string') {
        x = x.toLowerCase();
        y = y.toLowerCase();
      }
      if (x !== y) {
        result = x < y ? -1 : 1;
      }
    } else {
      result = ta === 'undefined' ? 1 : tb === 'undefined' ? -1 : ta === 'null' ? 1 : tb === 'null' ? -1 : ta < tb ? -1 : 1;
    }
    const r = result || a.index - b.index;
    return reverse ? -r : r;
  });
  return indexed.map((e) => e.item);
}
