<template>
  <div class="flex justify-end w-full my-11">
    <section class="flex flex-shrink-0 w-8 h-8 rounded-full border border-[#34495E] bg-[#B0BEC5] mr-2" v-if="isAssistant">
      <svg-icon name="robot" />
    </section>
    <article class="flex items-cente rounded-lg" :class="[!isAssistant ? 'bg-[#2A2A2A]' : 'flex-auto']">
      <marked-view v-if="isAssistant" class="markdown-body p-4 rounded-lg" :mark-raw="roleInfo.content"></marked-view>
      <div v-else class="markdown-body p-4 rounded-lg">{{ roleInfo.content }}</div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RoleInfo } from "./request";

type Props = {
  roleInfo: RoleInfo;
}
const props = defineProps<Props>();
const { roleInfo } = props
const isAssistant = computed(() => props.roleInfo.role === "assistant");
</script>