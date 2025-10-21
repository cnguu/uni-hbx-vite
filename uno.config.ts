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
import { type Preset, type UserConfig } from '@unocss/core'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { type Theme } from '@unocss/preset-uno'
import presetWind3 from '@unocss/preset-wind3'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { presetApplet, presetRemRpx } from 'unocss-applet'
import { THEME_COLOR, themeColorPalette } from './util/styleUtil'

const presets: Preset[] = []
if (isMp) {
  presets.push(presetApplet(), presetRemRpx())
} else {
  presets.push(
    presetWind3(),
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

const convertThemeColors = () => {
  const converted: Record<string, string> = {}
  themeColorPalette.forEach((color, index) => {
    converted[`theme-${index + 1}`] = color
  })
  return converted
}

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
      ...convertThemeColors(),

      text: '#212b36',
      secondary: '#637381',
      aid: '#919eab',
      tip: '#c4cdd5',
      divider: '#f0f2f3',
      bg: '#f9fafb',
      'theme-bg': '#edf7ff',
      'mask-bg': 'rgba(0, 0, 0, 0.5)',
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
      exclude: ['node_modules', 'dist', 'uni_modules'],
    },
  },
  variants: [
    {
      match: (s) => {
        const attribute = 'custom-class'
        if (s.startsWith(`${attribute}:`)) {
          return {
            matcher: s.slice(attribute.length + 1),
            selector: (input) => `${input}[${attribute}~="${s.slice(attribute.length + 1)}"]`,
          }
        }
      },
    },
    {
      match: (s) => {
        const attribute = 'placeholder-class'
        if (s.startsWith(`${attribute}:`)) {
          return {
            matcher: s.slice(attribute.length + 1),
            selector: (input) => `${input}[${attribute}~="${s.slice(attribute.length + 1)}"]`,
          }
        }
      },
    },
  ],
})
