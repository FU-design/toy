<template>
  <div class="flex justify-end w-full my-11">
    <section
      class="flex flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 mr-2"
      v-if="getPosition"
    >
      <img :src="getSvgUrl('cube')" />
    </section>
    <article
      class="flex items-cente rounded-lg p-2"
      :class="[!getPosition ? 'bg-[#e9e9e9]' : 'flex-auto']"
    >
      {{ props.roleInfo.content }}
    </article>
  </div>
</template>

<script setup lang="ts">
import { RoleInfo } from "./request";
import { getSvgUrl } from "@/utils/tool";
interface Props {
  roleInfo: RoleInfo;
}
const props = defineProps<Props>();
const getPosition = computed(() => props.roleInfo.role === "assistant");
</script>

<style scoped></style>
