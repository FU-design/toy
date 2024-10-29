<template>
  <div class="chat-content">
    <template v-for="item in mockData">
      <chat-msg-item :roleInfo="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import ChatMsgItem from './ChatMsgItem.vue';
import { chatMsgHistory, type RoleInfo } from './request';

const mockData = ref<RoleInfo[]>();

onMounted(async () => {
  const res = await chatMsgHistory();
  mockData.value = res.data;
});
</script>

<style lang="scss" scoped>
.chat {
  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    box-sizing: border-box;
  }
}
</style>
