<template>
  <div>
    <card-box>
      <div class="img-wrp">
        <div class="img-box">
          <div v-for="(url, index) in imgs" :key="index">
            <img
              src="https://dummyimage.com/400x200/ddd/888"
              alt="404"
              :data-src="url"
            />
          </div>
        </div>
      </div>
    </card-box>
    <card-box>
      <template #header>
        <div>实现方式</div>
      </template>
      <marked-view :mark-raw="helper"></marked-view>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import helper from "./helper.md?raw";
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
    root: document.querySelector(".img-wrp"), // 当前监听的元素所交叉的父元素（必须是父元素）默认是文档的视口（null）
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
  height: 500px;
  overflow: auto;
  position: relative;
}

.img-box {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  left: 50%;
  transform: translateX(-50%);

  div {
    margin: 0.5em;
    text-align: center;
    flex: 0 1 calc((100% / 4) - 1em);
  }
}
</style>
