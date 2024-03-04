### vue 核心

- Observer
- Dep (dependency)
- Watcher
- Scheduler

_**Observer**_

- **作用**：将一个普通对象转化为响应式对象，借助 `Object.defineProperty()` 中的 `getter` 和 `setter` ,实现在 **获取** 或 **修改** 对象中的属性时，方便 vue 做出一些其他的操作。

- 实现普通对象转为响应式的过程: 通过递归遍历对象中的每个属性（包含深层），对每个属性进行 `Object.defineProperty()` 包装。

- 发生阶段：在组件的声明周期中，发生在声明周期钩子 `beforeCreate()` 之后，`created()` 之前。

> 因为发生阶段是在 data 选项初始化的时候，因此若在这个发生转化阶段之后，动态修改或增加该对象的新属性，vue 是无法检测到的，因此该属性会丢失响应式。
>
> - 对上述情况的处理方式：
>
>   - `Vue.set(target, propertyName/index, value) | Vue.delete`
>
>     向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)
>
>   - `Vue.delete(target, propertyName/index) | this.$delete`
>
>     > 仅在 `2.2.0+` 版本中支持 `Array + index` 用法。
>
>     删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。
>
>   - 直接替换赋值 `响应式对象 = Object.assign({},{ newProperty:val },响应式对象,)`
>
> Vue.observable( object )
>
> - 2.6.0 新增
