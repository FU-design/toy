export interface RoleInfo {
  role: string;
  icon: string;
  content: string;
}

export interface Response {
  code: number
  data: RoleInfo[]
}

export function chatMsgHistory(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: [
          {
            role: "assistant",
            icon: "",
            content: "你好",
          },
          {
            role: "user",
            icon: "",
            content: "你好,什么是异步路由?",
          },
          {
            role: "assistant",
            icon: "",
            content: "异步路由（Asynchronous Routing）通常用于单页应用（SPA）中，以优化应用加载时间和性能。具体来说，异步路由可以根据需要动态加载路由组件，而不是在应用启动时一次性加载所有路由组件。",
          },
        ]
      })
    })
  })
}