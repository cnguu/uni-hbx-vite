/**************
 * 缓存相关枚举 *
 **************/

/**
 * 缓存键枚举
 * 统一前缀 uhv_
 */
export enum CacheKeyEnum {
  /** 授权令牌 */
  TOKEN = 'uhv_token',
}

/** 存储值的类型映射 */
export type CacheValueType = {
  /** 授权令牌 */
  [CacheKeyEnum.TOKEN]: string
}
