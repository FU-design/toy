<template>
  <div class="page-view">
    <PageLayout>
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade">
          <component :is="Component" />
        </Transition>
      </router-view>
    </PageLayout>

    <!-- 添加内置组件过度 -->
    <!-- <Transition name="slide-fade">
      <router-view />
    </Transition> -->
  </div>
</template>

<script setup lang="ts">
import PageLayout from "./pageLayout.vue";
</script>

<style scoped>
.page-view {
  width: 100%;
  height: 100%;
  /* background-color: aliceblue; */
  background-color: #f2f3f5;
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
