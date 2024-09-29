<template>
  <header>
    <img :src="logo" />
  </header>
</template>

<script setup lang="ts">
const logo = computed(() => getImageUrl("logo"));
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  background-color: $content-background-color;
  padding: 6px 0;
  @include glass(10px, 0px);
  @include flex(center, center);
  img {
    height: 20px;
  }
}
</style>
