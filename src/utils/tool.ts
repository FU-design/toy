/**
 * 角度转弧度
 * @param deg 角度
 * @returns
 */
export const degTrigger = (deg: string): number => {
  return parseInt(deg.replace("deg", "")) * (Math.PI / 180);
};

/**
 * 弧度转角度
 * @param rad 弧度
 * @returns
 */
export const radTrigger = (rad: string): number => {
  return parseInt(rad.replace("rad", "")) * (180 / Math.PI);
};

/**
 * 复制文本到剪贴板
 * @param {string} text 复制的字符串
 */
export const copyText = (text: string): Promise<any> => {
  // 默认使用浏览器自带api
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // 浏览器不支持 clipboard Api 时使用 ClipboardJS
  return new Promise(async (resolve, reject) => {
    try {
      const { default: ClipboardJS } = await import("clipboard");
      // 判断浏览器是否支持
      if (!ClipboardJS.isSupported()) {
        reject(new Error("ClipboardJS not support!"));
        return;
      }
      const btn = document.createElement("button");
      btn.innerText = text;
      const clipboard = new ClipboardJS(btn, {
        text: () => text,
      });
      clipboard.on("success", () => {
        resolve(true);
        clipboard.destroy();
      });
      clipboard.on("error", (err) => {
        reject(err);
        clipboard.destroy();
      });
      btn.click();
    } catch (error) {
      console.log("copytext :>> ", error);
    }
  });
};

// 对浏览器窗口关闭前的二次确认的操作
export function windowBeforeCloseConfirm() {
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    // // 自定义提示信息（某些浏览器可能不显示这个信息）
    // const confirmationMessage = "你确定要离开此页面吗？未保存的数据将会丢失。";

    // // 现代浏览器设置提示信息
    // (e || window.event).returnValue = confirmationMessage;

    // // 对旧版浏览器设置返回值
    // return confirmationMessage;
  });
}

export function getImageUrl(name?: string) {
  return new URL(`../assets/images/${name}.jpg`, import.meta.url).href;
}

export function getSvgUrl(fileName: string, name?: string) {
  const path = fileName
    ? `../assets/svg/${fileName}/${name}.svg`
    : `../assets/svg/${name}.svg`;
  return new URL(path, import.meta.url).href;
}

export function throttle(func: Function, delay: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

/**
 * 从给定的文件路径中提取不带扩展名的文件名。
 * @param filePath 文件的完整路径。
 * @returns 提取到的不带扩展名的文件名。
 */
export function extractFileNameWithoutExtension(filePath: string): string {
  // 正则表达式用于匹配文件名（不含扩展名）
  const fileNameRegex = /\/([^/.]+)\.[^/]+$/;
  const match = filePath.match(fileNameRegex);
  if (match) {
    // 返回匹配到的文件名（不含扩展名）
    return match[1];
  }
  // 如果没有匹配到，则返回空字符串
  return "";
}
