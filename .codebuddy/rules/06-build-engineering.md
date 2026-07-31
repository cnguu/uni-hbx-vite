---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:36:35.180Z
provider:
---

## 构建配置规范

### 1. 构建工具链

- **Vite 5** 作为构建工具
- **uni-app** 通过 `@dcloudio/vite-plugin-uni` 集成
- 构建插件聚合在 `builder/plugin/index.ts`，统一导出

### 2. 构建插件清单

`builder/plugin/` 目录包含以下插件定义：

| 文件                  | 插件                                     | 作用                                         |
| --------------------- | ---------------------------------------- | -------------------------------------------- |
| `auto-import.ts`      | `unplugin-auto-import`                   | API 自动导入                                 |
| `component.ts`        | `@uni-helper/vite-plugin-uni-components` | 组件自动导入                                 |
| `manifest.ts`         | `@uni-helper/vite-plugin-uni-manifest`   | `manifest.json` 由 `manifest.config.ts` 生成 |
| `page.ts`             | `@uni-helper/vite-plugin-uni-pages`      | `pages.json` 由 `pages.config.ts` 生成       |
| `root.ts`             | `@uni-ku/root`                           | Root 组件支持                                |
| `cdn.ts`              | `@cnguu/vite-plugin-uni-cdn`             | CDN 外部化                                   |
| `bundle-optimizer.ts` | `@uni-ku/bundle-optimizer`               | 包体积优化                                   |
| `uni.ts`              | `@dcloudio/vite-plugin-uni`              | uni-app 核心                                 |
| `unocss.ts`           | `unocss`                                 | 原子化 CSS                                   |
| `compression.ts`      | `vite-plugin-compression2`               | gzip 压缩（仅 H5 生产）                      |

### 3. 配置文件生成

- `manifest.json` 由 `manifest.config.ts` 生成，**禁止直接修改 `manifest.json`**
- `pages.json` 由 `pages.config.ts` 生成，**禁止直接修改 `pages.json`**
- `constant/pageConst.ts` 由 `@uni-helper/vite-plugin-uni-pages` 自动生成，**禁止手动修改**

### 4. 路径别名

使用 `@/` 指向项目根目录（在 `vite.config.ts` 和 `tsconfig.app.json` 中配置），导入时必须使用 `@/`：

```ts
import { useAppStore } from '@/store/module/useAppStore.ts'
import { routeTo } from '@/util/routeUtil.ts'
```

### 5. 环境变量

- 环境变量文件放置在 `env/` 目录（如 `.env`、`.env.development`、`.env.production`）
- 类型定义在 `dts/env.d.ts` 的 `ImportMetaEnv` 接口
- 通过 `loadEnv(mode, envDir)` 读取

---

## 版本控制规范

### 1. Git Commit

遵循 **Conventional Commits** 标准：

```
feat: 新功能描述
fix: 修复问题描述
chore: 构建流程/依赖更新
docs: 文档修改
style: 代码格式调整
refactor: 代码重构
test: 测试相关
perf: 性能优化
ci: CI 配置
```

### 2. 预提交检查

项目通过 `husky` + `lint-staged` 实现预提交检查（见 `lint-staged.config.js`）：

| 文件类型                            | 执行命令                                                             |
| ----------------------------------- | -------------------------------------------------------------------- |
| `*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}` | `eslint --cache --fix` + `prettier --cache --ignore-unknown --write` |
| `*.{scss,sass,less,styl,html,css}`  | `prettier --cache --ignore-unknown --write`                          |
| `*.md`                              | `prettier --cache --ignore-unknown --write`                          |
| `*.vue`                             | `eslint --cache --fix` + `prettier --cache --ignore-unknown --write` |
| `package.json`                      | `prettier --cache --ignore-unknown --write` + `sort-package-json`    |

### 3. ESLint 规则要点

- `unocss/order`: error（UnoCSS 类名顺序）
- `vue/block-order`: error（`script` → `template` → `style`）
- `vue/multi-word-component-names`: off
- `@typescript-eslint/no-explicit-any`: warn
- `no-unused-vars` / `@typescript-eslint/no-unused-vars`: warn
- 格式化交由 prettier 处理（`skip-formatting`）

---

## 依赖管理规范

### 1. 包管理器

- 必须使用 **pnpm**（`preinstall` 脚本通过 `only-allow pnpm` 强制）
- 禁止使用 npm 或 yarn

### 2. 锁定依赖

以下依赖在 `package.json` 的 `pnpm.updateConfig.ignoreDependencies` 中锁定，不可随意升级：

```
vue, vue-router, @unocss/eslint-config, @unocss/preset-legacy-compat,
@vue/runtime-core, chalk, consola, ora, sass, unocss, unocss-applet,
vite, typescript
```

### 3. 新增依赖

- 生产依赖：`pnpm add <pkg>`
- 开发依赖：`pnpm add -D <pkg>`
- 提交时 `package.json` 会被 `sort-package-json` 自动排序

---

## 多端构建命令

| 命令                              | 平台         |
| --------------------------------- | ------------ |
| `pnpm dev` / `pnpm build:h5`      | H5           |
| `pnpm dev:mp` / `pnpm build:mp`   | 微信小程序   |
| `pnpm dev:app` / `pnpm build:app` | App          |
| `pnpm dev:mp-alipay`              | 支付宝小程序 |
| `pnpm dev:mp-baidu`               | 百度小程序   |
| `pnpm dev:mp-toutiao`             | 抖音小程序   |
| `pnpm type-check`                 | 类型检查     |

注意：构建脚本使用 `UNI_INPUT_DIR=$INIT_CWD` 设置输入目录，需在项目根目录执行。
