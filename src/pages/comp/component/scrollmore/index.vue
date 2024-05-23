<template>
  <div class="wrp">
    <cardBox>
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
    </cardBox>
    <cardBox>
      <template #header>
        <div>防抖测试</div>
      </template>
      <AutoFrom v-model="form" :formItems="formItem" />
    </cardBox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ScrollMoreData from "./scrollmoredata.vue";
import { mockData, MockData } from "../../../../utils/mock";
import AutoFrom from "../autoForm/autoForm.vue";
const listData = ref<string[]>([]);
const eachSize = ref<number>(50);

const form = ref<any>({});

const formItem = [
  {
    type: "input",
    key: "resourceName",
    itemOptions: {
      name: "resourceName",
      label: "资源名称",
      rules: [
        { required: true, message: "请输入资源名称", trigger: "blur" },
        { min: 3, max: 50, message: "长度3-50", trigger: "blur" },
        {
          pattern: /^[0-9a-zA-Z_]{1,}$/,
          message: "请输入正确的资源名称，字母/数字/下划线,",
        },
      ],
    },
  },
  {
    type: "textarea",
    key: "description",
    itemOptions: {
      name: "description",
      label: "描述",
    },
  },
];

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
.wrp {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.get-data-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px 0;
  border-bottom: 4px solid rgba(194, 194, 194, 0.322);
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
