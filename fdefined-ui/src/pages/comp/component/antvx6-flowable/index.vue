<template>
  <div class="flowable">
    <div id="container"></div>
    <section>
      <a-button @click="createNode">点击生成节点</a-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Graph, Shape } from "@antv/x6";
import { onMounted, onUnmounted, ref } from "vue";

const graph = ref<Graph>();

// const data = {
//   // 节点
//   nodes: [
//     {
//       id: "node1", // String，可选，节点的唯一标识
//       x: 40, // Number，必选，节点位置的 x 值
//       y: 40, // Number，必选，节点位置的 y 值
//       width: 80, // Number，可选，节点大小的 width 值
//       height: 40, // Number，可选，节点大小的 height 值
//       label: "hello", // String，节点标签
//     },
//     {
//       id: "node2", // String，节点的唯一标识
//       x: 160, // Number，必选，节点位置的 x 值
//       y: 180, // Number，必选，节点位置的 y 值
//       width: 80, // Number，可选，节点大小的 width 值
//       height: 40, // Number，可选，节点大小的 height 值
//       label: "world", // String，节点标签
//     },
//   ],
//   // 边
//   edges: [
//     {
//       source: "node1", // String，必须，起始节点 id
//       target: "node2", // String，必须，目标节点 id
//     },
//   ],
// };

const createNode = () => {
  const node1 = {
    id: "node1",
    shape: "rect", // Specify which graph to use, the default value is 'rect'
    x: 100,
    y: 100,
    width: 80,
    height: 40,
    label: "New Node1",
    attrs: {
      body: {
        fill: "#fff",
        stroke: "#000",
      },
      label: {
        text: "JERRY",
        fill: "black",
      },
    },
    ports: {
      // 分组
      groups: {
        group1: {
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#31d0c6",
              strokeWidth: 4,
              fill: "#fff",
            },
          },
        },
      },
      // 连接桩集合
      items: [
        {
          id: "port1",
          group: "group1", // 指定分组名称
        },
        {
          id: "port2",
          group: "group1", // 指定分组名称
        },
        {
          id: "port3",
          group: "group1", // 指定分组名称
        },
      ],
    },
  };
  const node2 = {
    id: "node2",
    shape: "rect", // Specify which graph to use, the default value is 'rect'
    x: 300,
    y: 200,
    width: 80,
    height: 40,
    label: "New Node2",
    attrs: {
      body: {
        fill: "#fff",
        stroke: "#000",
      },
      label: {
        text: "TOM",
        fill: "black",
      },
    },
  };

  const line = {
    shape: "edge", // 指定使用何种图形，默认值为 'edge'
    source: "node1",
    target: "node2",
    // 增加额外点，线会按顺序通过这些点然后到达目标节点
    // vertices: [
    //   { x: 100, y: 200 },
    //   { x: 300, y: 120 },
    // ],
    // 对vertices的进一步处理
    // router: {
    //   name: "orth",
    //   args: {},
    // },
    // 连接器线的拐点
    connector: {
      name: "rounded",
      // name: "smooth",
      // name: "jumpover",
      args: {},
    },
  };

  graph.value?.addNode(node1);
  graph.value?.addNode(node2);
  graph.value?.addEdge(line);
  graph.value?.centerContent();
};

const initGraph = () => {
  graph.value = new Graph({
    container: document.getElementById("container") as HTMLElement,
    height: 600,
    background: {
      color: "#fff", // 设置画布背景颜色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    panning: {
      enabled: true,
      eventTypes: ["mouseWheel"],
    },
  });
  // graph.value.fromJSON(data);
  graph.value.centerContent();
};

const disposeGraph = () => {
  if (graph.value) {
    graph.value.dispose();
  }
};

onMounted(() => {
  initGraph();
});

onUnmounted(() => {
  disposeGraph();
});
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
