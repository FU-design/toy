<template>
  <div class="canvas-box">
    <canvas></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DrawCanvas } from "./demo1";

const drawCanvas = ref<DrawCanvas | null>(null);

onMounted(() => {
  // 确保选择器正确匹配
  drawCanvas.value = new DrawCanvas("canvas");
  if (!drawCanvas.value) {
    return;
  }
  const ctx = drawCanvas.value?.canvas?.getContext("2d");
  ctx!.fillStyle = "red";
  ctx?.fillRect(10, 10, 100, 100);
});
</script>

<style lang="scss" scoped>
.canvas-box {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  margin-top: 16px;
  border: 1px solid #000;
}
</style>
