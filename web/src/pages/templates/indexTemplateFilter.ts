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

  // 旧版按 template.template.template 匹配模式；ES 6 起模板里是 index_patterns，这里会抛异常，与旧前端一致
  matches(template: any) {
    if (this.isBlank()) {
      return true;
    }
    let matches = true;
    if (this.name) {
      matches = template.name.indexOf(this.name) != -1;
    }
    if (matches && this.pattern) {
      matches = template.template.template.indexOf(this.pattern) != -1;
    }
    return matches;
  }
}
