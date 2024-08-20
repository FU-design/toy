<template>
  <div class="platform-authorize">
    <div v-if="currPage?.action == 'ADD_NEW_PLATFORM'">
      <select-menu :select-data="ADD_NEW_PLATFORM" @select="onSelect('SELECT_AUTH_PLATFORM', $event)" />
    </div>

    <div v-if="currPage?.action == 'SELECT_AUTH_PLATFORM'">
      <select-menu :select-data="SELECT_AUTH_PLATFORM">
        <template #select-custom-content>
          {{ currPage }}
        </template>
      </select-menu>
    </div>

  </div>
</template>

<script setup lang="ts">
import SelectMenu from "./select-menu.vue";
import useAIChat from "./ai-chat";
import type { SelectData, Option } from "./select-menu.vue";

interface PlatformAuthorizeProps {
  currPage?: Option;
}

const aiChat = useAIChat();
const props = defineProps<PlatformAuthorizeProps>();
const emits = defineEmits(["update:currPage"]);
const { currPage } = toRefs(props);

const ADD_NEW_PLATFORM = ref<SelectData[]>([
  {
    subTitle: "请选择下列要授权的平台",
    options: [],
  },
]);

const SELECT_AUTH_PLATFORM = ref<SelectData[]>([
  {
    subTitle: `您正在授权${currPage.value?.name}平台, 请填写下列信息`,
    options: [],
  },
]);

watchEffect(() => {
  const len = aiChat.supportedPlatForms.length;
  len > 0 && (ADD_NEW_PLATFORM.value[0].options = aiChat.supportedPlatForms.map(v => ({ ...v, action: '' })));
});

const onSelect = (type: string, option: Option) => {
  emits("update:currPage", { ...option, action: type });
};
</script>

<style lang="scss" scoped>
.platform-authorize {
  width: 100%;
}
</style>
