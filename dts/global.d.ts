export {}

declare global {
  /**
   * Void function
   */
  type Fn<T = void> = () => T

  /**
   * Any function
   */
  type AnyFn = (...args: any[]) => any

  /**
   * Generic function
   */
  type GenericFn<Args extends any[] = [], R = void> = (...args: Args) => R
}
