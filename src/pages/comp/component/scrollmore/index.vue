<template>
  <CardBox>
    <template #header>
      <div class="get-data-btn">
        <div>滚动加载大量数据简单实现</div>
        <button @click="getData">获取数据</button>
      </div>
    </template>
    <ScrollMoreData :list-data="listData" :each-size="eachSize">
      <template #default="{ $row }">
        <div class="row">{{ $row }}</div>
      </template>
    </ScrollMoreData>
  </CardBox>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ScrollMoreData from "./scrollmoredata.vue";
import { mockData, MockData } from "../../../../utils/mock";

const listData = ref<string[]>([]);
const eachSize = ref<number>(50);

/**
 * 获取数据
 */
const getData = async () => {
  const { code, data } = (await mockData(1000)) as MockData;
  if (code == 200) {
    listData.value = data;
  }
};
</script>

<style scoped>
.get-data-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 1rem 0;
  border-bottom: 0.4rem solid rgba(194, 194, 194, 0.322);
}
.row {
  background-color: burlywood;
  padding: 1rem 0.6rem;
  margin: 0.2rem;
  border-radius: 0.4rem;
  cursor: pointer;
}
.row:hover {
  background-color: cornflowerblue;
}
</style>
