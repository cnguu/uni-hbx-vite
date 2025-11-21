/*************
 * 路由相关操作 *
 *************/
import { isPlainObject } from '@/util/isUtil.ts'
import { URLQuery } from '@/util/stringUtil.ts'

export type RouteUrlEnum = (typeof PageUrlConst)[keyof typeof PageUrlConst] | '/'
export type TabRouteUrlEnum = SwitchTabOptions['url'] | ''

// 路由传参
export interface RouteToOptions {
  // 参数
  params?: Record<string, any> | string
  // 序列化，启用后所有参数都会在 query 字段中
  serialization?: boolean
  // 原始参数，即不对参数处理
  original?: boolean
}

// 页面传参反序列化
export const queryDeserialize = ({ query }: { query?: string } = {}): Record<string, any> => {
  if (!query) {
    return {}
  }
  return JSON.parse(decodeURIComponent(query))
}

// 获取带参数的 url
export const getQueryUrl = (url: string, options: RouteToOptions = {}): string => {
  if (!url) return ''
  const { params, serialization = false, original = false } = options
  let query = ''
  if (original) {
    query = params as string
  } else if (isPlainObject(params) && Object.keys(params as Record<string, any>).length > 0) {
    query = serialization
      ? `query=${encodeURIComponent(JSON.stringify(params))}`
      : new URLQuery(params as Record<string, string>).toString()
  }
  if (!query) return url
  return `${url}?${query}`
}

// uni.navigateTo 封装
export const routeTo = (
  url: RouteUrlEnum,
  options: RouteToOptions = {},
): Promise<UniApp.NavigateToSuccessOptions> | void => {
  if (!url) return
  return uni.navigateTo({ url: getQueryUrl(url, options) })
}

// uni.redirectTo 封装
export const redirectTo = (
  url: RouteUrlEnum,
  options: RouteToOptions = {},
): Promise<UniApp.NavigateToSuccessOptions> | void => {
  if (!url) return
  return uni.redirectTo({ url: getQueryUrl(url, options) })
}

// uni.switchTab 封装
export const switchTab = (
  url: TabRouteUrlEnum,
): Promise<UniApp.NavigateToSuccessOptions> | void => {
  const appStore = useAppStore()
  appStore.setLatestTabUrl(url)
  if (!url) return
  return uni.switchTab({ url })
}

// uni.reLaunch 封装
export const reLaunch = (
  url: RouteUrlEnum,
  options: RouteToOptions = {},
): Promise<UniApp.NavigateToSuccessOptions> | void => {
  if (!url) return
  return uni.reLaunch({ url: getQueryUrl(url, options) })
}

// uni.navigateBack 封装
export const navigateBack = (delta = 0): Promise<UniApp.NavigateToSuccessOptions> | void => {
  // #ifdef WEB
  if (delta) {
    window.history.go(-delta)
  } else {
    window.history.back()
  }
  // #endif

  // #ifndef WEB
  return uni.navigateBack({ delta: delta || 1 })
  // #endif
}
