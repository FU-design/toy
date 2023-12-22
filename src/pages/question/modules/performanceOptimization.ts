import { parseMD } from "../../../utils/index";
import debounceAndthrottle from "../../../markdowns/boost/防抖和节流-23-12-08_01.md?raw";
export const performanceOptimization = {
  category: "性能优化",
  qestionList: [
    {
      QS: "webWorker的使用",
      AS: "",
      URL: "",
      MDMETA: ``,
      MDPARSE: "",
      isMD: false,
    },
    {
      QS: "防抖和节流",
      AS: "",
      URL: "",
      MDMETA: debounceAndthrottle,
      MDPARSE: parseMD(debounceAndthrottle),
      isMD: false,
    },
  ],
};
