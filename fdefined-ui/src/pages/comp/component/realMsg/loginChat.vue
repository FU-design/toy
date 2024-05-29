<template>
  <div class="wrp">
    <div class="login-chat">
      <h1>login Chat</h1>
      <AutoFrom v-model="form" :formItems="formItem" @ok="submitIsOk">
        <template #btngroup="{ onSubmit }">
          <a-button style="width: 100%" type="primary" @click="onSubmit">
            Sign in
          </a-button>
        </template>
      </AutoFrom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import AutoFrom from "../autoForm/autoForm.vue";
import useChat, { type ChatInfo } from "@/hooks/useChat";

const { chatInfo, setChatInfo } = useChat();
const form = ref<ChatInfo | null>();
const formItem = [
  {
    type: "input",
    key: "chatCode",
    itemOptions: {
      name: "chatCode",
      label: "chatCode",
      labelCol: { style: { fontWeight: 600 }, span: 9 },
      wrapperCol: { span: 15 },
      labelAlign: "right",
      rules: [
        { required: true, message: "Please enter chatCode", trigger: "blur" },
        {
          min: 3,
          max: 50,
          message: "The length must be 3-50",
          trigger: "blur",
        },
      ],
    },
  },
  {
    type: "input",
    key: "chatName",
    itemOptions: {
      name: "chatName",
      label: "chatName",
      labelCol: { style: { fontWeight: 600 }, span: 9 },
      wrapperCol: { span: 15 },
      labelAlign: "right",
      rules: [
        { required: true, message: "Please enter chatName", trigger: "blur" },
        {
          min: 3,
          max: 50,
          message: "The length must be 3-50",
          trigger: "blur",
        },
      ],
    },
  },
];
const submitIsOk = () => {
  setChatInfo;
};
</script>

<style lang="scss" scoped>
.login-chat {
  width: 30%;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>
