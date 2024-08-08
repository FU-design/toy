<template>
  <div class="canvas-box">
    <canvas id="demo1"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { DrawCanvas } from "./DrawCanvas2D";

const drawCanvas = ref<DrawCanvas | null>(null);

const drawRect = (ctx: CanvasRenderingContext2D | null) => {
  if (!ctx) return;
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 100, 100);
};

onMounted(() => {
  drawCanvas.value = new DrawCanvas("#demo1", drawRect);
});

onUnmounted(() => {
  drawCanvas.value?.destroyedCanvas();
});
</script>

<style lang="scss" scoped>
.canvas-box {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  margin-top: 16px;
  border: 1px solid #eee;
  background-color: #fff;
}
</style>
