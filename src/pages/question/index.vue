<template>
  <div class="question">
    <ul class="q-box">
      <template v-for="qs in qModule">
        <li class="q-item" v-if="qs.logo">
          <IconProvider :size="40">
            <component :title="qs.category" :is="qs.logo"></component>
          </IconProvider>
        </li>
      </template>
    </ul>
    <Answer v-model:open="visible" :data-info="currQsInfo" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { QS } from "./questions";
import Answer from "./component/answer.vue";
import { IconProvider } from "@twist-space/vue3-icons";

const visible = ref<boolean>(false);
const qModule = ref<any>(QS);
const currBox = ref<any>([]); // 折叠卡片收集器
const currQsInfo = ref<any>();

/**
 * @description 打开内容
 * @param c
 */
const openAnswer = (c: any) => {
  currQsInfo.value = toRaw(c);
  visible.value = true;
};

/**
 * @description 打开折叠内容
 */
const openContent = (qs: any) => {
  const hasBox = currBox.value.findIndex((v: any) => v == qs.category);
  if (hasBox == -1) {
    currBox.value.push(qs.category);
  } else {
    currBox.value.splice(hasBox, 1);
  }
};
</script>
<style lang="scss" scoped>
@mixin f-ctr {
  display: flex;
  align-items: center;
  justify-content: center;
}
.f-col-ctr {
  display: flex;
  align-items: center;
}
.f-row-ctr {
  display: flex;
  justify-content: center;
}
/* @import url("../../theme/common/question.css"); */
.question {
  width: 70vw;
  height: calc(100vh - 60px);
  position: relative;
  background-color: rgba(235, 212, 212, 0.164);
  margin: 0 auto;
  box-sizing: border-box;
}
.q-box {
  position: absolute;
  left: -4rem;
  top: 0;
  padding: 8px;
  margin: 0;
  list-style: none;
  font-size: 1.5rem;
  cursor: pointer;

  .q-item {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    &:hover {
      // filter: drop-shadow(16px 16px 20px rgba(34, 34, 34, 0.411));
      filter: drop-shadow(5px 5px 0 red) hue-rotate(180deg)
        drop-shadow(5px 5px 0 red);
      transition: all 0.5s ease 0s;
    }
  }
}
</style>
