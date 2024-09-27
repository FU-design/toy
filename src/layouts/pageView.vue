<template>
  <div class="page-view" id="page-view">
    <page-layout>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </page-layout>
    <drag-sidebar />
  </div>
</template>

<script setup lang="ts">
import PageLayout from "./pageLayout.vue";
import dragSidebar from "./dragsidebar/drag-sidebar.vue";
</script>

<style scoped>
.page-view {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
