<template>
  <div>
    <card-box>
      <template #header> 瀑布流实现（js） </template>
      <div class="warefall-flow">
        <div class="grid">
          <div class="item" v-for="url in items">
            <img :src="url" alt="404" @load="handleResize" />
          </div>
        </div>
      </div>
    </card-box>

    <card-box>
      <template #header>
        <div>实现方式</div>
      </template>
      <marked-view v-once :mark-raw="helper"></marked-view>
    </card-box>
  </div>
</template>

<script lang="ts" setup>
import helper from './helper.md?raw';
import { layoutWarefall, loadScroll } from './warefallFlowUtil';

const items = ref<string[]>([]);
const clear = ref<() => void>();

// 模拟获取图片数据
const getImgUrls = async () => {
  const res = await getImgs();
  items.value = [...items.value, ...res];
};

const handleResize = () => {
  layoutWarefall('.grid');
};

const initEvent = () => {
  getImgUrls();
  clear.value = loadScroll('.warefall-flow', () => {
    console.log('nihao :>> ');
    getImgUrls();
  });
  window.addEventListener('resize', handleResize);
};

const clearEvent = () => {
  clear.value && clear.value();
  window.removeEventListener('resize', handleResize);
};

onMounted(() => {
  initEvent();
});

onBeforeUnmount(() => {
  clearEvent();
});
</script>

<style lang="scss" scoped>
.warefall-flow {
  height: 500px;
  overflow: auto;
}

.item {
  background-color: $background-color;
  border: 1px solid $border-color;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 2px 5px $shadow-light;
  opacity: 0;
  /* transition: all 0.3s; */

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
