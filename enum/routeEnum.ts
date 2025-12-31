/**************
 * 路由相关枚举 *
 **************/
import type { RouteUrlEnum } from '@/util/routeUtil.ts'

// 路由 url 白名单枚举
export const RouteWhiteUrlEnum: RouteUrlEnum[] = [
  PageUrlConst.PAGE_LAUNCH_INDEX_PAGE,
  PageUrlConst.PAGE_LOGIN_INDEX_PAGE,
  PageUrlConst.PAGE_A_INDEX_PAGE,
] as const
