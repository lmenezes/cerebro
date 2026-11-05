// 对应旧前端 ModalService：确认框和信息框共用 #confirm_dialog，由 data-toggle="modal" 打开。
import { reactive } from 'vue';

const state = reactive({
  text: undefined as string | undefined,
  info: undefined as string | undefined,
});
let confirmCallback: (() => void) | undefined;
const needs = reactive({ value: false });

export const ModalService = {
  state,
  promptConfirmation(body: string, callback: () => void) {
    state.text = body;
    state.info = undefined;
    confirmCallback = callback;
    needs.value = true;
  },
  showInfo(info: unknown) {
    state.text = undefined;
    state.info = JSONTree.create(info);
  },
  close() {
    this.clean();
  },
  confirm() {
    if (confirmCallback) {
      confirmCallback();
    }
    this.clean();
  },
  needsConfirmation() {
    return needs.value;
  },
  clean() {
    state.text = undefined;
    state.info = undefined;
    confirmCallback = undefined;
    needs.value = false;
  },
};
