<template>
  <div>
    <Panel
      :visible="open"
      :hasFooter="false"
      width="48%"
      @closed="handleClosed"
    >
      <template #header>
        <h4 class="a-title">
          <i>{{ data.QS }}</i>
        </h4>
      </template>
      <template #content>
        <!-- 问题解答 -->
        <div v-if="data.MDMETA">
          <div>
            <!-- <header>
              <div class="flex-end">
                <span @click="triggerPage(data)">切换</span>
              </div>
            </header> -->
            <div v-show="!data.isMD" v-html="data.MDPARSE"></div>
            <CodeBlock v-show="data.isMD" :code="data.MDMETA" />
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

// /**
//  * @description 切换 md排版 和 解析后的 html
//  * @param c
//  */
// const triggerPage = (c: any) => {
//   c.isMD = !c.isMD;
// };
</script>

<style scoped>
.a-title {
  color: rgba(78, 121, 221, 0.986);
  margin: 10px;
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
