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
    msgCollecter.push(message);

    

    console.log("msgCollecter :>> ", JSON.parse(message));

    // 发送消息给客户端
    ws.send(`服务器收到: ${msgCollecter}`);
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
