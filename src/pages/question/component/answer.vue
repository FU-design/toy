<template>
  <div>
    <Panel
      :visible="open"
      :hasFooter="false"
      width="80%"
      @closed="handleClosed"
    >
      <template #header>
        <div class="a-title">
          <i>{{ data.QS }}</i>
        </div>
      </template>
      <template #content>
        <!-- 问题解答 -->
        <div v-if="data.MDMETA">
          <div>
            <header>
              <div @click.stop="triggerPage(data)" class="flex-end a-switch">
                <!-- <span> html </span> -->
                <div
                  :class="[data.isMD ? 'l-s' : 'r-s']"
                  class="switch-item"
                ></div>
                <!-- <span> md </span> -->
              </div>
            </header>
            <div
              class="a-content transition"
              :class="[data.isMD ? 'off' : 'on']"
              v-html="data.MDPARSE"
            ></div>
            <CodeBlock
              :class="[data.isMD ? 'on' : 'off', 'transition']"
              :code="data.MDMETA"
            />
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
interface Answer {
  open: boolean;
  dataInfo: any;
}

const props = withDefaults(defineProps<Answer>(), {
  open: false,
  dataInfo: () => {
    return {};
  },
});

watch(
  () => props.open,
  (val) => {
    open.value = val;
  }
);

const open = ref<boolean>(false);
const data = ref(computed(() => props.dataInfo));
const emits = defineEmits(["update:open", "closed"]);

/**
 * @description 关闭回调
 * @param show
 */
const handleClosed = (show: boolean) => {
  open.value = show;
  emits("update:open", show);
  emits("closed", show);
};

/**
 * @description 切换 md排版 和 解析后的 html
 * @param c
 */
const triggerPage = (c: any) => {
  c.isMD = !c.isMD;
};
</script>

<style scoped>
.transition {
  transition: all 0.8s;
}
.a-title {
  margin: 10px;
}
.a-title i {
  font-weight: 600;
  color: rgba(78, 121, 221, 0.986);
  font-size: 16px;
}
.a-content {
  width: 60%;
  margin: 0 auto;
}

.a-switch {
  width: 48px;
  height: 28px;
  cursor: pointer;
  border-radius: 20px;
  position: relative;
  border: 2px solid #000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.switch-item {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 100%;
  transition: all 0.5s;
}

.l-s {
  transform: translateX(-100%);
}

.r-s {
  transform: translateX(-20%);
}

.on {
  transform: translateX(0);
}

.off {
  transform: translateX(-100%);
  position: absolute;
  left: -100000px;
}

.a-switch > span:last-child {
  flex: 2;
  text-align: end;
}

/* .flex-end span { */
/* background-color: #282c34;
  color: #abb2bf;
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  box-sizing: border-box; */
/* } */
</style>
