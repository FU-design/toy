<template>
  <div class="page-layout">
    <header class="web-header">
      <h6 class="web-title">{{ "Fdefined" }}</h6>
      <ul class="web-options flex-c">
        <li v-for="m in routerMap" :key="m.name" @click="handleOptions(m)">
          <span class="web-options-text">{{ m.meta.title }}</span>
        </li>
      </ul>
    </header>
    <div class="web-ctx">
      <div class="web-ctx-pic">
        <img src="../assets/images/fly.jpg" />
      </div>
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

<style scoped lang="scss">
.page-layout {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  .web-header {
    position: sticky;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 60px;
    padding-left: 10px;
    color: #f5f5f5;
    @include flex(null, center);
    @include glass(30px);

    transition: transform 400ms cubic-bezier(0.25, 0.37, 0.17, 0.96);
  }
  .web-ctx {
    &-pic {
      margin-top: -30vh;
      border-radius: 8px;
      overflow: hidden;
      @include flex(center, center);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .web-title {
    font-size: 2rem;
    font-weight: 600;
  }
}
.web-options {
  list-style: none;
  li {
    font-weight: 600;
  }
  &-text {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    padding: 10px;
  }
}
</style>
