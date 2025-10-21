/***********
 * 对象相关 *
 **********/
import { cloneDeep, isEqual, mergeWith, unionWith } from 'lodash'
import { isArr, isPlainObject } from '@/util/isUtil.ts'

/**
 * 简单深拷贝
 */
export const clonePlain = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 合并结果的类型工具（处理对象、数组、基本类型的合并场景）
 * - 若 T 和 S 都是对象：返回两者的交叉类型（属性合并）
 * - 若 T 和 S 都是数组：返回元素为两者元素联合类型的数组
 * - 其他情况：返回 S 类型（源值覆盖目标值）
 */
type ObjectMergeResult<T, S> = T extends object
  ? S extends object
    ? T extends any[]
      ? S extends any[]
        ? Array<Extract<T[number], any> | Extract<S[number], any>> // 数组合并：元素联合
        : S // 目标是数组，源不是：源覆盖
      : S extends any[]
        ? S // 目标是对象，源是数组：源覆盖
        : T & S // 都是对象：交叉合并
    : S // 源不是对象：源覆盖
  : S // 目标不是对象：源覆盖

/**
 * @description 递归合并两个对象（数组去重合并，对象深层递归合并）
 * @param target 目标对象，合并后结果存放于此（不会修改原对象）
 * @param source 要合并的源对象（不会修改原对象）
 * @returns 合并后的新对象
 */
export const deepMerge = <T, S>(target: T, source: S): ObjectMergeResult<T, S> => {
  // 处理空值或非对象/数组的情况，避免 mergeWith 异常
  const safeTarget: unknown = isPlainObject(target) || isArr(target) ? target : {}
  const safeSource: unknown = isPlainObject(source) || isArr(source) ? source : {}
  // 仅对 target 做一次深拷贝，避免修改原对象
  return mergeWith(
    cloneDeep(safeTarget) as T,
    safeSource as S,
    (objValue: unknown, srcValue: unknown) => {
      // 若两者都是数组，合并并基于 isEqual 去重
      if (isArr(objValue) && isArr(srcValue)) {
        return unionWith(objValue, srcValue, isEqual)
      }
      // 若两者都是纯对象，返回 undefined 让 mergeWith 继续递归合并（利用其内置递归能力）
      if (isPlainObject(objValue) && isPlainObject(srcValue)) {
        return undefined
      }
      return srcValue
    },
  ) as ObjectMergeResult<T, S>
}
