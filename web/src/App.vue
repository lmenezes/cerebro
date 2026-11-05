<!-- 对应旧版 Index.scala.html 的 body 结构 -->
<script setup lang="ts">
import Alerts from './components/Alerts.vue';
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
</script>

<template>
        <Alerts />
        <Navbar />
        <div class="container-fluid main">
            <div class="row">
                <div class="col-sm-12">
                    <div class="content"><router-view :key="$route.fullPath" /></div>
                </div>
            </div>
        </div>
        <Modal />
</template>
