<template>
  <div class="warefall-flow">
    <div class="grid">
      <div class="item" v-for="url in items">
        <img :src="url" alt="404" @load="layoutGrid" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getImgs } from "./request";
const items = ref<string[]>([]);

const layoutGrid = () => {
  const grid = document.querySelector(".grid") as HTMLDivElement;
  const gridItems = Array.from(grid.children) as any[];

  // 获取容器的宽度
  const containerWidth = grid.clientWidth;

  // 根据提供的容器和每列最小宽度（200px）来确认会产生多少列
  let columnCount = Math.floor(containerWidth / 200);
  // 列数提供至少存在一列
  columnCount = Math.max(columnCount, 1);

  const columns = Array(columnCount).fill(0); // 初始化列
  const columnWidth = containerWidth / columnCount; // 重新计算每个列的宽度
  const gutterWidth = columnWidth * 0.05; // 间距为列宽的 5%

  gridItems.forEach((item) => {
    const minColumnHeight = Math.min(...columns);
    const columnIndex = columns.indexOf(minColumnHeight);
    const left = (columnWidth + gutterWidth) * columnIndex;
    const top = minColumnHeight;

    // 去除项目间的间隔得出最后每个项目的宽度
    item.style.width = `${columnWidth - gutterWidth}px`; // 减去间距
    item.style.top = `${top}px`;
    item.style.left = `${left}px`;
    columns[columnIndex] += item.offsetHeight + gutterWidth;
    item.style.opacity = 1; // 图片布局完成后设置透明度为 1
  });

  // grid.style.height = `${Math.max(...columns)}px`;
};

const getImgUrls = async () => {
  const res = await getImgs();
  items.value = res;
};

onMounted(() => {
  getImgUrls();
  window.addEventListener("resize", layoutGrid);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", layoutGrid);
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
  opacity: 0; /* 添加过渡效果前将图片透明 */
  transition: all 0.3s;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
