<template>
  <div>
    <Table :data-source="data" :columns="columns" :rowKey="rowKey">
      <template v-slot:headerCell="{ column }">
        <span>{{ column.title }}</span>
      </template>
      <template v-slot:bodyCell="{ column, record }">
        <template v-for="slotName of Object.keys(slots)">
          <slot
            v-if="slotName === column.dataIndex"
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
import { toRefs, useSlots } from "vue";
import { XTablePorps } from "./type";
import { Table } from "ant-design-vue";

const props = withDefaults(defineProps<XTablePorps>(), {
  data: () => [],
  rowKey: "key",
});

const slots = useSlots();
const { data, columns, rowKey } = toRefs(props);
</script>

<style scoped></style>
