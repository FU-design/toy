<template>
  <div class="wrp">
    <div class="wrp wrp-add">
      <card-box>
        <template #header>
          <div class="title">
            <span>WS</span>
            <a-button type="primary"> chatName：{{ chat?.chatName }} </a-button>
          </div>
        </template>
        <div class="msg-box">
          <div :id="`output_${chat?.chatCode}`" class="msg-output"></div>
          <div class="msg-input">
            <div
              :id="`input_${chat?.chatCode}`"
              class="msg-input-inner"
              contenteditable="true"
            ></div>
            <section>
              <a-button @click="handleSendMsg">send</a-button>
            </section>
          </div>
        </div>
      </card-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import useChat from "@/hooks/useChat";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { type MsgBox, type PosType, Pos } from "./type";

let ws: WebSocket | null;
const msgBox = ref<MsgBox[] | null>(null);
const { chatInfo: chat } = useChat();

const connectWebSocket = () => {
  ws = new WebSocket("ws://localhost:8080");
  // 监听打开事件
  ws.onopen = () => {
    console.log("连接到WebSocket服务器");
  };

  // 监听消息事件
  ws.onmessage = (event) => {
    const recevice = event.data as string;
    const currMsg = JSON.parse(recevice.replace("服务器收到:", ""));
    msgBox.value?.push(currMsg);
    outPutMsg(currMsg);
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

// 发送消息操作
const handleSendMsg = () => {
  const msgBox = document.querySelector(`#input_${chat.value?.chatCode}`);
  const msg = msgBox?.textContent;
  if (!msg) {
    alert("消息不能为空");
    return;
  }
  const sendMsg = JSON.stringify({
    id: chat.value?.chatCode,
    msg,
  });
  ws?.send(sendMsg);
  msgBox.textContent = "";
};

// 确认信息发出后所在的位置
const outPutMsg = (msgInfo: MsgBox) => {
  const chat = document.querySelector(".msg-output");
  const pos = chat?.id === `output_${msgInfo.id}` ? "right" : "left";
  chat?.appendChild(createSingleMsg(pos, msgInfo.msg));
};

// 根据位置信息，生成单条的信息
const createSingleMsg = (pos: PosType, msg: string): Element => {
  const singleMsg = document.createElement("div");
  singleMsg.classList.add(Pos[pos]);
  singleMsg.textContent = msg;
  return singleMsg;
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
<style>
.msgL {
  padding: 10px;
}
.msgR {
  padding: 10px;
  text-align: end;
}
</style>
<style lang="scss" scoped>
.wrp-add {
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
