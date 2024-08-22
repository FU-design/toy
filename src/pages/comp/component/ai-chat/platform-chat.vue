<template>
  <div class="platfrom-chat">
    <section>
      <article v-for="item in 100">
        
      </article>
    </section>
    <div class="input-message">
      <a-input-search v-model:value="inputText" placeholder="message chat" enter-button="Search" @search="onSearch" />
      <div>{{ `${currPlatform?.name} ${currPlatform?.currModel}` }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAIChat from "./ai-chat.ts";
import { storeToRefs } from "pinia";
import type { Option } from "./select-menu.vue";
interface PlatfromChatPorps {
  currPage?: Option;
}

const aiChat = useAIChat();
const inputText = ref("");
const props = defineProps<PlatfromChatPorps>();
const { currPlatform } = storeToRefs(aiChat)

const onSearch = () => {
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
  }

  .input-message {
    width: 100%;

    div {
      text-align: center;
      font-size: 12px;
      color: #a9a9a9;
    }
  }
}
</style>
