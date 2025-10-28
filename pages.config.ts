import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'custom',
    'app-plus': {
      bounce: 'none',
    },
  },
  tabBar: {
    list: [
      {
        visible: false,
        pagePath: 'page/launch/index-page',
        text: '启动',
      },
      {
        visible: false,
        pagePath: 'page/login/index-page',
        text: '登录',
      },
      {
        visible: false,
        pagePath: 'page/home/index-page',
        text: '首页',
      },
    ],
  },
})
