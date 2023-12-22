export interface Panel {
  visible: boolean;
  width?: string;
  title?: string;
  hasFooter?: boolean;
}

export interface DragState {
  startMouseL: number;
  startSizeW: number;
}
