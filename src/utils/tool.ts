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

export function getSvgUrl(name: string, fileName?: string,) {
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


/**
 * 比较两个数组是否相等
 * @param arr1
 * @param arr2
 * @returns
 */
export function isArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!isObjectEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}

/**
 * 递归数组中每个对象中的元素及元素值是否相等
 * @param obj1
 * @param obj2
 * @returns
 */
export function isObjectEqual(obj1, obj2) {
  if (!obj1 && !obj2) {
    return true;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      // 递归比较对象的属性值
      if (!isObjectEqual(val1, val2)) {
        return false;
      }
    } else {
      // 直接比较基本类型的属性值
      if (val1 !== val2) {
        return false;
      }
    }
  }

  return true;
}

/**
 * 比较两个对象是否相等
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export const compareObject = (obj1, obj2) => {
  // 递归终止条件，当 obj1 或 obj2 不是对象时，此时就可以进行判断了
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    if (obj1 === obj2) {
      return true;
    } else if (obj1 !== obj2) {
      return false;
    }
  }
  // 获取对象的自由属性组成的数组
  const obj1PropsArr = Object.getOwnPropertyNames(obj1);
  const obj2PropsArr = Object.getOwnPropertyNames(obj2);
  // 如果数组的长度不相等，那么说明对象属性的个数都不同，返回 false
  if (obj1PropsArr.length !== obj2PropsArr.length) {
    return false;
  }
  // 记录当前 compareObject 的返回值，默认是 true
  let status = true;
  for (const key of obj1PropsArr) {
    if (obj1[key] != null && obj2[key] != null) {
      status = compareObject(obj1[key], obj2[key]);
      // 关键代码，当 status 为 false 时下面就不用再进行判断了，说明两个对象的内容并不相同
      // 如果没有下面这条语句，那么只要对象底层的内容是相同的那么就返回 true
      if (!status) {
        break;
      }
    }
  }
  // 每次 compareObject 执行的返回结果
  return status;
};


// // 阻止浏览器后退
// const preventBackNavigation = () => {
//   window.history.pushState(null, '', window.location.href);
//   window.addEventListener('popstate', handlePopState);
// };

// // 恢复浏览器前进后退功能
// const allowBackNavigation = () => {
//   window.removeEventListener('popstate', handlePopState);
// };

// // 处理浏览器后退时的事件
// const handlePopState = () => {
//   if (!checkReqParamschanged()) {
//     const payLoad = {
//       title: '请检查编辑内容是否已保存',
//       confirmButtonText: '继续退出',
//       cancelButtonText: '继续编辑',
//       ctxHtmlStr: `若不保存，退出后所编辑的内容会丢失`,
//     };
//     useElMessageBox2(payLoad)
//       .then(() => {
//         allowBackNavigation(); // 确认退出时恢复正常历史记录功能
//         window.history.back(); // 执行浏览器后退
//       })
//       .catch(() => {
//         preventBackNavigation(); // 继续阻止后退，重新绑定监听器
//       });
//   } else {
//     executeBackNavigation();
//   }
// };

// // 执行浏览器的返回操作
// const executeBackNavigation = () => {
//   const popstateHandler = () => {
//     allowBackNavigation();
//     window.removeEventListener('popstate', popstateHandler);
//   };
//   window.addEventListener('popstate', popstateHandler);
//   window.history.back();
// };