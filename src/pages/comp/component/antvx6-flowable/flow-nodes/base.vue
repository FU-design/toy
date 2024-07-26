<template>
  <div class="end-node">
    <div class="main-area">
      <div class="main-info">
        <div class="node-logo">
          <img :src="data.icon" alt="" />
        </div>
        <div class="node-name">{{ data.name }}</div>
      </div>
      <div class="node-status"></div>
    </div>
    <div class="node-plus">
      <drop-menu @selected="createDownstream" />
    </div>
  </div>
</template>

<script lang="ts">
import { Graph, Node } from "@antv/x6";
import { defineComponent, inject, ref } from "vue";
import DropMenu from "../flow-ops/dropMenu.vue";
import { resolveNodePostion } from "../config";
import { createEdge, createNode, MenuItem } from "../actionOps";

export default defineComponent({
  components: {
    DropMenu,
  },
  setup() {
    const getNode = inject<Function>("getNode") as Function;
    const node = ref<Node>(getNode());
    const data = node.value.getData();

    // 创建下游的节点和边
    const createDownstream = (menuItem: MenuItem) => {
      const graph = node?.value.model?.graph as Graph;
      if (graph) {
        const offset = 60;
        const position = resolveNodePostion(node?.value as Node, offset);
        const newNode = createNode(menuItem, graph, position) as any;
        const source = node?.value.id as string;
        const target = newNode.id;

        // 找出所有当前节点的输出的边对象实例
        const outgoingEdges = graph.getOutgoingEdges(node?.value as Node);
        outgoingEdges?.forEach((edge) => {
          const target = edge.getTargetCell();
          graph.removeEdge(edge); // 移除当前边
          createEdge(newNode?.id as string, target?.id as string, graph); // 创建新的边，源节点为新节点，目标为原节点的目标节点
        });

        // 动态向下调整新节点以下的所有节点，为新节点及动态添加的节点腾出空间
        graph.getNodes().forEach((n) => {
          if (n.id !== newNode.id && n.getPosition().y >= position.y) {
            n.translate(0, (newNode.getSize()?.height as number) + offset);
          }
        });

        createEdge(source, target, graph);
        // 选中新创建的节点
        graph.select(newNode.id);
      }
    };

    return {
      data,
      createDownstream,
    };
  },
});
</script>
<style lang="scss" scoped>
.end-node {
  display: flex;
  align-items: center;
  background-color: #fff;
}

.main-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
  width: 180px;
  height: 48px;
  color: rgba(0, 0, 0, 65%);
  font-size: 12px;
  font-family: PingFangSC;
  line-height: 24px;
  background-color: #fff;
  box-shadow: 0 -1px 4px 0 rgba(209, 209, 209, 50%),
    1px 1px 4px 0 rgba(217, 217, 217, 50%);
  border-radius: 2px;
  border: 1px solid transparent;
}
.main-area:hover {
  border: 1px solid rgba(0, 0, 0, 10%);
  box-shadow: 0 -2px 4px 0 rgba(209, 209, 209, 50%),
    2px 2px 4px 0 rgba(217, 217, 217, 50%);
}

.node-logo {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.node-name {
  overflow: hidden;
  display: inline-block;
  width: 70px;
  margin-left: 6px;
  color: rgba(0, 0, 0, 65%);
  font-size: 12px;
  font-family: PingFangSC;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: top;
}

.node-plus {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #acacac;
  color: #acacac;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
}

.x6-node-selected .main-area {
  border-color: #3471f9;
}
</style>
