<template>
  <div class="canvas-box">
    <canvas id="demo1"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DrawCanvas } from "./DrawCanvas2D";
import { getImageUrl } from "@/utils/tool";

type CavansRenderCtx2d = CanvasRenderingContext2D | null;
const drawCanvas = ref<DrawCanvas | null>(null);

const draw = (ctx: CavansRenderCtx2d) => {
  // drawfillRect(ctx);
  // drawPath(ctx);
  // drawStrokeRect(ctx);
  // drawCurves(ctx);
  // drawPieChart(ctx);
  // drawText(ctx);
  // drawImg(ctx);
  animation(ctx);
};

const drawfillRect = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  ctx.fillStyle = "red";
  ctx.fillRect(200, 10, 100, 100);
};

const drawStrokeRect = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  ctx.strokeStyle = "green"; // 边颜色
  ctx.lineWidth = 5; // 边的大小
  ctx.strokeRect(100, 200, 100, 100); // 绘制笔画矩形
};

const drawPath = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  ctx.beginPath(); // 开始点
  for (let y = 10; y < 100; y += 10) {
    ctx.moveTo(10, y);
    ctx.lineTo(90, y);
  }
  ctx.stroke();

  // 绘制线后，实行连线闭合操作
  ctx.beginPath();
  ctx.moveTo(50, 10);
  ctx.lineTo(10, 70);
  ctx.lineTo(90, 70);
  ctx.fill();
};

const drawCurves = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  // ctx.beginPath();
  // ctx.moveTo(10, 90);
  // // control=(60, 10) goal=(90, 90)
  // ctx.quadraticCurveTo(60, 10, 90, 90);
  // ctx.lineTo(60, 10);
  // ctx.closePath();
  // ctx.stroke();

  ctx.beginPath();
  // center=(50, 50) radius=40 angle=0 to 7
  ctx.arc(50, 50, 40, 0, 7);
  // center=(150, 50) radius=40 angle=0 to ½π
  ctx.arc(150, 50, 40, 0, 0.5 * Math.PI);
  ctx.stroke();
};

const drawPieChart = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  const results = [
    { name: "Satisfied", count: 1043, color: "lightblue" },
    { name: "Neutral", count: 563, color: "lightgreen" },
    { name: "Unsatisfied", count: 510, color: "pink" },
    { name: "No comment", count: 175, color: "silver" },
  ];

  let total = results.reduce((sum, { count }) => sum + count, 0);
  // Start at the top
  let currentAngle = -0.5 * Math.PI;
  for (let result of results) {
    let sliceAngle = (result.count / total) * 2 * Math.PI;
    ctx.beginPath();
    // center=100,100, radius=100
    // from current angle, clockwise by slice's angle
    ctx.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    ctx.lineTo(100, 100);
    ctx.fillStyle = result.color;
    ctx.fill();
  }
};

const drawText = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  ctx.font = "28px Georgia";
  ctx.fillStyle = "fuchsia";
  ctx.fillText("I can draw text, too!", 10, 50);
};

const drawImg = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  let img = document.createElement("img");
  img.src = getImageUrl("bg");
  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 10);
  });
};

const animation = (ctx: CavansRenderCtx2d) => {
  if (!ctx) return;
  // 设置颜色
  ctx.fillStyle = "blue";
  // 初始信号量
  let left: number = -10;
  // 动画过程
  setInterval(() => {
    // 清除画布,0,0代表从什么位置开始,600,600代表清除的宽度和高度
    ctx.clearRect(0, 0, 600, 600);
    // 更新信号量
    left++;
    // 如果已经走出画布，则更新信号量为初始位置
    if (left > 600) {
      left = -10;
    }
    ctx.fillRect(left, 0, 5, 5);
  }, 300);
};

onMounted(() => {
  drawCanvas.value = new DrawCanvas("#demo1", draw);
});
</script>

<style lang="scss" scoped>
.canvas-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
canvas {
  background-color: rgb(19, 19, 19);
  width: 100%;
  height: 100%;
}
</style>
