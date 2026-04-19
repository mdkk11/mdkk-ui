/// <reference types="vitest/config" />

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: path.resolve(dirname, 'src/index.ts'),
        'tailwind-plugin': path.resolve(dirname, 'src/tailwind-plugin.ts'),
      },
      cssFileName: 'index',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-aria-components',
        'clsx',
        'cva',
        'tailwind-merge',
        'tailwindcss/plugin',
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
