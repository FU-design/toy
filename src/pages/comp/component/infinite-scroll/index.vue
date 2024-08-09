<template>
  <div class="infinite-scroll">
    <card-box>
      <ul class="container">
        <li v-for="(item, idx) of dataSource">
          <img :src="imgs[idx]" />
          <p>pic-code:{{ item }}</p>
        </li>
      </ul>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { mockData, getImgsUrlList } from "@/utils/mock";
import { onMounted, onUnmounted, ref } from "vue";
import { VanillaInfiniteScroll } from "./vanilla-infinite-scroll";

const size = 50;
const dataSource = ref<string[]>([]);
const imgs = ref<string[]>([]);
const obersver = ref<VanillaInfiniteScroll>();

const getList = async () => {
  const res = await mockData(size);
  dataSource.value = [...dataSource.value, ...res.data];
  imgs.value = [...imgs.value, ...getImgsUrlList(size, 200, 100)];
};

const setScrollObersver = () => {
  const container = document.querySelector(".container");
  obersver.value = new VanillaInfiniteScroll(container, getList, 500);
};

onMounted(() => {
  getList();
  setScrollObersver();
});

onUnmounted(() => {
  obersver.value?.clearUpObersever();
});
</script>

<style lang="scss" scoped>
.container {
  height: 500px;
  overflow: auto;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  li {
    flex: 0 1 calc(100% / 4 - 8px);
    padding: 4px;
    margin: 4px;
    box-sizing: border-box;
    border: 1px solid #000;
  }
}
</style>
