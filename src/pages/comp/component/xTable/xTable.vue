<template>
  <div>
    <Table
      :data-source="data"
      :columns="columns"
      :loading="loading"
      :rowKey="rowKey"
      :pagination="pagination"
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
      <template #bodyCell="{ column, record }">
        <template v-for="slotName in slotsMap.tdSlots">
          <slot
            v-if="slotName.replace('td-', '') === column.dataIndex"
            :name="slotName"
            :column="column"
            :record="record"
          ></slot>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { toRefs, useSlots, useAttrs, computed } from "vue";
import { XTablePorps, SlotsMap } from "./type";
import { Table } from "ant-design-vue";

const props = withDefaults(defineProps<XTablePorps>(), {
  data: () => [],
});
const { data, columns, rowKey, pagination } = toRefs(props);

const slots = useSlots();
const attrs = useAttrs();

/**
 * 获取表头插槽和单元格插槽
 */
const slotsMap = computed<SlotsMap>(() => {
  const res: SlotsMap = { thSlots: [], tdSlots: [] };
  Object.keys(slots).forEach((s) => {
    if (/^th-/.test(s)) {
      res.thSlots.push(s);
    } else if (/^td-/.test(s)) {
      res.tdSlots.push(s);
    }
  });
  return res;
});
</script>

<style scoped></style>
