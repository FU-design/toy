/**
 * 角度转弧度
 * @param deg
 * @returns
 */
export const degTrigger = (deg: string): number => {
  return parseInt(deg.replace("deg", "")) * (Math.PI / 180);
};

/**
 * 弧度转角度
 * @param rad
 * @returns
 */
export const radTrigger = (rad: string): number => {
  return parseInt(rad.replace("rad", "")) * (180 / Math.PI);
};

/**
 * @description: 复制文本到剪贴板
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
