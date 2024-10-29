- rollup-plugin-visualizer 的使用

  1. 安装 `rollup-plugin-visualizer`到开发环境
     ```
     pnpm add rollup-plugin-visualizer -D
     ```
  2. 在 vite.config.ts 中配置

     ```ts
     import { defineConfig } from 'vite';
     import vue from '@vitejs/plugin-vue';
     import AutoImport from 'rollup-plugin-visualizer';

     export default defineConfig(({ command, mode }) => {
       return {
         plugins: [
           vue(),
           visualizer({
             filename: 'dist/stats.html', // 输出文件名
             open: true // 打包后自动打开浏览器显示报告
           })
         ],

         build: {
           minify: false, // 禁用代码压缩
           target: 'modules', //默认： 'modules'设置最终构建的浏览器兼容目标
           outDir: 'dist', //默认：dist 指定输出路径（相对于 项目根目录).
           // assetsDir: "assets", //默认：assets 指定生成静态资源的存放路径（相对于 build.outDir）。
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

- unplugin-auto-import 的使用

  1. 安装 `unplugin-auto-import`到开发环境
     ```
     pnpm add unplugin-auto-import -D
     ```
  2. 在 vite.config.ts 中配置

     ```ts
     import { defineConfig } from 'vite';
     import vue from '@vitejs/plugin-vue';
     import AutoImport from 'unplugin-auto-import/vite';

     export default defineConfig(({ command, mode }) => {
       return {
         plugins: [
           vue(),
           AutoImport({
             imports: ['vue', 'vue-router'],
             dts: 'src/auto-imports.d.ts', // 将类型声明文件生成在 src 目录
             dirs: ['src/composables', 'src/stores', 'src/utils']
           })
         ]
       };
     });
     ```

- unplugin-vue-components 的使用
