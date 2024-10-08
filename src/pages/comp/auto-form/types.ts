export interface FormOptions {
  rowCol: number; // 表单单行几列
  hideOk: boolean; // 是否隐藏确认按钮
  okText: string; //确认按钮文案
  hideCancel: boolean; // 是否隐藏取消按钮
  cancelText: string; //取消按钮文案
}

export interface FormItemState {
  type: string; //表单item类型 参考antd所支持标签
  key: string; //表单对应的绑定值 key
  defaultValue?: string; //表单项对应的默认值
  copy?: boolean; //针对于text文本复制
  fieldNames?: { label: string; value: string }; // 自定义选项中的label和value 如 { label:'key',value:'value' }
  itemOptions?: any; // 表单item标签对应的属性拓展 例如：prop  rules label等标签属性
  extraOps?: any; // input等标签对应的属性拓展 例如：placeholder size type等标签属性
  on?: any; // input等标签对应的事件拓展 例如：click,change等标签属性
  values?: any[]; // 拥有选项的标签选项 例如:select  Array为固定选项 动态接口赋值请使用 setOptionsVal 设置prop对应的选项列表
  params?: any; // 需要携带参数 依赖于其他标签参数请使用%{}%模板用于联动 如 %{resGroupId}%
  template?: string; // 插槽
}
