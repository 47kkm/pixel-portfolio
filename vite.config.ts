import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// 내용은 기존 VuePress 포트폴리오(docs 폴더)에서 읽는다. 문구·프로젝트는 그쪽에서만 고친다.
// 다른 위치에 있으면 PORTFOLIO_DOCS=/경로/portfolio/docs 로 실행한다.
const portfolioDocs = resolve(
  process.env.PORTFOLIO_DOCS ?? fileURLToPath(new URL('../portfolio/docs', import.meta.url)),
);

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@portfolio': portfolioDocs,
    },
  },
  server: {
    fs: { allow: ['.', portfolioDocs] },
  },
});
