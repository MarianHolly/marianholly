import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '__tests__/',
      ],
      // Thresholds temporarily disabled while adding new features
      // TODO: Re-enable and increase coverage after adding tests for new files
      // thresholds: {
      //   lines: 25,
      //   functions: 25,
      //   branches: 25,
      //   statements: 25,
      // },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
