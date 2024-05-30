import WebSocket, { Server } from "ws";

// 自定义WebSocket服务器地址和端口
const PORT = 8080;
const HOST = "localhost"; // 使用本地回环地址

// 创建WebSocket服务器
const wss = new Server({ port: PORT });
// 创建消息收集器
const msgCollecter: string[] = [];

wss.on("connection", (ws: WebSocket) => {
  console.log("新的客户端连接");

  // 监听消息事件
  ws.on("message", (message: string) => {
    console.log("收到消息:", message);
    msgCollecter.push(JSON.parse(message));
    console.log("msgCollecter :>> ", msgCollecter);

    // 发送消息给每个连接到服务的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`服务器收到: ${message}`);
      }
    });

    // 实时对当前发送信息的连接用户返回消息
    // ws.send(`服务器收到: ${message}`);
  });

  // 监听关闭事件
  ws.on("close", () => {
    console.log("客户端断开连接");
  });

  // 监听错误事件
  ws.on("error", (error) => {
    console.error("WebSocket错误:", error);
  });
});

console.log(`WebSocket服务器启动，监听地址 ws://${HOST}:${PORT}`);
