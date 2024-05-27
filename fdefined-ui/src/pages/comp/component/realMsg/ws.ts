export function WebSocketServer(wsUrl: string | URL) {
  const ws = new WebSocket(wsUrl);
  return ws;
}
