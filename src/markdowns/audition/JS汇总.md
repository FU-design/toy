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
          D;
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

### :curly_loop: 分别介绍一下原型、原型链、作用域和作用域链的含义和使用场景

### :curly_loop: 数组的 filter、every、flat 的作用是什么

### :curly_loop: es6 有哪些新特性【前端开发者不得不知的 ES6 十大特性】

- Object.keys() 和 Object.values 和 Object.entries()

  ```js
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
  ```

### :curly_loop: 说一下对 Promise 的了解【Promise 实现原理】

### :curly_loop: set、map 区别，map、object 区别

### :curly_loop: promise 特性汇总

<hr>

_**Pormise 的使用**_

- ECMAScript 6 新增的引用类型 Promise，可以通过 new 操作符来实例化,创建时需要传入执行器（executor）函数作为参数，如果不提供执行器函数，就会抛出 SyntaxError。

  ```js
  new Promise(() => {}); // 可以传入空函数对象来应付
  ```

_**Promise 的状态**_

- Promise 有三种状态：
  - 待定（pending）
  - 解决（fulfilled | resolved）
  - 拒绝（rejected）

> 待定是 Promise 实例创建后的初始态。待定可以落定为代表成功的 **`解决`** 态或代表失败的 **`拒绝`** 态，且状态落定后 **`不可逆`**,也 **`不可再改变`**。

_**Promise 的解决值、拒绝理由和用途**_

- Promise 主要的两大用途：
  - 抽象表示一个异步操作
  - Promise 封装的异步操作会实际生成某个值，在程序等待 Promise 状态改变时可访问该值;相应的，也可以拿到拒绝的理由。

为了支持这两种用例，每个 Promise 只要状态切换为 **`解决`**，就会有一个 **`私有的内部值（value）`**; 同样，每个 Promise 只要状态切换为 **`拒绝`**，就会有一个 **`私有的内部理由（reason）`**。无论是值还是理由，都是包含原始值或对象的不可修改的引用。**`默认值为 undefined`**。在 Promise 落定为某个落定状态时 **`执行的异步代码`** 始终会收到这个值或理由。

_**通过执行函数控制 Promise 的状态**_

执行器函数主要有两项职责：**`初始化 Promise 的异步行为`** 和 **`控制状态的最终转换`**；

- 控制 Promise 状态的转换：
  通过调用它的两个函数参数实现的。这两个函数参数通常都命名为 **`resolve()`** 和 **`初始化 Promise 的异步行为`** 和 **`控制状态的最终转换`**。调用
  resolve()会把状态切换为兑现，调用 reject()会把状态切换为拒绝且会抛出错误。

  ```js
  let p1 = new Promise((resolve, reject) => resolve());
  setTimeout(console.log, 0, p1); // Promise <resolved>

  let p2 = new Promise((resolve, reject) => reject());
  setTimeout(console.log, 0, p2); // Promise <rejected>
  // Uncaught error (in promise)
  ```

> :warning: 注意点：

- 执行器函数是 **`同步执行`** 的,在初始化 Promise 时，执行器函数已经改变了每个 Promise 的状态。
- 无论 **`resolve()`** 和 **`reject()`** 中的哪个被调用，状态转换都不可撤销了。

_**Promise 的静态方法**_

_**Promise.resolve()**_

- 可以实例化一个解决的 Promise。
- 能够包装 **`任何非 Promise 值`**，包括 **`错误对象`**，并将其转换为 **`解决`** 的 Promise。
- 多余的参数会忽略。
  ```js
  setTimeout(console.log, 0, Promise.resolve(4, 5, 6));
  // Promise <resolved>: 4
  ```
- 如果传入的参数本身是一个 Promise，那它的行为就类似于一个空包装。

_**Promise.reject()**_

- Promise.reject()会实例化一个 **`拒绝`** 的 Promise 并 **`抛出一个异步错误`**_（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）_
- 第一个参数就是拒绝的理由。
  Promise 的实例方法

_**Promise.prototype.then()**_

- 接收最多两个参数：onResolved 处理程序和 onRejected 处理程序，且是可选择的，若提供了，则会在 Promise 分别进入 “**`解决`**” 或 “**`拒绝`**” 状态时执行。
- 非函数处理程序会被静默忽略。
  ```js
  p1.then("gobbeltygook");
  ```
