## websocket 的基本使用

1. 创建 websocket 实例
   ```ts
   const ws: WebSocket = new WebSocket("ws://localhost:8080");
   ```
2. 通过 websocket 实例的 4 个主要事件来控制通讯过程

   - `open`：监听是否连接到 websocket 服务器
   - `message`：监听接收到从 websocket 服务器传递回来的消息
   - `close`：监听是否与 websocket 服务器断开连接
   - `error`：监听与 websocket 服务器连接过程中出现的连接错误信息

3. 具体代码示例

   ```ts
   let ws: WebSocket;
   const connectWebSocket = () => {
     ws = new WebSocket("ws://localhost:8080");

     // 监听打开事件
     ws.onopen = (event) => {
       console.log("连接到WebSocket服务器", event);
     };

     // 监听消息事件
     ws.onmessage = (event) => {
       const recevice = event.data as string;
       console.log("接收到的消息" + JSON.parse(recevice));
     };

     // 监听关闭事件
     ws.onclose = (event) => {
       console.log("断开与WebSocket服务器的连接", event);
     };

     // 监听错误事件
     ws.onerror = (error) => {
       console.error("WebSocket错误:", error);
     };
   };
   ```

### 具体细节

1. error 事件触发后，紧接着就是触发 close 事件。
2. message 事件在服务器发送讯息时触发。
3. 服务端向客户端发送的信息可包含：

   - 纯文本信息（string）
   - 二进制数据（ArrayBuffer）或图像

     - 一次仅支持一种二进制格式
       ```js
       socket.binaryType = ”arrayBuffer”;
       socket.binaryType = ”blob”;
       ```

4.
