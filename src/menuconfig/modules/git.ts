import { parseMD } from "@/utils/index";
import github from "@/markdowns/git/github-23-12-22_01.md?raw";
import gitCommand from "@/markdowns/git/git常用指令-23-12-29_02.md?raw";
import { SkGit } from "@twist-space/vue3-icons/sk";

export const git = {
  logo: SkGit,
  category: "GIT",
  qestionList: [
    {
      QS: "【github】解决提交代码时出现的问题",
      AS: "",
      URL: "https://blog.csdn.net/zz00008888/article/details/123529805,https://blog.csdn.net/zpf1813763637/article/details/128340109",
      MDMETA: github,
      MDPARSE: parseMD(github),
      isMD: false,
    },
    {
      QS: "【git_command】git常用命令（github）",
      AS: "",
      URL: "",
      MDMETA: gitCommand,
      MDPARSE: parseMD(gitCommand),
      isMD: false,
    },
  ],
};
