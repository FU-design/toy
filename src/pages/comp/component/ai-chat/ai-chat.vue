<template>
  <teleport to="body">
    <a-float-button type="default" @click="onOpen">
      <template #icon>
        <img class="robot-icon" src="../../../../assets/svg/ai-chat/robot.svg" alt="ai chat" />
      </template>
    </a-float-button>

    <div class="robot">
      <a-card class="chat-model" v-show="visible">
        <template #title>
          <header>
            <div class="header-left">
              <img src="../../../../assets/svg/ai-chat/left.svg" alt="back"
                v-if="currPage?.action !== 'SELECT_SOPPORTED_PLATFORM'" @click="onBack" />
            </div>
            <div class="header-middle">线程1</div>
            <div class="header-right">
              <img src="../../../../assets/svg/ai-chat/close.svg" alt="close" @click="onClosed" />
            </div>
          </header>
        </template>
        <component v-model:currPage="currPage" :is="getCompName"></component>
        <footer></footer>
      </a-card>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import PlatformSelect from "./platform-select.vue";
import PlatformAuthorize from "./platform-authorize.vue";
import useAIChat from "./ai-chat";
import type { Option } from "./select-menu.vue";

const aiChat = useAIChat();
const visible = ref(false);
const currPage = ref<Option>({ action: 'SELECT_SOPPORTED_PLATFORM', name: '' });
const afterPages = ref<Option[]>([currPage.value]);

watchEffect(async () => {
  const actions = afterPages.value.map(v => v.action)
  if (!actions?.includes(currPage.value?.action)) {
    afterPages.value?.push(currPage.value)
  }
  if (currPage.value?.action === "ADD_NEW_PLATFORM") {
    await aiChat.getSysSupportedPlatforms();
  }
})

const getCompName = computed(() => {
  switch (currPage.value?.action) {
    case "SELECT_SOPPORTED_PLATFORM":
      return PlatformSelect;
    case "ADD_NEW_PLATFORM":
      return PlatformAuthorize;
    case "SELECT_AUTH_PLATFORM":
      return PlatformAuthorize;
    default:
      return PlatformSelect;
  }
});

const onBack = () => {
  afterPages.value.pop();
  currPage.value = afterPages.value.at(-1) as Option
};

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
  width: 380px;
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
    }
  }
}
</style>
