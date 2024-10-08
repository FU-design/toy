export enum SlotEnum {
  "customFilterIcon",
  "customFilterDropdown",
  "bodyCell",
  "emptyText",
  "expandColumnTitle",
  "expandIcon",
  "footer",
  "headerCell",
  "summary",
  "title",
}

export type SlotTypes = keyof typeof SlotEnum;

export interface SlotsMap {
  thSlots: string[];
  tdSlots: string[];
  elseSlots: SlotTypes[]; // 解决 v-slot:[动态名称] 解决typescript报错：“元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式不能用于索引类型”
}
