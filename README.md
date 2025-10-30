# UNI HBX VITE

UniApp 新项目基础模板，HBuilderX 为主，Cli 为辅

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

复制开发环境配置 `env/.env.development.eg` => `.env.development`

> 类型见: type/vite-env.d.ts

## 运行与构建

> 可直接在 HBX 中运行和构建

### CLI

1. 运行到 `WEB`: `$ pnpm dev`
2. 运行到 `微信小程序`: `$ pnpm dev:mp-weixin`

> 构建命令：将 `dev` 改为 `build`
