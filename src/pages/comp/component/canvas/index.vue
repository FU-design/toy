<template>
  <div class="canvas">
    <canvas class="grid" id="demo1" width="500" height="400"></canvas>
    <canvas class="grid" id="demo2" width="500" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCanvas from "@/hooks/useCanvas";
import { degTrigger } from "@/utils/tool";
const { ctx } = useCanvas("#demo1");
const { ctx: ctx2 } = useCanvas("#demo2");

/**
 * 绘制矩形
 */
const drawRect = () => {
  ctx.value?.fillRect(25, 25, 100, 100); // 绘制一个填充矩形
  ctx.value?.clearRect(45, 45, 60, 60); // 以矩形的方式清除该区域画布内容
  ctx.value?.strokeRect(50, 50, 50, 50); // 绘制一个线框矩形
};

/**
 * 绘制路径
 */
const drawPath = () => {
  ctx.value?.beginPath();
  ctx.value?.moveTo(125, 125); // 移动笔触
  ctx.value?.lineTo(150, 150);
  ctx.value?.stroke();
};

/**
 * 通过路径绘制三角形
 */
const drawTriangleByPath = () => {
  ctx.value?.beginPath();
  ctx.value?.moveTo(150, 150);
  ctx.value?.lineTo(180, 150);
  ctx.value?.lineTo(150, 180);
  // ctx.value?.stroke(); // 不会自定闭合
  ctx.value?.fill(); // 可自动闭合
};

/**
 * 通过路径绘制笑脸（利用 moveTo() 去除绘制时连续的线）
 */
const drawSmile = () => {
  ctx.value?.beginPath();
  ctx.value?.arc(80, 300, 60, 0, degTrigger("360deg"));

  ctx.value?.moveTo(60, 290);
  ctx.value?.arc(50, 290, 10, 0, degTrigger("360deg")); // 左眼

  ctx.value?.moveTo(120, 290);
  ctx.value?.arc(110, 290, 10, 0, degTrigger("360deg")); // 右眼

  ctx.value?.moveTo(120, 310);
  ctx.value?.arc(80, 310, 40, 0, degTrigger("180deg"), false); // 口

  ctx.value?.stroke();
};

/**
 * 绘制不同的圆弧
 */
const drawArc = () => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.value?.beginPath();
      let x = 340 + j * 50; // x 坐标值
      let y = 25 + i * 50; // y 坐标值
      let radius = 20; // 圆弧半径
      let startAngle = 0; // 开始点
      let endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
      let anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

      ctx.value?.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if (i > 1) {
        ctx.value?.fill();
      } else {
        ctx.value?.stroke();
      }
    }
  }
};

/**
 * 二次贝塞尔曲线绘制气泡对话框
 */
const drawBubbleBox = () => {
  ctx2.value?.beginPath();
  ctx2.value?.moveTo(75, 25);
  ctx2.value?.quadraticCurveTo(25, 25, 25, 62.5);
  ctx2.value?.quadraticCurveTo(25, 100, 50, 100);
  ctx2.value?.quadraticCurveTo(50, 120, 30, 125);
  ctx2.value?.quadraticCurveTo(60, 120, 65, 100);
  ctx2.value?.quadraticCurveTo(125, 100, 125, 62.5);
  ctx2.value?.quadraticCurveTo(125, 25, 75, 25);
  ctx2.value?.stroke();
};

/**
 * 三次贝塞尔曲线绘制心型
 */
const drawHeart = () => {
  //三次贝塞尔曲线
  ctx2.value?.beginPath();
  ctx2.value?.moveTo(75, 40);
  ctx2.value?.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx2.value?.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx2.value?.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx2.value?.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx2.value?.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx2.value?.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx2.value?.fill();
};

onMounted(() => {
  drawRect();
  drawPath();
  drawTriangleByPath();
  drawSmile();
  drawArc();
  drawBubbleBox();
  drawHeart();
});
</script>

<style lang="scss" scoped>
canvas {
  // width: 100%;
  // height: 100%;
  margin-right: 10px;
  background-color: rgba(139, 136, 136, 0.507);
}
.grid {
  background: #ccc;
  background-image: linear-gradient(white 0px, transparent 0),
    linear-gradient(90deg, white 0px, transparent 0),
    linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0),
    linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
  background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}
</style>
