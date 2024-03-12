<template>
  <div class="page-layout">
    <header class="page-layout-header">
      <h1 class="web-title">{{ "Fdefined" }}</h1>
      <ul class="web-options">
        <li v-for="m in routerMap" :key="m.name" @click="handleOptions(m)">
          <span class="web-options-text">{{ m.meta.title }}</span>
        </li>
      </ul>
    </header>
    <section class="page-layout-content">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const router = useRouter();
const routerMap = ref(
  computed(() => router.getRoutes().filter((r) => r.meta.isPage))
);

console.log("routerMap :>> ", routerMap);
onMounted(() => {
  // router.hasRoute(path); //# 检查路由是否存在
  // router.getRoutes(); //# 获取所有路由
});

/**
 * @description 控制菜单选项的路由跳转
 * @param o
 */
const handleOptions = (o: RouteRecordRaw) => {
  router.push({ name: o.name });
};
</script>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  &-header {
    width: 100%;
    height: 2.25rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #666;
  }
  &-content {
    height: calc(100vh - 3.75rem);
    overflow: auto;
  }
}

.web-title {
  padding: 0 0.5rem;
  font-size: 1.25rem;
}

.web-options {
  list-style: none;
  display: flex;
  li {
    border-radius: 0.5rem;
    font-weight: 500;
    padding: 0.25rem;
    &:hover {
      cursor: pointer;
      background-color: #000;
      transition: all 0.5s;
      color: #eee;
    }
  }
  &-text {
    padding: 0 0.5rem;
  }
}
</style>