- 不传 onResolved 处理程序的规范写法。

  ```js
  p2.then(null, () => onRejected("p2"));
  ```

- 该方法返回一个新的 Promise 实例，且新 Promise 实例基于 onResovled 处理程序的返回值构建。

  - 该处理程序的返回值会通过 Promise.resolve()包装来生成新 Promise。
  - 如果没有提供这个处理程序，则 Promise.resolve()就会包装上一个 Promise 解决之后的值。
  - 如果没有显式的返回语句，则 Promise.resolve()会包装默认的返回值 **`undefined`**。

  </br>

- onRejected 处理程序也与之类似：onRejected 处理程序返回的值也会被 Promise.resolve()包装。

> :warning: 注意点：

- 返回错误值不会触发上面的拒绝行为，而会把错误对象包装在一个解决的 Promise 中。

  ```js
  let p11 = p1.then(() => Error("qux"));
  setTimeout(console.log, 0, p11); // Promise <resolved>: Error: qux
  ```

_**Promise.prototype.catch()**_

- Promise.prototype.catch()方法用于给 Promise 添加拒绝处理程序。
- 只接收一个参数 onRejected 处理程序。
- Promise.prototype.then(null, onRejected)的语法糖。
  ```js
  let p = Promise.reject();
  let onRejected = function (e) {
    setTimeout(console.log, 0, "rejected");
  };
  // 这两种添加拒绝处理程序的方式是一样的：
  p.then(null, onRejected); // rejected
  p.catch(onRejected); // rejected
  ```
- 返回一个新的 Promise 实例

  ```js
  let p1 = new Promise(() => {});
  let p2 = p1.catch();
  setTimeout(console.log, 0, p1); // Promise <pending>
  setTimeout(console.log, 0, p2); // Promise <pending>
  setTimeout(console.log, 0, p1 === p2); // false
  ```

_**Promise.prototype.finally()**_

<hr>

### :curly_loop: 手写出 Promise A+ 规范

### :curly_loop: 手写实现 new 方法 【实现的原理】

### :curly_loop: Promise 的 all 和 race 有什么区别

### :curly_loop: 箭头函数和普通函数的区别

### :curly_loop: let、var 和 const 的区别？如果希望 const 定义的对象的属性也不能被修改该怎么做？  

### :curly_loop: 数据类型有哪些？如何判断一个数据是否是数组

_**数据类型**_

- 原始类型: String Number Boolean BigInt Symbol Undefined Null
- 引用类型: Object (Function 、Array、RegExp、Date 等等)

_**判断数据的类型方式**_

1. **`typeof`** 操作符，最适合用来判断一个变量是否是原始类型。

   - 对于原始类型，除 null 以外，字符串、数值、布尔值、undefined 均可准确判断
   - 对于引用类型，除 function 外，均会返回 "object"
   - 对于 null 返回 object
   - 对于 function 返回 function

   ```js
   typeof ""; // string 有效
   typeof 1; // number 有效
   typeof Symbol(); // symbol 有效
   typeof true; //boolean 有效
   typeof undefined; //undefined 有效
   typeof null; //object 无效
   typeof []; //object 无效
   typeof new Function(); // function 有效
   typeof new Date(); //object 无效
   typeof new RegExp(); //object 无效
   ```

   > 注意 typeof 操作符在用于检测函数时也会返回"function"。当在 Safari（直到 Safari 5）和 Chrome（直到 Chrome 7）中用于检测正则表达式时，由于实现细节的原因，typeof 也会返回"function"。ECMA-262 规定，任何实现内部[[Call]]方法的对象都应该在 typeof 检测时返回"function"。因为上述浏览器中的正则表达式实现了这个方法，所以 typeof 对正则表达式也返回"function"。在 IE 和 Firefox 中，typeof 对正则表达式返回"object"。

