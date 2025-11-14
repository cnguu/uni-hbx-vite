/**
 * 应用仓储
 */
export const useAppStore = defineStore('app', () => {
  const userStore = useUserStore()

  // 最新的 tab 页路径
  const latestTabUrl = ref<string>('')
  const setLatestTabUrl = (value: string) => {
    latestTabUrl.value = value
  }

  // 重置所有数据
  const reset = () => {
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
