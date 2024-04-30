<template>
  <cardBox>
    <template #header>
      <div>
        <div>canvas</div>
      </div>
    </template>
    <div id="container" class="canvas-container">
      <canvas :width="canvasW" :height="canvasH" id="canvas"></canvas>
    </div>
  </cardBox>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
// import { drawWall, drawPath, drawArrow, drawMoon } from "./canvas";
import { draw } from "./canvas_02";

const canvasW = ref<number>(0);
const canvasH = ref<number>(0);
const container = ref<HTMLElement | null>(null);

const initContainer = () => {
  container.value = document.querySelector("#container");
  canvasW.value = container.value?.clientWidth as number;
  canvasH.value = container.value?.clientHeight as number;
  initCanvas();
};

const initCanvas = () => {
  const canvas = document.querySelector("#canvas") as any;
  if (!canvas.getContext) {
    return;
  }
  // get the context
  let ctx = canvas.getContext("2d");
  // 这里利用原生的话需要实现一个和 nextTick 原理一样的方法
  nextTick(() => {
    // drawWall(ctx, unref(canvasW), unref(canvasH));
    // drawPath(ctx);
    // drawArrow(ctx);
    // drawMoon(ctx);
    draw(ctx);
  });
};

const initEvent = () => {
  window.addEventListener("resize", initContainer);
};

const removeEvent = () => {
  window.removeEventListener("resize", initContainer);
};

onMounted(() => {
  initContainer();
  initEvent();
});

onUnmounted(() => {
  removeEvent();
});
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 40rem;
  box-sizing: border-box;
  overflow: hidden;
  background-image: linear-gradient(
      to right,
      rgba(60, 10, 30, 0.06) 0.1rem,
      transparent 0
    ),
    linear-gradient(to bottom, rgba(60, 10, 30, 0.06) 0.1rem, transparent 0);
  background-size: 1rem 1rem;
}
</style>
