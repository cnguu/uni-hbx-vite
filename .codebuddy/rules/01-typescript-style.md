---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:36:06.082Z
provider:
---

## 类型系统规范

### 1. 类型定义

- 优先使用 `interface` 定义对象类型，使用 `type` 定义联合类型、工具类型
- 禁止使用 `any` 类型；如需占位，使用 `unknown` 并配合类型守卫
- 联合类型必须使用 `|` 明确标注
- 泛型使用必须标注约束条件

```ts
// ✅ 正确
interface User { id: string; name: string }
type Status = 'pending' | 'success' | 'error'
function get<T extends Record<string, unknown>>(key: string): T | undefined { ... }

// ❌ 错误
function get(key: string): any { ... }
```

### 2. 枚举模式

本项目的枚举统一采用 `as const` 对象 + 类型推导模式（参考 `enum/cacheEnum.ts`、`enum/eventEnum.ts`），禁止使用 `enum` 关键字：

```ts
// ✅ 正确：as const 对象 + 类型推导
export const CacheKeyEnum = {
  TOKEN: 'token',
} as const
export type CacheKeyType = (typeof CacheKeyEnum)[keyof typeof CacheKeyEnum]

export type CacheValueType = {
  [CacheKeyEnum.TOKEN]: string
}

// ❌ 错误：使用 enum 关键字
enum CacheKeyEnum {
  TOKEN = 'token',
}
```

### 3. 全局类型

项目通过 `dts/global.d.ts` 声明全局工具类型，可直接使用：

- `Fn<T = void>`：无参返回 T 的函数
- `AnyFn`：任意函数
- `GenericFn<Args, R>`：泛型函数

### 4. 环境变量类型

环境变量类型在 `dts/env.d.ts` 的 `ImportMetaEnv` 接口中维护，新增环境变量必须同步更新该接口与 `env/` 目录下的 `.env` 文件。

---

## 代码风格规范

### 1. 命名规范

| 类型      | 规范                          | 示例                              |
| --------- | ----------------------------- | --------------------------------- |
| 组件      | PascalCase                    | `BlankLayout`、`IndexTest`        |
| 页面文件  | kebab-case + `index-page.vue` | `page/home/index-page.vue`        |
| 函数/变量 | camelCase                     | `routeTo`、`latestTabUrl`         |
| 接口/类型 | PascalCase                    | `RouteToOptions`、`EventCallback` |
| 常量      | UPPER_CASE                    | `THEME_COLOR`、`APP_BASE_INFO`    |
| 常量对象  | PascalCase + `Const` 后缀     | `PageUrlConst`、`APP_BASE_INFO`   |
| 枚举对象  | PascalCase + `Enum` 后缀      | `CacheKeyEnum`、`EventKeyEnum`    |
| Store     | `useXxxStore`                 | `useAppStore`、`useUserStore`     |
| Hook      | `useXxxHook`                  | `useEventHook`、`useSharedHook`   |
| Util      | `xxxUtil`                     | `routeUtil`、`storageUtil`        |

### 2. 代码风格

- 禁止使用 `console.log` 提交代码（构建时 `drop_console: true` 会移除，但源码不应依赖）
- 必须使用 TypeScript 严格模式（`strict: true`）
- 禁止直接修改 props，必须通过回调函数或 emit
- 导入路径必须使用 `@/` 别名（已配置 `paths`）
- 导入 `ts` 文件时保留 `.ts` 后缀（与项目现有风格一致，如 `import { xxx } from '@/util/routeUtil.ts'`）

### 3. Vue 文件 block 顺序

`<script setup>` 必须在最前，`<template>` 次之，`<style>` 最后（由 eslint `vue/block-order` 强制）：

```vue
<script setup lang="ts">
...
</script>
<template>...</template>
<style lang="scss" scoped>
...
</style>
```
