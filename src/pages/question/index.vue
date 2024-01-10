<template>
  <div class="question">
    <div class="q-box-wrapper" v-for="qs in qModule">
      <div class="q-box">
        <!-- 内容 -->
        <h1
          class="q-title"
          :class="[
            qs.cardColor,
            currBox?.includes(qs.category) ? 'q-title-expend' : '',
          ]"
          @click="openContent(qs)"
        >
          {{ qs.category }}
        </h1>
        <!-- v-if="currBox?.includes(qs.category)" ---@note：开启折叠 -->
        <div class="q-content">
          <!-- 问题列表 -->
          <ul>
            <li v-for="(c, i) in qs.qestionList" :key="i">
              <div
                class="q-sub-title"
                :class="`${qs.cardColor}-word`"
                @click.stop="openAnswer(c)"
              >
                {{ c.QS }}
              </div>
            </li>
          </ul>
          <!-- 学习连接 -->
          <div class="source" v-if="qs.source">
            <div>参考：</div>
            <template v-for="s in qs.source">
              <a :href="s.url" target="_blank"> {{ s.url }}</a>
            </template>
          </div>
        </div>
      </div>
    </div>
    <Answer v-model:open="visible" :data-info="currQsInfo" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { QS } from "./questions";
import Answer from "./component/answer.vue";

const visible = ref<boolean>(false);
const qModule = ref<any>(QS);
const currBox = ref<any>([]);
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

<style scoped>
@import url("../../theme/common/question.css");
.source {
  padding: 1rem;
  box-sizing: border-box;
}
.vue {
  background-image: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
}
.vue-word {
  color: #213547;
}
</style>
