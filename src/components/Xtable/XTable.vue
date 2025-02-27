<template>
  <Table
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    :row-key="rowKey"
    :pagination="pagination"
    v-bind="attrs"
    @change="(...args) => emits('change', ...args)"
  >
    <template #headerCell="{ column }">
      <span v-if="column.title">{{ column.title }}</span>
      <div v-else>
        <template v-for="slotName in slotsMap.thSlots">
          <slot
            v-if="slotName.replace('th-', '') === column.dataIndex"
            :name="slotName"
            :column="column"
          ></slot>
        </template>
      </div>
    </template>
    <template #bodyCell="{ column, text, record }">
      <template v-for="slotName in slotsMap.tdSlots">
        <slot
          v-if="slotName.replace('td-', '') === column.dataIndex"
          :name="slotName"
          :column="column"
          :text="text"
          :record="record"
        ></slot>
      </template>
    </template>
    <template v-for="slot in slotsMap.elseSlots" #[slot]="slotScope">
      <slot :slot-scope="{ slotScope }" :name="slot"></slot>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { SlotsMap, SlotEnum } from './type'
import { Table, TableProps } from 'ant-design-vue'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps<TableProps>()
const { dataSource, columns, rowKey, pagination } = toRefs(props)
const emits = defineEmits(['change'])

/**
 * 获取表头插槽和单元格插槽
 */
const slotsMap = computed<SlotsMap>(() => {
  const res: SlotsMap = { thSlots: [], tdSlots: [], elseSlots: [] }
  Object.keys(slots).forEach((s: any) => {
    if (/^th-/.test(s)) {
      res.thSlots.push(s)
    } else if (/^td-/.test(s)) {
      res.tdSlots.push(s)
    } else {
      if (SlotEnum[s] !== undefined) {
        res.elseSlots.push(s)
      }
    }
  })
  return res
})
</script>

<style scoped></style>
