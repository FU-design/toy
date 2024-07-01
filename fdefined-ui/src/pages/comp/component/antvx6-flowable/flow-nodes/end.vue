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
  </div>
</template>

<script lang="ts">
import { Node } from "@antv/x6";
import { defineComponent, inject, ref } from "vue";
export default defineComponent({
  setup() {
    const getNode = inject<Function>("getNode") as Function;
    const node = ref<Node>(getNode());
    const data = node.value.getData();
    return {
      data,
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
