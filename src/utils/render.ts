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

      let out = `<div><img style="${imgBox}" width="600px" height="auto" src="${href}" alt="${text}"`;
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
        return hljs.highlight(code, { language }).value; // https://highlightjs.readthedocs.io/en/latest/README.html#
      },
    })
  );
  marked.use({ renderer: renderer() });
  return marked.parse(content);
};

/**
 * 通过获取的模块中的文件目录，遍历解析模块中的md文件，展示到页面中
 * @param modulesFiles
 * @param modName 目录名称
 * @returns
 */
export const getFileList = (modulesFiles: any, modName: string) => {
  const importStrs = [];
  for (let [k, v] of Object.entries(modulesFiles)) {
    importStrs.push({
      QS: k.replace(`/src/markdowns/${modName}/`, "").replace(".md", ""),
      AS: "",
      URL: "",
      MDMETA: v,
      MDPARSE: parseMD(v as string),
      isMD: false,
    });
  }
  return importStrs;
};
