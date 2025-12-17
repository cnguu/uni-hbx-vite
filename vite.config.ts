import type { ConfigEnv } from 'vite'

import { URL, fileURLToPath } from 'node:url'

import { isWeb } from '@uni-helper/uni-env'
import chalk from 'chalk'
import { consola } from 'consola'
import { defineConfig, loadEnv } from 'vite'

import {
  UniHelperPluginUni,
  UniHelperVitePluginUniComponents,
  UniHelperVitePluginUniManifest,
  UniHelperVitePluginUniPages,
  UniKuBundleOptimizer,
  UniKuRoot,
  UnoCSS,
  UnpluginAutoImport,
  VitePluginCompression,
} from './builder/plugin'
import { beautifyJson, getServerProxy } from './builder/util'

export default ({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'
  const envDir = fileURLToPath(new URL('./env/', import.meta.url))
  const env = loadEnv(mode, envDir) as unknown as ImportMetaEnv
  const { VITE_APP_TITLE, VITE_SERVER_PORT, VITE_SERVER_PROXY } = env
  consola.box(chalk.greenBright.bold(VITE_APP_TITLE))
  consola.info('当前环境变量:', beautifyJson(env))
  const UNI_PLATFORM = process.env.UNI_PLATFORM || ''
  consola.info('当前终端:', chalk.green(UNI_PLATFORM))
  return defineConfig({
    envDir,
    plugins: [
      UniHelperVitePluginUniComponents,
      UnpluginAutoImport,
      UniHelperVitePluginUniPages,
      UniKuBundleOptimizer,
      UniKuRoot,
      UniHelperVitePluginUniManifest,
      UnoCSS,
      UniHelperPluginUni,
      isProd && isWeb && VitePluginCompression,
    ],
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: fileURLToPath(new URL('./', import.meta.url)),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '~@/style/variable.scss';`,
        },
      },
    },
    server: {
      host: true,
      port: Number(VITE_SERVER_PORT),
      strictPort: false,
      proxy: VITE_SERVER_PROXY ? getServerProxy(JSON.parse(VITE_SERVER_PROXY)) : void 0,
      watch: {
        ignored: ['**/dist/**', '**/unpackage/**'],
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
    },
  })
}
