/***********
 * 缓存相关 *
 **********/
import type { CacheKeyType, CacheValueType } from '@/enum/cacheEnum.ts'

/**
 * 存储工具类
 * 提供类型安全的存储操作
 */
export const uniStorage = {
  /**
   * uni.setStorageSync
   */
  set<K extends CacheKeyType>(key: K, value: CacheValueType[K]): void {
    uni.setStorageSync(key, value)
  },

  /**
   * uni.getStorageSync
   */
  get<K extends CacheKeyType>(key: K): CacheValueType[K] | undefined {
    return uni.getStorageSync(key)
  },

  /**
   * uni.removeStorageSync
   */
  remove<K extends CacheKeyType>(key: K): void {
    uni.removeStorageSync(key)
  },
}
