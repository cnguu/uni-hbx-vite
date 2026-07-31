---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:36:12.236Z
provider:
---

## 组件设计规范

### 1. 基础原则

- 所有 UI 组件必须严格遵循单职责原则（SRP）
- 容器组件与 UI 组件必须分离（Presentational/Container 模式）
- 组件间通信优先使用 props/emit，跨组件使用事件总线（`uniEvent`）或 Pinia store

### 2. 组件开发规则

1. 必须使用 `<script setup lang="ts">` 语法
2. 必须通过 `defineOptions` 设置组件选项，且 `virtualHost` 为 `true`、`styleIsolation` 为 `shared`：

```vue
<script setup lang="ts">
defineOptions({
  name: 'ComponentName',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})
</script>
```

3. 避免使用 `any` 类型，props 必须使用 `defineProps<T>()` 明确标注类型
4. 列表渲染必须使用 `key` 属性且唯一标识
5. 第三方组件必须通过 `pnpm install` 安装或放入 `uni_modules/`，禁止直接引入 CDN 资源

### 3. 组件分类与命名

| 类型         | 位置                     | 命名             | 示例                  |
| ------------ | ------------------------ | ---------------- | --------------------- |
| 布局组件     | `layout/`                | PascalCase       | `BlankLayout.vue`     |
| 可复用组件   | `component/`             | PascalCase       | `UserCard.vue`        |
| 页面私有组件 | `page/xxx/component/`    | PascalCase       | `IndexTest.vue`       |
| 页面         | `page/xxx/` 或 `page-a/` | `index-page.vue` | `home/index-page.vue` |

### 4. 自动导入

项目通过 `unplugin-auto-import` 和 `@uni-helper/vite-plugin-uni-components` 实现自动导入：

- Vue API（`ref`、`computed`、`onLoad`、`onShow` 等）自动导入，无需手动 `import`
- uni-app 生命周期（`onLaunch`、`onLoad` 等）自动导入
- `component/` 目录下的组件自动导入（基于 easycom 或 vite 插件）
- `defineStore`、`definePage` 等自动导入

不要重复手动导入已自动导入的 API。

---

## 页面开发规范

### 1. 页面定义

页面必须使用 `definePage` 定义页面配置（由 `@uni-helper/vite-plugin-uni-pages` 提供）：

```vue
<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '页面标题',
  },
})
</script>
```

### 2. 布局使用

页面内容必须包裹在布局组件中：

```vue
<template>
  <blank-layout>
    <view>页面内容</view>
  </blank-layout>
</template>
```

### 3. 条件编译

使用 uni-app 条件编译注释处理多端差异：

```vue
<script setup lang="ts">
// #ifdef APP
plus.device.setWakelock(true)
// #endif

// #ifdef WEB
window.history.back()
// #endif

// #ifndef WEB
uni.navigateBack({ delta: 1 })
// #endif
</script>
```

常用平台标识：`APP`、`WEB`（或 `H5`）、`MP-WEIXIN`、`MP-ALIPAY` 等。

### 4. 样式

- 样式使用 `lang="scss"`
- 全局变量已通过 `vite.config.ts` 的 `additionalData` 自动注入 `@/style/variable.scss`，无需手动 `@import`
- UnoCSS 工具类优先于手写样式
- 小程序端使用 `rpx` 单位（UnoCSS 已配置 `remRpx: isMp`）
