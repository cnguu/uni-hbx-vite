/***********
 * 是否相关 *
 **********/
import { RegExpEnum } from '@/enum/regExpEnum.ts'

// 获取对象的字符串表示
export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)

// 判断值是否为指定类型
export const is = (val: unknown, type: string): boolean => {
  return toTypeString(val) === `[object ${type}]`
}

// 判断是否在服务器环境
export const isServer: boolean = typeof window === 'undefined'

// 判断是否为数组
export const isArr = Array.isArray

// 判断是否为 Map 类型
export const isMap = (val: unknown): val is Map<unknown, unknown> => is(val, 'Map')

// 判断是否为 Set 类型
export const isSet = (val: unknown): val is Set<unknown> => is(val, 'Set')

// 判断是否为 Date 类型
export const isDate = (val: unknown): val is Date => is(val, 'Date')

// 判断是否为 RegExp 类型
export const isRegExp = (val: unknown): val is RegExp => is(val, 'RegExp')

// 判断是否为函数类型
export const isFunction = (val: unknown): val is (...args: any[]) => any =>
  typeof val === 'function'

// 判断是否为字符串类型
export const isString = (val: unknown): val is string => typeof val === 'string'

// 判断是否为 Symbol 类型
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

// 判断是否为对象类型
export const isObject = (val: unknown): val is Record<string, unknown> =>
  val != null && typeof val === 'object'

// 判断是否为纯对象
export const isPlainObject = (val: unknown): val is Record<string, unknown> => is(val, 'Object')

// 判断是否为 Promise 类型
export const isPromise = (val: unknown): val is Promise<unknown> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 判断值是否已定义
export const isDefined = <T>(val: T | null | undefined): val is Exclude<T, null | undefined> => {
  return val !== undefined && val !== null
}

// 判断值是否未定义
export const isUndefined = <T>(val: T | null | undefined): val is null | undefined => {
  return !isDefined(val)
}

// 判断值是否为空
export const isEmpty = (val: unknown): boolean => {
  if (isArr(val) || isString(val)) {
    return val.length === 0
  }

  if (isMap(val) || isSet(val)) {
    return val.size === 0
  }

  if (isPlainObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

// 判断是否为数字类型
export const isNumber = (val: unknown): val is number => is(val, 'Number')

// 判断是否为数字字符串
export const isStringNumber = (val: unknown): boolean => {
  if (!isString(val)) return false
  if (isNumber(Number(val))) return true
  return /^-?\d+(\.\d+)?$/.test(val)
}

// 判断是否为布尔类型
export const isBoolean = (val: unknown): val is boolean => is(val, 'Boolean')

// 判断是否为 JSON 字符串
export const isJsonString = (val: unknown): boolean => {
  let flag = false
  try {
    if (isString(val)) {
      const parseVal = JSON.parse(val)
      if (isPlainObject(parseVal) || isArr(parseVal)) {
        flag = true
      }
    }
  } catch (e) {
    console.log(e)
  }
  return flag
}

// 判断是否为键盘事件
export const isKeyboardEvent = (val: unknown): val is KeyboardEvent => is(val, 'KeyboardEvent')

// 判断是否为 FormData 类型
export const isFormData = (val: unknown): val is FormData => is(val, 'FormData')

// 判断是否为 File 类型
export const isFile = (val: unknown): val is File => is(val, 'File')

// 判断是否为 HTTPS 链接
export const isHttps = (val: unknown): boolean => {
  if (!isString(val)) return false
  return val.startsWith('https')
}

// 判断是否为 URL
export const isUrl = (val: unknown): boolean => {
  if (!isString(val)) return false
  return RegExpEnum.URL.test(val)
}

// 判断是否为手机号码
export const isCellPhoneNumber = (val: unknown): boolean => {
  if (!isString(val)) return false
  return RegExpEnum.CELL_PHONE_NUMBER.test(val)
}

// 判断是否为 A 包
export const isPackageA = import.meta.env.VITE_PACKAGE_A === 'true'

// 判断是否为 B 包
export const isPackageB = import.meta.env.VITE_PACKAGE_A === 'false'
