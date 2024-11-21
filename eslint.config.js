import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...tseslint.configs.recommended,
  ...eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue,.config.js}'],
    ignores: ['dist/', 'node_modules/'],
    plugins:{
      pluginVue: pluginVue, // Vue 插件
      typescriptEslint: typescriptEslint, // ts 插件
    },
    rules: {
      // 通用 ESLint 规则
      'no-unused-vars': 'error', // 0 or off | 1 or warn | 2 or error
      'no-undef': 'error', 
      'prefer-const': ["error", { 'ignoreReadBeforeAssign': true }], // 推荐使用 const 定义变量
      'vue/multi-word-component-names': 'off', // 允许单词组件名称

      // TypeScript 特定规则
      'typescriptEslint/no-unused-vars': 'error', // TS 的未使用变量
    },
  },
  {
    languageOptions: {
      ecmaVersion: "latest", // 默认 latest 最新的，检查的代码的 ECMAScript 版本
      sourceType: "module", // 默认 module [module | commonjs | script (无模块化)]
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.vue',],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    }
  },
 
]
