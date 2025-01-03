<template>
  <div v-bind="dndConfig" v-on="dndConfig?.on || {}" class="node-dnd">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type DndType = 'DRAG' | 'DROP'

interface Props {
  type?: DndType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'DRAG'
})

const draggedElement = ref<HTMLElement | null>(null)
const config = ref<Record<DndType, any>>({
  DRAG: {
    draggable: true,
    on: {
      dragstart: (e: DragEvent) => dragstart(e)
    }
  },
  DROP: {
    on: {
      drop: (e: DragEvent) => drop(e),
      dragover: (e: DragEvent) => e.preventDefault()
    }
  }
})

const dndConfig = computed(() => {
  return config.value[props.type]
})

const dragstart = (e: DragEvent) => {
  draggedElement.value = e.currentTarget as HTMLElement
}

const drop = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer && (e.dataTransfer.dropEffect = 'move')
  if (draggedElement.value) {
    const dropContainer = e.currentTarget as HTMLElement
    const clonedElement = draggedElement.value.cloneNode(true) as HTMLElement
    dropContainer.insertAdjacentElement('afterend', clonedElement)
  }
}
</script>

<style lang="scss" scoped>
.node-dnd {
  width: auto;
  height: auto;
}
</style>
