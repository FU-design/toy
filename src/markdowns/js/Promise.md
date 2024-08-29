#### Promise executor

input:

```js
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => resolve(p1));
const p3 = Promise.resolve(p1);
const p4 = p2.then(() => new Promise((resolve) => resolve(p3)));
const p5 = p4.then(() => p4);

console.log(p1 == p2);
console.log(p1 == p3);
console.log(p3 == p4);
console.log(p4 == p5);
```

output:

```js
false;
true;
false;
false;
```

> 考点：
>
> 1. `Promise.resolve()` 参数为 `Promise 实例`，则会`原封不动的返回这个实例`。
> 2. 如果参数是一个`原始值`，或者是一个`不具有 then()方法的对象`，则 `Promise.resolve()`方法`返回一个新的 Promise 对象`，状态为 resolved。
> 3. `Promise.prototype.then()` 方法`返回的是一个新的 Promise 实例`（注意，不是原来那个 Promise 实例）
