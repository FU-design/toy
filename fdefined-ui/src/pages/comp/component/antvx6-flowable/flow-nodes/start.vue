<template>
  <div
    class="start-node"
    @mouseenter="onMainMouseEnter"
    @mouseleave="onMainMouseLeave"
  >
    <div class="main-area">
      <div class="main-info">
        <i
          class="node-logo"
          :style="{
            backgroundImage: `url(https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*RXnuTpQ22xkAAAAAAAAAAAAADtOHAQ/original)`,
          }"
        >
        </i>
        <div class="node-name">name</div>
      </div>
      <div class="node-status"></div>
    </div>
    <div class="node-plus">
      <a-dropdown :trigger="['click']">
        <a> + </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a href="">1st menu item</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="">2nd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Node } from "@antv/x6";
import { defineComponent, inject, Ref } from "vue";
export default defineComponent({
  setup() {
    const getCurrNode = inject<Function>("getCurrNode");
    const currNode = getCurrNode && (getCurrNode() as Ref<Node>);

    // 鼠标进入矩形主区域的时候显示连接桩
    const onMainMouseEnter = () => {
      if (currNode?.value) {
        const ports = currNode.value.getPorts() || [];
        ports.forEach((port) => {
          currNode.value.setPortProp(port.id as string, "attrs/circle", {
            fill: "#fff",
            stroke: "#85A5FF",
          });
        });
      }
    };

    // 鼠标离开矩形主区域的时候隐藏连接桩
    const onMainMouseLeave = () => {
      if (currNode?.value) {
        const ports = currNode?.value.getPorts() || [];
        ports.forEach((port) => {
          currNode?.value.setPortProp(port.id as string, "attrs/circle", {
            fill: "transparent",
            stroke: "transparent",
          });
        });
      }
    };
    return {
      onMainMouseEnter,
      onMainMouseLeave,
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
</style>
