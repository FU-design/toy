import { Graph, StringExt } from "@antv/x6";

import app from "@/assets/flow/app.png?url";
import condition from "@/assets/flow/condition.png?url";
import distribute from "@/assets/flow/distribute.png?url";
import circle from "@/assets/flow/circle.png?url";
import monitor from "@/assets/flow/monitor.png?url";
import end from "@/assets/flow/end.png?url";

export enum Menu {
  "添加应用" = "base",
  "分支条件" = "condition",
  "分发流程" = "distribute",
  "循环流程" = "circle",
  "错误捕获" = "monitor",
  "结束" = "end",
}

type NodeType = keyof typeof Menu;

interface Command {
  key: string;
  label: string;
}

export interface MenuItem {
  type: string;
  name: NodeType;
  icon: string;
}

export const menuOps: MenuItem[] = [
  { type: "0", name: "添加应用", icon: app },
  { type: "1", name: "分支条件", icon: condition },
  { type: "2", name: "分发流程", icon: distribute },
  { type: "3", name: "循环流程", icon: circle },
  { type: "4", name: "错误捕获", icon: monitor },
  { type: "5", name: "结束", icon: end },
];

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

/**
 * 画布缩放等操作
 * @param command
 * @param graph
 */
export function transform(command: string, graph: Graph | null) {
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
}

/**
 * 创建节点并添加到画布
 * @param menuItem 预创建节点信息
 * @param graph
 * @param pos 节点位置
 * @returns
 */
export function createNode(menuItem: MenuItem, graph: Graph, pos?: Position) {
  if (!graph) {
    return {};
  }
  const { type, name, icon } = menuItem;
  let payLoadNode = {},
    id = StringExt.uuid();
  const node = {
    id,
    shape: Menu[name],
    x: pos?.x,
    y: pos?.y,
    ports: getPortsByType(id, type),
    data: {
      name: `${name}`,
      type,
      icon,
    },
  };
  payLoadNode = graph.addNode(node);
  return payLoadNode;
}

/**
 * 根据节点的类型获取ports
 * @param nodeId
 * @param type
 * @returns
 */
function getPortsByType(nodeId: string, type: string) {
  switch (type) {
    case "0":
      return [
        {
          id: `${nodeId}-out`,
          group: "out",
        },
      ];
    case "5": {
      return [
        {
          id: `${nodeId}-in`,
          group: "in",
        },
      ];
    }
    default:
      return [
        {
          id: `${nodeId}-in`,
          group: "in",
        },
        {
          id: `${nodeId}-out`,
          group: "out",
        },
      ];
  }
}

/**
 * 创建边并添加到画布
 * @param source
 * @param target
 * @param graph
 */
export function createEdge(source: string, target: string, graph: Graph) {
  const edge = {
    id: StringExt.uuid(),
    shape: "dag-edge",
    source: {
      cell: source,
      port: `${source}-out`,
    },
    target: {
      cell: target,
      port: `${target}-in`,
    },
    zIndex: -1,
    data: {
      source,
      target,
    },
  };
  if (graph) {
    graph.addEdge(edge);
  }
}
