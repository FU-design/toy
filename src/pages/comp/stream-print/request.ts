export interface RoleInfo {
  role: string;
  icon: string;
  content: string;
}

export interface Response {
  code: number
  data: RoleInfo[]
}

import test from './test.md?raw'

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
            content: test,
          },
          {
            role: "assistant",
            icon: "",
            content: "你addddddddddddddddddffffffffffffffffffffffffffffffoaaaa好",
          },
          {
            role: "user",
            icon: "",
            content: "你好,什么是异aalhlfhafaufoafnafoafoanfaofnaonfaofna步路由?",
          },
        
        ]
      })
    })
  })
}