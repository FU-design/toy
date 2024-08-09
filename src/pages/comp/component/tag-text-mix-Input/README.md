- `Selection`

  ```js
  // 获取选取对象;
  const selection = getSelection();
  selection.removeAllRanges();
  selection.addRange(new Range());
  ```

- `Range`

  ```js
  // 创建一个 Range 对象
  const range = new Range();
  const range = document.createRange();
  range.collapse(true); // 将 range 的边界折叠到起点（即光标选取范围的起始和结束边界折叠到起始边界，默认是 false 结束边界）
  range.deleteContents(); // 清除已经选择的内容
  range.insertNode(newNode); // 插入新的元素节点在当前的光标位置

  // 重置光标的起始边界和结束边界
  range.setStartAfter(newNode);
  range.setEndAfter(newNode);
  ```

- `MutationObserver`
- `contenteditable` 属性

  ```html
  <div
    class="tag-text-mixinput"
    :data-placeholder="placeholder"
    :contenteditable="contenteditable"
  ></div>
  <script></script>
  ```

- `data-*`自定义属性
- `Text.splitText()`
