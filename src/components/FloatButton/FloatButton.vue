<template>
  <teleport to="body">
    <div
      class="float-btn-wrp"
      :style="{ 'flex-direction': PositionMap[props.floatContentPos] }"
      @click="$emit('click')"
    >
      <button class="float-btn" :class="{ rotate: props.isRotate }">
        <slot name="btn-content">
          <svg-icon name="robot" />
        </slot>
      </button>
      <slot> </slot>
    </div>
  </teleport>
</template>

<script setup lang="ts">
type Props = {
  isRotate?: boolean;
  floatContentPos?: "top" | "bottom" | "left" | "right";
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

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<style lang="scss" scoped>
.float-btn-wrp {
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
  width: 50px;
  height: 50px;
  padding: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: $button-color;
  box-shadow: 0 0 2px $shadow-medium;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 0 10px $shadow-medium;
  }
  &:active {
    box-shadow: 0 0 2px $shadow-medium;
  }
}
</style>
