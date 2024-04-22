<template>
  <div
    class="tag-text-mixinput"
    ref="tagTextMixinputRef"
    :data-placeholder="placeholder"
    :contenteditable="contenteditable"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface mixConfig {
  contenteditable?: boolean;
  placeholder?: string;
  contents?: InnerOps[];
}

interface InnerOps {
  type: "tag" | "text";
  text: string;
  [propKey: string]: any;
}

const config = {
  attributes: true,
  childList: true,
  subtree: true,
  // characterData: true, // 修改字符是否发生改变(默认false)
};

const props = withDefaults(defineProps<mixConfig>(), {
  contenteditable: true,
  placeholder: "请输入",
  contents: () => [],
});

const tagTextMixinputRef = ref<HTMLElement | null>(null);
const observer = ref<MutationObserver | null>();
const range = ref<Range | null>(null);

/**
 * 处理混合输入框的获取焦点事件
 * @param e
 */
const handleFocus = (_e: Event) => {
  const selection = getSelection();
  if (!["I"].includes(selection?.focusNode?.parentNode?.nodeName || "")) {
    if (!range.value) {
      range.value = new Range();
      // range.value.collapse(true); // 将 range 的边界折叠到起点（即光标选取范围的起始和结束边界折叠到起始边界，默认是 false 结束边界）
      selection?.removeAllRanges();
      selection?.addRange(range.value);
    } else {
      range.value.collapse(true); // 这里需要折叠边界（不折叠，会在插入元素节点后，自动的将其全部选中）
      selection?.removeAllRanges();
      selection?.addRange(range.value);
    }
  }
  // 恢复监听
  if (!observer.value) {
    observer.value = new MutationObserver(handleObserver);
  }
  observer.value?.observe(tagTextMixinputRef.value as Node, config);
};

/**
 * 处理混合输入框的失去焦点事件
 * @param _e
 */
const handleBlur = (_e: Event) => {
  //! 关键代码
  range.value = getSelection()?.getRangeAt(0) || null;
  //从 MutationObserver 的通知队列中删除所有待处理的通知
  observer.value?.takeRecords();
  //失去焦点，停止监听
  observer.value?.disconnect();
};

const handleObserver = (
  mutations: MutationRecord[],
  _observer: MutationObserver
) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      console.log("childList :>> ");
    }
    if (mutation.type === "attributes") {
      console.log("attributes :>> ");
    }
    if (mutation.type === "characterData") {
      console.log("characterData :>> ");
    }
  });
};

const initEvent = () => {
  tagTextMixinputRef.value?.addEventListener("focus", handleFocus);
  tagTextMixinputRef.value?.addEventListener("blur", handleBlur);
};

/**
 * 初始化当前混合输入框中的内容
 */
const initContents = () => {
  if (props.contents.length <= 0) {
    return;
  }
  const fragment = document.createDocumentFragment();
  props.contents.forEach((v: InnerOps) => {
    fragment.appendChild(creataNode(v));
  });
  tagTextMixinputRef.value?.appendChild(fragment);
};

/**
 * 在光标位置插入新的 tag
 * @param item
 */
const insertTag = (item: InnerOps) => {
  if (!range.value) {
    return;
  }
  const { startContainer: start, endContainer: end } = range.value;
  // 检查范围的起始点和结束点是否在不可编辑的子节点中
  if (
    start.parentElement?.tagName == "I" ||
    end.parentElement?.tagName == "I"
  ) {
    return;
  }

  const tag = creataNode(item);
  // 清除已经选择的内容
  range.value.deleteContents();
  // 插入新的元素节点在当前的光标位置
  range.value.insertNode(tag);
  // 重置光标的起始边界和结束边界
  range.value.setStartAfter(tag);
  range.value.setEndAfter(tag);
  tagTextMixinputRef.value?.focus();
};

/**
 * 根据数据类型创建指定类型的 DOM 对象（自行拓展）
 * @param config
 */
const creataNode = (config: InnerOps): Node => {
  if (config.type === "tag") {
    const tag = document.createElement("i");
    tag.classList.add("tag");
    tag.innerHTML = config.text;
    tag.setAttribute("contenteditable", "false");
    return tag;
  }
  if (config.type === "text") {
    const text = document.createTextNode(config.text || "");
    return text;
  }
  return document.createDocumentFragment();
};

onMounted(() => {
  initEvent();
  initContents();
});

onUnmounted(() => {
  tagTextMixinputRef.value?.removeEventListener("focus", handleFocus);
  tagTextMixinputRef.value?.removeEventListener("blur", handleBlur);
});

defineExpose({
  insertTag,
});
</script>
<style lang="scss">
.tag-text-mixinput {
  min-width: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  caret-color: chocolate; /* 光标颜色 */
  background-color: #eeeeee62;
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
  overflow: auto;
  &::before {
    content: attr(data-placeholder); /* 模拟原生 input 的 placeholder */
    color: #888;

    /* 字体溢出变为省略号 */
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:not(:empty)::before {
    content: "";
  }
  &:focus-visible {
    outline: 0;
    border-color: cornflowerblue;
  }
  .tag {
    padding: 1px 4px;
    margin: 2px;
    display: inline-block;
    line-height: 1.5;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: rgb(102, 156, 202);
  }
}
</style>
