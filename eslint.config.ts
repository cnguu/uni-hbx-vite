import { type Config } from '@eslint/config-helpers'
import unoCss from '@unocss/eslint-config/flat'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfigWithVueTs(
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/uni_modules/**',
    '**/dts/**',
    'manifest.json',
    'pages.json',
    'eslintrc-auto-import.json',
  ]),
  unoCss as unknown as Config,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        dd: 'readonly', // https://open.dingtalk.com/
        jd: 'readonly', // https://mp.jd.com/
        ks: 'readonly', // https://mp.kuaishou.com/
        my: 'readonly', // https://opendocs.alipay.com/mini
        plus: 'readonly', // http://www.html5plus.org/doc/h5p.html
        qh: 'readonly', // https://mp.360.cn/
        qq: 'readonly', // https://q.qq.com/
        swan: 'readonly', // https://smartprogram.baidu.com/docs
        tt: 'readonly', // https://developer.open-douyin.com/ https://open.feishu.cn/
        uni: 'readonly', // https://uniapp.dcloud.io/
        uniCloud: 'readonly', // https://uniapp.dcloud.io
        weex: 'readonly', // https://weex.apache.org/
        wx: 'readonly', // https://developers.weixin.qq.com/miniprogram/dev/framework/
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      sourceType: 'module',
    },
  },
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    files: ['**/*.{js,mjs.cjs}'],
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      'unocss/order-attributify': 'off',
      'unocss/order': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
    },
  },
)
