<template>
  <div class="page-layout">
    <!-- <pageHeader /> -->
    <pageAside />
    <section class="page-layout-content">
      <slot></slot>
    </section>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import PageHeader from "./header/pageHeader.vue";
import PageAside from "./aside/pageAside.vue";
onMounted(() => {
  // router.hasRoute(path); //# 检查路由是否存在
  // router.getRoutes(); //# 获取所有路由
});
</script>

<style lang="scss" scoped>
.page-layout {
  height: 100%;
  display: flex;
  &-content {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: $page-bg;
    position: relative;
  }
}
</style>
