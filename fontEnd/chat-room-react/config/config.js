import { defineConfig } from 'umi';
export default defineConfig({
  routes: [{ path: '/', component: '@/pages/homepage/index' }],
  targets: {
    chrome: 49,
    firefox: 45,
    safari: 10,
    edge: 13,
    ios: 10,
    ie: 10,
  },
  history: { type: 'hash' },
  outputPath: './build',
  dynamicImport: {
    loading: '@/pages/components/Loading.tsx',
  },
  antd: {},
  title: '智能聊天室',
  hardSource: false,
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },
  exportStatic: {
    dynamicRoot: true,
  },
  ignoreMomentLocale: true,
});
