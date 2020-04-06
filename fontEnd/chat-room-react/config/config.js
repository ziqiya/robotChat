import { defineConfig } from 'umi';
export default defineConfig({
  routes: [{ path: '/', component: '@/pages/index' }],
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
  title: '聊天室', // 项目自行补充
  hardSource: false,
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },
  exportStatic: {
    dynamicRoot: true,
  },
  ignoreMomentLocale: true,
});
