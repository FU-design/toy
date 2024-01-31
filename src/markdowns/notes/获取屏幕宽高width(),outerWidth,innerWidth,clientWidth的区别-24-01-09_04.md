#### document.documentElement.clientWidth 与 document.documentElement.clientHeight

- <font color=red>[Document.documentElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement)</font> 是一个会返回文档对象（**document**）的根元素的只读属性（如 HTML 文档的 \<html\> 元素）。

- <font color=red>document.documentElement.clientWidth</font> 与 <font color=red>document.documentElement.clientHeight</font>：获得的是屏幕可视区域的宽高，不包括滚动条与工具条，跟 jquery 的(window).width()与(window).height()获得的结果是一样的。

  ```js
  document.documentElement.clientWidth = width + padding;
  document.documentElement.clientHeight = height + padding;
  ```

#### window.innerWidth 与 window.innerHeight

- window.outerWidth 与 window.outerHeight：获得的是加上工具条与滚动条窗口的宽度与高度。
  ```js
  window.outerWidth = width + padding + border + 纵向滚动条宽度;
  window.outerHeight = height + padding + border + 横向滚动条高度 + 工具条高度;
  ```

#### offsetWidth & offsetHeight

- 返回本身的宽高 + padding + border + 滚动条

#### offsetLeft & offsetTop

- 所有 HTML 元素拥有 offsetLeft 和 offsetTop 属性来返回元素的 X 和 Y 坐标

  - 相对于已定位元素的后代元素和一些其他元素（表格单元），这些属性返回的坐标是相对于祖先元素

  - 一般元素，则是相对于文档，返回的是文档坐标

  offsetParent 属性指定这些属性所相对的父元素，如果 offsetParent 为 null，则这些属性都是文档坐标

#### scrollWidth & scrollHeight

- 这两个属性是元素的内容区域加上内边距，在加上任何溢出内容的尺寸.
  因此，如果没有溢出时，这些属性与 clientWidth 和 clientHeight 是相等的。

#### scrollLeft & scrollTop

- 指定的是元素的滚动条的位置
- scrollLeft 和 scrollTop 都是可写的属性，通过设置它们来让元素中的内容滚动。
