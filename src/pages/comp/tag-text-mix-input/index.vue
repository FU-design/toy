<template>
  <div class="wrp">
    <!-- <div>
      <label>Selection</label>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Selection"></a>
    </div>
    <div>
      <label>Range</label>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Range"></a>
    </div> -->
    <card-box>
      <div class="wrp-inner">
        <div class="select-plane" @click="handleClick"></div>
        <div class="list-box">
          <div class="list-item" v-for="item in list">
            <div class="item">{{ item.id }}</div>
            <div class="item">{{ item.name }}</div>
            <div class="item">
              <tag-text-mix-input
                :ref="(el) => getMixInputRefs(el, item)"
                :key="item.id"
                placeholder="请输入内容"
                v-model:contents="item.inputContent"
                @focus="handleFocus(item)"
                @change="handleChange"
              />
            </div>
          </div>
        </div>
      </div>
    </card-box>
    <card-box>
      <template #header>
        <label>核心</label>
      </template>
      <marked-view v-once :mark-raw="helper"></marked-view>
      <marked-view v-once :mark-raw="code"></marked-view>
    </card-box>
  </div>
</template>

<script lang="ts" setup>
import TagTextMixInput from "./tagTextMixInput.vue";
import { ListItem, InnerOps, CompType } from "./type";
import { initSelectData, fetchData } from "./request";
import helper from "./helper.md?raw";
import code from "./code.md?raw";

const list = ref<ListItem[]>([]);
const currMixFlag = ref<ListItem>();
const mixInputRef = ref<Map<ListItem, CompType<typeof TagTextMixInput>>>(
  new Map()
);

/**
 * 根据table数据的id存储循环中的子组件实例
 * @param el 子组件实例
 * @param flag table中每一行的数据
 */
const getMixInputRefs = (el: any, flag: ListItem) => {
  mixInputRef.value?.set(flag, el);
};

/**
 * 利用事件冒泡的特性实现每一条点击事件的触发
 * @param e
 */
const handleClick = (e: Event) => {
  const target = e.target as HTMLElement;
  const key = target.getAttribute("data-key");
  if (key) {
    if (currMixFlag.value != undefined) {
      mixInputRef.value?.get(currMixFlag.value)?.insertTag({
        type: "tag",
        text: key,
      });
    }
  }
};

/**
 * 获取table数据
 */
const getList = async () => {
  const res = await fetchData();
  list.value = res as ListItem[];
};

/**
 * 获取当前操作的混合输入框的标识
 * @param flag
 */
const handleFocus = (flag: ListItem) => {
  currMixFlag.value = flag;
};

const handleChange = (val: InnerOps) => {
  console.log("val :>> ", val);
};

onMounted(() => {
  getList();
  initSelectData();
});

onUnmounted(() => {
  mixInputRef.value.clear();
});
</script>

<style lang="scss" scoped>
.wrp-inner {
  display: flex;

  .list {
    &-box {
      flex: 1;
      display: flex;
      height: 400px;
      flex-direction: column;
      border: 1px solid $border-color;
      border-radius: 6px;
      overflow: auto;
    }

    &-item {
      display: flex;
      border-bottom: 1px solid $border-color;

      &:last-child {
        border: none;
      }
    }
  }

  .item {
    width: calc(100% / 3);
    height: 100%;
    padding: 10px;
    border-right: 1px solid $border-color;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:last-child {
      border: none;
    }
  }
}
</style>
<style lang="scss">
.select-plane {
  width: 30%;
  margin-right: 40px;
  height: 400px;
  border-radius: 6px;
  border: 1px solid $border-color;
  background-color: $background-color;
  overflow: auto;

  .select-item {
    padding: 6px;
    background-color: $background-color;
    border-bottom: 1px solid $border-color;
    cursor: pointer;

    &:hover {
      background-color: $button-hover-color;
    }
  }
}
</style>
