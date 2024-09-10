<template>
  <div class="chat-container flex justify-center">
    <div class="chat-content">
      <template v-for="item in mockData">
        <chat-msg-item :roleInfo="item" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatMsgItem from "./chat-msg-item.vue";
import { chatMsgHistory, type RoleInfo } from "./request";

const mockData = ref<RoleInfo[]>();

const initScrollEvent = () => {
  const box = document.querySelector(".chat-content");
};

onMounted(async () => {
  const res = await chatMsgHistory();
  mockData.value = res.data;
});
</script>

<style lang="scss" scoped>
.chat {
  &-container {
    min-height: 600px;
    min-width: 320px;
    max-height: 80vh;
    overflow: auto;
  }
  &-content {
    border-radius: 8px;
    padding: 16px;
    min-width: 320px;
  }
}
/* 超小屏幕：手机 (max-width: 320px) */
@media only screen and (max-width: 320px) {
  .chat-content {
    width: 100%;
  }
}

/* 手机 (320px - 480px) */
@media only screen and (min-width: 321px) and (max-width: 480px) {
  .chat-content {
    width: 100%;
  }
}

/* 平板设备 (481px - 768px) */
@media only screen and (min-width: 481px) and (max-width: 768px) {
  .chat-content {
    width: 100%;
  }
}

/* 小屏桌面设备 (769px - 1024px) */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .chat-content {
    width: 100%;
  }
}

/* 中屏桌面设备 (1025px - 1200px) */
@media only screen and (min-width: 1025px) {
  .chat-content {
    width: 900px;
  }
}

/* 手机 */
@media only screen and (max-width: 480px) {
  html {
    font-size: 14px;
  }
}

/* 平板 */
@media only screen and (min-width: 481px) and (max-width: 768px) {
  html {
    font-size: 16px;
  }
}

/* 桌面 */
@media only screen and (min-width: 769px) {
  html {
    font-size: 18px;
  }
}
</style>
