<template>
  <div class="page-layout">
    <div class="page-layout-header">
      <h1 class="web-title">{{ "Fdefined" }}</h1>
      <ul class="web-options flex-c">
        <li v-for="m in routerMap" :key="m.name" @click="handleOptions(m)">
          <span class="web-options-text">{{ m.meta.title }}</span>
        </li>
      </ul>
    </div>
    <div class="page-layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const router = useRouter();
const routerMap = ref(
  computed(() => router.getRoutes().filter((r) => !r.redirect))
);
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

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
}
.page-layout-header {
  width: 100%;
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  background-color: black;
}
.page-layout-content {
  height: calc(100vh - 60px);
  overflow: auto;
}
.web-title {
  font-size: 2rem;
  font-weight: 600;
}
.web-title,
.web-options-text {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  padding: 10px;
}
.web-options {
  list-style: none;
}
.web-options li {
  font-weight: 600;
}
</style>
