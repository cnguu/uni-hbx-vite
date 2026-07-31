---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:36:25.289Z
provider:
---

## 路由规范

### 1. 路由工具

使用 `util/routeUtil.ts` 提供的封装函数，禁止直接调用 `uni.navigateTo` 等原生 API：

| 函数                       | 对应 uni API       | 说明                        |
| -------------------------- | ------------------ | --------------------------- |
| `routeTo(url, options)`    | `uni.navigateTo`   | 保留当前页，跳转到新页      |
| `redirectTo(url, options)` | `uni.redirectTo`   | 关闭当前页，跳转到新页      |
| `reLaunch(url, options)`   | `uni.reLaunch`     | 关闭所有页面，跳转          |
| `switchTab(url)`           | `uni.switchTab`    | 切换 tab 页                 |
| `navigateBack(delta)`      | `uni.navigateBack` | 返回上一页（H5 用 history） |

### 2. 路由参数

使用 `RouteToOptions` 传递参数：

```ts
interface RouteToOptions {
  params?: Record<string, any> | string
  serialization?: boolean // 序列化，启用后所有参数在 query 字段
  original?: boolean // 原始参数，不对参数处理
}
```

页面接收参数时使用 `queryDeserialize` 反序列化：

```ts
onLoad((options) => {
  const params = queryDeserialize(options)
})
```

### 3. 页面路径常量

页面路径必须使用 `constant/pageConst.ts` 中的 `PageUrlConst`，该文件由脚本自动生成，**禁止手动修改**：

```ts
// ✅ 正确
reLaunch(PageUrlConst.PAGE_HOME_INDEX_PAGE)

// ❌ 错误
reLaunch('/page/home/index-page')
```

### 4. 路由拦截

路由拦截逻辑在 `composable/route.ts` 中，通过 `routeInterceptor.install()` 在 `main.ts` 注册。拦截器统一处理：

- 登录态校验（白名单页面见 `enum/routeEnum.ts` 的 `RouteWhiteUrlEnum`）
- H5 端根路径 `/` 处理
- 已登录用户访问登录页时重定向到首页

---

## 事件总线规范

### 1. 类型安全的事件总线

使用 `util/eventUtil.ts` 的 `uniEvent` 实例，它基于 `type/event.ts` 的 `EventParams` 提供类型安全的事件通信：

```ts
// 定义事件（enum/eventEnum.ts）
export const EventKeyEnum = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_EXPIRED: 'login_expired',
} as const

// 定义事件参数类型（type/event.ts）
export type EventParams = {
  [EventKeyEnum.LOGIN_SUCCESS]: undefined
  [EventKeyEnum.ACTION_SUCCESS]: UniApp.ShowToastOptions | undefined
}

// 发送事件
uniEvent.$emit(EventKeyEnum.LOGIN_SUCCESS)

// 监听事件
uniEvent.$on(EventKeyEnum.LOGIN_SUCCESS, () => { ... })
```

### 2. 事件 Hook

组件中使用 `useUniEventHook` 自动管理事件订阅的生命周期：

```ts
import { useUniEventHook } from '@/hook/useEventHook.ts'

useUniEventHook([
  { name: EventKeyEnum.LOGIN_SUCCESS, cb: handleLoginSuccess },
  { name: EventKeyEnum.ACTION_SUCCESS, cb: handleActionSuccess },
])
```

该 hook 会在 `onMounted` 时自动 `$on`，在 `onUnmounted` 时自动 `$off`，无需手动清理。

### 3. 新增事件流程

1. 在 `enum/eventEnum.ts` 的 `EventKeyEnum` 添加事件键
2. 在 `type/event.ts` 的 `EventParams` 添加事件参数类型
3. 使用 `uniEvent.$emit` / `uniEvent.$on` 或 `useUniEventHook`

---

## Hook 规范

### 1. Hook 文件组织

- Hook 放置在 `hook/` 目录，文件名 `useXxxHook.ts`
- 导出的函数名与文件名一致

### 2. Hook 设计原则

- Hook 应封装可复用的组合式逻辑
- 涉及组件生命周期的逻辑使用 `tryOnMounted`/`tryOnUnmounted`（`hook/useSharedHook.ts`），使其在组件外调用时也能安全执行
- Hook 内部不应包含业务逻辑，业务逻辑由调用方传入

### 3. Composable 与 Hook 的区别

- `composable/`：插件式逻辑或跨组件共享逻辑（如 `routeInterceptor`）
- `hook/`：基于 Composition API 的可复用逻辑单元
