import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { join } from "path";
// import path from 'path'

/**
 * node 中的内置方法
 * https://www.geeksforgeeks.org/node-js-url-fileurltopath-api/
 * https://www.geeksforgeeks.org/node-js-url-method/?ref=lbp
 * https://nodejs.org/docs/latest/api/url.html
 */
import { fileURLToPath, URL } from "node:url";

// 可创建并编译 .jsx .tsx 文件
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // 默认 / ,配置文件的根目录为相对路径
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],

  server: {
    host: "0.0.0.0",
    port: 86,
    // 开启热更新
    hmr: true,
    // 开发服务器启动时，自动在浏览器中打开应用程序
    open: true,
  },

  resolve: {
    alias: {
      /**
       * import.meta.url 是一个 ESM 的原生功能，会暴露当前模块的 URL。
       * 将它与原生的 URL 构造器 组合使用， 在一个 JavaScript 模块中，
       * 通过相对路径我们就能得到一个被完整解析的静态资源
       */
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      // "@": path.resovle(__dirname, "./src"),
      "@": join(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 导入时想要省略的扩展名列表; 现在配置的是默认的
  },

  build: {
    target: "modules", // 类型： string | string[],默认： 'modules'设置最终构建的浏览器兼容目标
    outDir: "dist", // 类型：string,默认：dist 指定输出路径（相对于 项目根目录).
    assetsDir: "", // 类型：string，默认：assets 指定生成静态资源的存放路径（相对于 build.outDir）。在 库模式 下不能使用。
    sourcemap: true,
  },
});

// 参考：https://www.cnblogs.com/yayuya/p/17046666.html
