/***********
 * 缓存相关 *
 **********/
import { CacheKeyEnum, type CacheValueType } from '@/enum/cacheEnum.ts'

/**
 * 存储工具类
 * 提供类型安全的存储操作
 */
export class uniStorage {
  /**
   * uni.setStorageSync
   */
  static set<K extends CacheKeyEnum>(key: K, value: CacheValueType[K]): void {
    uni.setStorageSync(key, value)
  }

  /**
   * uni.getStorageSync
   */
  static get<K extends CacheKeyEnum>(key: K): CacheValueType[K] | undefined {
    return uni.getStorageSync(key)
  }

  /**
   * uni.removeStorageSync
   */
  static remove<K extends CacheKeyEnum>(key: K): void {
    return uni.removeStorageSync(key)
  }
}
