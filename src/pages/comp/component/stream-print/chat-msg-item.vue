<template>
  <div class="flex justify-end w-full my-11">
    <section
      class="flex flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 mr-2"
      v-if="getPosition"
    >
      <img :src="getSvgUrl('cube')" />
    </section>
    <article
      class="flex items-cente rounded-lg"
      :class="[!getPosition ? 'bg-[#e9e9e9]' : 'flex-auto']"
    >
      <div
        class="markdown-body p-4 rounded-lg"
        v-html="parseMDByHighlight(displayedContent)"
      ></div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RoleInfo } from "./request";
import { getSvgUrl } from "@/utils/tool";
import { parseMDByHighlight } from "@/utils/render";

interface Props {
  roleInfo: RoleInfo;
}
const props = defineProps<Props>();
const displayedContent = ref(""); // 用于逐字显示的部分 HTML
const fullContent = ref(props.roleInfo.content); // 解析后的完整 HTML
const getPosition = computed(() => props.roleInfo.role === "assistant");

const typeText = (text: string, delay = 20) => {
  let index = 0;
  const interval = setInterval(() => {
    displayedContent.value += text[index];
    index += 1;
    if (index >= text.length) {
      clearInterval(interval);
    }
  }, delay);
};

onMounted(() => {
  typeText(fullContent.value);
});
</script>

<style>
.markdown-body {
  background-color: #ffffff; /* 背景色设置为白色 */
  color: #333333; /* 文字颜色设置为深灰色 */
  padding: 20px;
  border-radius: 10px;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  color: #000000; /* 标题文字颜色为黑色 */
}

.markdown-body a {
  color: #007bff; /* 链接颜色为蓝色 */
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body ul {
  list-style-type: disc; /* 设置无序列表使用圆点 */
  margin-left: 20px; /* 确保列表项有足够的缩进 */
  margin-bottom: 10px;
}

.markdown-body ul li {
  margin-bottom: 20px; /* 增加列表项之间的间距 */
}

/* .markdown-body {
  background-color: #1e1e1e; 
  color: #dcdcdc; 
  padding: 20px;
  border-radius: 10px;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  color: #ffffff; 
}

.markdown-body code {
  background-color: #333333; 
  color: #ffffff; 
}

.markdown-body pre code {
  background-color: #2d2d2d; 
  color: #dcdcdc; 
  padding: 10px;
  border-radius: 8px;
}

.markdown-body a {
  color: #4fa3ff; 
} */
</style>
