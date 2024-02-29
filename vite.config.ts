import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { join } from "path";
// import path from 'path'

/**
 * todo node 中的内置方法
 * https://www.geeksforgeeks.org/node-js-url-fileurltopath-api/
 * https://www.geeksforgeeks.org/node-js-url-method/?ref=lbp
 * https://nodejs.org/docs/latest/api/url.html
 */
// import { fileURLToPath, URL } from "node:url";

// 可创建并编译 .jsx .tsx 文件
import vueJsx from "@vitejs/plugin-vue-jsx";

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
    base: "./", //todo 默认 / ,配置文件的根目录为相对路径
    plugins: [
      vue(),
      //
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
      port: 86, //todo 项目启动时的自定义端口
      hmr: true, //todo 开启热更新,更改代码后自动更新页面
      open: true, //todo 项目启动时，自动在浏览器中打开应用程序（也可以在package.json中的 “script” 选项中配置）
    },

    resolve: {
      //todo 别名路径配置
      alias: {
        /**
         * import.meta.url 是一个 ESM 的原生功能，会暴露当前模块的 URL。
         * 将它与原生的 URL 构造器 组合使用， 在一个 JavaScript 模块中，
         * 通过相对路径我们就能得到一个被完整解析的静态资源
         */
        // "@": fileURLToPath(new URL("./src", import.meta.url)),
        // "@": path.resovle(__dirname, "./src"),

        /**
         * 因为别名的配置主要是对资源目录的操作，在node中，path 模块会很有帮助，通常会配合使用。
         * path 模块 ： node 中专门用来处理文件路径的模块；
         * path.resolve() : path 模块中进行文件路径拼接的方法；
         * __dirname : node 中的一个变量，哪个文件中使用了它，他就代表了该文件所在的目录（绝对路径）。
         */
        "@": join(__dirname, "src"),
        "@assets": join(__dirname, "src/assets"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], //todo 导入时想要省略的扩展名列表; 现在配置的是默认的
    },

    build: {
      target: "modules", //todo 类型： string | string[],默认： 'modules'设置最终构建的浏览器兼容目标
      outDir: "dist", //todo 类型：string,默认：dist 指定输出路径（相对于 项目根目录).
      assetsDir: "", //todo 类型：string，默认：assets 指定生成静态资源的存放路径（相对于 build.outDir）。在 库模式 下不能使用。
      sourcemap: true,
    },
  };
});

// 参考：https://www.cnblogs.com/yayuya/p/17046666.html
