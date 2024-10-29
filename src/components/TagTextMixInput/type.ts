export interface InnerOps {
  type: 'tag' | 'text';
  text: string;
  [propKey: string]: any;
}

export interface mixConfig<T> {
  contenteditable?: boolean;
  placeholder?: string;
  contents?: T[];
}

export const NodeInfo = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true // 修改字符是否发生改变(默认false)
};

export interface ListItem {
  inputContent: InnerOps[];
  [propKey: string]: any;
}

export type CompType<T extends abstract new (...args: any) => any> = InstanceType<T>;
