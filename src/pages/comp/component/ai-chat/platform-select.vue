<template>
  <div class="platform-select" v-show="1">
    <select-menu :selectData="platformSelects" @select="onSelect"></select-menu>
  </div>
</template>

<script setup lang="ts">
import SelectMenu from "./select-menu.vue";
import PreChat from "./pre-chat.vue";
import type { SelectData, Option } from "./select-menu.vue";

interface PlatformSelectProps {
  currPage?: Option;
}

const platformSelects = computed<SelectData[]>(() => (
  [
    {
      subTitle: "请选择下列已授权的平台",
      emptyOptionsText: "暂无授权平台",
      hasDel: true,
      options: [],
    },
    {
      subTitle: "或者你可以",
      hasDel: false,
      options: [
        {
          action: "ADD_NEW_PLATFORM",
          name: "授权新平台",
        },
      ],
    },
  ]
));

defineProps<PlatformSelectProps>();
const emits = defineEmits(["update:currPage"]);
const onSelect = (option: Option) => {
  emits("update:currPage", option);
};
</script>

<style lang="scss" scoped></style>
