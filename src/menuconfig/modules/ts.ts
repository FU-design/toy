import TS01 from "@/markdowns/ts/any类型-23-11-09_01.md?raw";
import TS02 from "@/markdowns/ts/接口和对象类型-23-11-09_02.md?raw";
import TS03 from "@/markdowns/ts/数组类型-23-11-09_03.md?raw";
import TS04 from "@/markdowns/ts/ts的元组类型-23-11-20_04.md?raw";
import { parseMD } from "@/utils/index";
import { SkTypescript } from "@twist-space/vue3-icons/sk";
export const ts = {
  logo: SkTypescript,
  category: "TS",
  source: [
    {
      url: "https://wangdoc.com/typescript/intro",
    },
  ],
  qestionList: [
    {
      QS: "ts01(任意类型)",
      AS: "",
      URL: "",
      MDMETA: TS01,
      MDPARSE: parseMD(TS01),
      isMD: false,
    },
    {
      QS: "ts02(接口和对象类型)",
      AS: "",
      URL: "",
      MDMETA: TS02,
      MDPARSE: parseMD(TS02),
      isMD: false,
    },
    {
      QS: "ts03(数组类型)",
      AS: "",
      URL: "",
      MDMETA: TS03,
      MDPARSE: parseMD(TS03),
      isMD: false,
    },
    {
      QS: "ts04(元组类型)",
      AS: "",
      URL: "",
      MDMETA: TS04,
      MDPARSE: parseMD(TS04),
      isMD: false,
    },
  ],
};
