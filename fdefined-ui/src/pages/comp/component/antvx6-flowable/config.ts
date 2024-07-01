import { register, getTeleport } from "@antv/x6-vue-shape";
import StartNode from "./flow-nodes/start.vue";
import EndNode from "./flow-nodes/end.vue";
import { defineComponent } from "vue";
import {
  Graph,
  Node,
  Path,
  Edge,
  Platform,
  StringExt,
  Options,
} from "@antv/x6";

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
      top: {
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
