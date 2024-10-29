<template>
  <div class="container">
    <x-table
      :dataSource="dataSource"
      :loading="loading"
      :columns="columnsProp"
      :pagination="paginateProp"
      @change="onChange"
    >
      <template #customFilterIcon> 1111 </template>
      <template #td-name="{ text }">
        <a>{{ text }}</a>
        <copy-outlined @click="handleCopy(text)" />
      </template>
      <template #td-operation>
        <div class="action-ops">
          <span>编辑</span>
          <span>删除</span>
          <span>删除</span>
        </div>
      </template>
    </x-table>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnType } from "ant-design-vue";
import { CopyOutlined } from "@ant-design/icons-vue";
import xTable from "./XTable.vue";

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const app = getCurrentInstance();
const globalProperties = app?.appContext.config.globalProperties;
const columns: TableColumnType[] = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    // filterIcon: ({ filtered, column }) => {
    //   console.log("filtered-boolean :>> ", filtered);
    //   console.log("column-Column :>> ", column);
    //   return h(CopyOutlined);
    // },
    onFilter: (value, record) => record.name.startsWith(value),
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
const data = ref<DataItem[]>([]);

const { dataSource, columnsProp, loading, paginateProp, onChange } =
  useTable<DataItem>({ columns, rows: data.value });

/**
 * 模拟数据
 */
const initData = () => {
  for (let i = 0; i < 10; i++) {
    const item: DataItem = {
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    };
    data.value.push(item);
    paginateProp.value.total = 100;
  }
};

/**
 * 文本复制
 */
const handleCopy = (text: string) => {
  const copyText = globalProperties?.$copyText;
  copyText &&
    copyText(text)
      .then(() => {
        console.log("复制成功 :>> ");
      })
      .catch((err: Error) => {
        console.log("复制失败 :>> ", err);
      });
};

onMounted(() => {
  initData();
});
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
.action-ops {
  display: flex;
  flex-wrap: wrap;
  span {
    cursor: pointer;
    padding: 2px 4px;
  }
}
</style>
