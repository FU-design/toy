### rollup-plugin-visualizer 的使用

  1. 安装 `rollup-plugin-visualizer`到开发环境
     ```
     pnpm add rollup-plugin-visualizer -D
     ```
  2. 在 `vite.config.ts` 中配置

     ```ts
     import { defineConfig } from 'vite';
     import AutoImport from 'rollup-plugin-visualizer';

     export default defineConfig(({ command, mode }) => {
       return {
         plugins: [
           visualizer({
             filename: 'dist/stats.html', // 输出文件名
             open: true // 打包后自动打开浏览器显示报告
           })
         ],

         build: {
          // ...else
           rollupOptions: {
             plugins: [
               visualizer({
                 filename: 'dist/stats.html', // 输出文件名
                 open: true // 打包后自动打开浏览器显示报告
               })
             ]
           }
         }
       };
     });
     ```

### [unplugin-auto-import]( https://github.com/unplugin/unplugin-auto-import) 的使用

  1. 安装 `unplugin-auto-import`到开发环境
     ```
     pnpm add unplugin-auto-import -D
     ```
  2. 在 `vite.config.ts` 中配置

     ```ts
     import { defineConfig } from 'vite';
     import AutoImport from 'unplugin-auto-import/vite';

     export default defineConfig(({ command, mode }) => {
       return {
         plugins: [
           vue(),
           AutoImport({
             imports: ['vue', 'vue-router'],
             dts: 'src/auto-imports.d.ts',
             dirs: ['src/composables', 'src/stores', 'src/utils']
           })
         ]
       };
     });
     ```
  3. 在使用 `typescript` 和 `eslint` 中的 `no-undef` 设置为 `error` 时，若存在对自动导入的错误提示，则按以下步骤解决：
   
     - 给 `AutoImport` 添加 `eslintrc` 配置项
  
        ```ts
          eslintrc: {
            enabled: true, // Default `false`
            filepath: './plugin-vite/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true 
          }
        ```
      - 运行项目，该配置会生成一个 `json` 文件,将此JSON文件添加到 `eslint` 配置文件
         ```ts
          // eslint.config.js eslint@9.xxx 平铺式写法
          export default [
              ...pluginVue.configs['flat/recommended'],
              ...eslintrcAutoImportConfig,
            // ... else
          ]

          // .eslintrc.js
          module.exports = {
            extends: [
              './.eslintrc-auto-import.json',
            ],
          }
         ```
      - 文件生成后，把 `enabled` 置为 `false`, 不会每次运行项目时重新生成

### [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 的使用

 1. 安装 `unplugin-auto-import`到开发环境
     ```
     pnpm unplugin-vue-components -D
     ```
  2. 在 `vite.config.ts` 中配置

     ```ts
     import { defineConfig } from 'vite';
     import Components from 'unplugin-vue-components/vite'
     import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers' // Vue 的按需组件自动导入

     export default defineConfig(({ command, mode }) => {
       return {
         Components({
            dts: './types/components.d.ts',
            resolvers: [
              AntDesignVueResolver({
                importStyle: false // css in js
              })
            ]
          }),
       };
     });
     ```