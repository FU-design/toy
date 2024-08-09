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
  return new URL(`../assets/images/${name}.jpg`, import.meta.url).href
}