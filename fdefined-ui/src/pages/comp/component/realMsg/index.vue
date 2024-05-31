<template>
  <div class="real-msg">
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
</template>

<script setup lang="ts">
import useChat from "@/hooks/useChat";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { type MsgBox, type PosType, Pos } from "./type";

let ws: WebSocket | null;
const msgBox = ref<MsgBox[] | null>(null);
const { chatInfo: chat } = useChat();
const wsUrl = "ws://localhost:8080";

// 监听打开事件
const onOpen = (evt: Event) => {
  console.log("连接到WebSocket服务器", evt);
};

// 监听消息事件
const onMessage = (evt: MessageEvent) => {
  if (typeof evt.data === "string") {
    const recevice = evt.data;
    const currMsg = JSON.parse(recevice.replace("服务器收到:", ""));
    msgBox.value?.push(currMsg);
    outPutMsg(currMsg);
  }

  if (evt.data instanceof ArrayBuffer) {
    const buffer = evt.data;
    console.log("Received arraybuffer", buffer);
  }
};

// 监听关闭事件
const onClose = (evt: CloseEvent) => {
  if (evt.code != 1000) {
    // Error code 1000 means that the connection was closed normally.
    // Try to reconnect.
    if (!navigator.onLine) {
      alert("你已处于网络离线状态，请尝试重新连接");
    }
  }
  console.log("断开与WebSocket服务器的连接");
};

// 监听错误事件（错误事件触发后，紧接着就是触发关闭事件）
const onError = (evt: Event) => {
  // 网络上的错误（无网络）使用 HTML5 的 navigator.onLine 可判断
  if (navigator.onLine) {
    alert("You are Online");
  } else {
    alert("You are Offline");
  }
  console.error("WebSocket错误:", evt);
};

const connectWebSocket = () => {
  ws = new WebSocket(wsUrl);
  ws.onopen = (evt) => onOpen(evt);
  ws.onmessage = (evt) => onMessage(evt);
  ws.onclose = (evt) => onClose(evt);
  ws.onerror = (evt) => onError(evt);
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
    name: chat.value?.chatName,
    msg,
  });
  ws?.send(sendMsg);
  msgBox.textContent = "";
};

// 确认信息发出后所在的位置
const outPutMsg = (msgInfo: MsgBox) => {
  const chat = document.querySelector(".msg-output");
  const pos = chat?.id === `output_${msgInfo.id}` ? "right" : "left";
  chat?.appendChild(createSingleMsg(pos, msgInfo));
};

// 根据位置信息，生成单条的信息
const createSingleMsg = (pos: PosType, msgInfo: MsgBox): Element => {
  const innerMeg = document.createElement("p");
  innerMeg.classList.add("singl-msg-inner");
  innerMeg.textContent = msgInfo.msg;

  const sender = document.createElement("div");
  sender.classList.add("sender");
  sender.textContent = msgInfo.name.charAt(0) + "";

  const singleMsgBox = document.createElement("div");
  singleMsgBox.classList.add(Pos[pos], "msg-base");
  singleMsgBox.appendChild(innerMeg);
  pos === "left"
    ? singleMsgBox.insertBefore(sender, singleMsgBox.firstChild)
    : singleMsgBox.appendChild(sender);
  return singleMsgBox;
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
<style lang="scss">
.singl-msg-inner {
  max-width: 60%;
  padding: 10px 12px;
  margin: 0;
  border-radius: 18px;
  background-color: cornflowerblue;
  // word-break: break-word;
  word-break: break-all;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.sender {
  height: 40px;
  text-align: center;
  overflow: hidden;
  line-height: 40px;
  font-size: 19px;
  font-weight: 600;
  border-radius: 50%;
  background-color: cadetblue;

  // 纵横比
  aspect-ratio: 1 / 1;
}

.msg-base {
  display: flex;
  margin: 10px 0;
  padding: 2px 0;
}
.msgL {
  justify-content: flex-start;
  .singl-msg-inner {
    margin-left: 10px;
  }
}
.msgR {
  justify-content: flex-end;
  .singl-msg-inner {
    margin-right: 10px;
  }
}
</style>
<style lang="scss" scoped>
.real-msg {
  width: 100%;
  height: 100%;
  overflow: auto;
  :deep(.card-box) {
    main {
      padding: 2px;
    }
  }
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.msg-box {
  height: 500px;
  width: 100%;
  .msg-output {
    // background: hsl(150, 30%, 92%);
    height: 70%;
    padding: 6px 10px;
    overflow: auto;
  }
  .msg-input {
    height: calc(100% - 70%);
    border-top: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
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
      padding: 10px;
      text-align: end;
    }
  }
}
</style>
