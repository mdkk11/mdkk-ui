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
      include: [
        'src/index.ts',
        'src/styles.ts',
        'src/tailwind-plugin.ts',
        'src/components/**/*.ts',
        'src/components/**/*.tsx',
        'src/design-system/**/*.ts',
      ],
      exclude: [
        'src/examples/**',
        'src/**/*.stories.tsx',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/App.tsx',
        'src/Layout.tsx',
        'src/main.tsx',
        'src/setupTests.ts',
        'src/test/**',
      ],
      insertTypesEntry: true,
      skipDiagnostics: false,
      logDiagnostics: true,
      afterDiagnostic(diagnostics) {
        if (diagnostics.length > 0) {
          throw new Error(
            `Declaration generation failed with ${diagnostics.length} diagnostics.`,
          );
        }
      },
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
        styles: path.resolve(dirname, 'src/styles.ts'),
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
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
