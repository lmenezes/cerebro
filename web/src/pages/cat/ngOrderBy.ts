// angular orderBy 的完整语义（nodes、cat、analysis 页面共用）：
// 1. 谓词是 angular 表达式：'cpu.load' 取嵌套属性，'docs.count' 这类 cat 列名同样按嵌套取（取不到就是 undefined，与旧版一致）；
//    谓词为 undefined/'' 时按元素本身排序。
// 2. 倒序时相等元素也倒过来（angular 把 tieBreaker 也乘了 descending）；共享的 orderBy 倒序时相等元素保持原顺序，这里先把输入倒过来补上。
import { orderBy } from '../../shared/filters';

function getter(expr: string | undefined): (item: any) => any {
  if (!expr) {
    return (item) => item;
  }
  const path = expr.split('.');
  return (item) => path.reduce((v: any, k) => (v === undefined || v === null ? undefined : v[k]), item);
}

export function ngOrderBy<T>(items: T[] | undefined, expr: string | undefined, reverse = false): T[] {
  if (!items) {
    return [];
  }
  const get = getter(expr);
  const wrapped = items.map((item) => ({ item, v: get(item) }));
  if (reverse) {
    wrapped.reverse();
  }
  return orderBy(wrapped, 'v', reverse).map((w) => w.item);
}
