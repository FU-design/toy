export const getImgs = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(getImgsUrlList());
      }, 200);
    } catch (error) {
      reject(error);
    }
  });
};

const getImgsUrlList = () => {
  return Object.keys(new Array(60).fill(1)).map((_v, idx) => {
    return `https://picsum.photos/id/${idx}/100/${generateRandomNumber()}`;
  });
};

const generateRandomNumber = () => {
  // 生成随机宽度和高度，例如，这里设置最大宽高为 800 像素
  const maxHeight = 200;
  const randomHeight = Math.floor(Math.random() * maxHeight) + 1;
  return Math.max(randomHeight, 50);
};
