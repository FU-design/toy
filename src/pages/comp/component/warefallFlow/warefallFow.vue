<template>
  <div class="warefall-flow">
    <div class="grid">
      <div class="item" v-for="url in items">
        <img :src="url" alt="404" @load="handleResize" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getImgs } from "./request";
import { layoutWarefall, loadScroll } from "./warefallFlowUtil";

const items = ref<string[]>([]);
const clear = ref<() => void>();

// 模拟获取图片数据
const getImgUrls = async () => {
  const res = await getImgs();
  items.value = [...items.value, ...res];
};

const handleResize = () => {
  layoutWarefall(".grid");
};

const initEvent = () => {
  getImgUrls();
  clear.value = loadScroll(".warefall-flow", () => {
    console.log("nihao :>> ");
    getImgUrls();
  });
  window.addEventListener("resize", handleResize);
};

const clearEvent = () => {
  clear.value && clear.value();
  window.removeEventListener("resize", handleResize);
};

onMounted(() => {
  initEvent();
});

onBeforeUnmount(() => {
  clearEvent();
});
</script>

<style scoped>
.warefall-flow {
  height: 100%;
  overflow: auto;
}

.item {
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.3s;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
