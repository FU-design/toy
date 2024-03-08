<template>
  <div class="page-layout">
    <header class="web-menu">
      <div class="web-title">{{ "Fdefined" }}</div>
      <section class="web-ops">
        <div
          class="web-sub-ops"
          v-for="m in QS"
          :key="m.category"
          @click="handleOptions(m)"
        >
          <div class="web-ops-text">
            <span>{{ m.category }}</span>
            <GgChevronDoubleDown />
          </div>
          <ul
            :class="[
              folds.includes(m.category) ? 'fold-active' : 'fold-deactive',
            ]"
            v-show="m.qestionList.length > 0"
            @click.stop
          >
            <li v-for="q in m.qestionList" :key="q.QS">
              <span>{{ q.QS }}</span>
            </li>
          </ul>
        </div>
      </section>
      <div class="web-menu-footer">
        <SiBlocksScale />
      </div>
    </header>
    <div class="web-ctx">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from "vue";
import { GgChevronDoubleDown } from "@twist-space/vue3-icons/gg";
import { SiBlocksScale } from "@twist-space/vue3-icons/si";
// import { useRouter } from "vue-router";
// import type { RouteRecordRaw } from "vue-router";
import { QS } from "@/menuconfig/questions";
// const router = useRouter();
// const routerMap = ref(
//   computed(() => router.getRoutes().filter((r) => !r.redirect))
// );

onMounted(() => {
  // router.hasRoute(path); //# 检查路由是否存在
  // router.getRoutes(); //# 获取所有路由
});

const folds = ref<string[]>([]);

const handleOptions = (m: any) => {
  if (!folds.value.includes(m.category)) {
    folds.value.push(m.category);
  } else {
    folds.value = unref(folds).filter((v) => v != m.category);
  }
};
</script>

<style scoped lang="scss">
.page-layout {
  display: flex;
  background-color: #fff;
  overflow: hidden;
  .web-ctx {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.web-menu {
  height: 100vh;
  width: 38vh;
  position: relative;
  .web-title {
    @include flex(center, center);
    height: 5vh;
    box-sizing: border-box;
    font-size: 1.2rem;
    font-weight: 600;
  }
  &-footer {
    @include flex(center, center);
    width: 100%;
    cursor: pointer;
    height: 4vh;
    padding: 0.625rem 0;
    box-sizing: border-box;
    &:hover {
      border-top: 1px solid $border-color;
      background-color: $hover-bg;
    }
  }
}

.web-ops {
  @include flex;
  height: calc(100% - 9vh);
  list-style: none;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  border-right: 1px solid $border-color;
  .web-sub-ops {
    font-weight: 600;
    color: #666;

    ul {
      list-style: none;
      position: relative;
      margin: 0 1rem;
      padding: 0;
      li {
        position: relative;
        cursor: pointer;
        padding: 0.625rem;
        border-radius: 0.5rem;
        color: #999;
        &:hover {
          background-color: $hover-bg;
          transition: transform 400ms cubic-bezier(0.25, 0.37, 0.17, 0.96);
          color: #000;
        }
      }
    }
  }
  &-text {
    @include flex(space-between);
    cursor: pointer;
    padding: 0.625rem;
    font-size: 1.2rem;
  }
}

.fold-active {
  height: auto;
}
.fold-deactive {
  height: 0;
  overflow: hidden;
}
</style>
@/menuconfig/questions
