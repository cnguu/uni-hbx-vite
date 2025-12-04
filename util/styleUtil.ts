/***********
 * 样式相关 *
 ***********/
import { generate } from '@ant-design/colors'
import { FastColor } from '@ant-design/fast-color'

// 主题色
export const THEME_COLOR = '#1890ff'
// 成功色
export const SUCCESS_COLOR = '#52c41a'
// 警告色
export const WARN_COLOR = '#faad14'
// 错误色
export const ERROR_COLOR = '#ff4d4f'

// 主题色板
export const themeColorPalette = generate(THEME_COLOR)
// 成功色板
export const successColorPalette = generate(SUCCESS_COLOR)
// 警告色板
export const warnColorPalette = generate(WARN_COLOR)
// 错误色板
export const errorColorPalette = generate(ERROR_COLOR)

// 标准文本色/一级文本色
export const TEXT_COLOR = '#000000e0'
// 二级文本色
export const SECONDARY_COLOR = '#000000a6'
// 三级文本色
export const TERTIARY_COLOR = '#999999'
// 禁用文本色
export const DISABLED_COLOR = '#00000040'
// 边框色
export const BORDER_COLOR = '#d9d9d9'
// 分割线色
export const DIVIDER_COLOR = '#0505050f'
// 布局背景色
export const BG_COLOR = '#f7f7f7'
// 遮罩背景色
export const MASK_COLOR = '#00000080'

/**
 * 获取增加透明度的颜色
 * @param color 需要透明的颜色
 * @param opacity 透明度 0~1
 */
export const getOpacityColor = (color: string, opacity: number = 1): string => {
  const fastColor = new FastColor(color)
  fastColor.a = opacity
  return fastColor.toRgbString()
}
