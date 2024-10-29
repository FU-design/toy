/**
 * 模拟选项假数据
 */
export const initSelectData = () => {
  const fragment = document.createDocumentFragment();
  const selectBox = document.querySelector('.select-plane');
  for (let i = 0; i < 30; i++) {
    const item = document.createElement('div');
    item.classList.add('select-item');
    item.setAttribute('data-key', `item-${i}`);
    item.innerHTML = `function ${i + 1}`;
    fragment.appendChild(item);
  }
  selectBox?.appendChild(fragment);
};

/**
 * 模拟请求的table数据
 */
export const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(1).map((_v, idx) => {
        return {
          id: `item-${idx}`,
          name: `name-${idx}`,
          inputContent: [
            {
              type: 'text',
              text: 'hello'
            },
            {
              type: 'tag',
              text: 'hello'
            }
          ]
        };
      }, 1000);
      resolve(data);
    });
  });
};
