<template>
  <div>
    <Table
      :data-source="data"
      :columns="columns"
      :loading="loading"
      :rowKey="rowKey"
      @change="handleChange"
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
    <div v-if="!attrs.pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, useSlots, useAttrs, computed } from "vue";
import { XTablePorps, SlotsMap } from "./type";
import { Table, TableProps } from "ant-design-vue";

const slots = useSlots();
const attrs = useAttrs();

const props = withDefaults(defineProps<XTablePorps>(), {
  data: () => [],
});

const { data, columns, rowKey } = toRefs(props);

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

const handleChange: TableProps["onChange"] = (pagination, filters, sorter) => {
  console.log("Various parameters", pagination, filters, sorter);
};

// const checkPrefix = (str: string, isTh = false) => {
//   const regexTh = str.match(/^th-/g);
//   const regexTd = str.match(/^td-/g);
//   if (isTh && regexTh) {
//     return str.replace(regexTh[0], "");
//   }
//   if (regexTd) {
//     return str.replace(regexTd[0], "");
//   }
// };

// watchEffect(() => {
//   Object.keys(slots).forEach((s) => {
//     if (/^th-/.test(s)) {
//       slotsMap.value.thSlots.push(s);
//     } else if (/^td-/.test(s)) {
//       slotsMap.value.tdSlots.push(s);
//     } else {
//       slotsMap.value.elseSlots.push(s);
//     }
//   });
// });
</script>

<style scoped></style>
