import { getFileList } from "@/utils/index";
import { BiBookHalf } from "@twist-space/vue3-icons/bi";

/**
 * @note 解决无法使用 node 内置方法 require获取文件目录问题
 * https://cn.vitejs.dev/guide/migration-from-v2.html#importmetaglob
 */
const modulesFiles = import.meta.glob("@/markdowns/audition/*.md", {
  query: "?raw", // [?raw（将资源作为字符创引用） | ?url（将资源作为url引入）]
  eager: true, // 必须要配置，才能生效
  import: "default", // 默认
});

export const audition = {
  logo: BiBookHalf,
  category: "Audition",
  qestionList: getFileList(modulesFiles, "audition"),
};
