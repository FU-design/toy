import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'], // 规则仅作用于src中所有的 js,mjs,cjs,ts,vue
    ignores: ['dist/', 'node_modules/'], // 需要忽略哪些文件（默认忽略 ["**/node_modules/", ".git/"]）
    languageOptions: {
      globals: globals.node
    },
    linterOptions: {
      // 内联配置是使用 /*eslint*/ 注释实现的，例如 /*eslint semi: error*/
      noInlineConfig: false,
      parser: 'vue-eslint-parser' // 全局解析器
    },
    plugins: {
      prettier: pluginPrettier // 引入 Prettier 插件
    },
    // 规则配置对象
    rules: {
      // 开启 Prettier 规则作为 ESLint 的一部分
      'prettier/prettier': 'error',

      // 其他 ESLint 规则
      semi: ['error', 'never'], // 禁用分号
      'no-unused-vars': 'error', // 检查未使用的变量
      'vue/multi-word-component-names': 'off' // 关闭多单词组件名称限制 (如 index)
    }
  },
  pluginJs.configs.recommended, // JS 推荐规则
  ...tseslint.configs.recommended, // TS
  ...pluginVue.configs['flat/essential'], // Vue 必需规则
  ...eslintConfigPrettier // 禁用与 Prettier 冲突的规则
];
