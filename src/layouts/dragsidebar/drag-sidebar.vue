<template>
  <float-button>
    <template #default>
      <sidebar />
    </template>
  </float-button>
</template>

<script setup lang="ts">
import sidebar from "@/layouts/side/sidebar.vue";
</script>

<style lang="scss" scoped></style>
