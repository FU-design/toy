export interface MsgBox {
  id: string | number;
  name: string;
  msg: string;
}

export enum Pos {
  left = "msgL",
  right = "msgR",
}

export type PosType = keyof typeof Pos;
