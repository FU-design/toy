为了给使用 `marked` 解析的 Markdown 内容应用样式，你可以引入第三方的 Markdown 主题样式文件，或者自行编写样式。

### 方法 1: 使用现成的 Markdown 主题样式

现成的 Markdown 主题样式通常包含基础的样式定义，可以为标题、段落、列表、代码块等提供合适的样式。以下是引入一些流行的 Markdown 样式库的步骤：

#### 1. **使用 GitHub 风格的 Markdown 样式**

你可以使用 `github-markdown-css` 库，它提供了 GitHub 风格的 Markdown 样式。

**安装 `github-markdown-css`**

```bash
npm install github-markdown-css
```

**在 Vue 项目中引入**

在你的 Vue 组件或全局样式文件中引入该样式：

```javascript
import "github-markdown-css/github-markdown.css";
```

然后给解析后的 Markdown 内容添加 `markdown-body` 的样式类，以便样式生效。

```html
<template>
  <div>
    <div class="markdown-body" v-html="parsedMarkdown"></div>
  </div>
</template>

<script>
  import { marked } from "marked"; // 引入 marked 库
  import DOMPurify from "dompurify";
  import "github-markdown-css/github-markdown.css"; // 引入 GitHub Markdown 样式

  export default {
    data() {
      return {
        markdownContent: `
        # Hello World

        这是一个 **Markdown** 示例！

        - 列表项 1
        - 列表项 2
        - 列表项 3

        \`\`\`javascript
        console.log('Hello, world!');
        \`\`\`

        [点击这里访问](https://www.example.com)
      `,
      };
    },
    computed: {
      parsedMarkdown() {
        return DOMPurify.sanitize(marked(this.markdownContent));
      },
    },
  };
</script>
```

**结果**：解析后的 Markdown 内容将使用 GitHub 风格的样式渲染。

#### 2. **使用其他流行的 Markdown 样式**

如果你喜欢其他样式，可以使用以下库：

- **`markdown-css`** 提供了多个样式主题：
  - [https://sindresorhus.com/github-markdown-css/](https://sindresorhus.com/github-markdown-css/)
- **`highlight.js`** 为代码块提供多种样式：
  - 安装 `highlight.js`：
    ```bash
    npm install highlight.js
    ```
  - 引入代码高亮样式（例如 `atom-one-dark`）：
    ```javascript
    import "highlight.js/styles/atom-one-dark.css";
    ```

### 方法 2: 自定义 Markdown 样式

如果你希望自定义 Markdown 样式，可以直接为 Markdown 内容手动编写样式。以下是一些常见的样式自定义示例：

```html
<style>
  .markdown-body h1 {
    font-size: 2em;
    margin-top: 20px;
    color: #4caf50;
  }

  .markdown-body p {
    line-height: 1.6;
    color: #333;
  }

  .markdown-body code {
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: "Courier New", monospace;
  }

  .markdown-body pre code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 10px;
    display: block;
    border-radius: 8px;
    overflow-x: auto;
  }

  .markdown-body ul {
    padding-left: 20px;
    list-style: disc;
  }

  .markdown-body a {
    color: #1e88e5;
    text-decoration: none;
  }

  .markdown-body a:hover {
    text-decoration: underline;
  }
</style>
```

在这个示例中，你为 `h1`、`p`、`code`、`pre code`、`ul` 和链接等 Markdown 元素设置了自定义样式。通过这种方式，你可以完全控制 Markdown 内容的展示效果。
