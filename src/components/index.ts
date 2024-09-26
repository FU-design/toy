import type { Component } from "vue";
import CardBox from "@/components/CardBox/CardBox.vue";
import Panel from "@/components/Panel/Panel.vue";
import MarkedView from "./MarkedView/MarkedView.vue";
import SvgIcon from "./SvgIcon/SvgIcon.vue";

const components: {
  [propName: string]: Component;
} = {
  CardBox,
  Panel,
  MarkedView,
  SvgIcon,
};

export default components;
