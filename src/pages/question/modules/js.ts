import { parseMD } from "../../../utils/index";
import JSON from "../../../markdowns/js/序列化-23-12-08_01.md?raw";
import DomPos from "../../../markdowns/js/定位dom于视口中的位置-24-01-08_03.md?raw";
import windowWH from "../../../markdowns/js/获取屏幕宽高width(),outerWidth,innerWidth,clientWidth的区别-24-01-09_04.md?raw";
import DBNOTO from "../../../markdowns/js/DoubleBitwiseNOTOperator( JavaScript 的双重否运算)-24-01-19_05.md?raw";
import autoClosePanel from "../../../markdowns/js/控制浮动面板点击空白处显隐-24-01-31_06.md?raw";
export const js = {
  category: "JS",
  qestionList: [
    {
      QS: "ES6",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "序列化",
      AS: "",
      URL: "",
      MDMETA: JSON,
      MDPARSE: parseMD(JSON),
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
      QS: "Double Bitwise NOT Operator(JavaScript 的双重否运算)",
      AS: "",
      URL: "",
      MDMETA: DBNOTO,
      MDPARSE: parseMD(DBNOTO),
      isMD: false,
    },
    {
      QS: "类型判断",
      AS: "",
      URL: "",
      MDMETA: "",
      MDPARSE: "",
      isMD: false,
    },
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
  ],
};
