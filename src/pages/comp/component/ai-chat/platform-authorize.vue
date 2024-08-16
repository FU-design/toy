<template>
  <div class="platform-authorize">
    <div v-if="currStep == 0">
      <div class="item" v-for="item of platformAuthorizes">
        <label>{{ item.label }}</label>
        <a-button v-for="option of item.options">
          {{ option }}
        </a-button>
      </div>
    </div>

    <div v-if="currStep == 1">
      
    </div>
  </div>
</template>

<script setup lang="ts">
const platformAuthorizes = [
  {
    label: "请选择下列要授权的平台",
    options: ["OpenAI", "ChatGLM"],
  },
];
const currStep = ref(0);
</script>

<style lang="scss" scoped>
.platform-authorize {
  width: 100%;
  height: 100%;
  .item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    > * {
      margin-bottom: 20px;
    }
  }
}
</style>
