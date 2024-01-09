<template>
  <div class="code-block">
    <highlightjs autodetect :code="codeStr" />
  </div>
</template>

<script setup lang="ts">
interface Code {
  code?: string;
}
import { computed, onMounted } from "vue";
const props = withDefaults(defineProps<Code>(), {
  code: "",
});
const codeStr = computed(() => props.code);

/**
 * @description 初始化代码块
 */
const initCodeBlock = () => {};

onMounted(() => {
  initCodeBlock();
});
</script>

<style>
@import url("highlight.js/styles/atom-one-dark.css");
.code-block {
  width: 100%;
  height: auto;
}
/* 重置 highLight.js 中代码字体样式 */
code,
kbd,
pre,
samp {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  font-size: 0.9rem;
  line-height: 24px;
}

.hljs {
  border-radius: 0.4rem;
}
</style>
