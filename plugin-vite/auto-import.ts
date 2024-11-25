import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers' // Vue 的按需组件自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default [
  // https://github.com/unplugin/unplugin-vue-components
  Components({
    dts: './types/components.d.ts',
    resolvers: [
      AntDesignVueResolver({
        importStyle: false // css in js
      })
    ]
  }),
  // https://github.com/unplugin/unplugin-auto-import
  AutoImport({
    imports: ['vue', 'vue-router'],
    dts: './types/auto-imports.d.ts',
    dirs: ['src/composables', 'src/stores', 'src/utils'],
    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './plugin-vite/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  })
]
