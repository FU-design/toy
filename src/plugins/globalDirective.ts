import type { App } from "vue";

const install = (app: App) => {
  // 自定义指令 Markdown 文件内容转化为 HTML
  app.directive("md", {
    // 在绑定元素的 attribute 前或事件监听器应用前调用
    // created(el, binding, vnode, prevVnode) {},

    // 在元素被插入到 DOM 前调用
    // beforeMount(el, binding, vnode, prevVnode) {},

    // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
    mounted(el: any, binding: any, _vnode: any, _prevVnode: any) {
      const { value } = binding;
      el.innerHTML = parseMD(value);
    },

    // 绑定元素的父组件更新前调用
    // beforeUpdate(el, binding, vnode, prevVnode) {},

    // 在绑定元素的父组件及他自己的所有子节点都更新后调用
    // updated(el, binding, vnode, prevVnode) {},

    // 绑定元素的父组件卸载前调用
    // beforeUnmount(el, binding, vnode, prevVnode) {},

    // 绑定元素的父组件卸载后调用
    // unmounted(el, binding, vnode, prevVnode) {},
  });
};

export default {
  install,
};
