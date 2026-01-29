import type { ComponentInternalInstance } from 'vue'

import { getLifeCycleTarget } from '@/util/sharedUtil.ts'

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 * @param target
 */
export function tryOnMounted(fn: Fn, sync = true, target?: ComponentInternalInstance | null) {
  const instance = getLifeCycleTarget(target)
  if (instance) {
    onMounted(fn, target)
  } else if (sync) {
    fn()
  } else {
    nextTick(fn)
  }
}

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
