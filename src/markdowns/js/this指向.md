input:

```js
const obj = {
  a: 1,
  b: function () {
    console.log(this.a);
  },
  c() {
    console.log(this.a);
  },
  d: () => {
    console.log(this.a);
  },
  e: (function () {
    return () => {
      console.log(this.a);
    };
  })(),
  f: function () {
    return () => {
      console.log(this.a);
    };
  },
};

console.log(obj.a);
obj.b();
obj.b();
const b = obj.b;
b();
obj.b.apply({ a: 2 });
obj.c();
obj.d();
obj.d();
obj.d.apply({ a: 2 });

obj.e();
obj.e();
obj.e.call({ a: 2 });
obj.f()();
obj.f()();
obj.f().call({ a: 2 });
```

output:

```js
// 1
// 1
// 1
// undefined
// 2
// 1
// undefined
// undefined
// undefined
// undefined
// undefined
// undefined
// 1
// 1
// 1
```

> 考点：

```js
this 指向的判断
.call 和 .apply 的使用
箭头函数的 this 是在定义它时的词法环境中确定的，不会被调用方式所改变。
箭头函数的 this 是无法通过 .call 或 .apply 等方法改变的。
```
