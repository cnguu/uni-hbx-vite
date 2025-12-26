import type { UniEvent } from '@/type/event.ts'

/**
 * 类型安全的事件总线
 */
export const uniEvent: UniEvent = {
  $on: uni.$on,
  $once: uni.$once,
  $emit: uni.$emit,
  $off: uni.$off,
}
