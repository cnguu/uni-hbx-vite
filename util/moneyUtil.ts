/***********
 * 金钱相关 *
 **********/
import { isArr, isNumber } from '@/util/isUtil.ts'
import { mathUtil } from '@/util/mathUtil.ts'
import { formatIntegerWithGrouping } from '@/util/numberUtil.ts'
import { extractSign } from '@/util/stringUtil.ts'

// 自定义选项类型，明确小数位数为必填数字（覆盖原接口的可选性）
type FormattedNumberOptions = Omit<
  Intl.NumberFormatOptions,
  'minimumFractionDigits' | 'maximumFractionDigits'
> & {
  minimumFractionDigits: number
  maximumFractionDigits: number
}

/**
 * 合并选项并设置默认值
 */
const mergeOptions = (options: Intl.NumberFormatOptions): FormattedNumberOptions => {
  const defaultOptions: FormattedNumberOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }
  const merged = { ...defaultOptions, ...options } as FormattedNumberOptions

  // 确保小数位数为有效范围
  merged.minimumFractionDigits = Math.max(0, merged.minimumFractionDigits ?? 0)
  merged.maximumFractionDigits = Math.max(
    merged.minimumFractionDigits,
    merged.maximumFractionDigits ?? merged.minimumFractionDigits,
  )

  return merged
}
/**
 * 格式化小数部分（补全或截断）
 */
const formatDecimal = (
  decimal: string,
  options: Pick<FormattedNumberOptions, 'minimumFractionDigits' | 'maximumFractionDigits'>,
): string => {
  // 截断到最大小数位
  let formatted = decimal.slice(0, options.maximumFractionDigits)
  // 补全到最小小数位
  if (formatted.length < options.minimumFractionDigits) {
    formatted = formatted.padEnd(options.minimumFractionDigits, '0')
  }
  return formatted
}

/**
 * 获取货币符号（基于货币代码和语言环境）
 */
const getCurrencySymbol = (currency?: string, locales: string | string[] = 'zh-CN'): string => {
  const primaryLocale = (isArr(locales) ? locales[0] : locales) ?? 'zh-CN'
  if (currency === 'CNY' || primaryLocale.startsWith('zh')) {
    return '￥'
  }
  if (currency === 'USD' || primaryLocale.startsWith('en')) {
    return '$'
  }
  return currency || '$'
}

/**
 * 货币格式化工具
 * 简单模拟 Intl.NumberFormat，不支持所有选项
 */
export const moneyFormatUtil = (
  // 金额
  amount: number,
  // 格式化选项
  options: Intl.NumberFormatOptions = {},
  // 语言环境（仅用于确定货币符号）
  locales: string | string[] = 'zh-CN',
): string => {
  if (!isNumber(amount) || isNaN(amount) || !isFinite(amount)) {
    return ''
  }

  // 合并选项并处理默认值
  const mergedOptions = mergeOptions(options)

  // 处理百分比转换
  let value = mergedOptions.style === 'percent' ? amount * 100 : amount
  // 四舍五入到指定小数位（解决浮点数精度问题）
  value = mathUtil.round(value, mergedOptions.maximumFractionDigits)

  // 分割整数和小数部分
  const [integerPart = '', decimalPart = ''] = value.toString().split('.')

  // 处理负号（单独提取，确保符号位置正确）
  const { sign, pureInteger } = extractSign(integerPart)

  // 处理千分位（根据 useGrouping 选项）
  const formattedInteger = formatIntegerWithGrouping(pureInteger, mergedOptions.useGrouping)

  // 处理小数部分（补全或截断到指定长度）
  const formattedDecimal = formatDecimal(decimalPart, mergedOptions)

  // 组装整数和小数部分
  let result = sign + formattedInteger
  if (mergedOptions.minimumFractionDigits > 0) {
    result += `.${formattedDecimal}`
  }

  // 添加货币符号或百分号
  if (mergedOptions.style === 'currency') {
    const symbol = getCurrencySymbol(mergedOptions.currency, locales)
    result = sign ? `${sign}${symbol}${formattedInteger}` : `${symbol}${result}`
  } else if (mergedOptions.style === 'percent') {
    result += '%'
  }

  return result
}
