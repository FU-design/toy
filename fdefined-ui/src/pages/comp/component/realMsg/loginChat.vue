<template>
  <div class="wrp">
    <div class="login-chat">
      <h1>login Chat</h1>
      <auto-form
        ref="autoFormRef"
        v-model="form"
        :formItems="formItem"
        @ok="submitIsOk"
      >
        <template #btngroup="{ onSubmit }">
          <a-button style="width: 100%" type="primary" @click="onSubmit">
            Sign in
          </a-button>
        </template>
      </auto-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from "vue";
import AutoForm from "../autoForm/autoForm.vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/authorization";
import { login } from "@/api/login/index";
import type { ChatInfo } from "@/api/login/types";

const auth = useAuthStore();
const form = ref<ChatInfo>({ chatCode: "", chatName: "" });
const autoFormRef = ref<InstanceType<typeof AutoForm> | null>(null);
const router = useRouter();
const formItem = [
  {
    type: "input",
    key: "chatName",
    itemOptions: {
      name: "chatName",
      label: "ChatName",
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
  {
    type: "input",
    key: "chatPassword",
    extraOps: {
      type: "password",
      autocomplete: "current-password",
    },
    itemOptions: {
      name: "chatPassword",
      label: "Password",
      labelCol: { style: { fontWeight: 600 }, span: 9 },
      wrapperCol: { span: 15 },
      labelAlign: "right",
      rules: [
        {
          required: true,
          message: "Please enter Password",
          trigger: "blur",
        },
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

const submitIsOk = async () => {
  try {
    const chatInfo = unref(form) as ChatInfo;
    const res = await login<ChatInfo>(chatInfo);
    const { status, statusText, data } = await login<ChatInfo>(chatInfo);
    if (status === 200) {
      auth.setChatInfo(data);
      router.replace({ path: "/comp/realMsg/chat" });
    } else {
      alert(statusText);
    }
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

onMounted(() => {
  const chatCard = auth.chatInfo;
  if (chatCard) {
    autoFormRef.value?.updateValue({ chatName: chatCard.chatName });
    router.replace({ path: "/comp/realMsg/chat" });
  }
});
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
