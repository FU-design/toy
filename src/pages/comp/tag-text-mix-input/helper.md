## window.getSelection

`getSelection()`方法返回一个 `Selection` 对象，表示用户选择的文本及其范围。

```js
const selection = window.getSelection();
```

`Selection` 对象：

- 属性：

  - `anchorNode`: 选定范围的起始节点。
  - `focusNode`: 选定范围的结束节点。
  - `toString()`: 返回选定文本的字符串。

- 方法：

  - `addRange(range)`: 将一个 `Range` 对象添加到选定范围中。
  - `removeRange(range)`: 从选定范围中移除一个 `Range` 对象。
  - `removeAllRanges()`: 移除所有选定范围。

## document.createRange()

该方法返回一个 `Range` 对象用于表示文档中的一个连续区域。通过 `Range` 对象，可以精确地获取、修改或操作某个文档片段的内容，比如文本节点、HTML元素等。

```js
const range = document.createRange();
```

`Range`对象常用方法：

- `selectNode(node)`: 选择整个节点的内容。
- `selectNodeContents(node)`: 选择节点的内容（不包括节点本身）。
- `collapse(toStart)`: 折叠选区，`toStart` 为 `true` 时折叠到起始位置，为 `false`时折叠到结束位置。
- `cloneRange()`: 复制当前 `Range` 对象。
- `deleteContents()`: 删除选定的范围内容。
- `extractContents()`: 提取选定范围的内容，并返回一个 `DocumentFragment。`
- `insertNode(node)`: 在 `Range` 的起始位置插入一个节点。
- `setStartAfter(node)`: 用于将 `Range` 的起始位置设置在指定 node 之后。即，范围从所指定节点的下一个位置开始。
- `setEndAfter(node)`: 用于将 Range 的结束位置设置在指定 node 之后。即，范围的结束点位于所指定节点的下一个位置。

## MutationObserver

使用 `MutationObserver` 模拟监听输入框的 change 事件
[MDN 参考链接](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## contenteditable 属性

使用 `contenteditable` 属性让普通元素拥有类似输入框的特性
[MDN 参考链接](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)

## data-\* 自定义属性

使用 `data-*` 自定义属性模拟表单元素的 `placeholder`
[MDN 参考链接](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)

## Text.splitText()

未使用供了解 [MDN 参考链接](https://developer.mozilla.org/en-US/docs/Web/API/Text/splitText)
