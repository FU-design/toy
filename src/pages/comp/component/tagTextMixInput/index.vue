<template>
  <div class="wrp">
    <div>
      <label>Selection</label>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Selection" />
    </div>
    <div>
      <label>Range</label>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Range" />
    </div>
    <div class="select-plane" @click="handleClick"></div>
    <div class="list-box">
      <div class="list-item" v-for="item in list">
        <div class="item">{{ item.id }}</div>
        <div class="item">{{ item.name }}</div>
        <div class="item">
          <tagTextMixInput
            :ref="handleRef"
            placeholder="请输入内容"
            :contents="item.inputContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import tagTextMixInput from "./tagTextMixInput.vue";

const list = ref<any>([]);
const currTag = ref<any>(null);

const initSelectData = () => {
  const fragment = document.createDocumentFragment();
  const selectBox = document.querySelector(".select-plane");
  for (let i = 0; i < 30; i++) {
    const item = document.createElement("div");
    item.classList.add("select-item");
    item.setAttribute("data-key", `item-${i}`);
    item.innerHTML = `function ${i + 1}`;
    fragment.appendChild(item);
  }
  selectBox?.appendChild(fragment);
};

const handleRef = (el: any) => {
  if (!currTag.value) {
    return;
  }
  el?.insertTag(currTag.value);
  currTag.value = null;
  return el;
};

const fetchData = () => {
  list.value = new Array(10).fill(1).map((_v, idx) => {
    return {
      id: `item-${idx}`,
      name: `name-${idx}`,
      inputContent: [],
    };
  });
};

// 利用事件冒泡的特性实现每一条点击事件的触发
const handleClick = (e: Event) => {
  const target = e.target as HTMLElement;
  const key = target.getAttribute("data-key");
  if (key) {
    currTag.value = {
      type: "tag",
      text: key,
    };
  }
};

onMounted(() => {
  initSelectData();
  fetchData();
});
</script>

<style lang="scss" scoped>
.wrp {
  height: 100%;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
  overflow: auto;
  .list {
    &-box {
      display: flex;
      flex-direction: column;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
    &-item {
      display: flex;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border: none;
      }
    }
  }
  .item {
    align-self: center;
    width: calc(100% / 3);
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-right: 1px solid #ddd;
    &:last-child {
      border: none;
    }
  }
}
</style>
<style lang="scss">
.select-plane {
  height: 400px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #eee;
  overflow: auto;
  .select-item {
    padding: 6px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
  }
}
</style>
