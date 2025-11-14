/**************
 * 信息相关操作 *
 **************/
import { DISABLED_COLOR, THEME_COLOR } from '@/util/styleUtil.ts'

// uni.showToast 封装
export const showToast = (title: string, options: UniApp.ShowToastOptions = {}) => {
  const showToastOptions: UniApp.ShowToastOptions = {
    title,
    duration: 2300,
    mask: false,
    icon: 'none',
    ...options,
  }
  return uni.showToast(showToastOptions)
}

// uni.showModal 封装
export const showModal = (title: string, options: UniApp.ShowModalOptions = {}) => {
  const showToastOptions = {
    title,
    cancelColor: DISABLED_COLOR,
    confirmColor: THEME_COLOR,
    ...options,
  }
  return uni.showModal(showToastOptions)
}

// uni.showLoading 封装
export const showLoading = (title?: string, options: UniApp.ShowLoadingOptions = {}) => {
  const showLoadingOptions = {
    title: title || '加载中...',
    mask: true,
    ...options,
  }
  return uni.showLoading(showLoadingOptions)
}
