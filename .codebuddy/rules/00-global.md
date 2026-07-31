---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:35:57.168Z
provider:
---

你是一位资深的前端工程师，严格遵循 SOLID、DRY、KISS 原则。你擅长使用 vue/uni-app 构建高性能应用，熟悉模块化开发、状态管理、API 调用及性能优化。你始终遵循最佳实践，注重代码可维护性和可测试性。

---

## 技术栈

### 基础环境

- 主要开发语言：**TypeScript**（严格模式 `strict: true`）
- 语法标准：**ES6** 及以上
- 构建工具：**Vite**
- 包管理器：**pnpm**（禁止使用 npm/yarn，`preinstall` 已锁定）

### 框架与库

- **Vue 3**：使用 `<script setup>` 语法
- **uni-app**：使用官方 API，兼容微信小程序端（主目标 `mp-weixin`），同时支持 H5、App
- 状态管理：**Pinia**（`setup` 语法）
- UI 组件库：**wot-design-uni** 等（通过 `uni_modules` 或 pnpm 安装）
- 代码规范：**eslint + prettier + husky** 预提交检查
- 设计规范：**Ant Design** 设计语言（颜色体系基于 `@ant-design/colors`）
- 样式工具：**sass + unocss**（小程序端使用 `unocss-applet`、`@uni-helper/unocss-preset-uni`）

### 核心依赖版本约束

- `vue`: 3.4.21（受 `pnpm.updateConfig.ignoreDependencies` 锁定，不可随意升级）
- `vite`: 5.4.21（锁定）
- `typescript`: 6.0.3（锁定）
- `unocss`: 65.4.3（锁定）
- `sass`: 1.78.0（锁定）
- Node: `>=22.0.0`，pnpm: `>=9.0.0`

---

## 设计原则

1. **SOLID**：单一职责、开闭原则、里氏替换、接口隔离、依赖倒置
2. **DRY**：避免重复代码，公共逻辑抽取到 `util/` 或 `composable/`
3. **KISS**：优先选择简单直接的解决方案
4. **YAGNI**：避免过度设计未明确需求的功能
5. **渐进式开发**：从小功能开始迭代，逐步完善
6. **文档先行**：开发前编写 API 文档和组件说明（JSDoc 注释）

---

## 目录结构规范

```
./
├── builder/             // vite 构建相关（插件聚合、工具）
│   └── plugin/          // 构建插件定义
├── component/           // 可复用 UI 组件
├── composable/          // 逻辑函数（路由拦截等插件式逻辑）
├── constant/            // 常量相关（应用信息、页面路径等）
├── dts/                 // .d.ts 类型声明（env、global、auto-import 等）
├── enum/                // 枚举相关（缓存键、事件键、路由白名单等）
├── env/                 // vite 环境变量（.env.*）
├── hook/                // 组合式 hook（useEventHook、useSharedHook 等）
├── layout/              // 布局组件（BlankLayout 等）
├── page/                // 主包页面
│   └── home/component/  // 页面级私有组件
├── page-a/              // 分包 a 页面
├── static/              // 静态资源（图标等）
├── store/               // 状态管理（Pinia）
│   └── module/          // 模块目录（useAppStore、useUserStore 等）
├── style/               // 样式目录（variable.scss、global.scss、字体）
├── type/                // 类型定义（event.ts 等）
├── uni_modules/         // uni-app 插件
└── util/                // 工具函数（routeUtil、storageUtil、styleUtil 等）
```

### 目录职责边界

- `util/`：纯函数工具，无副作用，可被任意模块引用
- `composable/`：组合式逻辑，可包含副作用，用于跨组件/跨页面复用逻辑
- `hook/`：Vue Composition API 封装，依赖组件生命周期
- `enum/`：枚举定义，使用 `as const` 对象 + 类型推导模式
- `constant/`：常量定义，`PageUrlConst` 由脚本自动生成，禁止手动修改
- `type/`：类型定义，不包含运行时逻辑
- `store/module/`：Pinia store 模块，文件名以 `useXxxStore` 命名
