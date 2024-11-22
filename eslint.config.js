import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue,.config.js}'],
    ignores: ['dist/', 'node_modules/'],
    languageOptions: {
      parserOptions: { parser:  tseslint.parser }
    },
    rules: {
      // 通用 ESLint 规则
      'no-unused-vars': 'error', // 0 or off | 1 or warn | 2 or error
      'no-undef': 'error', 
      'prefer-const': ["error", { 'ignoreReadBeforeAssign': true }], // 推荐使用 const 定义变量
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
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    rules:{
      'vue/multi-word-component-names': 'off', // 允许单词组件名称 (https://eslint.vuejs.org/rules/multi-word-component-names.html)
    }
  }
]
