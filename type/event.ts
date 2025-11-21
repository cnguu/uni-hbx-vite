import { EventKeyEnum } from '@/enum/eventEnum.ts'

/** 事件传值类型 */
export type EventParams = {
  [EventKeyEnum.LOGIN_SUCCESS]: undefined
  [EventKeyEnum.LOGIN_EXPIRED]: undefined
  [EventKeyEnum.ACTION_SUCCESS]: UniApp.ShowToastOptions | undefined
}
export type EventCallback<K extends keyof EventParams> = (
  params: EventParams[K],
) => void | Promise<void>
