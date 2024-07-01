<template>
  <div class="flowable">
    <a-button
      v-for="{ key, label } in commandOps"
      @click="transform(key, unref(graph))"
    >
      {{ label }}
    </a-button>
    <a-button @click="getFlowableData">data</a-button>
    <div id="container"></div>
    <TeleportContainer />
  </div>
</template>

<script setup lang="ts">
import { provide, shallowRef, unref } from "vue";
import { Selection } from "@antv/x6-plugin-selection";
import { Graph, Node, Options } from "@antv/x6";
import { onMounted, onUnmounted, ref } from "vue";
import { data } from "./nodeData";
import {
  CustomGraph,
  getOrderedNodesAndEdges,
  TeleportContainer,
} from "./config";
import { commands, transform } from "./actionOps";

const graph = shallowRef<Graph | null>(null);
const currNode = ref<Node | null>(null);
const commandOps = ref(commands);
provide("node", currNode.value);

onMounted(() => {
  initGraph();
});

onUnmounted(() => {
  disposeGraph();
});

const initGraph = () => {
  const container = document.getElementById("container") as HTMLDivElement;
  const config = {
    container,
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
  } as Partial<Options.Manual>;
  graph.value = new CustomGraph(config);
  // 初始化数据
  graph.value.fromJSON(data as any);
  // 将试图内容剧中于布局正中心
  graph.value.centerContent();
  graph.value?.use(
    new Selection({
      multiple: false,
      rubberEdge: true,
      rubberNode: true,
      modifiers: "shift",
      rubberband: true,
      // enabled: true,
    })
  );
  initGraphEvent();
  // 默认选中的节点
  graph.value.select("node-0");
};

// 初始化 Graph 事件
const initGraphEvent = () => {
  if (graph.value) {
    graph.value.on("node:selected", ({ node }: { node: Node }) => {
      currNode.value = node;
    });
  }
};

// 获取所有数据
const getFlowableData = () => {
  // const flowableData: any = { nodes: [], edges: [] };
  // graph.value?.getNodes().forEach((node) => {
  //   flowableData.nodes.push(node.toJSON());
  // });
  // graph.value?.getEdges().forEach((edge) => {
  //   flowableData.edges.push(edge.toJSON());
  // });
  // console.log("flowableData :>> ", flowableData);

  const res = getOrderedNodesAndEdges(unref(graph) as Graph);
  console.log("res ", res);
};

// 销毁 Graph 实例
const disposeGraph = () => {
  if (graph.value) {
    graph.value.dispose();
  }
};
</script>

<style scoped>
.flowable {
  height: 100%;
  width: 100%;
  padding: 10px;
}
#container {
  width: 100%;
  background-color: #fff;
}
</style>
