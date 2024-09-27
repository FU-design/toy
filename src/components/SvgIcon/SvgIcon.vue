<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
  prefix?: string;
  name: string;
  color?: string;
  className?: string;
};

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  color: "#000",
  className: "",
});

const { className, prefix, name } = props;
const symbolId = computed(() => `#${prefix}-${name}`);
const svgClass = computed(() => className ? `svg-icon ${className}` : "svg-icon");

</script>

<style lang="scss" scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  padding: 4px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
