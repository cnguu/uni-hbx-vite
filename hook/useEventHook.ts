import type { EventCallback, EventParams } from '@/type/event.ts'

import { tryOnMounted, tryOnUnmounted } from '@/hook/useSharedHook.ts'

/**
 * 按组件生命周期自动 $on/$off 事件总线 hook
 * @param events
 */
export const useUniEventHook = <K extends keyof EventParams>(
  events: {
    name: K
    cb: EventCallback<K>
  }[] = [],
) => {
  tryOnMounted(() => {
    events.forEach((event) => {
      uniEvent.$on(event.name, event.cb)
    })
  })

  tryOnUnmounted(() => {
    events.forEach((event) => {
      uniEvent.$off(event.name, event.cb)
    })
  })
}
