import type { EventCallback, EventParams, UniEvent } from '@/type/event.ts'

/**
 * 类型安全的事件总线
 */
export const uniEvent: UniEvent = {
  $on: <K extends keyof EventParams>(eventName: K, callback: EventCallback<K>) => {
    console.log('uni.$on', eventName, callback)
    uni.$on(eventName, callback)
  },
  $once: <K extends keyof EventParams>(eventName: K, callback: EventCallback<K>) => {
    console.log('uni.$once', eventName, callback)
    uni.$once(eventName, callback)
  },
  $emit: <K extends keyof EventParams>(eventName: K, params?: EventParams[K]) => {
    console.log('uni.$emit', eventName, params)
    uni.$emit(eventName, params)
  },
  $off: <K extends keyof EventParams>(eventName?: K | K[], callback?: EventCallback<K>) => {
    console.log('uni.$off', eventName, callback)
    uni.$off(eventName, callback)
  },
}
