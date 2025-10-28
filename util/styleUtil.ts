/***********
 * 样式相关 *
 ***********/
import { generate } from '@ant-design/colors'

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
