<template>
  <div class="aside-wrp" :class="{ folded: fold }">
    <aside>
      <h1 class="web-title">Fdefined</h1>
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
    <div class="fold-btn">
      <svg width="100%" height="100%" @click="handleFold">
        <circle v-for="idx in 5" cx="14" :cy="idx * 10" r="2" fill="#d9d9d9" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { RouteRecordRaw } from "vue-router";

const router = useRouter();
const side = sideBar();
const { currentRoute } = router;
const { fold } = storeToRefs(side);

const routerMap = computed(() => router.getRoutes().filter((r) => r.meta.menu));

const isActive = (path: string) => {
  return currentRoute.value.path.startsWith(path);
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

const handleFold = () => {
  side.setSideState(!fold.value);
};
</script>

<style lang="scss" scoped>
.aside-wrp {
  width: 18vw;
  height: 100%;
  display: flex;
  background-color: $side-bg;
  transition: 0.5s ease;
  position: relative;
}

// /* 针对手机竖屏的样式 */
// @media (max-width: 320px) {
//   .aside-wrp {
//     width: 10px;
//   }
// }

// /* 针对小屏幕（手机）的样式 */
// @media (max-width: 480px) {
//   .aside-wrp {
//     width: 100px;
//   }
// }

/* 针对中小屏幕（大屏手机和小平板）的样式 */
// @media (max-width: 600px) {
//   .aside-wrp {
//     width: 10px;
//   }
// }

/* 针对中等屏幕（平板竖屏）的样式 */
@media (max-width: 768px) {
  .aside-wrp {
    width: 10px;
  }
}

// /* 针对大屏幕（平板横屏、小型桌面显示器）的样式 */
// @media (min-width: 992px) {
//   .aside-wrp {
//   }
// }

// /* 针对特大屏幕（桌面显示器）的样式 */
// @media (min-width: 1200px) {
//   .aside-wrp {
//   }
// }

// /* 针对超大屏幕（大型桌面显示器）的样式 */
// @media (max-width: 1600px) {
//   .aside-wrp {
//   }
// }

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
    padding: 16px 0;
    margin-right: 10px;
    overflow: auto;
  }
  .menu-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 10px 0 0 10px;
    .selected {
      background-color: $hover-bg;
      transition: all 0.5s;
      color: #e8e8e8;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }
    li {
      cursor: pointer;
      border-radius: 8px;
      font-weight: 500;
      padding: 4px;
      margin: 4px;
      color: $li-text-color;
      border: 1px solid $border-color;

      &:hover {
        color: $hover-text;
        background-color: $hover-bg;
        transition: all 0.5s;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      }
    }
    &-text {
      padding: 0 8px;
    }
  }
}

.folded {
  width: 10px;
  & > .aside-wrp {
    transform: translateX(-100vh);
  }
}

.fold-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 60px;
  & > svg:hover {
    transition: all 0.2;

    & > circle {
      fill: #666;
    }
  }
}
</style>
