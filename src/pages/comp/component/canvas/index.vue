<template>
  <div class="canvas">
    <cardBox>
      <canvas id="demo1" width="500" height="400"></canvas>
    </cardBox>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { degTrigger } from "../../../../utils/tool";

const initDemo1 = () => {
  const canvas1 = document.querySelector("#demo1") as HTMLCanvasElement;
  const context = canvas1.getContext("2d");

  context!.font = "40pt Calibri";
  context!.fillStyle = "red";
  context!.fillText("Hello Canvas", 0, 100);
};

const initDemo2 = () => {
  const canvas1 = document.querySelector("#demo1") as HTMLCanvasElement;
  const ctx = canvas1.getContext("2d");

  ctx!.lineWidth = 10; // 设置描边的宽度 （必须在 stroke() 前设置）

  ctx?.beginPath(); // 清空子路径列表，创建一个新的路径
  ctx?.moveTo(100, 100); // 起始坐标点
  ctx?.lineTo(350, 50); // 线段的目标坐标点
  ctx!.strokeStyle = "red"; // 描边的颜色
  ctx!.lineJoin = "round"; // 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
  ctx?.stroke(); // 描边

  ctx?.beginPath();
  ctx?.moveTo(350, 50);
  ctx?.lineTo(350, 150);
  ctx!.strokeStyle = "blue";
  //   ctx!.lineCap = "square"; //方形结尾，增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域
  ctx!.lineJoin = "bevel"; // 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
  ctx?.stroke();

  ctx?.beginPath();
  ctx?.moveTo(100, 140);
  ctx?.lineTo(350, 150);
  ctx!.strokeStyle = "green";
  //   ctx!.lineCap = "round"; //默认值 butt | round | square 绘制每一条线段末端的属性
  ctx!.lineJoin = "round"; // 设置 2 个长度不为 0 的相连部分（线段、圆弧、曲线）如何连接在一起的属性
  ctx?.stroke();
};

const initDemo3 = () => {
  const canvas1 = document.querySelector("#demo1") as HTMLCanvasElement;
  const ctx = canvas1.getContext("2d");

  ctx?.beginPath();
  //x,y 原点坐标，半径，开始弧度，结束弧度，顺逆时针
  ctx?.arc(100, 100, 50, degTrigger("-90deg"), degTrigger("90deg"), false);
  ctx!.lineWidth = 10;
  ctx?.stroke();

  ctx?.beginPath();
  //x,y 原点坐标，半径，开始弧度，结束弧度，顺逆时针
  ctx?.arc(150, 150, 50, degTrigger("90deg"), degTrigger("-90deg"), false);
  ctx!.lineWidth = 10;
  ctx?.stroke();

  ctx?.beginPath();
  //x,y 原点坐标，半径，开始弧度，结束弧度，顺逆时针
  ctx?.arc(100, 200, 50, degTrigger("-90deg"), degTrigger("90deg"), false);
  ctx!.lineWidth = 10;
  ctx?.stroke();
};

// 路径图
const pathDiagram = () => {
  const canvas1 = document.querySelector("#demo1") as HTMLCanvasElement;
  const ctx = canvas1.getContext("2d");

  ctx?.beginPath();
  ctx?.moveTo(100, 20);

  //   line 1
  ctx?.lineTo(200, 160);

  //二次贝塞尔曲线路径
  ctx?.quadraticCurveTo(230, 200, 250, 120);

  //三次贝赛尔曲线路径
  ctx?.bezierCurveTo(290, -40, 300, 200, 400, 150);

  ctx?.lineTo(450, 90);

  ctx!.lineWidth = 5;
  ctx!.strokeStyle = "blue";
  ctx!.lineCap = "round";
  ctx?.stroke();
};

const initEvent = () => {
  //   initDemo1();
  initDemo2();
  //   initDemo3();
  //   pathDiagram();
};

onMounted(() => {
  initEvent();
});
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
  //   background-color: black;
}
</style>
