### :small_blue_diamond: 闭包【闭包的原理】

**概念**：闭包指哪些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现（匿名函数不是闭包）

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

**闭包形成的过程**：

- _**什么是作用域链及作用域链是如何形成的**_

  - 在调用一个函数的时候，会为这个函数创建一个 **`执行上下`>**，并创建一个 **`作用域链`**。
  - 用 **`arguments`** 和 **`其他命名参数`** 来初始化这个函数的 **`活动对象`**。
  - **`外部函数的活动对象`** 是 **`内部函数作用域链上的第二个对象`**。
  - 这个作用域链一直向外串起了所有包含函数的活动对象，**`直到全局执行上文才终止`**。

- _**作用域链的查找**_

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

  - 这里定义的 compare()函数是在全局上下文中调用的。
  - 第一次调用 compare()时，会为它创建一个包含 arguments、value1 和 value2 的活动对象，这个对象是其作用域链上的第一个对象。
  - 全局上下文的变量对象则是 compare()作用域链上的第二个对象，其中包含 this、result 和 compare

  - 解析：
    > 在定义 compare()函数时，就会为它创建作用域链，预装载全局变量对象，并保存在内部的[[Scope]]中。在调用这个函数时，会创建相应的执行上下文，然后通过复制函数的[[Scope]]来创建其作用域链。接着会创建函数的活动对象（用作变量对象）并将其推入作用域链的前端。在这个例子中，这意味着 compare()函数执行上下文的作用域链中有两个变量对象：局部变量对象和全局变量对象。

- _**闭包和一般函数作用域链是的不同**_

  > 函数调用时，每个执行上下文中都会包含其中变量的对象。

  - 全局上下文中的叫变量对象,它会在代码执行期间始终存在。
  - 函数局部上下文中的叫活动对象，只在函数执行期间存在。
  - 函数内部的代码在访问变量时，就会使用给定的名称从作用域链中查找变量。函数执行完毕后，局部活动对象会被销毁，内存中就只剩下全局作用域。

### :small_blue_diamond: 继承实现

### :small_blue_diamond: 浅拷贝和深拷贝

### :small_blue_diamond: 手写实现 new 方法 【实现的原理】

### :small_blue_diamond: 分别介绍一下原型、原型链、作用域和作用域链的含义和使用场景

### :small_blue_diamond: 数组的 filter、every、flat 的作用是什么

### :small_blue_diamond: es6 有哪些新特性【前端开发者不得不知的 ES6 十大特性】

### :small_blue_diamond: 说一下对 Promise 的了解【Promise 实现原理】

### :small_blue_diamond: set、map 区别，map、object 区别

### :small_blue_diamond: promise 特性汇总

### :small_blue_diamond: 手写出 Promise A+ 规范

### :small_blue_diamond: Promise 的 all 和 race 有什么区别

### :small_blue_diamond: 箭头函数和普通函数的区别

### :small_blue_diamond: let、var 和 const 的区别？如果希望 const 定义的对象的属性也不能被修改该怎么做？

### :small_blue_diamond: 堆和栈的区别

### :small_blue_diamond: instanceof 的实现原理

### :small_blue_diamond: 数据类型有哪些？如何判断一个数据是否是数组
