import type { ComponentInternalInstance } from 'vue'

import { getLifeCycleTarget } from '@/util/sharedUtil.ts'

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 * @param target
 */
export function tryOnUnmounted(fn: Fn, target?: ComponentInternalInstance | null) {
  const instance = getLifeCycleTarget(target)
  if (instance) onUnmounted(fn, target)
}
