/***************
 * 字符串操作相关 *
 ***************/
import { isArr, isPlainObject, isString } from '@/util/isUtil.ts'

/**
 * 实现 URLSearchParams 来处理 URL 的查询字符串
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
 */
export class URLQuery {
  private _params: [string, string][] = []
  constructor(init?: string[][] | Record<string, string> | string | URLQuery) {
    if (!init) return
    this._params = []
    if (isString(init)) {
      this._fromString(init)
    } else if (isArr(init)) {
      init.forEach(([name, value]) => {
        this.append(String(name), String(value))
      })
    } else if (init instanceof URLQuery) {
      this._params = [...init._params]
    } else if (isPlainObject(init)) {
      Object.entries(init).forEach(([name, value]) => {
        this.append(name, value)
      })
    }
  }
  /** 解析查询字符串（移除开头的 ? 并解码键值对） */
  _fromString(queryString: string): void {
    const str = queryString.startsWith('?') ? queryString.slice(1) : queryString
    if (!str) return
    str.split('&').forEach((pair) => {
      const [name, value = ''] = pair.split('=').map(decodeURIComponent)
      if (name) {
        this.append(name, value)
      }
    })
  }
  /** 获取参数数量 */
  get size() {
    return this._params.length
  }
  /** 添加键值对（不会覆盖现有同名键） */
  append(name: string, value: string): void {
    this._params.push([String(name), String(value)])
  }
  /**
   * 删除指定键值对
   * @param name 要删除的键
   * @param value 可选，指定要删除的具体值（不指定则删除所有同名键）
   */
  delete(name: string, value?: string) {
    this._params = this._params.filter(([k, v]) => !(k === name && (!value || v === value)))
  }
  /** 获取第一个匹配键的值（无匹配则返回 null） */
  get(name: string): string | null {
    const found = this._params.find(([k]) => k === name)
    return found ? found[1] : null
  }
  /** 获取所有匹配键的值 */
  getAll(name: string): string[] {
    return this._params.filter(([k]) => k === name).map(([, v]) => v)
  }
  /**
   * 检查是否存在指定键值对
   * @param name 要检查的键
   * @param value 可选，指定要检查的具体值
   */
  has(name: string, value?: string): boolean {
    return this._params.some(([k, v]) => k === name && (!value || v === value))
  }
  /** 设置键的值（覆盖所有同名旧值） */
  set(name: string, value: string): void {
    this.delete(name)
    this.append(name, value)
  }
  /** 按键名排序（原地排序） */
  sort(): void {
    this._params.sort(([a], [b]) => a.localeCompare(b))
  }
  /** 转换为编码后的查询字符串（不含开头的 ?） */
  toString(): string {
    return this._params
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
  }
  /** 遍历所有键值对 */
  forEach(callbackFn: (value: string, key: string, parent: URLQuery) => void, thisArg?: any): void {
    this._params.forEach(([name, value]) => {
      callbackFn.call(thisArg, value, name, this)
    })
  }
  /** 返回键值对迭代器 */
  entries(): IterableIterator<[string, string]> {
    return this._params[Symbol.iterator]()
  }
  /** 返回键名迭代器 */
  *keys(): Generator<string> {
    for (const [name] of this._params) {
      yield name
    }
  }
  /** 返回值迭代器 */
  *values(): Generator<string> {
    for (const [, value] of this._params) {
      yield value
    }
  }
  /** 支持 for...of 迭代（同 entries()） */
  [Symbol.iterator](): IterableIterator<[string, string]> {
    return this.entries()
  }
  /** 自定义对象类型标签（增强类型检测） */
  get [Symbol.toStringTag](): string {
    return 'URLQuery'
  }
}

/**
 * 解析 URL 字符串，提取路径和参数
 */
export const parseUrl = (urlStr: string) => {
  if (!urlStr) {
    return { path: '', params: {} }
  }
  // 分割路径和查询字符串（处理 ? 位置）
  const queryIndex = urlStr.indexOf('?')
  const path = queryIndex === -1 ? urlStr : urlStr.substring(0, queryIndex)
  const queryString = queryIndex === -1 ? '' : urlStr.substring(queryIndex + 1)
  const urlQuery = new URLQuery(queryString)
  // 转换 URLQuery 为 { key: value | value[] } 格式的对象（对齐 qs.parse 行为）
  const params: Record<string, string | string[]> = {}
  urlQuery.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      // 若已存在该键，转换为数组存储多个值
      const current = params[key] as string | string[]
      params[key] = isArr(current) ? [...current, value] : [current, value]
    } else {
      // 首次出现的键直接存储值
      params[key] = value
    }
  })
  return { path, params }
}

/**
 * 提取数字字符串中的负号
 */
export const extractSign = (integerPart: string) => {
  let sign = ''
  let pureInteger = integerPart
  if (integerPart.startsWith('-')) {
    sign = '-'
    pureInteger = integerPart.slice(1)
  }
  return { sign, pureInteger }
}

/**
 * 获取 UUID
 */
export const getUuid = () =>
  (Math.random() * 36).toString(36).slice(2) + new Date().getTime().toString()

/**
 * 生成唯一 ID，用于设置元素的 ID，以便获取
 */
export function getUniqId(prefix = '__uhv_'): string {
  return prefix + (~~(Math.random() * 10e8)).toString(36)
}
