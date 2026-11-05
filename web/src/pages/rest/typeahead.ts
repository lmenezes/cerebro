// 对应 angular-ui-bootstrap 1.3.2 的 uib-typeahead（UibTypeaheadController、uibTypeaheadPopup、uibTypeaheadHighlight），
// 只实现 public/rest/index.html 用到的部分：typeahead-wait-ms、自定义弹出模板、键盘/鼠标选择、点别处关闭。
import { onBeforeUnmount, onMounted, reactive, type Ref } from 'vue';

const HOT_KEYS = [9, 13, 27, 38, 40];
let seq = 0;

export interface Match {
  id: string;
  label: string;
  model: string;
}

const escapeHTML = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

// uibTypeaheadHighlight：把匹配到的查询串（不分大小写、全部）包上 <strong>。
// 结果用于 v-html，索引名来自 ES（可能是恶意集群），所以每一段都先转义（原版没有转义，存在 XSS）。
export function highlight(matchItem: string, query?: string): string {
  const text = '' + matchItem;
  if (!query) {
    return escapeHTML(text);
  }
  const escapeRegexp = (q: string) => q.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  return text
    .split(new RegExp('(' + escapeRegexp(query) + ')', 'gi'))
    .map((part, i) => (i % 2 ? '<strong>' + escapeHTML(part) + '</strong>' : escapeHTML(part)))
    .join('');
}

// $uibPosition.offset / position：相对最近的定位祖先
function offset(elem: HTMLElement) {
  const r = elem.getBoundingClientRect();
  return {
    top: Math.round(r.top + (window.pageYOffset || document.documentElement.scrollTop)),
    left: Math.round(r.left + (window.pageXOffset || document.documentElement.scrollLeft)),
  };
}

function offsetParent(elem: HTMLElement): HTMLElement {
  const isStatic = (el: Element) => (getComputedStyle(el).position || 'static') === 'static';
  let parent = (elem.offsetParent as HTMLElement | null) || document.documentElement;
  while (parent && parent !== document.documentElement && isStatic(parent)) {
    parent = parent.offsetParent as HTMLElement;
  }
  return parent || document.documentElement;
}

function position(elem: HTMLElement) {
  const elemOffset = offset(elem);
  const parent = offsetParent(elem);
  let parentOffset = { top: 0, left: 0 };
  if (parent !== document.documentElement) {
    parentOffset = offset(parent);
    parentOffset.top += parent.clientTop - parent.scrollTop;
    parentOffset.left += parent.clientLeft - parent.scrollLeft;
  }
  return { top: Math.round(elemOffset.top - parentOffset.top), left: Math.round(elemOffset.left - parentOffset.left) };
}

export function useTypeahead(opts: {
  input: Ref<HTMLInputElement | undefined>;
  popup: Ref<HTMLElement | undefined>;
  waitMs: number;
  // 对应 uib-typeahead 表达式里 in 后面的部分，$viewValue 为当前输入
  source: (viewValue: string) => string[];
  // 当前的 $viewValue
  viewValue: () => string;
  // 选中后写回 ng-model
  select: (model: string) => void;
}) {
  const popupId = 'typeahead-' + ++seq + '-' + Math.floor(Math.random() * 10000);
  const state = reactive({
    matches: [] as Match[],
    activeIdx: -1,
    query: undefined as string | undefined,
    position: undefined as { top: number; left: number } | undefined,
  });
  let hasFocus = false;
  let timeoutPromise: ReturnType<typeof setTimeout> | undefined;

  const resetMatches = () => {
    state.matches = [];
    state.activeIdx = -1;
  };

  const getMatchId = (index: number) => popupId + '-option-' + index;

  const recalculatePosition = () => {
    const el = opts.input.value!;
    const pos = position(el);
    pos.top += el.offsetHeight;
    state.position = pos;
  };

  const getMatchesAsync = (inputValue: string) => {
    const matches = opts.source(inputValue);
    // 用户打字快时只处理与当前输入一致的那次
    if (inputValue === opts.viewValue() && hasFocus) {
      if (matches && matches.length > 0) {
        state.activeIdx = 0;
        state.matches = matches.map((m, i) => ({ id: getMatchId(i), label: m, model: m }));
        state.query = inputValue;
        recalculatePosition();
      } else {
        resetMatches();
      }
    }
  };

  const cancelPreviousTimeout = () => {
    if (timeoutPromise) {
      clearTimeout(timeoutPromise);
    }
  };

  // 输入框内容由用户修改时调用（相当于 ngModel 的 $parsers），minLength 为 1
  const parse = (inputValue: string) => {
    hasFocus = true;
    cancelPreviousTimeout();
    if (inputValue && inputValue.length >= 1) {
      timeoutPromise = setTimeout(() => getMatchesAsync(inputValue), opts.waitMs);
    } else {
      resetMatches();
    }
  };

  const select = (activeIdx: number) => {
    opts.select(state.matches[activeIdx].model);
    resetMatches();
    // 鼠标点选后把焦点还给输入框
    setTimeout(() => opts.input.value?.focus(), 0);
  };

  // 上下键选择，回车/Tab 选中，ESC 关闭
  const onKeydown = (evt: KeyboardEvent) => {
    if (state.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
      return;
    }
    if ((state.activeIdx === -1 && (evt.which === 9 || evt.which === 13)) || (evt.which === 9 && !!evt.shiftKey)) {
      resetMatches();
      return;
    }
    evt.preventDefault();
    let target: HTMLElement | undefined;
    switch (evt.which) {
      case 9:
      case 13:
        select(state.activeIdx);
        break;
      case 27:
        evt.stopPropagation();
        resetMatches();
        break;
      case 38:
        state.activeIdx = (state.activeIdx > 0 ? state.activeIdx : state.matches.length) - 1;
        target = opts.popup.value?.querySelectorAll('li')[state.activeIdx];
        if (target) {
          (target.parentNode as HTMLElement).scrollTop = target.offsetTop;
        }
        break;
      case 40:
        state.activeIdx = (state.activeIdx + 1) % state.matches.length;
        target = opts.popup.value?.querySelectorAll('li')[state.activeIdx];
        if (target) {
          (target.parentNode as HTMLElement).scrollTop = target.offsetTop;
        }
        break;
    }
  };

  const onFocus = () => {
    hasFocus = true;
  };

  const onBlur = () => {
    hasFocus = false;
  };

  // 点击输入框以外的地方关闭弹出层（右键除外）
  const dismissClickHandler = (evt: MouseEvent) => {
    if (opts.input.value !== evt.target && evt.which !== 3 && state.matches.length !== 0) {
      resetMatches();
    }
  };
  onMounted(() => document.addEventListener('click', dismissClickHandler));
  onBeforeUnmount(() => {
    document.removeEventListener('click', dismissClickHandler);
    cancelPreviousTimeout();
  });

  return {
    popupId,
    state,
    parse,
    onKeydown,
    onFocus,
    onBlur,
    isActive: (matchIdx: number) => state.activeIdx === matchIdx,
    selectActive: (matchIdx: number) => {
      state.activeIdx = matchIdx;
    },
    selectMatch: (activeIdx: number) => select(activeIdx),
    activeDescendant: () => (state.activeIdx < 0 ? undefined : getMatchId(state.activeIdx)),
  };
}
