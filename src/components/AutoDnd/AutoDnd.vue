<template>
  <div class="flow-container">
    <node-box>
      <start-node />
    </node-box>

    <node-box>
      <node-dnd :type="'DROP'">
        <edge-node />
      </node-dnd>
    </node-box>

    <node-box>
      <node-dnd>
        <app-node />
      </node-dnd>
    </node-box>

    <node-box>
      <node-dnd :type="'DROP'">
        <edge-node />
      </node-dnd>
    </node-box>

    <node-box>
      <node-dnd>
        <app-node />
      </node-dnd>
    </node-box>

    <node-box>
      <node-dnd :type="'DROP'">
        <edge-node />
      </node-dnd>
    </node-box>

    <node-box>
      <end-node />
    </node-box>
  </div>
</template>

<script setup lang="ts">
import NodeDnd from './components/nodeDnd.vue'
import AppNode from './components/nodes/appNode.vue'
import EdgeNode from './components/edges/edgeNode.vue'
import StartNode from './components/nodes/startNode.vue'
import EndNode from './components/nodes/endNode.vue'
import NodeBox from './components/nodeBox.vue'

enum FlowNodeType {
  START_NODE,
  END_NODE,
  APP_NODE,
  EDGE_NODE
}
</script>

<style lang="scss" scoped>
.flow-container {
  width: 100%;
  background-color: #fff;
  padding: 16px;
}
</style>
