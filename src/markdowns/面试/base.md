以下是文章中的所有题目名：

# Html5 和 CSS3

- 常见的水平垂直居中实现方案
  1. display: `flex/grid`
     ```css
     .father {
       display: flex/grid;
       justify-content: center;
       align-items: center;
     }
     ```
  2. 绝对定位 + `transform:translate(-50%,-50%)`;
     ```css
     .father {
       position: relative;
     }
     .child {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
     }
     ```
  3. 绝对定位 + `margin:auto`;
     ```css
     .father {
       position: relative;
     }
     .child {
       position: absolute;
       margin: auto;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
     }
     ```
- BFC 问题

  1. Block Formmatting Context (BFC) 格式化上下文，css 布局中的一种概念，它影响元素如何定位以及与其他元素的交互。
  2. BFC 的作用：
     - 清除浮动： BFC 中的元素会避免与浮动元素重叠，让其包含浮动元素，自身自适应高度。
     - 避免元素的重叠：在 BFC 中的元素会避免与浮动元素重叠，确保布局不被破坏
     - 独立的布局环境：BFC 内的元素与外部元素的布局不会互相影响，它有自己独立的布局规则。
  3. 触发条件
     - `float` 属性为非 `none`
     - `position` 为 `absolute/fixed`
     - `display` 为 `inline-block/table-cell/table-caption`
     - `overflow` 值不为 `visible` (`hidden/auto/scroll` 即可)
     - `display: table-\*`
     - `display: flex/grid`
     - 根元素

