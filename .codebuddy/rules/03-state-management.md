---
description:
alwaysApply: true
enabled: true
updatedAt: 2026-07-31T18:36:16.736Z
provider:
---

## 状态管理规范（Pinia）

### 1. 模块创建规则

1. 每个模块独立创建，放置于 `store/module/` 目录
2. 文件名以 `useXxxStore` 结尾（如 `useAppStore.ts`、`useUserStore.ts`）
3. 必须使用 `setup` 语法定义 store（`defineStore` 自动导入）
4. 导出的函数名与文件名一致

### 2. Store 定义模板

```ts
import { CacheKeyEnum } from '@/enum/cacheEnum.ts'

/**
 * 用户仓储
 */
export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>(uniStorage.get(CacheKeyEnum.TOKEN) || '')

  // setter
  const setToken = (value: string) => {
    token.value = value
    uniStorage.set(CacheKeyEnum.TOKEN, token.value)
  }

  // 重置
  const reset = () => {
    setToken('')
  }

  return {
    token,
    setToken,
    reset,
  }
})
```

### 3. Store 间依赖

Store 之间可以互相引用（如 `useAppStore` 引用 `useUserStore`），在 setup 函数内部调用即可：

```ts
export const useAppStore = defineStore('app', () => {
  const userStore = useUserStore()

  const reset = () => {
    userStore.reset()
    // #ifdef APP
    plus.push.clear()
    // #endif
  }

  return { reset }
})
```

### 4. Store ID 规范

- `defineStore` 的第一个参数（store id）必须唯一
- 推荐使用与模块名对应的小写字符串（如 `'app'`、`'user'`）

### 5. 持久化

本项目手动实现持久化（非插件），状态变更时同步写入 `uniStorage`，初始化时从 `uniStorage` 读取：

```ts
const token = ref<string>(uniStorage.get(CacheKeyEnum.TOKEN) || '')
const setToken = (value: string) => {
  token.value = value
  uniStorage.set(CacheKeyEnum.TOKEN, token.value)
}
```

---

## 存储规范

### 1. uniStorage 工具

使用 `util/storageUtil.ts` 提供的 `uniStorage` 实例进行本地存储，它提供：

- 命名空间前缀隔离（默认 `uhv#`）
- 类型安全的读写（基于 `CacheKeyType` 与 `CacheValueType`）
- TTL 过期机制
- 统一的 `get`/`set`/`remove`/`clear`/`getInfo` API

### 2. 存储键管理

所有存储键必须在 `enum/cacheEnum.ts` 的 `CacheKeyEnum` 中定义，并同步维护 `CacheValueType` 类型映射：

```ts
export const CacheKeyEnum = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
} as const
export type CacheKeyType = (typeof CacheKeyEnum)[keyof typeof CacheKeyEnum]

export type CacheValueType = {
  [CacheKeyEnum.TOKEN]: string
  [CacheKeyEnum.USER_INFO]: UserInfo
}
```

禁止硬编码存储键字符串。
