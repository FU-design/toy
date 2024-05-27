<template>
  <div class="wrp">
    <card-box v-for="idx in 9">
      <template #header>
        <div class="title">
          <span>WS test</span>
          <a-button type="primary" @click="handleConnect">connect</a-button>
        </div>
      </template>
      <div class="msg-box">
        <div class="msg-output"></div>
        <div class="msg-input">
          <div class="msg-input-inner" contenteditable="true"></div>
          <section>
            <a-button>发送</a-button>
          </section>
        </div>
      </div>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { WebSocketServer } from "./ws";

const handleConnect = () => {
  const ws = WebSocketServer("ws://127.0.0.1:8090");
  console.log("ws :>> ", ws);

  // 监听打开事件
  ws.onopen = () => {
    console.log("连接到WebSocket服务器");
  };

  // 监听消息事件
  ws.onmessage = (event) => {
    console.log("event :>> ", event);
  };

  // 监听关闭事件
  ws.onclose = () => {
    console.log("断开与WebSocket服务器的连接");
  };

  // 监听错误事件
  ws.onerror = (error) => {
    console.error("WebSocket错误:", error);
  };
};
</script>

<style lang="scss" scoped>
.wrp {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 10px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.msg-box {
  box-sizing: border-box;
  height: 500px;
  .msg-output {
    background: hsl(150deg 30% 80%);
    height: 70%;
  }
  .msg-input {
    height: calc(100% - 70%);
    border: 1px solid hsl(150deg 30% 80%);
    border-top: 0;
    display: flex;
    flex-direction: column;

    &-inner {
      height: 100%;
      padding: 8px 16px 10px;
      overflow: auto;
      justify-content: center;
      &:focus-visible {
        outline: none;
      }
    }

    section {
      box-sizing: border-box;
      padding: 10px;
      text-align: end;
    }
  }
}
</style>
