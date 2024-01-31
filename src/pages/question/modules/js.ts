import { parseMD } from "../../../utils/index";
import { SkJavascript } from "@twist-space/vue3-icons/sk";
import JSON from "../../../markdowns/js/序列化-23-12-08_01.md?raw";
import DBNOTO from "../../../markdowns/js/DoubleBitwiseNOTOperator( JavaScript 的双重否运算)-24-01-19_05.md?raw";
export const js = {
  logo: SkJavascript,
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
  ],
};
