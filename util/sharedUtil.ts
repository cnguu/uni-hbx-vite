/***********
 * 公共工具 *
 ***********/
import type { ComponentInternalInstance } from 'vue'

export function getLifeCycleTarget(target?: ComponentInternalInstance | null) {
  return target || getCurrentInstance()
}
