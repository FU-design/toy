<template>
  <div class="node-box">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.node-box {
  width: 100%;
  height: auto;
  // background-color: #0000001c;
  text-align: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
</style>
