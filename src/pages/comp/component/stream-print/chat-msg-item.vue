<template>
  <div class="flex justify-end w-full my-11">
    <section class="flex flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 mr-2" v-if="isAssistant">
      <img :src="getSvgUrl('cube')" />
    </section>
    <article class="flex items-cente rounded-lg" :class="[!isAssistant ? 'bg-[#e9e9e9]' : 'flex-auto']">
      <marked-view v-if="isAssistant" class="markdown-body p-4 rounded-lg" :mark-raw="roleInfo.content"></marked-view>
      <div v-else class="markdown-body p-4 rounded-lg">{{ roleInfo.content }}</div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RoleInfo } from "./request";
import { getSvgUrl } from "@/utils/tool";

type Props = {
  roleInfo: RoleInfo;
}
const props = defineProps<Props>();
const { roleInfo } = props
const isAssistant = computed(() => props.roleInfo.role === "assistant");
</script>