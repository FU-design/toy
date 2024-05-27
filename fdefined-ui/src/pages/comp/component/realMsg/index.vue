<template>
  <div class="wrp">
    <card-box v-for="idx in 2">
      <template #header>
        <div class="title">
          <span>WS test</span>
          <a-button type="primary">connect</a-button>
        </div>
      </template>
      <div class="msg-box">
        <div class="msg-output"></div>
        <div class="msg-input">
          <div
            :id="`id_${idx}`"
            class="msg-input-inner"
            contenteditable="true"
          ></div>
          <section>
            <a-button @click="handleSendMsg(idx)">发送</a-button>
          </section>
        </div>
      </div>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
let ws = WebSocket | null;

const connectWebSocket = () => {
  ws = new WebSocket("ws://localhost:8080");
  // 监听打开事件
  ws.onopen = () => {
    console.log("连接到WebSocket服务器");
  };

  // 监听消息事件
  ws.onmessage = (event) => {
    console.log("event :>> ", event.data);
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

const handleSendMsg = (idx) => {
  const msgBox = document.querySelector(`#id_${idx}`);
  const msg = msgBox.textContent;
  if (!msg) return;
  let umsg = {
    idCard: idx,
    msg: msgBox.textContent,
  };
  ws.send(JSON.stringify(umsg));
};

onMounted(() => {
  connectWebSocket();
});

onBeforeUnmount(() => {
  if (ws) {
    ws.close();
  }
});
</script>

<style lang="scss" scoped>
.wrp {
  // 该布局属于是响应式设计
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
    background: hsl(150, 30%, 92%);
    height: 70%;
  }
  .msg-input {
    height: calc(100% - 70%);
    border: 1px solid hsl(150, 30%, 92%);
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
