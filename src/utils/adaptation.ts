/**
 * 获取当前系统的默认文字大小
 */
export const getSysFontSize = () => {
  const el = document.createElement("span");
  el.innerHTML = "text";
  el.style.visibility = "hidden";
  document.body.appendChild(el);
  return document.defaultView
    ?.getComputedStyle(el, null)
    .getPropertyValue("font-size");
};
