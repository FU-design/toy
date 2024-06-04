import type { ChatInfo } from "@/api/login/types"

export enum MessageType {
  ADD_MESSAGE,
}

export interface MsgBox {
  content: string
  sender: ChatInfo
  timestamp: Date
  type: MessageType
}

export enum Pos {
  left = "msgL",
  right = "msgR",
}

export type PosType = keyof typeof Pos;
