import PJ from "@/markdowns/vue/Provide&Inject-vue3.md?raw";
import vueApitoCreateData from "@/markdowns/vue/响应式数据实现-23-12-13_02.md?raw";
import { parseMD } from "@/utils/index";
import { SkVuejsLight } from "@twist-space/vue3-icons/sk";

export const vue = {
  logo: SkVuejsLight,
  category: "Vue",
  qestionList: [
    {
      QS: "Vue3.0 reactive()、ref()、unref()、isref()、toRefs()等常用",
      AS: "",
      URL: "",
      MDMETA: vueApitoCreateData,
      MDPARSE: parseMD(vueApitoCreateData),
      isMD: false,
    },
    {
      QS: "keep-alive单个缓存去除、动态移除缓存。",
      AS: "",
      URL: "",
      MDMETA: "",
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "在vue3中的 watch 和 watchEffect 侦听器用法和区别。",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "在vue3中的路由传参方式有哪些。",
      AS: "",
      URL: "",
      MDMETA: "",
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "在vue3中不能使用 require 的处理方法。",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "在vue中动态引入组件以及动态引入js的方法。",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "在vue3 setup 语法糖中使用 beforeRouteEnter 的问题",
      AS: "",
      URL: `https://www.jianshu.com/p/5c16e92dbfd7`,
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "VUE3 Provide / Inject传递函数",
      AS: "",
      URL: `https://blog.csdn.net/z_y_z_l/article/details/124429804`,
      MDMETA: PJ,
      MDPARSE: parseMD(PJ),
      isMD: false,
    },
  ],
};
