export interface MockData {
  code: number;
  data: string[];
  msg: string;
}

/**
 * 生成对应长度的数字、大小写字母的字符串
 * @param {number} length 生成的字符串长度
 * @return {string} 生成的字符串
 */
export const randomString = (length: number) => {
  const str = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
};

/**
 * 模拟接口生成数据
 * @param {number} size 数据条数
 * @returns {Promise<MockData>} 模拟接口数据
 */
export const mockData = (size = 1000): Promise<MockData> => {
  const data = new Array(size).fill(1).map((_v, i) => i + 1 + randomString(8));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: data,
        msg: "",
      });
      reject(404);
    }, 500);
  });
};