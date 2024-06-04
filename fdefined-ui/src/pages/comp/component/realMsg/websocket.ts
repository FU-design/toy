type OpenListener = (this: WebSocket, ev: Event) => any;
type CloseListener = (this: WebSocket, ev: CloseEvent) => any;
type MessageListener = (this: WebSocket, ev: MessageEvent) => any;
type ErrorListener = (this: WebSocket, ev: Event) => any;

interface EvtListeners {
  open: OpenListener[];
  close: CloseListener[];
  message: MessageListener[];
  error: ErrorListener[];
}

type EvtType = keyof EvtListeners;

export default class WebsocktClient {
  private url: string; // websocket url
  private socket: WebSocket | null; // websocket instance
  private messageQueue: any[]; // message logs
  private isConnected: boolean; // connect status
  private evtListeners: EvtListeners;
  private options?: any
  private heartbeatTimer: any;
  private reconnectTimer: any;

  constructor(url: string, options: any = {}) {
    this.url = url;
    this.socket = null;
    this.messageQueue = [];
    this.isConnected = false;
    this.evtListeners = {
      open: [],
      close: [],
      message: [],
      error: [],
    };
    this.options = {
      reconnectInterval: options.reconnectInterval || 1000,
      heartbeatInterval: options.heartbeatInterval || 30000,
      ...options,
    };
    this.heartbeatTimer = null;
    this.reconnectTimer = null
    this.connect()
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = (evt: Event) => {
      this.isConnected = true;
      this._flushMessageQueue();
      // this._startHeartbeat();
      this._triggerEvent('open', evt);
    };

    this.socket.onclose = (evt: CloseEvent) => {
      this.isConnected = false;
      this._stopHeartbeat();
      this._triggerEvent('close', evt);
      this._reconnect();
    };

    this.socket.onmessage = (evt: MessageEvent) => {
      this._triggerEvent('message', evt);
    };

    this.socket.onerror = (evt: Event) => {
      this._triggerEvent('error', evt);
    };
  }

  disConnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  send(message: any) {
    if (this.isConnected) {
      this.socket?.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  // 函数重载定义 on 方法
  on(evtType: 'open', listener: (this: WebSocket, ev: Event) => any): void;
  on(evtType: 'close', listener: (this: WebSocket, ev: CloseEvent) => any): void;
  on(evtType: 'message', listener: (this: WebSocket, ev: MessageEvent) => any): void;
  on(evtType: 'error', listener: (this: WebSocket, ev: Event) => any): void;
  on(evtType: EvtType, listener: (this: WebSocket, ev: any) => any): void {
    if (this.evtListeners[evtType]) {
      this.evtListeners[evtType].push(listener);
    }
  }


  off(evtType: 'open', listener: (this: WebSocket, ev: Event) => any): void;
  off(evtType: 'close', listener: (this: WebSocket, ev: CloseEvent) => any): void;
  off(evtType: 'message', listener: (this: WebSocket, ev: MessageEvent) => any): void;
  off(evtType: 'error', listener: (this: WebSocket, ev: Event) => any): void;
  off(evtType: EvtType, listener: (this: WebSocket, ev: any) => any): void {
    if (this.evtListeners[evtType]) {
      const index = this.evtListeners[evtType].indexOf(listener);
      if (index > -1) {
        this.evtListeners[evtType].splice(index, 1);
      }
    }
  }


  private _triggerEvent(evtType: EvtType, event: Event) {
    if (this.evtListeners[evtType]) {
      this.evtListeners[evtType].forEach((listener: any) => {
        if (listener) {
          listener.call(this.socket, event);
        }
      });
    }
  }

  private _flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.send(message);
    }
  }

  private _startHeartbeat() {
    if (this.options.heartbeatInterval > 0) {
      this.heartbeatTimer = setInterval(() => {
        if (this.isConnected) {
          this.send({ type: 'heartbeat' });
        }
      }, this.options.heartbeatInterval);
    }
  }

  private _stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private _reconnect() {
    if (this.options.reconnectInterval > 0) {
      this.reconnectTimer = setTimeout(() => {
        this.connect();
      }, this.options.reconnectInterval);
    }
  }
}
