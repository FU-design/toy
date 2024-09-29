<template>
  <div class="page-layout">
    <pageHeader />
    <main class="page-layout-content">
      <section>
        <slot></slot>
      </section>
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import PageHeader from "./header/pageHeader.vue";
</script>

<style lang="scss" scoped>
.page-layout {
  height: 100%;
  position: relative;
  &-content {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    scroll-behavior: smooth;
    background-color: $background-color;
    section {
      padding-bottom: 240px;
      margin: 0 auto;
      width: 80%;
    }
  }
}
</style>
