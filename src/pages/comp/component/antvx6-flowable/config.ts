import { register, getTeleport } from "@antv/x6-vue-shape";
import StartNode from "./flow-nodes/start.vue";
import EndNode from "./flow-nodes/end.vue";
import BaseNode from "./flow-nodes/base.vue";

import { defineComponent } from "vue";
import { Graph, Node, Path, Options } from "@antv/x6";

// 自定义vue节点
register({
  shape: "start",
  width: 200,
  height: 48,
  component: StartNode,
  ports: {
    groups: {
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: false,
            stroke: "transparent",
            strokeWidth: 1,
            fill: "transparent",
          },
        },
      },
    },
  },
});

register({
  shape: "end",
  width: 200,
  height: 48,
  component: EndNode,
  ports: {
    groups: {
      in: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: false,
            stroke: "transparent",
            strokeWidth: 1,
            fill: "transparent",
          },
        },
      },
      out: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: false,
            stroke: "transparent",
            strokeWidth: 1,
            fill: "transparent",
          },
        },
      },
    },
  },
});

register({
  shape: "base",
  width: 200,
  height: 48,
  component: BaseNode,
  ports: {
    groups: {
      in: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: false,
            stroke: "transparent",
            strokeWidth: 1,
            fill: "transparent",
          },
        },
      },
      out: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: false,
            stroke: "transparent",
            strokeWidth: 1,
            fill: "transparent",
          },
        },
      },
    },
  },
});

// 自定义线
Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#C2C8D5",
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true
);

// 自定义连线策略
Graph.registerConnector(
  "algo-connector",
  (s, e) => {
    const offset = 20;
    const deltaY = Math.abs(e.y - s.y);
    const control = Math.floor((deltaY / 3) * 2);

    const v1 = { x: s.x, y: s.y + offset + control };
    const v2 = { x: e.x, y: e.y - offset - control };

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `
    );
  },
  true
);

export class CustomGraph extends Graph {
  constructor(option: Partial<Options.Manual>) {
    super(option);
  }
}

export const TeleportContainer = defineComponent(getTeleport());

/**
 * 添加节点时处理新节点在画布中的坐标
 * @param node
 * @param offset
 * @returns
 */
export const resolveNodePostion = (node: Node, offset: number = 60) => {
  const { x, y } = node.getPosition();
  const { height } = node.getSize();
  return {
    x: x,
    y: height + y + offset,
  };
};

// 获取按顺序排列的节点和边
export function getOrderedNodesAndEdges(graph: Graph) {
  const orderedNodes = [];
  const orderedEdges = [];

  // 查找起始节点（没有入边的节点）
  let startNode = graph.getNodes().find((node) => {
    return graph?.getIncomingEdges(node)?.length === 0;
  });

  while (startNode) {
    orderedNodes.push(startNode);
    const outgoingEdges = graph.getOutgoingEdges(startNode) || null;
    if (outgoingEdges && outgoingEdges?.length > 0) {
      const nextEdge = outgoingEdges[0];
      orderedEdges.push(nextEdge);
      startNode = nextEdge.getTargetCell() as Node;
    } else {
      startNode = undefined;
    }
  }

  return { orderedNodes, orderedEdges };
}
