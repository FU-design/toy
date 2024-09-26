import type { Component } from "vue";
import CardBox from "@/components/CardBox/CardBox.vue";
import Panel from "@/components/Panel/Panel.vue";

const components: {
  [propName: string]: Component;
} = {
  CardBox,
  Panel,
};

export default components;
