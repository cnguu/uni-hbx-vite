/**
 * 路由拦截
 */
import type { RouteUrlEnum } from '@/util/routeUtil.ts'

import { RouteWhiteUrlEnum } from '@/enum/routeEnum.ts'
import { showToast } from '@/util/messageUtil.ts'
import { navigateBack, reLaunch } from '@/util/routeUtil.ts'
import { parseUrl } from '@/util/stringUtil.ts'

export const interceptorOptions: UniApp.InterceptorOptions = {
  invoke({ url }) {
    const originalUrl = url as RouteUrlEnum & '/'
    console.log(`【APP】interceptor route original：${originalUrl}`)

    // #ifdef WEB
    if (originalUrl === '/') {
      navigateBack()
      return false
    }
    // #endif

    const appStore = useAppStore()

    const userStore = useUserStore()

    const parsedUrl = parseUrl(originalUrl).path as RouteUrlEnum
    console.log(`【APP】interceptor route parsed：${parsedUrl}`)

    if (parsedUrl === PageUrlConst.PAGE_LOGIN_INDEX_PAGE) {
      if (userStore.token) {
        reLaunch(PageUrlConst.PAGE_HOME_INDEX_PAGE)
        return false
      }
    }

    if (!RouteWhiteUrlEnum.includes(parsedUrl)) {
      if (!userStore.token) {
        showToast('还未登录，即将跳转...')
        appStore.reset()
        setTimeout(() => {
          reLaunch(PageUrlConst.PAGE_LOGIN_INDEX_PAGE)
        }, 1300)
        return false
      }
    }
  },
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', interceptorOptions)
    uni.addInterceptor('reLaunch', interceptorOptions)
    uni.addInterceptor('redirectTo', interceptorOptions)
    uni.addInterceptor('switchTab', interceptorOptions)
  },
}
