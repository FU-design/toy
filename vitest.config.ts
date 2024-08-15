// Configure Vitest (https://vitest.dev/config/)
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(configEnv =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true, // 启用类似 jest 的全局测试 API
        // include: ['**/tests/**/*.spec.ts'], // Adjust this pattern to match your directory structure
        environment: 'happy-dom'// 使用 happy-dom 模拟 DOM
      },
    })
  )
)

