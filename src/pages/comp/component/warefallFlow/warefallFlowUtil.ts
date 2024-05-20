
/**
 * 观感： 8 缺陷加载时会出现缩聚点
 * @description 不固定列数,响应式设计布局
 * @param selector 
 */
export function layoutWarefall(selector: string | HTMLElement) {
  let el: HTMLElement | undefined;
  if (typeof selector == "string") {
    el = document.querySelector(selector) as HTMLElement; // 获取容器
  }
  if (el) {
    el.style.setProperty('position', 'relative')
    const gridItems = Array.from(el?.children) as HTMLElement[]; // 获取所有的子项目
    const pw = el?.offsetWidth; // 获取容器的宽
    const itemw = gridItems[0].offsetWidth; // 获取单个子项目的最后内部填充后的宽
    const cols = Math.floor(pw / itemw); // 获取列的数目
    const space = (pw - cols * itemw) / (cols + 1); // 将剩余的空间规划为子项目间的间距
    const columns = Array(cols).fill(0);

    const len = gridItems.length;
    for (let i = 0; i < len; i++) {
      const minColHeight = Math.min(...columns);
      const colIdx = columns.indexOf(minColHeight);
      const resetStyle = {
        left: `${Math.floor((colIdx + 1) * space + itemw * colIdx)}px`,
        top: `${minColHeight}px`,
        position: 'absolute',
        opacity: 1, // 等待计算完成后再显示，处理出现的缩聚点影响观感问题
      };
      Object.assign(gridItems[i].style, resetStyle);
      columns[colIdx] += gridItems[i].offsetHeight + 10;
    }
    el?.style.setProperty('height', `${Math.max(...columns)}px`)
  }
}

/**
 * 判断容器的滚动条是否滚动到底部
 * @param selector 
 * @param binding 
 * @param delay 
 * @returns 
 */
export function loadScroll(selector: string | Element, binding: () => void, delay = 2000): () => void {
  let el: Element | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined

  if (typeof selector == "string") {
    el = document.querySelector(selector) as Element; // 获取容器
  }

  const handleScroll = (event: Event) => {
    if (!timer) {
      const { scrollTop, clientHeight, scrollHeight } = el as Element;
      if (scrollTop + clientHeight >= scrollHeight) {
        timer = setTimeout(() => {
          binding();
          timer = undefined
        }, delay)
      }
    } else {
      event && event.stopImmediatePropagation()
    }
  }
  el?.addEventListener("scroll", handleScroll);
  return () => {
    el?.removeEventListener('scroll', handleScroll)
  }
}




/**
 * 防抖（到时间间隔后，最后一次触发）
 * @param func
 * @param delay
 * @returns
 */
export function debounce(func: (...args: any[]) => void, delay: number, immediate = false) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function debounced(this: any, ...args: any[]) {
    if (!timer) {
      if (immediate) {
        func.apply(this, args)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
      return
    }
    clearTimeout(timer)
  }
}



