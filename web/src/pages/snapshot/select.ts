// 模拟 angular ngOptions 的 select：选项的 value 是 'string:' + 值，空选项（value=""）和 unknown 选项（"?"）不算

const PREFIX = 'string:';

// 单选：显示哪个选项。值为 undefined/null 时选空选项，其他不在选项里的值选 unknown 选项
export function selectValue(value: unknown, options: unknown[]): string {
  if (value === undefined || value === null) {
    return '';
  }
  return options.indexOf(value) !== -1 ? PREFIX + value : '?';
}

// 单选：选中空选项时模型值为 null
export function readValue(e: Event): string | null {
  const value = (e.target as HTMLSelectElement).value;
  return value.startsWith(PREFIX) ? value.slice(PREFIX.length) : null;
}

// 多选：选中的值，不含空选项
export function selectedValues(e: Event): string[] {
  return Array.from((e.target as HTMLSelectElement).selectedOptions)
    .filter((o) => o.value.startsWith(PREFIX))
    .map((o) => o.value.slice(PREFIX.length));
}

// 多选：选项变化后 angular 会把已经不在选项里的选中值从模型里去掉（按选项顺序），没变时保持原数组
export function keepSelected(selected: string[] | undefined, options: string[]): string[] | undefined {
  if (!selected || selected.length === 0) {
    return selected;
  }
  const next = options.filter((o) => selected.indexOf(o) !== -1);
  return next.length === selected.length && next.every((n, i) => n === selected[i]) ? selected : next;
}
