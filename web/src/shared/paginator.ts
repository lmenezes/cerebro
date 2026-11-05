// 对应旧前端 shared/page.js 和 shared/paginator.js。

export interface Filter<T> {
  getSorting(): ((a: T, b: T) => number) | undefined;
  isBlank(): boolean;
  matches(item: T): boolean;
}

export class Page<T> {
  constructor(
    public elements: (T | null)[],
    public total: number,
    public first: number,
    public last: number,
    public next: boolean,
    public previous: boolean,
  ) {}
}

export class Paginator<T> {
  $collection: T[];

  constructor(public page: number, public pageSize: number, collection: T[] | undefined, public filter: Filter<T>) {
    this.$collection = collection ? collection : [];
  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  setPageSize(newSize: number) {
    this.pageSize = newSize;
  }

  getPageSize() {
    return this.pageSize;
  }

  getCurrentPage() {
    return this.page;
  }

  getPage(): Page<T> {
    const results = this.getResults();
    const total = results.length;

    let first = total > 0 ? (this.page - 1) * this.pageSize + 1 : 0;
    while (total < first) {
      this.previousPage();
      first = (this.page - 1) * this.pageSize + 1;
    }
    const lastPage = this.page * this.pageSize > total;
    const last = lastPage ? total : this.page * this.pageSize;

    const elements: (T | null)[] = total > 0 ? results.slice(first - 1, last) : [];

    const next = this.pageSize * this.page < total;
    const previous = this.page > 1;
    while (elements.length < this.pageSize) {
      elements.push(null);
    }
    return new Page(elements, total, first, last, next, previous);
  }

  setCollection(collection: T[]) {
    const sorting = this.filter.getSorting();
    this.$collection = sorting ? collection.sort(sorting) : collection;
  }

  getResults(): T[] {
    const filter = this.filter;
    if (filter.isBlank()) {
      return this.$collection;
    }
    return this.$collection.filter((item) => filter.matches(item));
  }

  getCollection() {
    return this.$collection;
  }
}
