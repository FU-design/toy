import WebSocket, { WebSocketServer } from "ws";

const PORT = 8080; // 自定义WebSocket服务器地址和端口
const HOST = "localhost"; // 使用本地回环地址
const wss = new WebSocketServer({ port: PORT });

// 与客户端建立连接，成功连接时触发
wss.on("connection", (socket: WebSocket) => {
  socket.on("message", onMessage); // 监听消息事件
  socket.on("close", () => console.log("客户端断开连接")); // 监听关闭事件
  socket.on("error", console.error); // 监听错误事件
});

function onMessage(message: WebSocket.RawData) {
  console.log("收到消息:", message); // ArrayBuffer
  // 发送消息给每个连接到服务的客户端
  wss.clients.forEach((client) => {
    // console.log("client :>> ", client); // 每个 client 都是一个websocket实例
    if (client.readyState === WebSocket.OPEN) {
      client.send(`服务器收到: ${message}`);
    }
  });
  // 实时只对当前发送信息的用户，将发送的信息返回到该用户的客户端
  // socket.send(`服务器收到: ${message}`);
}

console.log(`WebSocket服务器启动，监听地址 socket://${HOST}:${PORT}`);
