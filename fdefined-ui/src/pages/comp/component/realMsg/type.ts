export interface MsgBox {
  id: string | number;
  msg: string;
}

export enum Pos {
  left = "msgL",
  right = "msgR",
}

export type PosType = keyof typeof Pos;
