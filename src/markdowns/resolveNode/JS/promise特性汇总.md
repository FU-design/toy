### :curly_loop: Pormise 的使用

- ECMAScript 6 新增的引用类型 Promise，可以通过 new 操作符来实例化,创建时需要传入执行器（executor）函数作为参数，如果不提供执行器函数，就会抛出 SyntaxError。
  ```js
  new Promise(() => {}); // 可以传入空函数对象来应付
  ```

### :curly_loop: Promise 的状态

- Promise 有三种状态：
  - 待定（pending）
  - 解决（fulfilled | resolved）
  - 拒绝（rejected）

待定是 Promise 实例创建后的初始态。待定可以落定为代表成功的 **解决**态或代表失败的 **拒绝** 态，且状态落定后**不可逆**,也 **不可再改变**。

### :curly_loop: Promise 的解决值、拒绝理由和用途

- Promise 主要的两大用途：
  - 抽象表示一个异步操作
  - Promise 封装的异步操作会实际生成某个值，在程序等待 Promise 状态改变时可访问该值;相应的，也可以拿到拒绝的理由。

为了支持这两种用例，每个 Promise 只要状态切换为**解决**，就会有一个**私有的内部值（value）**; 同样，
每个 Promise 只要状态切换为**拒绝**，就会有一个**私有的内部理由（reason）**。无论是值还是理由，都是包含原
始值或对象的不可修改的引用。**默认值为 undefined**。在 Promise 落定为某个落定状态时**执行的异步代码**始终会收到这个值或理由。

### :curly_loop: 通过执行函数控制 Promise 的状态

执行器函数主要有两项职责：**初始化 Promise 的异步行为** 和 **控制状态的最终转换**；

- 控制 Promise 状态的转换：
  通过调用它的两个函数参数实现的。这两个函数参数通常都命名为 **resolve()** 和 **初始化 Promise 的异步行为** 和 **控制状态的最终转换**。调用
  resolve()会把状态切换为兑现，调用 reject()会把状态切换为拒绝且会抛出错误。

  ```js
  let p1 = new Promise((resolve, reject) => resolve());
  setTimeout(console.log, 0, p1); // Promise <resolved>

  let p2 = new Promise((resolve, reject) => reject());
  setTimeout(console.log, 0, p2); // Promise <rejected>
  // Uncaught error (in promise)
  ```

> :warning: 注意点：

- 执行器函数是 **同步执行** 的,在初始化 Promise 时，执行器函数已经改变了每个 Promise 的状态。
- 无论 **resolve()** 和 **reject()** 中的哪个被调用，状态转换都不可撤销了。

### :curly_loop: Promise 的静态方法

_**Promise.resolve()**_

- 可以实例化一个解决的 Promise。
- 能够包装 **任何非 Promise 值**，包括 **错误对象**，并将其转换为 **解决** 的 Promise。
- 多余的参数会忽略。
  ```js
  setTimeout(console.log, 0, Promise.resolve(4, 5, 6));
  // Promise <resolved>: 4
  ```
- 如果传入的参数本身是一个 Promise，那它的行为就类似于一个空包装。

_**Promise.reject()**_

- Promise.reject()会实例化一个 **拒绝** 的 Promise 并 **抛出一个异步错误**_（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）_
- 第一个参数就是拒绝的理由。

### :curly_loop: Promise 的实例方法

_**Promise.prototype.then()**_

- 接收最多两个参数：onResolved 处理程序和 onRejected 处理程序，且是可选择的，若提供了，则会在 Promise 分别进入 “**解决**” 或 “**拒绝**” 状态时执行。
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
  - 如果没有显式的返回语句，则 Promise.resolve()会包装默认的返回值 **undefined**。

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
