<template>
  <div class="page-view">
    <PageLayout>
      <router-view></router-view>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import PageLayout from "./pageLayout.vue";
</script>

<style scoped>
.page-view {
  width: 100%;
  height: 100%;
  /* background-color: aliceblue; */
  background-color: #f2f3f5;
}
</style>
