/***********
 * 对象相关 *
 **********/

/**
 * 简单深拷贝
 */
export const clonePlain = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
