// 对应 src/app/components/templates/index_template_filter.js
import type { Filter } from '../../shared/paginator';

export class IndexTemplateFilter implements Filter<any> {
  constructor(public name: string, public pattern: string) {}

  clone() {
    return new IndexTemplateFilter(this.name, this.pattern);
  }

  getSorting() {
    return (a: any, b: any) => a.name.localeCompare(b.name);
  }

  equals(other: IndexTemplateFilter | null) {
    return other !== null && this.name === other.name && this.pattern === other.pattern;
  }

  isBlank() {
    return !this.name && !this.pattern;
  }

  // 按模式匹配：ES 6 起模板里是 index_patterns（原版只读 ES 5 的 template 字段，在 7.x 起会抛异常）
  matches(template: any) {
    if (this.isBlank()) {
      return true;
    }
    let matches = true;
    if (this.name) {
      matches = template.name.indexOf(this.name) != -1;
    }
    if (matches && this.pattern) {
      matches = templatePatterns(template.template).indexOf(this.pattern) != -1;
    }
    return matches;
  }
}

// 模板匹配的索引模式：ES 6 起是 index_patterns 数组，ES 5 是 template 字符串
export function templatePatterns(template: any): string {
  return (template?.index_patterns || [template?.template]).join(',');
}
