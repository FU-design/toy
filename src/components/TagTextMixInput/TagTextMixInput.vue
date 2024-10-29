<template>
  <div
    class="tag-text-mixinput"
    ref="tagTextMixinputRef"
    :data-placeholder="placeholder"
    :contenteditable="true && !props.disabled"
    :class="{ 'tag-text-mixinput--deactive': props.disabled }"
  ></div>
</template>

<script setup lang="ts">
export interface ContentItem {
  type: "tag" | "text";
  text: string;
  [propKey: string]: any;
}

export interface MixConfig {
  disabled?: boolean;
  placeholder?: string;
  contents?: ContentItem[];
}

export interface ListItem {
  inputContent: ContentItem[];
  [propKey: string]: any;
}

const nodeInfo = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true, // 修改字符是否发生改变(默认false)
};

const props = withDefaults(defineProps<MixConfig>(), {
  disabled: false,
  placeholder: "请输入",
  contents: () => [],
});

const tagTextMixinputRef = ref<HTMLElement | null>(null);
const observer = ref<MutationObserver | null>();
const range = ref<Range | null>(null);
const emits = defineEmits(["focus", "blur", "change", "update:contents"]);

/**
 * 处理混合输入框的获取焦点事件
 * @param e
 */
const onFocus = (e: Event) => {
  const selection = window.getSelection();
  if (!["I"].includes(selection?.focusNode?.parentNode?.nodeName || "")) {
    // 判断当前用户选择的光标是否是落在 tag 上，不是则重置光标所在范围
    restSelection(selection);
  }
  // 恢复监听
  if (!observer.value) {
    observer.value = new MutationObserver(handleObserver);
  }
  observer.value?.observe(tagTextMixinputRef.value as HTMLElement, nodeInfo);
  emits("focus", e);
};

/**
 * 重置光标所在范围
 * @param selection
 */
const restSelection = (selection: Selection | null) => {
  if (!selection) {
    return;
  }
  if (!range.value) {
    range.value = document.createRange();
  }
  range.value.collapse(false); // 折叠边界（不折叠，若在该输入框中存在范围选择时，在插入tag后，在点击输入框获取焦点，会导致焦点无法正常显示出来，仍显示的之前的范围选择的内容）
  selection?.removeAllRanges(); // 清除selection中光标所在的范围元素
  selection?.addRange(range.value);
};

/**
 * 处理混合输入框的失去焦点事件
 * @param e
 */
const onBlur = (e: Event) => {
  range.value = getSelection()?.getRangeAt(0) || null; //! 关键代码----> 存储失去焦点前的选择范围对象（后续外部选择插入数据的前置操作）
  observer.value?.takeRecords(); //从 MutationObserver 的通知队列中删除所有待处理的通知
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
  emits("change", formatMixInputContents());
  emits("update:contents", formatMixInputContents());
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
 * 在光标位置插入新的 tag （自行拓展）
 * @param item
 */
const insertTag = (item: ContentItem) => {
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
  range.value.deleteContents(); // 清除已经选择的内容
  range.value.insertNode(tag); // 插入新的元素节点在当前的光标位置
  tagTextMixinputRef.value?.focus();
};

/**
 * 根据数据类型创建指定类型的 DOM 对象（自行拓展）
 * @param contentItem
 */
const creataNode = (contentItem: ContentItem): Node => {
  if (contentItem.type === "tag") {
    const tag = document.createElement("i");
    tag.classList.add("tag");
    tag.innerHTML = contentItem.text;
    tag.setAttribute("contenteditable", "false");
    return tag;
  }
  if (contentItem.type === "text") {
    const text = document.createTextNode(contentItem.text || "");
    return text;
  }
  return document.createDocumentFragment();
};

/**
 * 将当前文本输入框中的DOM内容格式化为JSON格式 （自行拓展）
 */
const formatMixInputContents = () => {
  const formatData: ContentItem[] = [];
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
 * 初始化所用事件
 */
const initEvent = () => {
  tagTextMixinputRef.value?.addEventListener("focus", onFocus);
  tagTextMixinputRef.value?.addEventListener("blur", onBlur);
};

/**
 * 外部方法：清除所有绑定的事件
 */
const removeAllEvent = () => {
  tagTextMixinputRef.value?.removeEventListener("focus", onFocus);
  tagTextMixinputRef.value?.removeEventListener("blur", onBlur);
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
  border-color: $border-color;
  border-radius: 6px;
  transition: all 0.2s;
  overflow: auto;
  white-space: normal;
  &--deactive {
    background-color: #464646;
  }
  &::before {
    content: attr(data-placeholder); /* 模拟原生 input 的 placeholder */

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
    border-color: $focus-border-color;
  }
  .tag {
    padding: 1px 4px;
    margin: 2px;
    display: inline-block;
    line-height: 1.5;
    border-radius: 4px;
    box-shadow: $shadow-light;
    color: $primary-color;
    border: 1px solid $primary-color;
  }
}
</style>
