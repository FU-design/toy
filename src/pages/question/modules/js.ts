import { parseMD } from "../../../utils/index";
import JSON from "../../../markdowns/js/序列化-23-12-08_01.md?raw";
import DomPos from "../../../markdowns/js/定位dom于视口中的位置-24-01-08.md?raw";
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
      QS: "类型判断",
      AS: "",
      URL: "",
      MDMETA: "",
      MDPARSE: "",
      isMD: false,
    },
  ],
};
