import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

/**
 * @description 对href进一步格式化
 * @param href
 * @returns
 */
const cleanUrl = (href: string) => {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
};

/**
 * @description 重写 renderer函数
 * @returns
 */
const renderer = () => {
  // 图片容器样式
  const imgBox = `padding: 4px; box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)`;

  // 重写图片渲染逻辑
  const renderer = {
    image(href: string, title: string | null, text: string): string {
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;

      let out = `<div><img style="${imgBox}" width="600rem" height="auto" src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${title}"`;
      }
      out += "></div>";
      return out;
    },
  };

  return renderer;
};

/**
 * @description 解析 Markdown 在页面中展示  marked 配合 highlight.js 使用代码块
 * @param content
 */
export const parseMD = (content: string) => {
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value; // https://highlightjs.readthedocs.io/en/latest/readme.html#
      },
    })
  );
  marked.use({ renderer: renderer() });
  return marked.parse(content);
};

/**
 * 通过获取的模块中的文件目录，遍历解析模块中的md文件，展示到页面中
 * @param modulesFiles
 * @returns
 */
export const getFileList = async (modulesFiles: any, modName: string) => {
  const importStrs = [];
  const fileKeys = Object.keys(modulesFiles);
  for (let k of fileKeys) {
    /**
     * @note 资源可以使用 ?raw 后缀声明作为字符串引入。
     * https://cn.vitejs.dev/guide/assets
     */
    const res: any = await import(k + "?raw");
    importStrs.push(res.default);
  }
  return getResolveFiles(fileKeys, importStrs, modName);
};

/**
 * 通过获取处理后的md文件数据，生成指定的数据结构
 * @param files
 * @param fileStr
 * @param modName
 * @returns
 */
export const getResolveFiles = (
  files: any,
  fileStr: string[],
  modName: string
) => {
  return files.reduce((pre: any, curr: string, index: number) => {
    pre.push({
      QS: curr.replace(`/src/markdowns/${modName}/`, "").replace(".md", ""),
      AS: "",
      URL: "",
      MDMETA: fileStr[index],
      MDPARSE: parseMD(fileStr[index]),
      isMD: false,
    });
    return pre;
  }, []);
};
