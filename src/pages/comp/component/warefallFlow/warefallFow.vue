<template>
  <div class="warefall-flow">
    <div class="wrp">
      <div class="item" v-for="url in imgs">
        <img :src="url" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const imgs = ref<any>([]);

const getImgsUrlList = () => {
  imgs.value = Object.keys(new Array(50).fill(1)).map((_v, idx) => {
    return `https://picsum.photos/id/${idx}/100/${generateRandomNumber()}`;
  });
};

const generateRandomNumber = () => {
  // 生成随机宽度和高度，例如，这里设置最大宽高为 800 像素
  const maxHeight = 400;
  const randomHeight = Math.floor(Math.random() * maxHeight) + 1;
  return randomHeight;
};

onMounted(() => {
  getImgsUrlList();
});
</script>

<style scoped>
.wrp {
  column-count: 4;
  column-gap: 0;
}
.item {
  position: relative;
  counter-increment: count;
  object-fit: contain;
  &::after {
    position: absolute;
    display: block;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background-color: #000;
    color: #fff;
    content: counter(count);
  }
  & > img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
}
</style>
