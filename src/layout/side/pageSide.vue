<template>
  <aside>
    <h1 class="web-title">Fdefined</h1>
    <ul class="web-options">
      <li
        :class="[m.name == currentRoute.name ? 'selected' : '']"
        v-for="m in routerMap"
        :key="m.name"
        @click="handleOptions(m)"
      >
        <span class="web-options-text">{{ m.meta.title }}</span>
      </li>
    </ul>
    <div class="fold">
      <svg width="100" height="40">
        <polygon points="0,20 20,14 20,26" fill="#eee" />
        <polygon points="20,20 40,14 40,26" fill="#eee" />
        <polygon points="40,20 60,14 60,26" fill="#eee" />
      </svg>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const router = useRouter();
const { currentRoute } = router;

const routerMap = ref(
  computed(() => router.getRoutes().filter((r) => r.meta.isSubPage))
);

// const activeIndex = ref<string>(`/${currentRoute.value.path.split("/")[1]}`);

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
aside {
  position: relative;
  min-width: 20rem;
  width: 18vw;
  height: 100vh;
  background-color: $side-bg;
  border-right: 0.1rem solid $border-color;

  h1 {
    padding: 1.6rem;
    margin: 0;
    font-size: 2rem;
    border-bottom: 0.1rem solid $border-color;
  }
  .web-options {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 1rem 0 0 1rem;
    .selected {
      background-color: $hover-bg;
      transition: all 0.5s;
      color: #e8e8e8;
      box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0);
    }
    li {
      cursor: pointer;
      border-radius: 0.8rem;
      font-weight: 500;
      padding: 0.4rem;
      margin: 0.4rem;
      color: $li-text-color;
      border: 0.1rem solid $border-color;

      &:hover {
        color: $hover-text;
        background-color: $hover-bg;
        transition: all 0.5s;
        box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0);
      }
    }
    &-text {
      padding: 0 0.8rem;
    }
  }
}

.fold {
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  &:hover {
    background-color: #e5e5e5;
  }
  & > svg:hover {
    transition: all 0.2;
    animation-duration: 2s;
    animation-name: heartbeat;
    animation-iteration-count: infinite;
    & > polygon {
      fill: #eeee;
    }
  }
}

@keyframes heartbeat {
  0% {
    filter: drop-shadow(-1px 0 2px #000);
  }
  25% {
    filter: drop-shadow(-1px 0 3px #000);
  }
  50% {
    filter: drop-shadow(-1px 0 4px #000);
  }
  75% {
    filter: drop-shadow(-1px 0 3px #000);
  }
  100% {
    filter: drop-shadow(-1px 0 2px #000);
  }
}
</style>
