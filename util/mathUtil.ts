/***********
 * 数学相关 *
 **********/
import mathUtil from 'number-precision'
import { isNumber } from '@/util/isUtil.ts'

mathUtil.enableBoundaryChecking(false)

export {
  // 解决浮动运算问题，避免小数点后产生多位数和计算精度损失
  mathUtil,
}

// 字节人性化
export const humanizedBytes = (size: number, precision = 2): string => {
  if (!size || !isNumber(size)) return '0KB'

  const units = ['KB', 'MB', 'GB', 'TB']
  let index = 0
  let convertedSize = size / 1024

  while (convertedSize >= 1024 && index < units.length - 1) {
    convertedSize /= 1024
    index++
  }

  return `${convertedSize.toFixed(precision)}${units[index]}`
}

// 浮点数比较大小
export const compareFloatNumber = (a: number, b: number, epsilon = Number.EPSILON): 0 | 1 | -1 => {
  const diff = a - b

  // 两数相等
  if (Math.abs(diff) < epsilon) {
    return 0
  }
  // a 大于 b
  else if (diff > epsilon) {
    return 1
  }
  // a 小于 b
  else {
    return -1
  }
}

/**
 * 向上取数，单位：0.5
 * e.g. 2=>2 2.0=>2 2.1=>2.5 2.6=>3
 */
export const roundToNearestHalf = (number: number): number => {
  if (!isNumber(number) || Number.isInteger(number)) return number

  const lowerHalf = Math.floor(number)
  const upperHalf = Math.ceil(number)
  const mid = (lowerHalf + upperHalf) / 2
  if (number < mid) {
    return lowerHalf + 0.5
  } else if (number === mid) {
    return number
  } else {
    return upperHalf
  }
}
