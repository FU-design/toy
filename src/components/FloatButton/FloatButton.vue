<template>
  <teleport to="body">
    <div class="float-wrp-tl" :style="{ 'flex-direction': PositionMap[props.floatContentPos] }">
      <button
        class="float-btn"
        :class="{ rotate: props.isRotate }"
        @click.stop="(e: Event) => emits('click', e)"
      >
        <slot name="btn-content">
          <svg-icon name="robot" />
        </slot>
      </button>
      <transition>
        <div v-if="!props.isRotate" class="float-content">
          <slot> </slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
type Props = {
  isRotate?: boolean;
  floatContentPos?: keyof typeof PositionMap;
};
enum PositionMap {
  top = 'column-reverse',
  bottom = 'column',
  left = 'row-reverse',
  right = 'row'
}
const props = withDefaults(defineProps<Props>(), {
  isRotate: false,
  floatContentPos: 'left'
});

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();
</script>

<style lang="scss" scoped>
$float-btn-size: 46px;
$float-content-w: 300px;

@mixin float-wrp {
  position: fixed;
  display: flex;
}

.float-wrp-tr {
  top: 8%;
  right: 1%;
  @include float-wrp;
}

.float-wrp-tl {
  top: 8%;
  left: 1%;
  @include float-wrp;
}

.float-wrp-bl {
  bottom: 8%;
  left: 1%;
  @include float-wrp;
}

.float-wrp-br {
  bottom: 8%;
  right: 1%;
  @include float-wrp;
}

.rotate {
  transition: 0.4s;
  transform: rotateZ(90deg);
}

.float-btn {
  width: $float-btn-size;
  height: $float-btn-size;
  padding: 6px;
  margin: 0 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: $button-color;
  box-shadow: 0 0 2px $shadow-light;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 0 10px $shadow-light;
  }
  &:active {
    box-shadow: 0 0 2px $shadow-medium;
  }
}

.float-content {
  display: flex;
  width: $float-content-w;
  margin-top: $float-btn-size;
  background-color: $content-background-color;
  box-shadow: 0 0 2px $shadow-medium;
  border-radius: 8px;
  @include glass(10px, 2px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
