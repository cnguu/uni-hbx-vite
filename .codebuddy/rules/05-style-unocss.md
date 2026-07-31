---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:36:30.647Z
provider:
---

## 样式规范

### 1. 样式工具链

- **sass**：预处理器，全局变量自动注入（`@/style/variable.scss`）
- **unocss**：原子化 CSS，优先使用工具类
- **unocss-applet**：小程序端兼容
- **@ant-design/colors**：颜色体系

### 2. 全局样式文件

| 文件                          | 作用                                                                   |
| ----------------------------- | ---------------------------------------------------------------------- |
| `style/variable.scss`         | SCSS 全局变量（颜色、命名空间），通过 vite `additionalData` 自动注入   |
| `style/global.scss`           | 全局样式（`html`、`#app`、`page` 基础样式），在 `App.vue` 中 `@import` |
| `style/ant-design-color.scss` | Ant Design 颜色 SCSS 变量                                              |
| `style/font/`                 | 字体文件                                                               |

### 3. SCSS 变量命名

变量采用 `$-uhv-` 前缀（私有），支持 CSS 变量覆盖：

```scss
// 静态值
$-uhv-color-static-theme-6: #1890ff !default;
// 可被 CSS 变量覆盖
$-uhv-color-theme-6: var(--uhv-color-theme-6, $-uhv-color-static-theme-6) !default;
```

### 4. 颜色体系

颜色基于 Ant Design 设计语言，在 `util/styleUtil.ts` 定义常量并在 `uno.config.ts` 注册为 UnoCSS 主题色：

| 语义     | 常量              | UnoCSS class                 | 默认值      |
| -------- | ----------------- | ---------------------------- | ----------- |
| 主题色   | `THEME_COLOR`     | `text-theme`、`bg-theme`     | `#1890ff`   |
| 成功色   | `SUCCESS_COLOR`   | `text-success`、`bg-success` | `#52c41a`   |
| 警告色   | `WARN_COLOR`      | `text-warn`、`bg-warn`       | `#faad14`   |
| 错误色   | `ERROR_COLOR`     | `text-error`、`bg-error`     | `#ff4d4f`   |
| 标准文本 | `TEXT_COLOR`      | `text-text`                  | `#000000e0` |
| 二级文本 | `SECONDARY_COLOR` | `text-secondary`             | `#000000a6` |
| 边框     | `BORDER_COLOR`    | `text-border`                | `#d9d9d9`   |
| 背景     | `BG_COLOR`        | `bg-bg`                      | `#f7f7f7`   |

每个语义色还提供 10 级色板（`theme-1` 到 `theme-10`），使用方式：`bg-theme-1`、`text-theme-6` 等。

---

## UnoCSS 规范

### 1. 优先使用 UnoCSS

样式编写优先级：**UnoCSS 工具类 > SCSS 全局变量 > 组件内 `<style scoped>`**

### 2. 顺序规则

`eslint` 已启用 `unocss/order` 规则，class 中的 UnoCSS 类名顺序由 eslint 自动修复。

### 3. 自定义规则

`uno.config.ts` 中定义了 `safe-area-inset-*` 规则，用于安全区域：

```html
<view class="safe-area-inset-bottom">底部安全区域</view>
```

### 4. 变体支持

支持 `custom-class:` 和 `placeholder-class:` 变体，用于小程序端 class 选择器：

```html
<input placeholder-class="text-tertiary" />
```

### 5. 字体粗细

使用语义化字体粗细 class：

| class            | weight |
| ---------------- | ------ |
| `font-thin`      | 100    |
| `font-light`     | 300    |
| `font-normal`    | 400    |
| `font-medium`    | 500    |
| `font-semibold`  | 600    |
| `font-bold`      | 700    |
| `font-extrabold` | 800    |
| `font-heavy`     | 900    |
| `font-black`     | 950    |

---

## 单位规范

- 小程序端：`rpx`（UnoCSS 已配置 `remRpx: isMp` 自动转换）
- H5/App 端：`rem` 或 `px`
- 字号基准：`page` 默认 `28rpx`（见 `style/global.scss`）
