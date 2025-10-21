import { CacheKeyEnum } from '@/enum/cacheEnum.ts'
import { uniStorage } from '@/util/storageUtil.ts'

/**
 * 应用仓储
 */
export const useAppStore = defineStore('app', () => {
  const userStore = useUserStore()

  // 最新的 tab 页路径
  const latestTabUrl = ref<string>(uniStorage.get(CacheKeyEnum.LATEST_TAB_URL) || '')
  const setLatestTabUrl = (value: string) => {
    latestTabUrl.value = value
    uniStorage.set(CacheKeyEnum.LATEST_TAB_URL, latestTabUrl.value)
  }

  // 重置所有数据
  const reset = () => {
    setLatestTabUrl('')

    userStore.reset()

    // #ifdef APP
    plus.push.clear()
    plus.runtime.setBadgeNumber(0)
    // #endif
  }

  return {
    latestTabUrl,
    setLatestTabUrl,

    reset,
  }
})
