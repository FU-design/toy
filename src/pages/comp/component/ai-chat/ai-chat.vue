<template>
  <a-float-button type="default" @click="() => visibleWindow()">
    <template #icon>
      <img
        class="robot-icon"
        :src="getSvgUrl('robot', 'ai-chat')"
        alt="ai chat"
      />
    </template>
  </a-float-button>

  <teleport to="body">
    <div :class="[isExpand ? 'ai-chat-expand' : 'ai-chat']">
      <a-spin :spinning="loading">
        <a-card
          v-show="visible"
          class="base-model"
          :class="[isExpand ? 'chat-model-expand' : 'chat-model']"
        >
          <template #title>
            <header>
              <div class="header-left">
                <img
                  :src="getSvgUrl('left', 'ai-chat')"
                  alt="back"
                  v-if="showBack"
                  @click="onBack"
                />
                <img
                  :src="getSvgUrl('home', 'ai-chat')"
                  alt="home"
                  v-if="showChatPageOption && !isExpand"
                  @click="onHome"
                />
              </div>
              <div class="header-middle" v-if="showChatPageOption">
                {{ `线程${currThread?.platformId}` }}
              </div>
              <div class="header-right">
                <template v-if="showChatPageOption">
                  <img
                    :src="getSvgUrl('history', 'ai-chat')"
                    alt="history"
                    @click="onHistory"
                  />
                  <img
                    :src="getSvgUrl('full-screen', 'ai-chat')"
                    alt="full-screen"
                    @click="onFullScreen"
                  />
                </template>
                <img
                  :src="getSvgUrl('close', 'ai-chat')"
                  alt="close"
                  @click="visibleWindow(true)"
                />
              </div>
            </header>
          </template>
          <keep-alive>
            <component
              v-bind="{ style }"
              v-model:currPage="currPage"
              :is="getCompName"
            ></component>
          </keep-alive>
        </a-card>
      </a-spin>
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
import { storeToRefs } from "pinia";
import type { Option } from "./select-menu.vue";

const aiChat = useAIChat();
const visible = ref(false);
const currPage = ref<Option>({ action: "SUPPORTED_PLATFORM_SELECT", name: "" });
const afterPages = ref<Option[]>([currPage.value]);
const { currThread, loading, isExpand } = storeToRefs(aiChat);
const style = {
  width: "100%",
  boxSizing: "border-box",
  padding: "24px",
};

watchEffect(async () => {
  const actions = afterPages.value.map((v) => v.action);
  if (!actions?.includes(currPage.value?.action)) {
    afterPages.value?.push(currPage.value);
  }
  if (currPage.value?.action === "PLATFORM_MANAGEMENT") {
    await aiChat.getSysSupportedPlatforms();
  }
  if (currPage.value?.action === "SUPPORTED_PLATFORM_SELECT") {
    //todo 获取已授权的平台列表
  }
  if (currPage.value?.action === "ChAT_THREAD_MANAGEMENT") {
    //todo 获取已创建的聊天线程
  }
});

const showBack = computed(
  () => "PLATFORM_CHAT" != currPage.value?.action && afterPages.value.length > 1
);
const showChatPageOption = computed(
  () => "PLATFORM_CHAT" === currPage.value?.action
);

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

const visibleWindow = (close = false) => {
  close ? (visible.value = false) : (visible.value = !visible.value);
};

const onBack = () => {
  afterPages.value.pop();
  currPage.value = afterPages.value[afterPages.value.length - 1];
};

const onHome = () => {
  currPage.value = { action: "SUPPORTED_PLATFORM_SELECT", name: "" };
  afterPages.value = [currPage.value];
};

const onHistory = () => {
  afterPages.value = unref(afterPages).filter(
    (page) => page.action == "ChAT_THREAD_MANAGEMENT"
  );
  currPage.value = afterPages.value[afterPages.value.length - 1];
};

const onFullScreen = () => {
  aiChat.setWindowExpandStatus(!isExpand.value);
};
</script>

<style lang="scss" scoped>
img {
  cursor: pointer;
}

.ai-chat {
  position: fixed;
  bottom: 10%;
  right: 0;
}

.ai-chat-expand {
  position: fixed;
}

.chat-model-expand {
  position: fixed;
  width: 80%;
  height: 70%;
  min-width: 350px;
  min-height: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.chat-model {
  width: 350px;
  height: 500px;
  position: absolute;
  right: 20px;
  bottom: 0;
}

.base-model {
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

    & > div {
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
        margin-left: 10px;
      }
    }
  }
}
</style>
