### :curly_loop: 闭包【闭包的原理】

**概念**：闭包指那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现（匿名函数不是闭包）或者说 **`闭包是指有权访问另一个函数作用域中变量的函数`**

```javascript
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    let value1 = object1[propertyName];
    let value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}

// 创建比较函数
let compareNames = createComparisonFunction("name");
// 调用函数
let result = compareNames({ name: "Nicholas" }, { name: "Matt" });
// 解除对函数的引用，这样就可以释放内存了
compareNames = null;
```

**什么是作用域链及作用域链是如何形成的**

- 在调用一个函数的时候，会为这个函数创建一个 **`执行上下文`**，并创建一个 **`作用域链`**。
- 用 **`arguments`** 和 **`其他命名参数`** 来初始化这个函数的 **`活动对象`**。
- **`外部函数的活动对象`** 是 **`内部函数作用域链上的第二个对象`**。
- 这个作用域链一直向外串起了 **`所有包含函数的活动对象`**，**`直到全局执行上文才终止`**。

**作用域链的查找**

- 解析：在定义 compare()函数时，就会为它创建作用域链，预装载全局变量对象，并保存在内部的[[Scope]]中。在调用这个函数时，会创建相应的执行上下文，然后通过复制函数的[[Scope]]来创建其作用域链。接着会创建函数的活动对象（用作变量对象）并将其推入作用域链的前端。在这个例子中，这意味着 compare()函数执行上下文的作用域链中有两个变量对象：局部变量对象和全局变量对象。

  ```javascript
  function compare(value1, value2) {
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }
  let result = compare(5, 10);
  ```

**闭包和一般函数作用域链是不同的**

- 函数调用时，每个执行上下文中都会 **`包含其中变量的对象`**。

  - 全局上下文中的叫 **`变量对象`**，在脚本执行期间始终存在。
  - 函数局部上下文中的叫 **`活动对象`**，只在函数执行期间存在。
  - 函数内部的代码在访问变量时，就会使用给定的名称从作用域链中查找变量。
  - 函数执行完毕后，局部活动对象会被销毁，内存中就只剩下全局上下文。

- 闭包则不同于一般函数的作用域链
  - 内部函数在引用外部函数的对象变量时，会将 **`全局变量对象`** 和 **`外部函数的活动变量`** 一同作为自身为 **`作用域链初始化`**；在外部函数调用完后，其执行上下文的作用域链会被销毁，但外部函数的局部的活动对象 **`不会被销毁`**, 因为此时它的活动对象还在被内部函数引用，js 的垃圾回收程序不会对还被引用中的变量进行内存回收，仍然会保留在内存中，直到内部函数被销毁后才一同被销毁。

**闭包形成**：

> **`内部的函数存在外部作用域的引用就会导致闭包`**。callback（回调）、event handler(事件处理程序)、高阶函数可以访问外部作用域变量，都是闭包。

**闭包的优缺点**

- 优点：
  - 创建私有变量,使其不会被其他操作污染。
  - 延长一些变量的生命周期。
- 缺点：
  - 因为具有保留其他函数的变量对象的特性，故比其他函数要更占内存一些；
  - 过度使用会导致内存的过度占用（内存泄漏）

**闭包的使用场景**

- 防抖&节流

  - 防抖
  - 节流

- 柯里化函数

- 使用闭包模拟私有方法

  - 定义一个堆类

    ```js
    function Stack() {
      let items = [];
      return items;
    }
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    console.log("stack :>> ", stack); // [ 1, 2, 3 ]
    stack.length = 0;
    console.log("stack :>> ", stack); // []
    ```

  - 上述中的类中声明 items 的属性可被随意修改，此刻想让其作为私有变量：

        ```js
        function Stack() {
          let items = [];
          return {
            get: () => {
              return items;
            },
            push: (item) => {
              items.push(item);
            },
            pop: () => {
              return items.pop();
            },
          };
        }
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);

        console.log("stack :>> ", stack.get()); // [ 1, 2, 3 ]
        stack.length = 0;
        console.log("stack :>> ", stack.get()); // [1, 2, 3]
        ```

<hr>

**参考**：

- [闭包](https://dmitripavlutin.com/javascript-closure/)(外文)
- [词法环境](https://www.techtarget.com/whatis/definition/lexical-scoping-static-scoping)(外文)
- [7 个经典面试题](https://dmitripavlutin.com/simple-but-tricky-javascript-interview-questions/)
- [JS 闭包经典使用场景和含闭包必刷题](https://juejin.cn/post/6937469222251560990)
- ["红宝石书"（第十章-闭包）]()
- [「翻译系列」-- 你能回答 7 个闭包的面试题么？](https://juejin.cn/post/6937469222251560990)

<hr>

### :curly_loop: 继承实现

### :curly_loop: 浅拷贝和深拷贝

### :curly_loop: 手写实现 new 方法 【实现的原理】

### :curly_loop: 分别介绍一下原型、原型链、作用域和作用域链的含义和使用场景

### :curly_loop: 数组的 filter、every、flat 的作用是什么

### :curly_loop: es6 有哪些新特性【前端开发者不得不知的 ES6 十大特性】

### :curly_loop: 说一下对 Promise 的了解【Promise 实现原理】

### :curly_loop: set、map 区别，map、object 区别

### :curly_loop: promise 特性汇总

### :curly_loop: 手写出 Promise A+ 规范

### :curly_loop: Promise 的 all 和 race 有什么区别

### :curly_loop: 箭头函数和普通函数的区别

### :curly_loop: let、var 和 const 的区别？如果希望 const 定义的对象的属性也不能被修改该怎么做？

### :curly_loop: instanceof 的实现原理

### :curly_loop: 数据类型有哪些？如何判断一个数据是否是数组
