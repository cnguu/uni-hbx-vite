import type { Variant } from 'unocss'

import {
  blue,
  cyan,
  geekblue,
  gold,
  gray,
  green,
  grey,
  lime,
  magenta,
  orange,
  purple,
  red,
  volcano,
  yellow,
} from '@ant-design/colors'
import { isMp } from '@uni-helper/uni-env'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'

import {
  BG_COLOR,
  BORDER_COLOR,
  DISABLED_COLOR,
  DIVIDER_COLOR,
  ERROR_COLOR,
  MASK_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  TERTIARY_COLOR,
  TEXT_COLOR,
  THEME_COLOR,
  WARN_COLOR,
  errorColorPalette,
  successColorPalette,
  themeColorPalette,
  warnColorPalette,
} from './util/styleUtil'

// 转换 Ant Design 颜色数组为 UnoCSS 所需的对象结构
const convertAntdColors = (colors: Record<string, string[]>) => {
  const converted: Record<string, Record<string, string>> = {}
  for (const [colorName, shades] of Object.entries(colors)) {
    converted[colorName] = shades.reduce(
      (acc, shade, index) => {
        acc[`${index + 1}`] = shade
        return acc
      },
      {} as Record<string, string>,
    )
  }
  return converted
}

// 转换色板为 UnoCSS 所需要的对象结构
const convertThemeColors = (key: string, palette: string[]) => {
  const converted: Record<string, string> = {}
  palette.forEach((color, index) => {
    converted[`${key}-${index + 1}`] = color
  })
  return converted
}

// attribute 变体生成函数
const createAttributeVariant = (attribute: string): Variant => ({
  match: (s: string) => {
    if (s.startsWith(`${attribute}:`)) {
      const matcher = s.slice(attribute.length + 1)
      return {
        matcher,
        selector: (input: string) => `${input}[${attribute}~="${matcher}"]`,
      }
    }
  },
})

export default defineConfig({
  shortcuts: [],
  rules: [
    [
      /^safe-area-inset-(top|right|bottom|left)$/,
      ([, d]) => {
        return [
          [`padding-${d}`, 0],
          [`padding-${d}`, `constant(safe-area-inset-${d})`],
          [`padding-${d}`, `env(safe-area-inset-${d})`],
        ]
      },
    ],
  ],
  theme: {
    colors: {
      ...convertAntdColors({
        blue,
        cyan,
        geekblue,
        gold,
        gray,
        green,
        grey,
        lime,
        magenta,
        orange,
        purple,
        red,
        volcano,
        yellow,
      }),

      theme: THEME_COLOR,
      ...convertThemeColors('theme', themeColorPalette),
      success: SUCCESS_COLOR,
      ...convertThemeColors('success', successColorPalette),
      warn: WARN_COLOR,
      ...convertThemeColors('warn', warnColorPalette),
      error: ERROR_COLOR,
      ...convertThemeColors('warn', errorColorPalette),

      text: TEXT_COLOR,
      secondary: SECONDARY_COLOR,
      tertiary: TERTIARY_COLOR,
      disabled: DISABLED_COLOR,
      border: BORDER_COLOR,
      divider: DIVIDER_COLOR,
      bg: BG_COLOR,
      mask: MASK_COLOR,
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      heavy: 900,
      black: 950,
    },
  },
  presets: [
    presetUni({
      uno: true,
      remRpx: isMp,
      attributify: false,
    }),
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', 'uni_modules', 'unpackage'],
    },
  },
  variants: [createAttributeVariant('custom-class'), createAttributeVariant('placeholder-class')],
})
