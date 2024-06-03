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

## WebSocket 事件（event）

1. `open` ...
2. `error` 事件触发后，紧接着就是触发 close 事件。
3. `message` 事件在服务器发送讯息时触发。服务端向客户端发送的信息可包含: 纯文本信息（string）二进制数据（ArrayBuffer）或图像，一次仅支持一种二进制格式。

   - 接收信息类型处理（服务器都以字符串的形式进行响应，然后在客户端进行解析）

     - String
     - JSON
     - XML
     - ArrayBuffer（数组缓冲区）

       ```js
       socket.onmessage = function(event) {
         if(event.data instanceof ArrayBuffer ){
             var buffer = event.data;
             console.log(“Received arraybuffer”);
         }
       }
       ```

4. `close` 事件标志着服务器和客户端之间通信的结束，除非重新连接，否则无法再次交换任何信息（可能出现网络或其他不良因素触发关闭事件）

在前端使用 WebSocket 时，查看连接状态是确保实时通信正常工作的关键步骤。WebSocket 对象提供了一些属性和事件，可以帮助你监控连接状态。

## WebSocket 连接状态（status）

WebSocket 对象有一个`readyState`属性，它表示 WebSocket 连接的当前状态。`readyState`可以有以下几个值：

- `0 (WebSocket.CONNECTING)`：正在建立连接。
- `1 (WebSocket.OPEN)`：连接已建立，可以进行通信。
- `2 (WebSocket.CLOSING)`：连接正在关闭。
- `3 (WebSocket.CLOSED)`：连接已关闭或无法建立。

##### 示例：监控 WebSocket 连接状态

创建 WebSocket 连接并监控其状态：

```javascript
// 创建WebSocket连接
const socket = new WebSocket("wss://example.com/socket");

// 监听连接打开事件
socket.addEventListener("open", (event) => {
  console.log("WebSocket is open now.");
  checkConnectionStatus();
});

// 监听连接关闭事件
socket.addEventListener("close", (event) => {
  console.log("WebSocket is closed now.");
  checkConnectionStatus();
});

// 监听连接错误事件
socket.addEventListener("error", (event) => {
  console.error("WebSocket error observed:", event);
  checkConnectionStatus();
});

// 监听消息事件
socket.addEventListener("message", (event) => {
  console.log("Message from server:", event.data);
});

// 检查WebSocket连接状态
function checkConnectionStatus() {
  switch (socket.readyState) {
    case WebSocket.CONNECTING:
      console.log("WebSocket is connecting...");
      break;
    case WebSocket.OPEN:
      console.log("WebSocket is open.");
      break;
    case WebSocket.CLOSING:
      console.log("WebSocket is closing...");
      break;
    case WebSocket.CLOSED:
      console.log("WebSocket is closed.");
      break;
    default:
      console.log("Unknown WebSocket state.");
      break;
  }
}

// 定时检查WebSocket连接状态
setInterval(checkConnectionStatus, 5000);
```

## websocket 的优点

- **双向（Bidirectional）**
  http 协议，只能是客户端请求了，服务端才会做出响应，客户端使用返回的内容。websocket 协议则没有这个限制，客户端和服务端双方都可主动的向对方发送消息。

- **全双工（Full Duplex）**
  数据传输的模式：

  - 单工：数据发送方和接收方角色固定，只能是发送方单向的向接收发送数据。
  - 半双工：数据发送双方都可成为，但不能同一时间同时向对方发送或自身接收。（http(s)请求）
  - 全双工：数据发送双方都可成为，不仅可同时向对方发送而且还能同时接收数据。

- **单个 TCP 连接**
  HTTP 请求会发起新的 TCP 连接，并在收到响应后终止。需要为另一个 HTTP 请求/响应建立新的 TCP 连接；
  对于 websocket 连接，则是在 HTTP 连接的基础上进行升级，使客户端和服务器端的 websocket 连接的整个生命周期使用相同的 TCP l 连接进行。

- **低延迟**
  相比传统的 HTTP 请求-响应模型，WebSocket 减少了通信延迟，适用于实时应用。

- **持久连接**
  一旦建立，连接将保持打开状态，直到客户端或服务器主动关闭连接。

> Web Socket 是一种低级协议。一切，包括简单的请求/响应设计模式、如何创建/更新/删除资源需要、状态代码等，都建立在它之上。所有这些都是针对 HTTP 明确定义的。
> Web Socket 是一种有状态协议，而 HTTP 是一种无状态协议。Web Socket 连接可以在单个服务器上垂直扩展，而 HTTP 可以水平扩展。有一些用于 Web Socket 水平扩展的专有解决方案，但它们不是基于标准的。HTTP 附带了许多其他优点，例如缓存、路由和多路复用。所有这些都需要在 Web Socket 之上定义。（https://www.tutorialspoint.com/websockets/websockets_api.htm）
