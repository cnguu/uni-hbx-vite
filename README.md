# UNI HBX VITE

[![release](https://badgen.net/github/release/cnguu/uni-hbx-vite)](https://github.com/cnguu/uni-hbx-vite/releases)
[![license](https://badgen.net/github/license/cnguu/uni-hbx-vite)](https://github.com/cnguu/uni-hbx-vite/blob/main/LICENSE)

uni-app 项目快速启动，同时支持 HBX 运行和 CLI 运行

## 特性

- :sparkling_heart: 零配置，开箱即用，尽可能的纯净模板
- :sparkling_heart: 最新技术栈 [Vue3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [PNPM](https://pnpm.io), [UnoCSS](https://github.com/unocss/unocss), [TypeScript](https://www.typescriptlang.org), [Pinia](https://github.com/vuejs/pinia) ...
- :sparkling_heart: 目录即路由，自动生成 `pages.json`
- :sparkling_heart: 自动导入组件和依赖
- ...

## 平台兼容性

| H5                 | 安卓               | 微信小程序         | 其他               |
| ------------------ | ------------------ | ------------------ | ------------------ |
| :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_minus_sign: |

## 克隆项目

克隆前需要关闭 git 的换行符自动转换，项目统一使用 LF

```bash
$ git config --global core.autocrlf false
```

## 安装依赖

```bash
$ pnpm i --frozen-lockfile
```

## 开发准备

复制开发环境配置 `env/.env.development.eg` => `env/.env.development`

> 类型见: dts/env.d.ts

## 运行与构建

> 可直接在 HBX 中运行和构建

1. 运行到 `WEB`: `$ pnpm dev`
2. 运行到 `微信小程序`: `$ pnpm dev:mp-weixin`
3. 更多命令见 `package.json` 中的 `script`

> 构建命令：将 `dev` 改为 `build`

## 目录说明

```
---
  |- builder/      构建相关
  |- composable/   逻辑复用相关
  |- constant/     常量相关
  |- dts/          .d.ts相关
  |- enum/         枚举相关
  |- env/          环境变量相关
  |- hook/         钩子相关
  |- layout/       布局相关
  |- page/         主包
  |- page-a/       分包
  |- static/       静态资源
  |- store/        数据仓储
  |- style/        样式相关
  |- type/         类型相关
  |- util/         工具
```

## 依赖说明

- `eslint` + `prettier` + `husky` + `lint-staged`: 团队合作必备
- `typescript`: 用代码的方式来写注释
- `unocss`: 快速编写简单样式（class 起名困难症者的福音）
- `@ant-design/colors`: 大量实践经验下的调色板
- `enum-plus`: 增强的枚举对象
- `@uni-helper/plugin-uni`: 让项目支持一些 `ONLY ESM` 依赖
- `@uni-helper/uni-env`: 使 `process.env.UNI_PLATFORM` 环境判断更加易用
- `@uni-helper/vite-plugin-uni-components`: 组件的自动导入
- `@uni-helper/vite-plugin-uni-manifest`: 管理并自动生成 `manifest.json`
- `@uni-helper/vite-plugin-uni-pages`: 管理并自动生成 `pages.json`，`-page.vue` 后缀的文件会被识别为页面
- `@uni-ku/bundle-optimizer`: 分包自动优化，小程序开发必备
- `@uni-ku/root`: 根组件，模拟传统的 App.vue
- `unplugin-auto-import`: 依赖自动导入
- ...

### 其他说明

- `util/isUtil.ts`: 常见基础类型判断
- `util/messageUtil.ts`: 封装 `uni` 的反馈相关，增强使用体验
- `util/routeUtil.ts`: 封装 `uni` 的跳转相关，增强使用体验
- `util/storageUtil.ts`: 封装 `uni` 的 `Storage`，提供类型安全的存储操作（避免自己忘记缓存中有什么）
- `util/styleUtil.ts` + `style/variable.scss`: 项目调色板
- ...

## 鸣谢

综合全网项目而形成的最佳实践，感谢以下团队或个人为 uni-app 开发体验优化做出的贡献，排名不分先后

- [uni-helper](https://github.com/uni-helper)
- [uni-ku](https://github.com/uni-ku)
- [unibest](https://github.com/unibest-tech/unibest)
- ...
