<template>
  <div class="wrp">
    <card-box>
      <template #header>
        <div class="get-data-btn">
          <div>滚动加载大量数据简单实现</div>
          <button @click="getData">获取数据</button>
        </div>
      </template>
      <scroll-more-data :list-data="listData" :each-size="eachSize">
        <template #default="{ $row }">
          <div class="row">{{ $row }}</div>
        </template>
      </scroll-more-data>
    </card-box>
  </div>
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
  const { code, data } = (await mockData(60)) as MockData;
  if (code == 200) {
    listData.value = [...listData.value, ...data];
  }
};
</script>

<style scoped>
.get-data-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row {
  background-color: burlywood;
  padding: 10px 6px;
  margin: 2px;
  border-radius: 4px;
  cursor: pointer;
}
.row:hover {
  background-color: cornflowerblue;
}
</style>
