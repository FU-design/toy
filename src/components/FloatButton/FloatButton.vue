<template>
  <teleport to="body">
    <div
      class="float-btn-wrp"
      :style="{ 'flex-direction': PositionMap[floatContentPos] }"
    >
      <button class="float-btn">
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
  floatContentPos: "top" | "bottom" | "left" | "right";
};
enum PositionMap {
  top = "column-reverse",
  bottom = "column",
  left = "row-reverse",
  right = "row",
}
const props = withDefaults(defineProps<Props>(), {
  floatContentPos: "left",
});
const { floatContentPos } = props;
</script>

<style lang="scss" scoped>
.float-btn-wrp {
  position: fixed;
  // bottom: 1%;
  // right: 1%;
  top: 8%;
  right: 1%;
  display: flex;
}

.float-btn {
  width: 50px;
  height: 50px;
  padding: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: rgba(110, 104, 104, 0.658);
  border: 1px solid #000;
}

.float-content-pos {
}
</style>
