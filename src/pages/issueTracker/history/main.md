# 开发历程

## 开发依赖相关基础配置 （vite）

- `unplugin-auto-import/vite` - 自动导入依赖的插件

  安装：

  ```bash
  pnpm add -D unplugin-auto-import
  ```

  配置：

  ```js
  AutoImport({
      imports: ['vue', 'vue-router','pinia'],
      dts: './types/auto-imports.d.ts', // 将类型声明文件生成在 src 目录
      dirs: ['src/composables', 'src/stores', 'src/utils'],
      // 解决eslint报错问题
      eslintrc: {
        // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
        enabled: false,
        filepath: './config/.eslintrc-auto-import.json', // 生成的文件路径
        globalsPropValue: true
      }
  }),
  ```

- `unplugin-vue-components/vite` - 自动按需导入组件

  安装：

  ```bash
  pnpm add -D unplugin-vue-components
  ```

  配置：

  ```js
   Components({
      dts: './types/components.d.ts', // 将类型声明文件生成在 src 目录外部
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
  ```

- `rollup-plugin-visualizer`

  ```js
   visualizer({
      filename: 'dist/stats.html', // 输出文件名
      open: true // 打包后自动打开浏览器显示报告
    })

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
  ```

- `vite-plugin-svg-icons`

  ```js
    createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
    }),
  ```
