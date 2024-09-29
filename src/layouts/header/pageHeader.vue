<template>
  <header
    ref="headerRef"
    :style="{
      height: 200 - currHeight >= 20 ? `calc(200px - ${currHeight}px)` : '30px',
    }"
  >
    <img :src="logo" />
  </header>
</template>

<script setup lang="ts">
const headerRef = ref<HTMLElement | null>(null);
const currHeight = ref(0);
const logo = computed(() => getImageUrl("logo"));

const setupScrollListener = () => {
  document
    .querySelector(".page-layout-content")
    ?.addEventListener("scroll", (e: Event) => {
      currHeight.value = (e.target as Element)?.scrollTop;
    });
};

onMounted(() => {
  setupScrollListener();
});
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 200px;
  padding: 6px 0;
  @include glass(10px, 0px);
  @include flex(center, center);
  background-color: $content-background-color;
  box-shadow: 0 0 2px $shadow-medium;
  position: sticky;
  img {
    height: 20px;
  }
}
</style>
