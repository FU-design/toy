<template>
  <header ref="headerRef">
    <img :src="logo" />
  </header>
</template>

<script setup lang="ts">
const headerRef = ref<HTMLElement | null>(null);
const logo = computed(() => getImageUrl('logo'));
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 30px;
  padding: 6px 0;
  @include glass(10px, 0px);
  @include flex(center, center);
  background-color: $content-background-color;
  box-shadow: 0 0 2px $shadow-medium;
  position: sticky;
  transition: all 0.5s ease-out;
  // background-image: url("../../assets/images/banner1.jpg");
  // background-size: cover; /* 保持图片完整显示 */
  // background-repeat: no-repeat; /* 防止图片重复 */
  // background-position: center; /* 使图片居中 */
  img {
    height: 20px;
  }
}
</style>
