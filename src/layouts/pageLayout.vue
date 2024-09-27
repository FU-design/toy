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
import SideBar from "./side/sidebar.vue";
</script>

<style lang="scss" scoped>
.page-layout {
  height: 100%;
  &-content {
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    section {
      height: 100%;
      padding: 64px;
      overflow: auto;
    }
  }
}
</style>
