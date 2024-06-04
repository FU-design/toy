import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import { v4 as uuidv4 } from "uuid";

const port = 8080;
const server = http.createServer();
const wsServer = new WebSocketServer({ server });

server.listen(port, () =>
  console.log(`WebSocket server is running on port ${port}`)
);

// save maintaining all active connections
const clients: Record<string, WebSocket> = {};

// every connection is a socket or information of user
wsServer.on("connection", (socket: WebSocket) => {
  console.log('Client connected :>> ');
  // unique code
  const userId = uuidv4();
  // collect user
  clients[userId] = socket;

  socket?.on('message', (data: WebSocket.RawData) => {
    broadcastMessage(data.toString())
  })
});


// send messgae all active connections
function broadcastMessage(json: string) {
  const data = json;
  for (let userId in clients) {
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  };
}

