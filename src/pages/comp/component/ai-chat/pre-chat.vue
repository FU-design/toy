<template>
  <select-menu :select-data="SELECT_MODEL_PLATFORM" />
</template>

<script setup lang="ts">
import SelectMenu from "./select-menu.vue";
import useAIChat from "./ai-chat";
import { storeToRefs } from "pinia";
import type { SelectData, Option } from "./select-menu.vue";

interface PreChatPorps {
  currPage?: Option;
}

const aiChat = useAIChat();
defineProps<PreChatPorps>();
const { currPlatform, } = storeToRefs(aiChat)


const SELECT_MODEL_PLATFORM = computed<SelectData[]>(() => ([{
  subTitle: `请选择您要使用的模型`,
  options: currPlatform.value?.supportModels.split(',').map(v => ({ name: v, action: '' })),
},]));


</script>

<style scoped></style>