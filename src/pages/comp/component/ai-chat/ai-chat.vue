<template>
  <teleport to="body">
    <a-float-button type="default" @click="onOpen">
      <template #icon>
        <img class="robot-icon" :src="getSvgUrl('ai-chat', 'robot')" alt="ai chat" />
      </template>
    </a-float-button>

    <div class="robot">
      <a-card class="chat-model" v-show="visible">
        <template #title>
          <header>
            <div class="header-left">
              <img :src="getSvgUrl('ai-chat', 'left')" alt="back"
                v-if="!['SUPPORTED_PLATFORM_SELECT', 'PLATFORM_CHAT'].includes(currPage?.action)" @click="onBack" />
              <img :src="getSvgUrl('ai-chat', 'home')" alt="home" v-if="'PLATFORM_CHAT' === currPage?.action"
                @click="onHome" />
            </div>
            <div class="header-middle" v-if="currPage?.action === 'PLATFORM_CHAT'">线程1</div>
            <div class="header-right">
              <template v-if="'PLATFORM_CHAT' === currPage?.action">
                <img :src="getSvgUrl('ai-chat', 'history')" alt="history" @click="onHistory" />
                <img :src="getSvgUrl('ai-chat', 'full-screen')" alt="full-screen" @click="onFullScreen" />
              </template>
              <img :src="getSvgUrl('ai-chat', 'close')" alt="close" @click="onClosed" />
            </div>
          </header>
        </template>
        <keep-alive>
          <component v-bind="{ style }" v-model:currPage="currPage" :is="getCompName"></component>
        </keep-alive>
      </a-card>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import PlatformSelect from "./platform-select.vue";
import PlatformAuthorize from "./platform-authorize.vue";
import PlatformChat from "./platform-chat.vue";
import PreChat from "./pre-chat.vue";
import useAIChat from "./ai-chat";
import { getSvgUrl } from "@/utils/tool";
import type { Option } from "./select-menu.vue";

const aiChat = useAIChat();
const visible = ref(false);
const currPage = ref<Option>({ action: 'SUPPORTED_PLATFORM_SELECT', name: '' });
const afterPages = ref<Option[]>([currPage.value]);
const style = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '24px'
}

watchEffect(async () => {
  const actions = afterPages.value.map(v => v.action)
  if (!actions?.includes(currPage.value?.action)) {
    afterPages.value?.push(currPage.value)
  }
  if (currPage.value?.action === "PLATFORM_MANAGEMENT") {
    await aiChat.getSysSupportedPlatforms();
  }
})

const getCompName = computed(() => {
  switch (currPage.value?.action) {
    case "SUPPORTED_PLATFORM_SELECT":
      return PlatformSelect;
    case "PLATFORM_MANAGEMENT":
      return PlatformAuthorize;
    case "PLATFORM_AUTH":
      return PlatformAuthorize;
    case "PLATFORM_MODEL":
      return PreChat;
    case "ChAT_THREAD_MANAGEMENT":
      return PreChat;
    case "PLATFORM_CHAT":
      return PlatformChat;
    default:
      return PlatformSelect;
  }
});

const onBack = () => {
  afterPages.value.pop();
  currPage.value = afterPages.value[afterPages.value.length - 1] as Option
};

const onHome = () => {

}

const onHistory = () => {

}

const onFullScreen = () => { }

const onClosed = () => {
  visible.value = false;
};

const onOpen = () => {
  visible.value = !visible.value;
};
</script>

<style lang="scss" scoped>
.robot {
  position: fixed;
  bottom: 10%;
  right: 0;
}

.chat-model {
  position: absolute;
  right: 20px;
  bottom: 0;
  width: 350px;
  height: 500px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;

  :deep(.ant-card-head) {
    padding: 0 14px;
    min-height: 40px;
  }

  :deep(.ant-card-body) {
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  header {
    box-sizing: border-box;
    display: flex;

    &>div {
      flex: 1;
    }
  }

  .header {
    &-left {
      display: flex;
      align-items: center;
    }

    &-middle {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        margin-left: 6px;
      }
    }
  }




}
</style>
