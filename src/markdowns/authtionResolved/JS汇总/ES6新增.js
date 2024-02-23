// const products = [
//   { name: "apples", category: "fruits" },
//   { name: "oranges", category: "fruits" },
//   { name: "potatoes", category: "vegetables" },
// ];

// {
//   const groupByCategory = products.reduce((group, product) => {
//     const { category } = product;

//     group[category] = group[category] ?? [];
//     group[category].push(product);
//     //等价于上述写法
//     //   if (!group[category]) {
//     //     group[category] = [product];
//     //   } else {
//     //     group[category].push(product);
//     //   }

//     return group;
//   }, {});

//   console.log(groupByCategory);
// }

// {
//   const groupByCategory = Object.groupBy(products, (product) => {
//     return product.category;
//   });

//   console.log(groupByCategory);
// }
// ——————————————————————————————————————————————————————————————————————————————————

/**
 * 非对象参数被强制为对象。 undefined 和 null 不能被强制转换为对象并预先抛出 TypeError。
 * 只有字符串可以拥有自己的可枚举属性，而所有其他原语都返回空数组。
 */
console.log(Object.keys(100)); // []
console.log(Object.keys("foo")); // ['0','1','2']
console.log("----------------");
console.log(Object.values(200)); // []
console.log(Object.values("foo")); // ['f','o','o']
console.log("----------------");
console.log(Object.entries(200)); // []
console.log(Object.entries("foo")); // [['0','f'],['1','o'],['2','o']]
