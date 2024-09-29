<template>
  <teleport to="body">
    <div
      class="float-wrp"
      :style="{ 'flex-direction': PositionMap[props.floatContentPos] }"
    >
      <button
        class="float-btn"
        :class="{ rotate: props.isRotate }"
        @click.stop="(e: Event) => emits('click', e)"
      >
        <slot name="btn-content">
          <svg-icon name="robot" />
        </slot>
      </button>
      <div class="float-content">
        <slot> </slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
type Props = {
  isRotate?: boolean;
  floatContentPos?: keyof typeof PositionMap;
};
enum PositionMap {
  top = "column-reverse",
  bottom = "column",
  left = "row-reverse",
  right = "row",
}
const props = withDefaults(defineProps<Props>(), {
  isRotate: false,
  floatContentPos: "left",
});

const emits = defineEmits<{
  (e: "click", event: Event): void;
}>();
</script>

<style lang="scss" scoped>
.float-wrp {
  position: fixed;
  top: 8%;
  right: 1%;
  display: flex;
}

.rotate {
  transition: 0.4s;
  transform: rotateZ(90deg);
}

.float-btn {
  width: 46px;
  height: 46px;
  padding: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: $button-color;
  box-shadow: 0 0 2px $shadow-medium;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 0 10px $shadow-medium;
    .float-content {
      transform: translateX(500px) !important;
    }
  }
  &:active {
    box-shadow: 0 0 2px $shadow-medium;
  }
}

.float-content {
  width: 200px;
  display: flex;
  background-color: $content-background-color;
  box-shadow: 0 0 2px $shadow-medium;
  border-radius: 8px;
}
</style>
