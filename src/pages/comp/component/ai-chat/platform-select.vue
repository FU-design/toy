<template>
  <div class="platform-select" v-show="1">
    <div class="item" v-for="item of platformSelects">
      <label>{{ item.label }}</label>
      <a-button @click="onSelect(item)" v-for="option of item.options">
        {{ option }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PlatformSelect {
  label: string;
  action: string;
  options: string[];
}

interface PlatformSelectProps {
  currPage?: string;
}

const platformSelects: PlatformSelect[] = [
  {
    label: "请选择下列已授权的平台",
    action: "select",
    options: [
      "OpenAI",
      "ChatGLM",
      "ChatGLM",
      "ChatGLM",
      "ChatGLM",
      "ChatGLM",
      "ChatGLM",
    ],
  },
  {
    label: "或者你可以",
    action: "authorize",
    options: ["授权新平台"],
  },
];

defineProps<PlatformSelectProps>();
const emits = defineEmits(["update:currPage"]);
const onSelect = (item: PlatformSelect) => {
  emits("update:currPage", item.action);
};
</script>

<style lang="scss" scoped>
.platform-select {
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
