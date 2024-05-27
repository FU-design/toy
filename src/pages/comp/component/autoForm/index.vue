<template>
  <div class="wrp">
    <cardBox>
      <template #header>
        <div>防抖测试</div>
      </template>
      <AutoFrom v-model="form" :formItems="formItem" />
    </cardBox>
    <cardBox>
      <template #header>
        <div>节流（throttle）测试</div>
      </template>
    </cardBox>
  </div>
</template>

<script setup lang="ts">
import AutoFrom from "./autoForm.vue";

import { ref } from "vue";

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
</script>

<style scoped></style>
