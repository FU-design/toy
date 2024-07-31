<template>
  <div>
    <card-box>
      <div class="img-wrp">
        <div v-for="(url, index) in imgs" :key="index">
          <img
            src="https://dummyimage.com/400x200/ddd/888"
            alt="404"
            :data-src="url"
          />
        </div>
      </div>
    </card-box>
    <card-box>
      <template #header>
        <div>实现方式</div>
      </template>
      <div v-once v-md="README"></div>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import README from "./README.md?raw";
import { getImgs } from "@/utils/mock";

const imgs = ref<string[]>([]);

// 模拟获取图片数据
const getImgUrls = async () => {
  const res = await getImgs(170, 200);
  imgs.value = res;
  await nextTick(); // 确保 DOM 更新完毕
  setIntersectionObserver();
};

// Intersection Observer 的回调函数
const intersectionCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target as HTMLImageElement;
      img.src = img.dataset.src || ""; // 将 data-src 的值赋给 src
      observer.unobserve(img); // 图片加载后取消观察
    }
  });
};

const setIntersectionObserver = () => {
  const lazyImgs = document.querySelectorAll("img[data-src]");
  const options = {
    root: document.querySelector(".img-wrp"),
    rootMargin: "0px",
    threshold: 0.1,
  };
  const observer = new IntersectionObserver(intersectionCallback, options);
  lazyImgs.forEach((lazyImage) => observer.observe(lazyImage));
};

onMounted(() => {
  getImgUrls();
});
</script>

<style lang="scss" scoped>
.img-wrp {
  display: flex;
  flex-wrap: wrap;
  max-height: 500px;
  overflow: auto;
  div {
    margin-right: 1%;
    text-align: center;
    flex: 0 1 calc(100% / 4 - 1%);
    &:nth-of-type(4n) {
      margin-right: 0;
    }
  }
}
</style>
