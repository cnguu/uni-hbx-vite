/***********
 * 缓存相关 *
 **********/
import type { CacheKeyType, CacheValueType } from '@/enum/cacheEnum.ts'

/**
 * 缓存值类型
 */
interface StorageValue<K extends CacheKeyType> {
  /**
   * 存储内容
   */
  value: CacheValueType[K]
  /**
   * 过期时间
   */
  ttl?: number
}

/**
 * 存储类
 * 提供类型安全的存储操作
 */
class Storage {
  /**
   * 命名空间
   * @private
   */
  private namespace: string
  /**
   * 键名前缀
   * @private
   */
  private prefix: string

  constructor(namespace?: string) {
    this.namespace = namespace ?? 'uhv'
    this.prefix = `${this.namespace}#`
  }

  /**
   * uni.setStorageSync
   * @param key
   * @param value
   * @param ttl 有效秒数，默认：0（永不过期）
   */
  set<K extends CacheKeyType>(key: K, value: CacheValueType[K], ttl: number = 0): void {
    const storageKey: string = `${this.prefix}${key}`
    const storageValue: StorageValue<K> = {
      value,
      ttl: ttl > 0 ? ttl * 1000 + Date.now() : 0,
    }
    uni.setStorageSync(storageKey, storageValue)
  }

  /**
   * uni.getStorageSync
   * @param key
   */
  get<K extends CacheKeyType>(key: K): CacheValueType[K] | undefined {
    const storageKey: string = `${this.prefix}${key}`
    const storageValue: StorageValue<K> | undefined = uni.getStorageSync(storageKey)
    if (!storageValue) {
      return void 0
    }
    storageValue.ttl = storageValue.ttl ?? 0
    if (storageValue.ttl > 0 && storageValue.ttl < Date.now()) {
      this.remove(key)
      return void 0
    }
    return storageValue.value
  }

  /**
   * uni.removeStorageSync
   * @param key
   */
  remove<K extends CacheKeyType>(key: K): void {
    const storageKey: string = `${this.prefix}${key}`
    uni.removeStorageSync(storageKey)
  }

  /**
   * uni.getStorageInfoSync
   */
  getInfo(): Omit<UniApp.GetStorageInfoSuccess, 'keys'> & {
    keys: CacheKeyType[]
  } {
    const info = uni.getStorageInfoSync()
    const keys = info.keys.filter((key) => key.startsWith(this.prefix)) as CacheKeyType[]
    return {
      ...info,
      keys,
    }
  }

  /**
   * 清空当前命名空间下所有的存储
   */
  clear(): void {
    this.getInfo().keys.forEach((key) => this.remove(key))
  }
}

/**
 * 存储工具
 */
export const uniStorage = new Storage()
