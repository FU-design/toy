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
  &-content {
    height: 100%;
    box-sizing: border-box;
    background-color: $background-color;
    section {
      height: 100%;
      padding: 10px 30vh;
      overflow: auto;
    }
  }
}
</style>
