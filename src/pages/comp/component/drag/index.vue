<template>
  <div class="drag">
    <div class="drag-box">
      <img
        class="draggable"
        id="pic1"
        src="../../../../assets/images/godness.png"
      />
      <img class="draggable" id="pic2" src="../../../../assets/images/02.jpg" />
      <div class="draggable" v-for="i in 20" :id="`draggable-${i}`">
        {{ `Drag Node${i}!` }}
      </div>
    </div>
    <div class="dropzone-box">
      <h2>drop zone</h2>
      <div id="dropzone"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const initEvent = () => {
  getDragEl();
};

const getDragEl = () => {
  const dragBox = document.querySelector(".drag-box");
  dragBox?.addEventListener("mouseover", (e) => {
    // 这里处理重复监听
    const targeDom = e.target as Element;
    if (Array.prototype.includes.call(targeDom?.classList, "draggable")) {
      newHandle(targeDom);
    }
  });
};
/**
 * 通过闭包处理重复监听
 */
const newHandle = (targeDom: Element) => {
  initDrag(targeDom);
};

const initDrag = (currDom: Element) => {
  const dropzone = document.querySelector("#dropzone");

  currDom?.setAttribute("draggable", "true");
  // 拖拽开始
  currDom?.addEventListener("dragstart", onDragStrat, false);
  currDom?.addEventListener("dragend", onDragEnd, false);
  currDom?.addEventListener("dragenter", onDragenter, false);
  dropzone?.addEventListener("dragover", onDragOver, false);
  dropzone?.addEventListener("drop", onDrop, false);
};

const onDragStrat = (e: any) => {
  e.dataTransfer?.setData("text/plain", e.target?.id);
};

const onDragEnd = (e: any) => {
  console.log("e :>> ", e);
};

const onDragenter = (e: any) => {
  console.log("e :>> ", e);
};

const onDragOver = (e: any) => {
  e.preventDefault();
};

const onDrop = (e: any) => {
  const id = e.dataTransfer.getData("text");
  const template = document.getElementById(id) as HTMLElement;
  // e.target.appendChild(template.cloneNode(true));
  e.target.appendChild(template.cloneNode(true));
  e.dataTransfer.clearData();
};

onMounted(() => {
  initEvent();
});
</script>

<style lang="scss" scoped>
.drag {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  &-box {
    width: 50%;
    height: auto;
    overflow: auto;
    @include flex;
    flex-wrap: wrap;
  }
}
.draggable {
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  background-color: cadetblue;
}

.dropzone-box {
  padding: 0 10px;
  height: auto;
  flex: 1;
  background-color: rgba(49, 226, 43, 0.616);
  overflow: auto;
  @include flex;
  flex-direction: column;
}
#dropzone {
  width: 100%;
  height: 100%;
  @include flex;
  flex-wrap: wrap;
}
</style>
