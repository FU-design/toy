<template>
  <div class="scroll-more-data">
    <div class="scroll-wrapper">
      <ul class="scroll-box">
        <li v-for="(v, i) in listData.slice(0, eachSize)" :key="v">
          <!-- 默认作用域插槽 -->
          <slot :$row="v" :$idx="i">{{ v }}</slot>
        </li>
        <li class="loading" v-show="isLoading && eachSize <= listData.length">
          加载中。。。
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  listData: any[];
  eachSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  listData: [] as any,
  eachSize: 50,
});

const listData = ref<any[]>(computed(() => props.listData) as unknown as any[]);
const eachSize = ref<number>(props.eachSize);
const wrapBox = ref<Element | null>(null);
const isLoading = ref<boolean>(false);

/**
 * 监听滚动事件，递增数据叠加
 */
const initEvent = () => {
  wrapBox.value = document.querySelector(".scroll-wrapper");
  unref(wrapBox)?.addEventListener("scroll", (e) => {
    const target = e.target as Element;
    if (target.scrollHeight - target.scrollTop == target.clientHeight) {
      isLoading.value = true;
      setTimeout(() => {
        eachSize.value += 50;
        isLoading.value = false;
      }, 2000);
    }
  });
};

/**
 * 组件销毁前移除监听事件
 */
const removeEvent = () => {
  unref(wrapBox)?.removeEventListener("scroll", () => {});
};

onMounted(() => {
  initEvent();
});

onBeforeMount(() => {
  removeEvent();
});
</script>

<style scoped>
.scroll-wrapper {
  height: 400px;
  overflow: auto;
}
.scroll-wrapper ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.scroll-wrapper ul .loading {
  border: none;
  text-align: center;
}
</style>
