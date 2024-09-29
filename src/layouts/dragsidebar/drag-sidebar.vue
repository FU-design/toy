<template>
  <float-button :is-rotate="fold" @click="handleExpand">
    <template #default>
      <div>
        <sidebar />
      </div>
    </template>
  </float-button>
</template>

<script setup lang="ts">
import sidebar from "@/layouts/side/sidebar.vue";
import { storeToRefs } from "pinia";
const side = sideBar();
const { fold } = storeToRefs(side);
const handleExpand = () => {
  side.setSideState(!fold.value);
};
</script>

<style lang="scss" scoped></style>
