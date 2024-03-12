<template>
  <div class="page-layout">
    <!-- <header></header> -->
    <aside>
      <h1 class="web-title">{{ "Fdefined" }}</h1>
      <ul class="web-options">
        <li v-for="m in routerMap" :key="m.name" @click="handleOptions(m)">
          <span class="web-options-text">{{ m.meta.title }}</span>
        </li>
      </ul>
    </aside>
    <section class="page-layout-content">
      <slot></slot>
    </section>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const router = useRouter();
const routerMap = ref(
  computed(() => router.getRoutes().filter((r) => r.meta.isSubPage))
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

<style lang="scss" scoped>
.page-layout {
  display: flex;
  aside {
    width: 18vw;
    min-width: 12.5rem;
    height: 100vh;
    border-right: 1px solid $border-color;
    h1 {
      padding: 1rem;
      margin: 0;
      font-size: 1.25rem;
      border-bottom: 1px solid $border-color;
    }
    .web-options {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0.625rem 0 0 0.625rem;
      li {
        border-radius: 0.5rem;
        font-weight: 500;
        padding: 0.25rem;
        margin: 0.25rem;
        color: $li-text-color;
        border: 1px solid $border-color;

        &:hover {
          cursor: pointer;
          color: $hover-text;
          background-color: $hover-bg;
          transition: all 0.5s;
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        }
      }
      &-text {
        padding: 0 0.5rem;
      }
    }
  }
  &-content {
    height: 100vh;
    flex: 1;
    overflow: auto;
    padding: 0 10vw;
    box-sizing: border-box;
    background-color: $content-bg;
  }
}
</style>
