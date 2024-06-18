<template>
  <div class="flowable">
    <div id="container"></div>
    <TeleportContainer />
    <a-button v-for="command in commandOps" @click="transform(command.key)">
      {{ command.label }}
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, provide, shallowRef } from "vue";
import { Selection } from "@antv/x6-plugin-selection";
import { Graph, Node, Path, Edge, Platform, StringExt } from "@antv/x6";
import { onMounted, onUnmounted, ref } from "vue";
import { data } from "./nodeData";
import { register, getTeleport } from "@antv/x6-vue-shape";
import StartNode from "./flow-nodes/start.vue";
import EndNode from "./flow-nodes/end.vue";

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

const TeleportContainer = defineComponent(getTeleport());
console.log("TeleportContainer :>> ", TeleportContainer);
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

interface Command {
  key: string;
  label: string;
}

const commands: Command[] = [
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

const graph = shallowRef<Graph | null>(null);
const currNode = ref<Node | null>(null);
const commandOps = ref(commands);

onMounted(() => {
  initGraph();
});

onUnmounted(() => {
  disposeGraph();
});

const transform = (command: string) => {
  switch (command) {
    case "translate":
      graph.value?.translate(20, 20);
      break;
    case "zoomIn":
      graph.value?.zoom(0.2);
      break;
    case "zoomOut":
      graph.value?.zoom(-0.2);
      break;
    case "zoomTo":
      graph.value?.zoomTo(1);
      break;
    case "zoomToFit":
      graph.value?.zoomToFit();
      break;
    case "centerContent":
      graph.value?.centerContent();
      break;
    default:
      break;
  }
};

const initGraph = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLDivElement,
    height: 600,
    background: {
      color: "#fff", // 设置画布背景颜色
    },
    // grid: {
    //   size: 10, // 网格大小 10px
    //   visible: true, // 渲染网格背景
    // },
    panning: {
      enabled: true,
      eventTypes: ["leftMouseDown", "mouseWheel"],
    },
    mousewheel: {
      enabled: true,
      modifiers: "ctrl",
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#fff",
            stroke: "#31d0c6",
            strokeWidth: 4,
          },
        },
      },
    },
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      connector: "algo-connector",
      connectionPoint: "anchor",
      anchor: "center",
      validateMagnet({ magnet }) {
        return magnet.getAttribute("port-group") !== "top";
      },
      createEdge() {
        return graph.value?.createEdge({
          shape: "dag-edge",
          attrs: {
            line: {
              strokeDasharray: "5 5",
            },
          },
          zIndex: -1,
        });
      },
    },
  });

  graph.value.fromJSON(data);
  graph.value.centerContent();

  graph.value?.use(
    new Selection({
      multiple: true,
      rubberEdge: true,
      rubberNode: true,
      modifiers: "shift",
      rubberband: true,
      // enabled: true,
    })
  );

  graph.value.on("node:selected", ({ node }: { node: Node }) => {
    currNode.value = node;
  });
};

const getCurrNode = () => {
  return currNode;
};

const disposeGraph = () => {
  if (graph.value) {
    graph.value.dispose();
  }
};

provide("getCurrNode", getCurrNode);
</script>

<style scoped>
.flowable {
  padding: 10px;
}
#container {
  width: 100%;
  background-color: #fff;
}
</style>
