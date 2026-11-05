// 旧前端沿用的全局库（public/js/vendor.js 里加载）
declare const JSONTree: { create(data: unknown): string };
declare const ace: any;
interface Window {
  jQuery: any;
  $: any;
}
declare const $: any;
