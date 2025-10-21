import { enumUtil } from '@/util/enumUtil.ts'

/** 时区枚举 */
export const TimezoneEnum = enumUtil({
  ASIA_SHANGHAI: {
    value: 'Asia/Shanghai',
    label: '上海',
  },
} as const)
