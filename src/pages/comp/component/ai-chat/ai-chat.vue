<template>
  <teleport to="body">
    <div class="robot">
      <div class="robot-box" @click.stop="onOpen">
        <img
          class="robot-icon"
          src="../../../../assets/svg/ai-chat/robot.svg"
          alt="ai chat"
        />
        <a-card class="chat-model" v-show="visible">
          <template #title>
            <header>
              <div class="header-left">
                <img
                  src="../../../../assets/svg/ai-chat/left.svg"
                  alt="back"
                  v-if="currPage !== 'select'"
                  @click="onBack"
                />
              </div>
              <div class="header-middle">线程1</div>
              <div class="header-right">
                <img
                  src="../../../../assets/svg/ai-chat/close.svg"
                  alt="close"
                  @click="onClosed"
                />
              </div>
            </header>
          </template>
          <component
            v-model:currPage="currPage"
            :is="getCompName()"
          ></component>
          <footer></footer>
        </a-card>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import PlatformSelect from "./platform-select.vue";
import PlatformAuthorize from "./platform-authorize.vue";

const visible = ref(false);
const currPage = ref("select");
const preCurrPage = ref(currPage.value);

watch(currPage, (_val, oldVal) => {
  preCurrPage.value = oldVal;
});

const getCompName = () => {
  if (currPage.value === "select") {
    return PlatformSelect;
  } else if (currPage.value === "authorize") {
    return PlatformAuthorize;
  }
};

const onBack = () => {
  currPage.value = preCurrPage.value;
};

const onClosed = () => {
  visible.value = false;
};

const onOpen = (e: Event) => {
  const element = e.target as HTMLElement;
  const regex = /robot-(box|icon)/;
  [...element.classList].some((className) => regex.test(className)) &&
    (visible.value = !visible.value);
};
</script>

<style lang="scss" scoped>
.robot {
  position: fixed;
  bottom: 10%;
  right: 6%;

  &-box {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
        rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    }
  }
}

.chat-model {
  position: absolute;
  right: 0;
  bottom: 70px;
  width: 380px;
  height: 500px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;

  :deep(.ant-card-head) {
    padding: 0 14px;
    min-height: 50px;
  }
  :deep(.ant-card-body) {
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
    }
  }
}
</style>
