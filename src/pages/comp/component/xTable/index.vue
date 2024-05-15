<template>
  <div class="container">
    <x-table :data="data" :loading="loading" :columns="columns">
      <template #td-operation>
        <span>编辑</span>
        <span>删除</span>
      </template>
    </x-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import xTable from "./xTable.vue";
import { TableColumnType } from "ant-design-vue";

const data = ref<DataItem[]>([]);
const loading = ref(false);

const columns: TableColumnType[] = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
];

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const initData = () => {
  for (let i = 0; i < 10000; i++) {
    const item = {
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    };
    data.value.push(item);
  }
};

initData();
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
