import { InlineConfig, UserConfig, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  cacheDir: './.vite',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__test__/setup.ts',
  },
} as VitestConfigExport);
