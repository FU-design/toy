<template>
  <div class="aside-wrp" :class="{ folded: fold }">
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
    </aside>
    <div class="fold-btn">
      <svg width="100%" height="100%" @click="handleFold">
        <circle v-for="idx in 5" cx="14" :cy="idx * 10" r="2" fill="#d9d9d9" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAsideStore } from "@/store/aside";
import { storeToRefs } from "pinia";
import type { RouteRecordRaw } from "vue-router";

const router = useRouter();
const side = useAsideStore();
const { currentRoute } = router;
const { fold } = storeToRefs(side);

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

const handleFold = () => {
  side.setSideFoldState(!fold.value);
};
</script>

<style lang="scss" scoped>
.aside-wrp {
  position: relative;
  display: flex;
}
aside {
  min-width: 20rem;
  width: 18vw;
  height: 100vh;
  background-color: $side-bg;
  transition: 0.3s ease;

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
.folded {
  width: 10px;
  & > aside {
    opacity: 0;
    transform: translateX(-20vh);
  }
}
.fold-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  // height: 100%;
  & > svg:hover {
    transition: all 0.2;

    & > circle {
      fill: #666;
    }
  }
}
</style>
