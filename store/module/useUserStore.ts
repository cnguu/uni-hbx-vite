import { CacheKeyEnum } from '@/enum/cacheEnum.ts'

/**
 * 用户仓储
 */
export const useUserStore = defineStore('app', () => {
  // 用户令牌
  const token = ref<string>(uniStorage.get(CacheKeyEnum.TOKEN) || '')
  const setToken = (value: string) => {
    token.value = value
    uniStorage.set(CacheKeyEnum.TOKEN, token.value)
  }

  // 重置所有数据
  const reset = () => {
    setToken('')
  }

  return {
    token,
    setToken,

    reset,
  }
})
