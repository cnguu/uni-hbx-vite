/***********
 * 数字相关 *
 **********/

/**
 * 为整数部分添加千分位分隔符
 */
export const formatIntegerWithGrouping = (integer: string, useGrouping: boolean = true): string => {
  if (!useGrouping) return integer
  // 正则匹配：从右向左每三位数字添加一个逗号
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
