<template>
  <div :class="[isAssistant ? 'chat-msg-item-l' : 'chat-msg-item-r', 'chat-msg-item']">
    <section v-if="isAssistant">
      <svg-icon name="robot" />
    </section>
    <article>
      <marked-view
        v-if="isAssistant"
        class="markdown-body rounded-lg"
        :mark-raw="roleInfo.content"
      ></marked-view>
      <div v-else class="markdown-body rounded-lg">{{ roleInfo.content }}</div>
    </article>
    <section v-if="!isAssistant">
      <svg-icon name="robot" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RoleInfo } from './request';

type Props = {
  roleInfo: RoleInfo;
};
const props = defineProps<Props>();
const { roleInfo } = props;
const isAssistant = computed(() => props.roleInfo.role === 'assistant');
</script>
<style lang="scss" scoped>
.chat-msg-item {
  display: flex;
  width: 100%;
  margin: 24px 0;
  box-sizing: border-box;
  gap: 10px;
}

.chat-msg-item-r {
  justify-content: flex-end;
}

.chat-msg-item-l {
  justify-content: flex-start;
}

section {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #34495e;
  background-color: #b0bec5;
  box-sizing: border-box;
  justify-content: flex-end;
}

article {
  border-radius: 8px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
