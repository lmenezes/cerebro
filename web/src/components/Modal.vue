<!-- 对应 public/modal.html，由 data-toggle="modal" data-target="#confirm_dialog" 打开 -->
<script setup lang="ts">
import { ModalService } from '../services/modal';
const service = ModalService;
</script>

<template><div><div class="modal custom-modal" id="confirm_dialog" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <i class="fa fa-times-circle-o normal-action" data-dismiss="modal" @click="service.close()">
        </i>
        <span class="modal-title"></span>
      </div>
      <div class="modal-body" v-show="service.state.text">{{service.state.text}}</div>
      <div class="modal-body" v-html="service.state.info"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" @click="service.close()">
          Close
        </button>
        <button type="button" class="btn btn-warning" data-dismiss="modal" @click="service.confirm()" v-show="service.needsConfirmation()">
          Confirm
        </button>
      </div>
    </div>
  </div>
</div>
</div></template>
