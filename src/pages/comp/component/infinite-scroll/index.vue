<template>
  <div class="infinite-scroll">
    <card-box>
      <template #header>
        <div class="container-header">
          <div>
            {{ selects[selected].label }}
          </div>
          <div>
            <a-select v-model:value="selected" placeholder="Select a infiniteScroll" :options="selects"></a-select>
          </div>
        </div>
      </template>
      <div :id="selects[selected].label" class="container-wrp">
        <transition-group name="list" tag="ul">
          <ul class="container" v-if="selected == 0">
            <li v-for="(item, idx) of dataSource">
              <img :src="imgs[idx]" />
              <p>pic-code:{{ item }}</p>
            </li>
          </ul>
          <ul class="container" v-if="selected == 1">
            <li v-for="(item, idx) of dataSource">
              <img :src="imgs[idx]" />
              <p>pic-code:{{ item }}</p>
            </li>
          </ul>
          <ul class="container" v-if="selected == 2">
            <li v-for="(item, idx) of dataSource">
              <img :src="imgs[idx]" />
              <p>pic-code:{{ item }}</p>
            </li>
          </ul>
        </transition-group>
        <div id="loading-flag" v-show="selected == 1">加载中......</div>
      </div>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { mockData, getImgsUrlList } from "@/utils/mock";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { VanillaInfiniteScroll } from "./vanilla-infinite-scroll";
import { ObserverInfiniteScroll } from "./observer-infinite-scroll";
import { VirtualInfiniteScroll } from "./virtual-infinite-scroll";

interface Selected {
  value: number;
  label: string;
}

type ClassType = VanillaInfiniteScroll | ObserverInfiniteScroll | VirtualInfiniteScroll

const selects: Selected[] = [
  {
    value: 0,
    label: "vanilla-infinite-scroll",
  },
  {
    value: 1,
    label: "observer-infinite-scroll",
  },
  {
    value: 2,
    label: "virtual-infinite-scroll",
  },
];

const size = 50;
const dataSource = ref<string[]>([]);
const imgs = ref<string[]>([]);
const obersver = ref<ClassType>();
const selected = ref<number>(selects[0].value);

const getList = async () => {
  const res = await mockData(size);
  dataSource.value = [...dataSource.value, ...res.data];
  imgs.value = [...imgs.value, ...getImgsUrlList(size, 200, 100)];
};

const setScrollObersver = (type: number) => {
  if (type === 0) {
    const container = document.querySelector(`#${selects[type].label}.container-wrp`);
    obersver.value = new VanillaInfiniteScroll(container, getList, 500);
  } else if (type === 1) {
    const container = document.querySelector(`#${selects[type].label}.container-wrp`);
    const loadingFlag = document.querySelector('#loading-flag')
    const options = {
      root: container,
      rootMargin: "0px",
      threshold: 1.0, // 阈值: 目标可见度达到多少百分比时，观察器的回调就应该执行；1.0 标识目标元素完全出现在 root 选项指定的元素中 100% 可见时，回调函数将会被执行
    }
    obersver.value = new ObserverInfiniteScroll(loadingFlag, getList, options);
  } else {
  }
};

const clearScrollObersver = (type: number) => {
  if (!obersver.value) return
  if (type === 0 && obersver.value instanceof VanillaInfiniteScroll) {
    obersver.value.clearUpObersever()
  } else if (type === 1 && obersver.value instanceof ObserverInfiniteScroll) {
    obersver.value.clearUpObersever()
  } else {

  }
}

watch(selected, (val) => {
  dataSource.value = []
  getList()
  setScrollObersver(val);
});

onMounted(() => {
  getList();
  setScrollObersver(selected.value);
});

onUnmounted(() => {
  clearScrollObersver(selected.value)
});
</script>

<style lang="scss" scoped>
.container-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.container-wrp {
  height: 500px;
  overflow: auto;

  .container {
    display: flex;
    flex-wrap: wrap;


    li {
      flex: 0 1 calc(100% / 4 - 8px);
      padding: 4px;
      margin: 4px;
      box-sizing: border-box;
      border: 1px solid #000;

    }
  }
  #loading-flag{
    padding: 10px 0;
    text-align: center;
  }
}



.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
