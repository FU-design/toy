import { Graph } from "@antv/x6";

export const menuOps = [
  { name: "添加应用", icon: "../../assets/flow/app.png" },
  { name: "分支条件", icon: "../../assets/flow/condition.png" },
  { name: "分发流程", icon: "../../assets/flow/distribute.png" },
  { name: "循环流程", icon: "../../assets/flow/circle.png" },
  { name: "错误捕获", icon: "../../assets/flow/monitor.png" },
];

interface Command {
  key: string;
  label: string;
}

export const commands: Command[] = [
  {
    key: "zoomIn",
    label: "ZoomIn(0.2)",
  },
  {
    key: "zoomOut",
    label: "ZoomOut(-0.2)",
  },
  {
    key: "zoomTo",
    label: "ZoomTo(1)",
  },
  {
    key: "zoomToFit",
    label: "ZoomToFit",
  },
  {
    key: "centerContent",
    label: "CenterContent",
  },
];

export const transform = (command: string, graph: Graph | null) => {
  switch (command) {
    case "translate":
      graph?.translate(20, 20);
      break;
    case "zoomIn":
      graph?.zoom(0.2);
      break;
    case "zoomOut":
      graph?.zoom(-0.2);
      break;
    case "zoomTo":
      graph?.zoomTo(1);
      break;
    case "zoomToFit":
      graph?.zoomToFit();
      break;
    case "centerContent":
      graph?.centerContent();
      break;
    default:
      break;
  }
};