- flex:1; 是哪些属性的缩写，对应的属性代表什么含义

  - `flex:1` <==> `flex:1 1 0%`

    - `1` 代表 `flex-grow`;
    - `1` 代表 `flex-shrink`;
    - `0%` 代表 `flex-basis`;

  - 重温 `flex` 布局

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #3f3f3f44;
        }
        .container-wrapper {
          padding: 100px;
          box-sizing: border-box;
        }
        .container {
          width: 100%;
          padding: 10px;
          overflow: auto;
          border-radius: 8px;
          box-sizing: border-box;
          border: 2px solid #ffffff;

          display: flex;
          flex-flow: row wrap;
          /* 
              显式控制 Flex 项目之间的空间。
              它仅在项目之间应用该间距，而不是在外边缘上。  
              取值：
              1. 像素值：px
              2. 百分比：根据父容器宽度计算百分比
            */
          gap: 10px; /* row-gap: 10px column-gap: 10px */
          /* align-content: center; */
          align-content: flex-start;
          /* align-content: flex-end; */
          /* align-content: space-around; */
          /* align-content: space-between; */
        }

        .item {
          min-height: 50px;
          min-width: 50px;
          padding: 6px;
          box-sizing: border-box;
          background-color: chocolate;
          border-radius: 8px;

          flex: 0 1 calc((100% - 50px + 6px) / 5);
        }
        .item:nth-child(odd) {
          background-color: #fff;
          align-self: center;
        }
        .item:nth-child(even) {
          order: 1;
          background-color: #0c6e7a;
        }

        .item > span {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: chocolate;
          border-radius: 50%;
          text-align: center;
          padding: 2px;
          color: #fff;
        }
      </style>

      <body>
        <div class="container-wrapper">
          <!-- https://css-tricks.com/snippets/css/a-guide-to-flexbox/ -->
          <div class="container" contenteditable="true">
            <div class="item"><span>1</span></div>
            <div class="item"><span>2</span></div>
            <div class="item"><span>3</span></div>
            <div class="item"><span>4</span></div>
            <div class="item"><span>5</span></div>
            <div class="item"><span>6</span></div>
            <div class="item"><span>7</span></div>
            <div class="item"><span>8</span></div>
            <div class="item"><span>9</span></div>
            <div class="item"><span>10</span></div>
            <div class="item"><span>11</span></div>
            <div class="item"><span>12</span></div>
            <div class="item"><span>13</span></div>
            <div class="item"><span>14</span></div>
            <div class="item"><span>15</span></div>
            <div class="item"><span>16</span></div>
          </div>
        </div>
      </body>
    </html>
    ```

- 隐藏元素的属性有哪些
  - `opacity:0`: 元素的透明度，元素大小不变，**不影响布局和元素交互**。
  - `visibility:hidden`: 元素不可见，元素本身大小不变，**不影响布局**，但元素**无法交互**
  - `display:none`: 隐藏元素，元素本身会消失，**会影响布局**。

# Js 相关

### Js 的基础类型，typeof 和 instanceof 的区别

- `typeof`: 主要用来判断**基本类型**，返回值为 `string`。

  ```js
  console.log(typeof 42); // "number"
  console.log(typeof "Hello"); // "string"
  console.log(typeof true); // "boolean"
  console.log(typeof undefined); // "undefined"
  console.log(typeof { name: "John" }); // "object"
  console.log(typeof null); // "object"   (这是一个特殊情况，null 被认为是对象类型)
  console.log(typeof function () {}); // "function"
  console.log(typeof Symbol()); // "symbol"
  console.log(typeof 123n); // "bigint"
  ```

- `instanceof`:
  - 判断一个对象是否是**某个类或其子类的实例** ，返回值为 `boolean`。
  - 当对象为 `null`或 `undefined` 时，`instanceof` 总是返回 `false`
  ```js
  let color1 = new String("green");
  color1 instanceof String; //  true
  let color2 = "coral"; //no type specified
  color2 instanceof String; //  false (color2 is not a String object)
  ```

### 数组的 forEach 和 map 方法有哪些区别？常用哪些方法去对数组进行增、删、改

- 预备数据

  ```js
  const arr = new Array(5).fill(1).map((_, index) => index + 1);
  ```

- forEach:

  - 没有返回值，始终返回 `undefined`
  - 遍历所有元素，执行指定的副作用（显示修改元素数组或输出打印内容）
  - 不改变原数组，除非回调函数显式修改
  - 无法再副作用函数中使用 `break` 和 `continue`，会提示存在语法错误

  ```js
  const forEachReturns = arr.forEach((item, index, array) => {
    array.unshiftu(222);
    console.log(item); // 1 1 1 1 1
    return 1;
    // setTimeout(console.log, index * 1000, item);
  });

  console.log("arr", arr); // [222, 222, 222, 222, 222, 1, 2, 3, 4, 5]

  // 在执行副作用的回调函数中最外层使用 return , 不会使 forEach 具备返回值，依旧是 undefined
  console.log("forEachReturns", forEachReturns); // undefined
  ```

- map:

  - 返回一个新数组，原数组不变，新数组的长度与原数组一致
  - 遍历所有元素，执行指定的副作用（显示修改元素数组或输出打印内容）
  - 无法再副作用函数中使用 `break` 和 `continue`，会提示存在语法错误

  ```js
  const forEachReturns = arr.map((item, index, array) => {
    array.unshift(999);
    return item;
    // setTimeout(console.log, index * 1000, item);
  });

  console.log("arr", arr); // [999, 999, 999, 999, 999, 1, 2, 3, 4, 5]
  console.log("forEachReturns", forEachReturns); //  [1, 1, 1, 1, 1]
  ```

### 闭包和作用域
#### 闭包
 在函数内部定义的函数可访问外部函数的变量，即使外部函数执行完毕，内部函数仍然能够访问这些变量。

 - 内部函数会 **记住** 它所在的 **作用域环境**（包括作用域链和其中的变量）
 - 当内部函数被调用时，它可以 **访问外部函数的变量** ，即使 **外部函数** 已经 **执行完毕**
 - 闭包 **延长了变量的生命周期**
 - **作用域** 决定了闭包中哪些变量是可访问的


注意事项：尽量少使用闭包，因闭包中的 **变量** 会一直被 **保存在内存中**，所以 **频繁使用** 时，会导致 **内存占用较高**。

  

使用案例

1. 计数器
2. 异步操作中，使用闭包延迟使用变量
3. 柯里化（currying）
4. 防抖节流
5. 分布执行
   ```js
   function multiply(x, y) {
    return x * y;
    }

    function partial(fn, ...initialArgs) {
        return function(...laterArgs) {
            return fn(...initialArgs, ...laterArgs);
        };
    }

    // 创建只需一个参数的 double 函数
    const double = partial(multiply, 2);
    console.log(double(3)); // 输出 6

    // 计算平方和立方
    function power(base, exponent) {
        return Math.pow(base, exponent);
    }

    const square = partial(power, undefined, 2);
    const cube = partial(power, undefined, 3);
    console.log(square(4)); // 输出 16
    console.log(cube(2));   // 输出 8

   ``` 
6. 事件监听器
    ```js
    function createButtonClickHandler(buttonId) {
        let clickCount = 0;
        const button = document.getElementById(buttonId);
        button.addEventListener('click', function() {
            clickCount++;
            console.log(`Button clicked ${clickCount} times`);
        });
    }

    createButtonClickHandler('myButton');  // clickCount 不会因为每次点击绑定事件的按钮就被重置为 0，而是持续叠加。
    ```
7. 私有变量
    ```js
    function createBankAccount(initialBalance) {
      let balance = initialBalance; // 私有变量
      return {
        deposit(amount) {
          balance += amount;
          return balance;
        },
        withdraw(amount) {
          if (amount <= balance) {
            balance -= amount;
            return balance;
          } else {
            return "Insufficient funds";
          }
        },
        checkBalance() {
          return balance;
        },
      };
    }
    const account = createBankAccount(100);
    console.log(account.deposit(50)); // 输出 150
    console.log(account.withdraw(30)); // 输出 120
    console.log(account.balance); // 输出 undefined，balance 无法被外部访问
    ```

#### 作用域：
  - 全局作用域：顶层作用域，脚本中的什么地方都可访问。
  - 局部作用域：在 **函数** 或 **代码块** 中定义的 **变量**
  - 块级作用域：**归属**于 **局部作用域**，只能在块中使用。如 let，const。（**块即 {}**）

### 实现一个类似关键字 new 功能的函数
new 关键字使用时的过程

1. 创建一个空对象`{}`
2. 将新对象的原型设置为构造函数的 `prototype` 属性
3. 将构造函数的`this`绑定到新对象
4. 执行构造函数中的内容
5. 若没有明确指定构造函数返回的内容，则默认返回该创建的空对象。

手动实现
  ```js
      function coverNew(constructor,...args) {
        let obj = Object.create(constructor.prototype);
        let result = constructor.apply(obj,args);
        return (typeof result === 'object' && result !== null) ? result : obj;
      }

      function Person(name) {
        this.name = name;
      }

      Person.prototype.sayHello = function() {
        console.log('Hello, my name is ' + this.name);
      };


      let person = coverNew(Person, 'Kimi');
      person.sayHello(); // 输出：Hello, my name is

      class Profile{
        constructor(name){
          this.name = name
        }
      }

      let profile = coverNew(Profile, 'Kimi'); // error
      console.log('profile :>> ', profile.name);

  ```
   
### 如何实现继承（原型和原型链）

### 箭头函数和普通函数有什么区别
1. 箭头函数内部 **没有**自己的 **this**,其 this 是 **所在作用域的 this**
2. 因为**没有**自身的`this`,故箭头函数**无法作为构造函数**来使用，也就**无法使用** `new` 关键字
3. 箭头函数写法**语法**更为**简洁**
4. 箭头函数**没有**绑定 `arguments` 对象
5. 箭头函数**没有** `prototype` 属性
  

### 迭代器(iterator)接口和生成器(generator)函数的关系

### 浏览器的事件循环机制

# TypeScript

- type 和 interface 的区别
- any、unkonwn、never
- 常见的工具类型

# 关于 Vue

- 虚拟 DOM
- vue3 的变化（改进）
- 关于 vue3 双向绑定的实现
- vue3 中的 ref、toRef、toRefs
- computed 和 watch 的区别
- vue-router 的路由守卫
- composition Api 对比 option Api 的优势

# 浏览器相关

- DOCTYPE 的作用
- 跨域问题
- 浏览器的存储有哪些及它们间的区别
- 说说浏览器渲染页面的过程

# 工具链相关题目

- 对 webpack 的理解
- webpack 中 plugin 和 loader 分别做什么？它们之间的执行顺序？
- webpack 常见的优化方案
- 关于 babel 的理解
- vite 和 webpak 的区别

# 关于 React

- 说说看类组件的生命周期，函数组件使用哪些 hook 来代替的哪些生命周期
- 对于 Fiber 架构理解
- 使用 Hooks 开发常见的优化措施

# 项目相关题

- 关于模块化
- 微前端
- 前端低代码的认识
- 前端权限设计思路
- taro 是如何将 react 代码转换成对应的小程序代码或其他平台代码
- token 可以放在 cookie 里吗？
- 前端埋点的实现，说说看思路
- 说说封装组件的思路

# 性能优化题

- 什么情况下会重绘和回流，常见的改善方案
- 一次请求大量数据怎么优化，数据多导致渲染慢怎么优化

# 手写题

- 模拟链表结构
- 手写一个深拷贝
- 手写 Promise
- 手写防抖和节流函数
- 手写快速排序
- 输入为两个一维数组，将这两个数组合并，去重，不要求排序，返回一维数组
- 编写函数 convert(money) ，传入金额，将金额转换为千分位表示法。
