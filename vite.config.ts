import { defineConfig } from "vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"; // Vue 的按需组件自动导入
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 可创建并编译 .jsx .tsx 文件

// import path, { join } from "path";
// import path from 'path'

/**
 * todo node 中的内置方法
 * 【https://www.geeksforgeeks.org/node-js-url-fileurltopath-api/】
 * 【https://www.geeksforgeeks.org/node-js-url-method/?ref=lbp】
 * 【https://nodejs.org/docs/latest/api/url.html】
 */

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // if (command === "serve") {
  //   return {
  //     // dev 独有配置
  //   };
  // } else {
  //   // command === 'build'
  //   return {
  //     // build 独有配置
  //   };
  // }
  return {
    //todo 解决打包后的访问页面空白问题 (https://blog.csdn.net/muguli2008/article/details/122306515?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-122306515-blog-125894321.235^v43^pc_blog_bottom_relevance_base3&spm=1001.2101.3001.4242.1&utm_relevant_index=3
    // base: "./", // 默认 / ,配置文件的根目录为相对路径
    // base: "/toy/", (当使用 github pages部署的时候，需要配置该 base)
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dts: "src/types/components.d.ts", // 将类型声明文件生成在 src 目录
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/types/auto-imports.d.ts", // 将类型声明文件生成在 src 目录
        dirs: ["src/composables", "src/stores", "src/utils"],
      }),
      visualizer({
        filename: "dist/stats.html", // 输出文件名
        open: true, // 打包后自动打开浏览器显示报告
      }),
    ],

    server: {
      host: "0.0.0.0",
      port: 86, //项目启动时的自定义端口
      hmr: true, //开启热更新,更改代码后自动更新页面
      open: true, //项目启动时，自动在浏览器中打开应用程序（也可以在package.json中的 “script” 选项中配置）
      proxy: {
        "/api": {
          target: "http://127.0.0.1:86",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    resolve: {
      //别名路径配置
      alias: {
        /**
         * import.meta.url 是一个 ESM 的原生功能，会暴露当前模块的 URL。
         * 将它与原生的 URL 构造器 组合使用， 在一个 JavaScript 模块中，
         * 通过相对路径我们就能得到一个被完整解析的静态资源
         */
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], //todo 导入时想要省略的扩展名列表; 现在配置的是默认的
    },

    css: {
      preprocessorOptions: {
        // 以预处理器的文件拓展名作为建
        scss: {
          // 文件路径，注意最后需要添加 ';'
          additionalData: '@import "@/theme/common/variable.scss";',
          // javascriptEnabled: true, 该选项是在使用 less 时，需要添加的 【https://dev.to/lico/issues-that-i-encountered-and-how-to-deal-with-them-while-migrating-from-cra-to-vite-51pg】
        },
      },
    },

    build: {
      minify: false, // 禁用代码压缩
      target: "modules", //默认： 'modules'设置最终构建的浏览器兼容目标
      outDir: "dist", //默认：dist 指定输出路径（相对于 项目根目录).
      // assetsDir: "assets", //默认：assets 指定生成静态资源的存放路径（相对于 build.outDir）。
      rollupOptions: {
        plugins: [
          visualizer({
            filename: "dist/stats.html", // 输出文件名
            open: true, // 打包后自动打开浏览器显示报告
          }),
        ],
      },
    },
  };
});

// 参考：https://www.cnblogs.com/yayuya/p/17046666.html
