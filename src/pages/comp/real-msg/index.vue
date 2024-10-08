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
        <div id="output" class="msg-output"></div>
        <div class="msg-input">
          <div id="input" class="msg-input-inner" contenteditable="true"></div>
          <section>
            <a-button @click="handleSendMsg">send</a-button>
          </section>
        </div>
      </div>
    </card-box>
  </div>
</template>

<script setup lang="ts">
import { type MsgBox, type PosType, MessageType, Pos } from "./type.ts";
import { storeToRefs } from "pinia";
import WebSocketClient from "./websocket.ts";
import { ChatInfo } from "@/api/login/types.ts";

let ws: WebSocketClient | null;
const wsUrl = "ws://localhost:8080";
const auth = authorization();
const { chatInfo: chat } = storeToRefs(auth);

const connectWebSocket = () => {
  ws = new WebSocketClient(wsUrl);
  ws.on("open", (evt) => {
    onOpen(evt);
  });
  ws.on("message", (evt) => {
    onMessage(evt);
  });
  ws.on("close", (evt) => {
    onClose(evt);
  });
  ws.on("error", (evt) => {
    onError(evt);
  });
};

// 监听打开事件
const onOpen = (evt: Event) => {
  console.log("连接到WebSocket服务器", evt);
};

// 监听消息事件
const onMessage = (evt: MessageEvent) => {
  const currMsg = JSON.parse(evt.data);
  const chatWindow = document.querySelector(".msg-output");
  const pos =
    chat.value?.chatCode === currMsg.sender.chatCode ? "right" : "left";
  chatWindow?.appendChild(createSingleMsg(pos, currMsg));
};

// 监听关闭事件
const onClose = (evt: CloseEvent) => {
  console.log("断开与WebSocket服务器的连接", evt);
};

// 监听错误事件（错误事件触发后，紧接着就是触发关闭事件）
const onError = (evt: Event) => {
  console.error("WebSocket错误:", evt);
};

// 发送消息操作
const handleSendMsg = () => {
  const msgBox = document.querySelector("#input");
  const msg = msgBox?.textContent;
  if (!msg) {
    alert("消息不能为空");
    return;
  }
  if (chat.value) {
    ws?.send(createMessage(0, msg, chat.value));
    msgBox.textContent = "";
  }
};

const createMessage = (
  type: MessageType,
  content: string,
  sender: ChatInfo
) => {
  return {
    type: MessageType[type],
    sender,
    content,
    timestamp: Date.now(),
  };
};

const createTag = (
  tagName: keyof HTMLElementTagNameMap,
  className: string | string[]
) => {
  const element = document.createElement(tagName);
  if (Array.isArray(className)) {
    element.classList.add(...className);
  } else {
    element.classList.add(className);
  }
  return element;
};

// 根据位置信息，生成单条的信息
const createSingleMsg = (pos: PosType, msgInfo: MsgBox): Element => {
  const innerMeg = createTag("p", "singl-msg-inner");
  innerMeg.textContent = `${msgInfo.content}`;
  const sender = createTag("div", "sender");
  sender.textContent = `${msgInfo.sender.chatName.charAt(0)}`;
  const singleMsgBox = createTag("div", [`${Pos[pos]}`, "msg-base"]);
  singleMsgBox.appendChild(innerMeg);
  pos === "left"
    ? singleMsgBox.insertBefore(sender, singleMsgBox.firstChild)
    : singleMsgBox.appendChild(sender);
  return singleMsgBox;
};

onMounted(() => {
  // connectWebSocket();
});

onBeforeUnmount(() => {
  ws?.disConnect();
});
</script>
<style lang="scss">
.singl-msg-inner {
  max-width: 60%;
  padding: 10px 12px;
  margin: 0;
  border-radius: 8px;
  word-break: break-all;
  font-size: 14px;
  display: flex;
  align-items: center;
  box-shadow: $shadow-light;
}

.sender {
  height: 40px;
  text-align: center;
  overflow: hidden;
  line-height: 40px;
  font-size: 19px;
  font-weight: 600;
  border-radius: 50%;
  box-shadow: $shadow-light;

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
    height: 70%;
    padding: 6px 10px;
    overflow: auto;
  }
  .msg-input {
    height: calc(100% - 70%);
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
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
