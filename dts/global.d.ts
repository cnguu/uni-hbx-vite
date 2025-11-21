import type { EventCallback, EventParams } from '@/type/event.ts'

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

  interface Uni {
    $on<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>): void
    $once<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>): void
    $emit<K extends keyof EventParams>(eventName: K, params: EventParams[K]): void
    $off(): void
    $off<K extends keyof EventParams>(eventName: K): void
    $off<K extends keyof EventParams>(eventName: K[]): void
    $off<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>): void
  }
}
