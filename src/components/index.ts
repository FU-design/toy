import type { Component } from "vue";
import cardBox from "@/components/cardBox/CardBox.vue";
import panel from "@/components/panel/Panel.vue";

const components: {
  [propName: string]: Component;
} = {
  cardBox,
  panel,
};

export default components;
