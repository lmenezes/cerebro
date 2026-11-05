// 第三阶段页面的公共小工具。

// GET 返回、但 PUT 时不接受的只读字段
const READ_ONLY_FIELDS = ['created_date', 'created_date_millis', 'modified_date', 'modified_date_millis'];

export function withoutReadOnlyFields(value: any): any {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return value;
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    if (!READ_ONLY_FIELDS.includes(k)) {
      out[k] = v;
    }
  }
  return out;
}
