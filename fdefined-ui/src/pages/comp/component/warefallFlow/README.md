```ts
/**
 * 缺陷：加载时会出现缩聚点
 * @description 不固定列数,响应式设计布局
 * @param selector
 */
export function layoutWarefall(selector: string | HTMLElement) {
  let el: HTMLElement | undefined;
  if (typeof selector == "string") {
    el = document.querySelector(selector) as HTMLElement; // 获取容器
  }
  if (el) {
    el.style.setProperty("position", "relative");
    const gridItems = Array.from(el?.children) as HTMLElement[]; // 获取所有的子项目
    const pw = el?.offsetWidth; // 获取容器的宽
    const itemw = gridItems[0].offsetWidth; // 获取单个子项目的最后内部填充后的宽
    const cols = Math.floor(pw / itemw); // 获取列的数目
    const space = (pw - cols * itemw) / (cols + 1); // 将剩余的空间规划为子项目间的间距
    const columns = Array(cols).fill(0);

    const len = gridItems.length;
    for (let i = 0; i < len; i++) {
      const minColHeight = Math.min(...columns);
      const colIdx = columns.indexOf(minColHeight);
      const resetStyle = {
        left: `${Math.floor((colIdx + 1) * space + itemw * colIdx)}px`,
        top: `${minColHeight}px`,
        position: "absolute",
        opacity: 1, // 等待计算完成后再显示，处理出现的缩聚点影响观感问题
      };
      Object.assign(gridItems[i].style, resetStyle);
      columns[colIdx] += gridItems[i].offsetHeight + 10;
    }
    el?.style.setProperty("height", `${Math.max(...columns)}px`);
  }
}
```

### 在组件中使用

```html
<div class="warefall-flow">
  <div class="grid">
    <div class="item" v-for="url in items">
      <img :src="url" alt="404" @load="handleResize" />
    </div>
  </div>
</div>
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
  // loadScroll 滚动到底部加载
  clear.value = loadScroll(".warefall-flow", () => {
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
  height: 500px;
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
  /* transition: all 0.3s; */
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

```
