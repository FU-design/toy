<template>
  <div class="platfrom-chat">
    <section>
      <article v-for="item in 100">
      </article>
    </section>
    <footer>
      <div class="send-msg-wrp">
        <a-textarea v-model:value="inputText" placeholder="message chat" :autosize="{ maxRows: 4 }" />
        <div class="send-msg-right">
          <div class="send-btn" @click="sendMessage">
            <img :src="getSvgUrl('ai-chat', sendable ? 'send' : 'send-disabled')" alt="send" />
          </div>
        </div>
      </div>
      <section>{{ `${currPlatform?.name} ${currPlatform?.currModel}` }}</section>
    </footer>
  </div>
</template>

<script setup lang="ts">
import useAIChat from "./ai-chat.ts";
import { storeToRefs } from "pinia";
import { getSvgUrl } from "@/utils/tool";
import type { Option } from "./select-menu.vue";
import { message } from "ant-design-vue/es/components";
interface PlatfromChatPorps {
  currPage?: Option;
}



const aiChat = useAIChat();
const inputText = ref("");
const props = defineProps<PlatfromChatPorps>();
const { currPlatform } = storeToRefs(aiChat)

const sendable = computed(() => inputText.value != '')

const sendMessage = () => {
  if (inputText.value === '') {
    message.warning('请输入内容')
  }
};

</script>

<style lang="scss" scoped>
.platfrom-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
  padding: 4px !important;

  section {
    flex: 1 1 0%;
    overflow: auto;
    padding: 0 14px;
  }

  footer {
    width: 100%;

    .send-msg-wrp {
      display: flex;
      align-items: center;
      border: 1px solid #a9a9a9;
      border-radius: 20px;
      padding: 6px;
      overflow: hidden;


      .ant-input {
        border-color: transparent;

        &:focus {
          border-color: transparent;
          box-shadow: none;
        }

        &:hover {
          border-color: transparent;
        }
      }

      .end-msg-right {
        align-self: flex-end;
      }

      .send-btn {
        width: 40px;
        height: 40px;
        background-color: #d4d2d2;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    }

    section {
      text-align: center;
      font-size: 12px;
      padding: 2px;
      color: #a9a9a9;
    }
  }
}
</style>
