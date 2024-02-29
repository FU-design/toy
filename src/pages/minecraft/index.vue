<template>
  <div>
    <img width="300" height="300" :src="bueaty1" />
    <img width="300" height="300" :src="bueaty2" />
  </div>
</template>

<script lang="ts" setup>
// 1.引入方式-相对路径的方式
import bueaty1 from "@/assets/images/beauty.jpg";

// 2.引入方式-vite.config 中配置别名
import bueaty2 from "@assets/images/godness.png";
</script>

<style lang="scss" scoped></style>
