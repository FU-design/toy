<template>
  <div
    class="tag-text-mixinput"
    ref="tagTextMixinputRef"
    :data-placeholder="placeholder"
    :contenteditable="contenteditable"
  ></div>
</template>

<script setup lang="ts">
import { InnerOps, mixConfig, NodeInfo } from "./type";

const props = withDefaults(defineProps<mixConfig<InnerOps>>(), {
  contenteditable: true,
  placeholder: "请输入",
  contents: () => [],
});

const emits = defineEmits(["focus", "blur", "change", "update:contents"]);

const tagTextMixinputRef = ref<HTMLElement | null>(null);
const observer = ref<MutationObserver | null>();
const range = ref<Range | null>(null);

/**
 * 处理混合输入框的获取焦点事件
 * @param e
 */
const handleFocus = (e: Event) => {
  const selection = getSelection();
  if (!["I"].includes(selection?.focusNode?.parentNode?.nodeName || "")) {
    restSelection(selection);
  }
  // 恢复监听
  if (!observer.value) {
    observer.value = new MutationObserver(handleObserver);
  }
  observer.value?.observe(tagTextMixinputRef.value as HTMLElement, NodeInfo);
  emits("focus", e);
};

/**
 * 重置光标选中范围
 * @param selection
 */
const restSelection = (selection: Selection | null) => {
  if (!selection) {
    return;
  }
  if (!range.value) {
    range.value = new Range();
  }
  range.value.collapse(true); // 这里需要折叠边界（不折叠，会在插入元素节点后，自动的将其全部选中）
  selection?.removeAllRanges();
  selection?.addRange(range.value);
};

/**
 * 处理混合输入框的失去焦点事件
 * @param e
 */
const handleBlur = (e: Event) => {
  //! 关键代码----> 存储失去焦点前的选择范围对象（后续外部选择插入数据的前置操作）
  range.value = getSelection()?.getRangeAt(0) || null;
  //从 MutationObserver 的通知队列中删除所有待处理的通知
  observer.value?.takeRecords();
  //失去焦点，停止监听（这里不能停止监听）
  // observer.value?.disconnect();
  emits("blur", e);
};

/**
 * 因使用 contenteditable 属性为 true的元素不像表单控件拥有 change 事件，且使用 input 的事件
 * 无法监听到DOM元素的插入和删除，只能监听到键盘输入内容的变化，故使用mutationObserver来平替
 * @param mutations
 * @param _observer
 */
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
  emits("change", formatMixInputContent());
  emits("update:contents", formatMixInputContent());
};

/**
 * 初始化当前混合输入框中的内容
 */
const initContents = () => {
  const len = props.contents.length;
  if (len <= 0) {
    return;
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < len; i++) {
    fragment.appendChild(creataNode(props.contents[i]));
  }
  tagTextMixinputRef.value?.appendChild(fragment);
};

/**
 * 将当前文本输入框中的DOM内容格式化为JSON格式 （自行拓展）
 */
const formatMixInputContent = () => {
  const formatData: InnerOps[] = [];
  const childNodes = tagTextMixinputRef.value?.childNodes;
  if (childNodes) {
    const len = childNodes?.length || 0;
    for (let i = 0; i < len; i++) {
      if (childNodes[i].nodeName === "I") {
        formatData.push({
          type: "tag",
          text: childNodes[i].textContent || "",
        });
      } else {
        formatData.push({
          type: "text",
          text: childNodes[i].textContent || "",
        });
      }
    }
  }
  return formatData;
};

/**
 * 在光标位置插入新的 tag （自行拓展）
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
 * @param NodeInfo
 */
const creataNode = (NodeInfo: InnerOps): Node => {
  if (NodeInfo.type === "tag") {
    const tag = document.createElement("i");
    tag.classList.add("tag");
    tag.innerHTML = NodeInfo.text;
    tag.setAttribute("contenteditable", "false");
    return tag;
  }
  if (NodeInfo.type === "text") {
    const text = document.createTextNode(NodeInfo.text || "");
    return text;
  }
  return document.createDocumentFragment();
};

/**
 * 初始化所用事件
 */
const initEvent = () => {
  tagTextMixinputRef.value?.addEventListener("focus", handleFocus);
  tagTextMixinputRef.value?.addEventListener("blur", handleBlur);
};

/**
 * 外部方法：清除所有绑定的事件
 */
const removeAllEvent = () => {
  tagTextMixinputRef.value?.removeEventListener("focus", handleFocus);
  tagTextMixinputRef.value?.removeEventListener("blur", handleBlur);
};

onMounted(() => {
  initEvent();
  initContents();
});

onUnmounted(() => {
  removeAllEvent();
});

defineExpose({
  insertTag,
  removeAllEvent,
});
</script>
<style lang="scss">
.tag-text-mixinput {
  min-width: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 10px;
  caret-color: chocolate; /* 光标颜色 */
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
  overflow: auto;
  white-space: normal;
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
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    color: cornflowerblue;
  }
}
</style>
