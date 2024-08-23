<template>
  <div class="platfrom-chat">
    <section>
      <article v-for="record of chatRecords">
        <div class="user"></div>
        <div class="assitant" v-for="choice of record.choices">
          <pre>{{ choice.message.content }}</pre>
        </div>
      </article>
    </section>
    <footer>
      <div class="msg-wrp">
        <div
          class="msg-input"
          data-placeholder="message chat"
          :contenteditable="true"
          @input="onInput"
        ></div>
        <div class="msg-input-suffix">
          <a-button
            :disabled="!sendable"
            type="primary"
            class="msg-input-send"
            @click="sendMessage"
          >
            <img
              :src="getSvgUrl('ai-chat', sendable ? 'send' : 'send-disabled')"
              alt="send"
            />
          </a-button>
        </div>
      </div>
      <section>
        {{ `${currPlatform?.name} ${currPlatform?.currModel}` }}
      </section>
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
const { currPlatform, chatRecords } = storeToRefs(aiChat);
const sendable = computed(() => inputText.value != "");

watchEffect(() => {
  if (props.currPage?.action == "PLATFORM_CHAT") {
    aiChat.startConnectAssistant();
  }
});

const onInput = (e: Event) => {
  inputText.value = (e.target as Element)?.textContent || "";
};
const sendMessage = () => {
  if (inputText.value === "") {
    message.warning("请输入内容");
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

  .msg-wrp {
    display: flex;
    align-items: center;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
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

    .msg-input {
      width: 100%;
      max-height: 100px;
      padding: 2px 8px;
      white-space: normal;
      transition: all 0.2s;
      overflow: auto;
      font-weight: 500;
      &::before {
        content: attr(data-placeholder); /* 模拟原生 input 的 placeholder */
        color: #a9a9a9;
        /* 字体溢出变为省略号 */
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:not(:empty)::before {
        content: "";
      }
      &:focus-visible {
        outline: 0;
        border-color: none;
      }
      &-suffix {
        align-self: end;
        cursor: pointer;
      }
      &-send {
        width: 50px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
      }
    }
  }

  footer {
    width: 100%;
    section {
      text-align: center;
      font-size: 12px;
      padding: 2px;
      color: #a9a9a9;
    }
  }
}
</style>
