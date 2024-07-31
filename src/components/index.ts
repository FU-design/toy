import type { Component } from "vue";
import CardBox from "@/components/cardBox/CardBox.vue";
import Panel from "@/components/panel/Panel.vue";

const components: {
  [propName: string]: Component;
} = {
  CardBox,
  Panel,
};

export default components;
