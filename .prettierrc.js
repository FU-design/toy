export default {
  printWidth: 100, // 每行最多 100 字符
  tabWidth: 2, // 使用 2 个空格缩进
  useTabs: false, // 不使用制表符，而使用空格
  semi: false, // 不使用分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 仅在必要时为对象属性添加引号
  jsxSingleQuote: false, // JSX 中使用双引号
  trailingComma: 'none', // 禁用尾随逗号
  bracketSpacing: true, // 在对象字面量的大括号之间保留空格
  bracketSameLine: false, // 将 JSX 标签的闭合 > 放在下一行
  arrowParens: 'always', // 箭头函数始终使用括号
  rangeStart: 0, // 格式化文件的开始位置
  rangeEnd: Infinity, // 格式化文件的结束位置
  requirePragma: false, // 不需要文件头部的 @prettier 注释
  insertPragma: false, // 不会自动在文件头部插入 @prettier
  proseWrap: 'preserve', // 不自动折行
  htmlWhitespaceSensitivity: 'css', // 遵循 CSS 显示样式的空格敏感性
  endOfLine: 'lf' // 换行符使用 LF (\n)
}
