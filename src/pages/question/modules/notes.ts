import { RaNotionLogo } from "@twist-space/vue3-icons/ra";
import { parseMD } from "../../../utils/index";
import DomPos from "../../../markdowns/notes/定位dom于视口中的位置-24-01-08_03.md?raw";
import windowWH from "../../../markdowns/notes/获取屏幕宽高width(),outerWidth,innerWidth,clientWidth的区别-24-01-09_04.md?raw";
import autoClosePanel from "../../../markdowns/notes/控制浮动面板点击空白处显隐-24-01-31_06.md?raw";
import SpliceOfPage from "../../../markdowns/notes/前端实现分页处理.md?raw";
export const notes = {
  logo: RaNotionLogo,
  category: "问题记录",
  qestionList: [
    {
      QS: "获取屏幕宽高width(),outerWidth,innerWidth,clientWidth的区别",
      AS: "",
      URL: "",
      MDMETA: windowWH,
      MDPARSE: parseMD(windowWH),
      isMD: false,
    },
    {
      QS: "控制浮动面板点击空白处显隐",
      AS: "",
      URL: "",
      MDMETA: autoClosePanel,
      MDPARSE: parseMD(autoClosePanel),
      isMD: false,
    },
    {
      QS: "定位dom于视口中的位置",
      AS: "",
      URL: "",
      MDMETA: DomPos,
      MDPARSE: parseMD(DomPos),
      isMD: false,
    },
    {
      QS: "前端实现分页处理【vue3 + Element Plus】",
      AS: "",
      URL: "",
      MDMETA: SpliceOfPage,
      MDPARSE: parseMD(SpliceOfPage),
      isMD: false,
    },
    {
      QS: "一次加载大量数据的页面dom处理。",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "对树型结构数据的处理。",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "运维大屏的页面适配方案。",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "input输入框和select选择器“结合”使用",
      AS: "",
      URL: "https://juejin.cn/post/7083766700356829215#heading-2",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "利用ContentEditable属性在VUE下写一个输入框",
      AS: "",
      URL: "https://blog.yangteng.me/articles/2017/vue-content-editable/",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "【你不知道的ElementUI】被隐藏的神级组件: Popper和它的管家",
      AS: "",
      URL: "https://bbs.huaweicloud.com/blogs/326994",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "【Elment plus的小问题】el-popover点击空白处无法关闭",
      AS: "",
      URL: "https://www.cnblogs.com/listen9436/p/15016289.html",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
  ],
};
