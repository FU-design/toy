<template>
  <div>
    <Table
      :data-source="dataSource"
      :columns="columns"
      :loading="loading"
      :rowKey="rowKey"
      :pagination="pagination"
      @change="(...args) => emits('change', ...args)"
      v-bind="attrs"
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
      <template v-for="slot in slotsMap.elseSlots" v-slot:[slot]="slotScope">
        <slot :name="slot" :slotScope="{ slotScope }"></slot>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { toRefs, useSlots, useAttrs, computed } from "vue";
import { SlotsMap, SlotEnum } from "./type";
import { Table, TableProps } from "ant-design-vue";

const props = defineProps<TableProps>();
const { dataSource, columns, rowKey, pagination } = toRefs(props);
const emits = defineEmits(["change"]);
const slots = useSlots();
const attrs = useAttrs();

/**
 * 获取表头插槽和单元格插槽
 */
const slotsMap = computed<SlotsMap>(() => {
  const res: SlotsMap = { thSlots: [], tdSlots: [], elseSlots: [] };
  Object.keys(slots).forEach((s: any) => {
    if (/^th-/.test(s)) {
      res.thSlots.push(s);
    } else if (/^td-/.test(s)) {
      res.tdSlots.push(s);
    } else {
      if (SlotEnum[s] !== undefined) {
        res.elseSlots.push(s);
      }
    }
  });
  return res;
});
</script>

<style scoped></style>
