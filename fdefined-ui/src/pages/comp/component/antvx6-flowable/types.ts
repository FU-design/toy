// 节点类型
enum NodeType {
  APP = "添加应用",
  CONDITION = "分支条件",
  DISTRIBUTE = "分发流程",
  CIRCLE = "循环流程",
  MONITOR = "错误捕获",
}

// 节点校验状态
enum CellStatus {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

// 节点位置信息
interface Position {
  x: number;
  y: number;
}

// 流程节点类型列表
const FLOWABLE_TYPE_LIST = [
  {
    type: "APP",
    name: "添加应用",
  },
  {
    type: "CONDITION",
    name: "分支条件",
  },
  {
    type: "DISTRIBUTE",
    name: "分发流程",
  },
  {
    type: "CIRCLE",
    name: "循环流程",
  },

  {
    type: "MONITOR",
    name: "错误捕获",
  },
];

// 节点icon
const NodeIcon = {
  START: "@/assets/flow/start.png",
  APP: "@/assets/flow/app.png",
  CONDITION: "@/assets/flow/condition.png",
  DISTRIBUTE: "@/assets/flow/distribute.png",
  CIRCLE: "@/assets/flow/circle.png",
  MONITOR: "@/assets/flow/monitor.png",
  END: "@/assets/flow/start.png",
};
