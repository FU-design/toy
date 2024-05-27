import WebSocket, { Server } from "ws";

const PORT = 8090;
const HOST = "127.0.0.1"; // 有效ip地址

const urlConfig = {
  host: HOST,
  port: PORT,
};

const wss = new Server(urlConfig);

wss.on("connection", (ws: WebSocket) => {
  console.log("新的客户端连接 :>> ");

  wss.on("message", (msg: string) => {
    console.log("收到消息:", msg);
    console.log("msg :>> ", msg);
    // 发送消息给客户端
    ws.send(`服务器收到: ${msg}`);
  });

  wss.on("close", () => {
    console.log("客户端断开连接 :>> ");
  });
});

console.log(`webSocket服务器启动,监听地址：ws://${HOST}:${urlConfig.port}`);
