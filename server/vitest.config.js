// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      // Add the paths you want to ignore here
      exclude: [
        '**/src/model/**',      // Excludes everything in the models folder
        '**/src/config/db.js',          // Excludes a specific file
        'vitest.config.js',   // Excludes the config itself
        '**/server.js'
      ],
    },
  },
});