<template>
  <div class="aside-wrp">
    <aside>
      <div class="menu-wrap">
        <ul class="menu-list">
          <li
            :class="{ selected: isActive(m.path) }"
            v-for="m in routerMap"
            :key="m.name"
            @click="routerSkip(m)"
          >
            <span class="menu-list-text">{{ m.meta.title }}</span>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';

const router = useRouter();
const { currentRoute } = router;

const routerMap = computed(() => router.getRoutes().filter((r) => r.meta.menu));

const isActive = (path: string) => {
  return currentRoute.value.path === path;
};

onMounted(() => {
  // router.hasRoute(path); //# 检查路由是否存在
  // router.getRoutes(); //# 获取所有路由
});

/**
 * @description 控制菜单选项的路由跳转
 * @param o
 */
const routerSkip = (o: RouteRecordRaw) => {
  router.push({ name: o.name });
};
</script>

<style lang="scss" scoped>
aside {
  width: 100%;
  height: 100%;
  h1 {
    padding: 16px;
    margin: 0;
    border-bottom: 1px solid $border-color;
  }
  .menu-wrap {
    height: 100%;
    overflow: auto;
  }
  .menu-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    .selected {
      transition: all 0.5s;
      color: $text-color;
      border: 1px solid $border-color;
      box-shadow: 0 0 1px $shadow-light;
    }
    li {
      cursor: pointer;
      border-radius: 8px;
      font-weight: 500;
      padding: 4px;
      margin: 4px;
      color: $text-color;
      border: 1px solid transparent;

      &:hover {
        color: $text-color;
        background-color: $background-color;
        transition: all 0.5s;
        border: 1px solid $border-color;
      }
    }
    &-text {
      padding: 0 8px;
    }
  }
}
</style>
