<template>
  <div class="wrp">
    <div class="profile"></div>
    <div class="wrp wrp-add">
      <card-box v-for="idx in 2">
        <template #header>
          <div class="title">
            <span>WS {{ idx }}</span>
            <a-button type="primary">chat{{ idx }}</a-button>
          </div>
        </template>
        <div class="msg-box">
          <div :id="`output_${idx}`" class="msg-output"></div>
          <div class="msg-input">
            <div
              :id="`input_${idx}`"
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
interface MsgBox {
  id: string | number;
  msg: string;
}

enum Pos {
  left = "msgL",
  right = "msgR",
}
type PosType = keyof typeof Pos;

let ws: WebSocket | null;
const msgBox = ref<MsgBox[] | null>(null);

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

const handleSendMsg = (idx: number) => {
  const msgBox = document.querySelector(`#input_${idx}`);
  const msg = msgBox?.textContent;
  if (!msg) {
    alert("消息不能为空");
    return;
  }
  const sendMsg = JSON.stringify({
    id: idx,
    msg,
  });
  ws?.send(sendMsg);
  msgBox.textContent = "";
};

const outPutMsg = (msgInfo: MsgBox) => {
  const chats = document.querySelectorAll(".msg-output");
  chats.forEach((chat) => {
    const pos = chat.id === `output_${msgInfo.id}` ? "right" : "left";
    chat.appendChild(createSingleMsg(pos, msgInfo.msg));
  });
};

const createSingleMsg = (pos: PosType, msg: string): Element => {
  const singleMsg = document.createElement("div");
  singleMsg.classList.add(Pos[pos]);
  singleMsg.textContent = msg;
  return singleMsg;
};

onMounted(() => {
  // connectWebSocket();
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
.profile {
  height: 100px;
  background-color: #666;
  margin: 10px 0;
}
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
