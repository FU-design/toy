import { parseMD } from "../../../utils/index";
import menuList from "../../../markdowns/learnList/menuList.md?raw";
export const learnList = {
  category: "技能清单",
  qestionList: [
    {
      QS: "技能清单",
      AS: "",
      URL: "",
      MDMETA: menuList,
      MDPARSE: parseMD(menuList),
      isMD: false,
    },
  ],
};
