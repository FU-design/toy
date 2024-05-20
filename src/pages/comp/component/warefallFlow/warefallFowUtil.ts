/**
 * 观感： 6 缺陷，图片模糊
 */
export const layoutGrid = () => {
  const grid = document.querySelector(".grid") as HTMLDivElement;
  // 获取所有的需要遍历的项目的总数
  const gridItems = Array.from(grid.children) as HTMLElement[];
  // 获取容器的宽度
  const containerWidth = grid.clientWidth;

  // 根据提供的容器和每列最小宽度（200px）来确认会产生多少列
  let columnCount = Math.floor(containerWidth / 200);
  // 列数提供至少存在一列
  columnCount = Math.max(columnCount, 1);

  const columns = Array(columnCount).fill(0); // 初始化列
  const columnWidth = Math.floor(containerWidth / columnCount); // 重新计算每个列的宽度
  const gutterWidth = ~~(columnWidth * 0.05); // 间距为列宽的 5%

  gridItems.forEach((item) => {
    const minColumnHeight = Math.min(...columns);
    const columnIndex = columns.indexOf(minColumnHeight);
    const left = (columnWidth + gutterWidth) * columnIndex;
    const top = minColumnHeight;

    const resetStyle = {
      width: `${columnWidth - gutterWidth}px`, // 去除项目间的间隔得出最后每个项目的宽度
      top: `${top}px`,
      left: `${left}px`,
      opacity: "1", // 图片布局完成后设置透明度为 1
    };
    Object.assign(item.style, resetStyle);
    columns[columnIndex] += item.offsetHeight + gutterWidth;
  });

  grid.style.height = `${Math.max(...columns)}px`; // 可有可无
};

/**
 * 观感： 8 缺陷加载时会出现缩聚点
 */
export const layoutFull = () => {
  const grid = document.querySelector(".grid") as HTMLDivElement; // 获取容器
  const gridItems = Array.from(grid.children) as HTMLElement[]; // 获取所有的子项目

  const pw = grid.offsetWidth; // 获取容器的宽
  const itemw = gridItems[0].offsetWidth; // 获取单个子项目的最后内部填充后的宽
  const cols = Math.floor(pw / itemw); // 获取列的数目
  const space = (pw - cols * itemw) / (cols + 1); // 将剩余的空间规划为子项目间的间距

  const len = gridItems.length;
  const columns = Array(cols).fill(0);

  for (let j = 0; j < len; j++) {
    const minColHeight = Math.min(...columns);
    const colIdx = columns.indexOf(minColHeight);
    const resetStyle = {
      left: `${Math.floor((colIdx + 1) * space + itemw * colIdx)}px`,
      top: `${minColHeight}px`,
    };
    Object.assign(gridItems[j].style, resetStyle);
    columns[colIdx] += gridItems[j].offsetHeight + 10;
  }
};
