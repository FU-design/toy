<template>
  <div class="panel-wrapper">
    <div
      class="panel"
      ref="panelRef"
      :style="[
        { width: width || '' },
        { transition: isDrag ? 'none' : 'all 0.2s' },
      ]"
      :class="[visible ? 'panel-active' : 'panel-deactive']"
    >
      <div class="drag-size" @mousedown="dragChangeSize"></div>
      <div class="panel-header">
        <slot name="header">
          <span>{{ props.title }}</span>
        </slot>
        <div class="panel-btn" @click.stop="handleClose">
          <div>x</div>
        </div>
      </div>
      <div class="panel-content">
        <slot name="content"> </slot>
      </div>
      <div v-if="props.hasFooter" class="panel-footer">
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, unref } from "vue";
import { Panel, DragState } from "./types";

const props = withDefaults(defineProps<Panel>(), {
  visible: false,
  width: "70%",
  title: "",
  hasFooter: true,
});
const emits = defineEmits(["update:visible", "closed"]);
const visible = ref<boolean>(props.visible);
const width = ref<string>(props.width);
const panelRef = ref<HTMLDivElement>();
const isDrag = ref<boolean>(false);
const dragState = reactive<DragState>({
  startMouseL: 0,
  startSizeW: 0,
});

watch(
  () => props.visible,
  (val) => {
    visible.value = val;
    if (val) {
      // 当抽屉打开时，监听上下文的点击事件
      document.addEventListener("click", autoClosePanel);
    } else {
      // 当抽屉关闭后，移除监听上下文的点击事件
      document.removeEventListener("click", autoClosePanel);
      isDrag.value = false;
    }
  }
);

/**
 * @description 鼠标按下事件
 * @param e
 */
const dragChangeSize = (e: MouseEvent) => {
  // 禁止用户选择网页中文字
  document.onselectstart = () => false;
  // 禁止用户拖动元素
  document.ondragstart = () => false;
  // 去除移动时的动画过渡（去除拖拉时的延迟）
  isDrag.value = true;
  // 获取当前鼠标的位置信息
  dragState.startMouseL = e.clientX;
  if (unref(panelRef)) {
    dragState.startSizeW = unref(panelRef)?.offsetWidth || 0;
  }
  // 监听鼠标键移动事件
  document.addEventListener("mousemove", mouseMove);
  // 监听鼠标键抬起事件
  document.addEventListener("mouseup", mouseUp);
};

/**
 * @description 鼠标移动事件回调
 * @param e
 */
const mouseMove = (e: MouseEvent) => {
  // 获取当前鼠标相对于初始位置水平移动的距离
  let moveSize = dragState.startMouseL - e.clientX;
  if (panelRef.value) {
    // 获取当前拖住移动触发位置，通过获取当前的鼠标相对移动距离，来刷新面板的拖拉的实时宽度
    const triggerSize = dragState.startSizeW + moveSize;
    // 设置最小拉伸宽度边界
    if (triggerSize > 460) {
      // 这里直接对面板的宽度css属性进行修改，未改动使用组件时的初始宽度，在关闭面板的时候，再次打开会自动重置为初始宽度
      panelRef.value.style.width = `${dragState.startSizeW + moveSize}px`;
    }
  }
};

/**
 * @description 鼠标抬起事件回调
 */
const mouseUp = () => {
  document.removeEventListener("mousemove", mouseMove);
  document.onmouseup = null;
  // 要恢复页面的复制文本功能
  document.onselectstart = () => true;
};

/**
 * @description 点击面板外的区域关闭面板
 * @param evt
 */
const autoClosePanel = (evt: MouseEvent) => {
  /**
   * Element.closest():
   * 匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。
   * 如果匹配不到，则返回 null。
   */
  const el: Element = evt.target as Element;
  const parent: Element | null = el.closest(".panel-wrapper");
  if (!parent) {
    visible.value = false;
    emits("update:visible", unref(visible));
    emits("closed", unref(visible));
  }
};

/**
 * @description 手动关闭面板
 */
const handleClose = () => {
  visible.value = false;
  emits("update:visible", unref(visible));
  emits("closed", unref(visible));
};
</script>
<style scoped>
.panel-wrapper {
  position: fixed; /* fixed 相对于浏览器视口定位 */
  inset: 0;
  z-index: 9;
  pointer-events: none; /* 忽略鼠标操作,透过当前元素; 会被继承 */
  box-sizing: border-box;
}

.panel {
  width: 70%;
  height: 100%;
  inset: 0 0 auto auto;
  background-color: #fffffffb;
  pointer-events: auto;
  position: absolute;
  z-index: 1000;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
}

.drag-size {
  position: fixed;
  left: 0;
  height: 100%;
  width: 2px;
  cursor: pointer;
}
.drag-size:hover {
  background-color: rgba(153, 153, 153, 0.185);
  cursor: col-resize;
  width: 4px;
}

/* 利用动画效果来控制抽屉的显隐 */
.panel-active {
  transition: all 0.2s;
  transform: translate(0, 0);
}
.panel-deactive {
  transition: all 0.2s;
  transform: translate(0, -100%);
}

.panel-header {
  padding: 2px 10px;
  box-sizing: border-box;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel-content {
  flex: 1;
  padding: 10px 10px 20px 10px;
  box-sizing: border-box;
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
  overflow: auto;
}

.panel-footer {
  padding: 10px;
  box-sizing: border-box;
  /* background-color: blanchedalmond; */
}

.panel-btn {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.panel-btn > div {
  font-weight: 500;
  cursor: pointer;
}
</style>
<!-- 自定义markdown中元素的样式 -->
<style>
.panel-content h3,
h4 {
  padding: 8px;
  margin-top: 0;
  margin-bottom: 10px;
  border-radius: 4px;
  background-image: linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%);
  font-size: Nunito, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu,
    Cantarell, "Noto Sans", sans-serif;
}
.panel-content p {
  margin: 10px 0;
}

.panel-content pre {
  margin-top: 6px;
}

.panel-content ul {
  margin: 0;
}
.panel-content ul li {
  margin: 10px 0;
  &::marker {
    color: rgb(39, 72, 133);
  }
}

.panel-content blockquote {
  position: relative;
  margin: 20px 0;
  /* background-image: linear-gradient(135deg, #c3cfe23f 0%, #f5f7fa 100%); */
  font-size: #0000003f;
}

.panel-content blockquote > p {
  padding: 10px;
  font-size: 15px;
}

.panel-content blockquote::before {
  content: "";
  height: 100%;
  width: 4px;
  display: inline-block;
  position: absolute;
  background-color: #2a43b35c;
}

.panel-content :not(pre) > code {
  background-color: rgba(0, 0, 0, 0.089);
  padding: 2px 10px;
  border-radius: 4px;
  font-weight: 600;
  color: rgb(207 85 85 / 99%);
}
</style>
