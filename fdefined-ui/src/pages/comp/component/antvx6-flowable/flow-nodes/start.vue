<template>
  <div class="start-node">
    <div class="main-area">
      <div class="main-info">
        <i
          class="node-logo"
          :style="{
            backgroundImage: `url(https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*RXnuTpQ22xkAAAAAAAAAAAAADtOHAQ/original)`,
          }"
        >
        </i>
        <div class="node-name">{{ data?.name }}</div>
      </div>
      <div class="node-status"></div>
    </div>
    <div class="node-plus">
      <a-dropdown :trigger="['click']">
        <a> + </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <span @click="createDownstream(`1st end`)">1st menu item</span>
            </a-menu-item>
            <a-menu-item key="1">
              <span @click="createDownstream(`2st end`)">2st menu item</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Graph, Node, StringExt } from "@antv/x6";
import { defineComponent, inject, ref } from "vue";
export default defineComponent({
  setup() {
    // 此注入是由 @antv/x6-vue-shape 提供给自定义组件的
    const getNode = inject<Function>("getNode") as Function;
    const node = ref<Node>(getNode());
    const data = node.value.getData();

    const resolveNodePostion = (node: Node, offset: number = 60) => {
      const { x, y } = node.getPosition();
      const { height } = node.getSize();
      return {
        x: x,
        y: height + y + offset,
      };
    };

    // 创建下游的节点和边
    const createDownstream = (type: string) => {
      const { graph } = node?.value.model || {};
      if (graph) {
        const offset = 60;
        const position = resolveNodePostion(node?.value as Node, offset);
        const newNode = createNode(type, graph, position) as any;
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

    /**
     * 创建节点并添加到画布
     * @param type 节点类型
     * @param graph
     * @param position 节点位置
     * @returns
     */
    const createNode = (type: string, graph: Graph, position?: Position) => {
      if (!graph) {
        return {};
      }
      let newNode = {};
      const id = StringExt.uuid();
      const node = {
        id,
        shape: "end",
        x: position?.x,
        y: position?.y,
        ports: getPortsByType(id),
        data: {
          name: type,
          type,
        },
      };
      newNode = graph.addNode(node);
      return newNode;
    };

    // 根据节点的类型获取ports
    const getPortsByType = (nodeId: string) => {
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
    };

    /**
     * 创建边并添加到画布
     * @param source
     * @param target
     * @param graph
     */
    const createEdge = (source: string, target: string, graph: Graph) => {
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
    };

    return {
      data,
      createDownstream,
    };
  },
});
</script>

<style lang="scss" scoped>
.start-node {
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
