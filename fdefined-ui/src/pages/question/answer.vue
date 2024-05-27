<template>
  <div class="answer">
    <div v-html="data.MDPARSE"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref<any>({});

watch(route, (val) => {
  data.value = val.meta;
});
</script>

<style scoped>
.answer {
  padding: 5% 10%;
}
</style>
