import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'], // 扩展到 tsx 等文件
    ignores: ['dist/', 'node_modules/'],
    languageOptions: {
      parser: tsParser, // 使用 TypeScript 的解析器
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.vue'] // 支持 Vue 文件解析
      },
      globals: globals.node
    },
    linterOptions: {
      noInlineConfig: false
    },
    plugins: {
      prettier: pluginPrettier, // Prettier 插件
      vue: pluginVue, // Vue 插件
      '@typescript-eslint': tseslint // TypeScript 插件
    },
    rules: {
      // Prettier 规则
      'prettier/prettier': 'error',

      // 通用 ESLint 规则
      semi: ['error', 'never'], // 禁用分号
      'no-unused-vars': 'warn', // 未使用变量警告
      'no-console': 'warn', // 警告 console
      'vue/multi-word-component-names': 'off', // 允许单词组件名称

      // TypeScript 特定规则
      '@typescript-eslint/no-unused-vars': 'warn', // TS 的未使用变量
      '@typescript-eslint/explicit-module-boundary-types': 'off' // 关闭显式返回类型要求
    }
  },
  pluginJs.configs.recommended, // JavaScript 推荐规则
  tseslint.configs.recommended, // TypeScript 推荐规则
  pluginVue.configs['flat/essential'], // Vue 必需规则
  eslintConfigPrettier // 禁用与 Prettier 冲突的规则
]