2. **`instanceOf`** 运算符,测试 **`构造函数的原型属性`** 是否出现在 **`对象原型链中的任何位置`**。

   ```js
   target instanceof constructor;
   ```

   - 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。
   - 用来检测 constructor.prototype 是否存在于参数 target 的原型链上。
   - 若变量是给定引用类型的实例，则会返回布尔值 true
   - 若变量是原始类型，则始终会返回 false

   ```javaScript

   [] instanceof Array; // true
   {} instanceof Object;// true
   new Date() instanceof Date;// true

   function Person(){};
   new Person() instanceof Person;

   // because: 下述中模拟实现 instanceof 可知
   [] instanceof Object; // true
   new Date() instanceof Object;// true
   new Person instanceof Object;// true
   ```

3. **`toString()`**

   - toString() 是 Object 的原型方法，默认返回当前对象的 \[[Class]]。这是一个内部属性，其格式为[object Xxx]，其中 Xxx 就是对象的类型。
   - 对于 Object 对象直接调用即可，对于其他的变量，需要通过 **`call/apply`** 来调用。

   ```javaScript
   Object.prototype.toString.call('') ;   // [object String]
   Object.prototype.toString.call(1) ;    // [object Number]
   Object.prototype.toString.call(true) ; // [object Boolean]
   Object.prototype.toString.call(Symbol()); //[object Symbol]
   Object.prototype.toString.call(undefined) ; // [object Undefined]
   Object.prototype.toString.call(null) ; // [object Null]
   Object.prototype.toString.call(new Function()) ; // [object Function]
   Object.prototype.toString.call(new Date()) ; // [object Date]
   Object.prototype.toString.call([]) ; // [object Array]
   Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
   Object.prototype.toString.call(new Error()) ; // [object Error]
   Object.prototype.toString.call(document) ; // [object HTMLDocument]
   Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
   ```

_**模拟实现 instanceof**_

- 实现原理：检测 **`constructor.prototype`** 是否存在于参数 target 的 **`原型链`** 上

  ```js
  // target instanceof constructor;
  function newInstanceOf(L, R) {
    // typeof 在监测函数时会返回 function ，虽然 function 也是 object
    // 因为 typeof null 比较特殊，会返回 object，所以这里要单独判断
    if (L === null || (typeof L !== "object" && typeof L !== "function"))
      return false;
    while (true) {
      if (L === null) return false;
      if (L === R.prototype) return true;
      L = Object.getPrototypeOf(L);
    }
  }
  ```

_**如何判断一个数据是否是数组**_

> _toString()_、_Array.isArray( target )_、_instanceof_

1. **toString()**

   ```js
   Object.prototype.toString.call([]);
   ```

2. **Array.isArray( target )**

   - 不检查值的原型链，也不依赖于它所附加的 Array 构造函数。
   - 对于使用 **`数组字面量语法`** 或 **`Array 构造函数`** 创建的任何值，都返回 true。
   - **`Array.prototype 是一个数组`**

   ```js
   // 鲜为人知的事实：其实 Array.prototype 也是一个数组：
   Array.isArray(Array.prototype); // true
   Array.isArray(Array()); // true

   // 以下都是 false
   Array.isArray();
   Array.isArray({});
   Array.isArray(null);
   Array.isArray(undefined);
   Array.isArray(17);
   Array.isArray("Array");
   Array.isArray(true);
   Array.isArray(false);
   Array.isArray(new Uint8Array(32));
   ```

[判断 JS 数据类型的四种方法](https://www.cnblogs.com/onepixel/p/5126046.html)

### :curly_loop: 常用数组方法和他们之间的区别

常用数组方法：

- 第一个匹配的元素，使用 <kbd><strong>find()</strong></kbd>。
- 数组中最后一个匹配元素的索引，使用 <kbd><strong>findLastIndex()</strong></kbd>。
- 某个值的索引，使用 <kbd><strong>indexOf()</strong></kbd>。（它类似于 findIndex()，但是会检查每个元素是否与值相等，而不是使用一个测试函数。）
- 该数组中是否存在一个值，使用 <kbd><strong>includes()</strong></kbd>。同样地，它检查每个元素是否和值相等，而不是使用一个测试函数。
- 是否有 **`任意一个元素满足`** 提供的测试函数，使用 <kbd><strong>some()</strong></kbd>。
- 是否有 **`所有元素满足`** 提供的测试函数，使用 <kbd><strong>every()</strong></kbd>。
