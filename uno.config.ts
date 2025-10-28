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
import { type Preset, type UserConfig, type Variant } from '@unocss/core'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { type Theme } from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { presetApplet, presetRemRpx } from 'unocss-applet'
import {
  ERROR_COLOR,
  errorColorPalette,
  SUCCESS_COLOR,
  successColorPalette,
  THEME_COLOR,
  themeColorPalette,
  WARN_COLOR,
  warnColorPalette,
} from './util/styleUtil'

const presets: Preset[] = []
if (isMp) {
  presets.push(presetApplet(), presetRemRpx())
} else {
  presets.push(
    presetApplet(),
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  )
}

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

function defineConfig<T extends object = Theme>(config: UserConfig<T>): UserConfig<T> {
  return config
}
export default defineConfig({
  shortcuts: [],
  rules: [],
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

      text: '#000000e0',
      secondary: '#000000a6',
      tertiary: '#999999',
      disabled: '#00000040',
      border: '#d9d9d9',
      divider: '#0505050f',
      bg: '#f7f7f7',
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
  presets: [...presets],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', 'uni_modules', 'unpackage'],
    },
  },
  variants: [createAttributeVariant('custom-class'), createAttributeVariant('placeholder-class')],
})
