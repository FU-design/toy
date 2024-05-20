<template>
  <div class="warefall-flow">
    <div class="grid">
      <div class="item" v-for="url in items">
        <img :src="url" alt="404" @load="layoutFull" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getImgs } from "./request";
import { layoutGrid, layoutFull } from "./warefallFowUtil";

const items = ref<string[]>([]);

// 模拟获取图片数据
const getImgUrls = async () => {
  const res = await getImgs();
  items.value = res;
};

onMounted(() => {
  getImgUrls();
  window.addEventListener("resize", layoutFull);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", layoutFull);
});
</script>

<style scoped>
.warefall-flow {
  width: 100%;
  height: 100%;
}

.grid {
  position: relative;
  width: 100%;
  height: 100%;
}
.item {
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  /* transition: all 0.3s; */

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
./warefallFowUtil
