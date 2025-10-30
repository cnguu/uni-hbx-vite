import { fileURLToPath, URL } from 'node:url'
import Uni from '@uni-helper/plugin-uni'
import { isWeb } from '@uni-helper/uni-env'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import Optimization from '@uni-ku/bundle-optimizer'
import UniKuRoot from '@uni-ku/root'
import chalk from 'chalk'
import { consola } from 'consola'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import { compression } from 'vite-plugin-compression2'
import {
  beautifyJson,
  getServerProxy,
  handlePageName,
  scanPageFilter,
  writePageConst,
} from './builder/util'

export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build'
  const envDir = fileURLToPath(new URL('./env/', import.meta.url))
  const env = loadEnv(mode, envDir) as unknown as Env.ImportMeta
  const { VITE_APP_TITLE, VITE_SERVER_PORT, VITE_SERVER_PROXY } = env
  consola.box(chalk.greenBright.bold(VITE_APP_TITLE))
  consola.info('当前环境变量:', beautifyJson(env))
  const UNI_PLATFORM = process.env.UNI_PLATFORM || ''
  consola.info('当前终端:', chalk.green(UNI_PLATFORM))
  return defineConfig({
    envDir,
    plugins: [
      Components({
        resolvers: [
          {
            type: 'component',
            resolve: (name) => {
              if (name.match(/^.*Layout$/)) {
                return {
                  name,
                  from: `@/layout/${name}.vue`,
                }
              }
            },
          },
        ],
        dts: './type/components.d.ts',
      }),
      AutoImport({
        imports: [
          'vue',
          'uni-app',
          {
            unocss: ['uno'],
          },
          'pinia',
          {
            '@/constant/pageConst.ts': ['PageUrlConst'],
            '@/util/storageUtil.ts': ['uniStorage'],
          },
        ],
        dts: './type/auto-import.d.ts',
        dirs: ['./store/module'],
        ignore: [],
        eslintrc: { enabled: true },
        vueTemplate: true,
      }),
      UniPages({
        dir: 'page',
        subPackages: ['page-a'],
        exclude: ['**/component/**/**.*'],
        routeBlockLang: 'jsonc',
        dts: './type/uni-pages.d.ts',
        outDir: '',
        onAfterScanPages: (ctx) => {
          scanPageFilter(ctx, 'pages')
          scanPageFilter(ctx, 'subPages')
        },
        onAfterMergePageMetaData: (ctx) => {
          handlePageName(ctx, 'pageMetaData')
          handlePageName(ctx, 'subPageMetaData')
        },
        onAfterWriteFile(ctx) {
          writePageConst(ctx)
        },
      }),
      Optimization({
        enable: {
          optimization: true,
          'async-import': true,
          'async-component': true,
        },
        dts: {
          enable: true,
          base: './type',
          'async-import': {
            enable: true,
            base: './type',
            name: 'async-import.d.ts',
            path: './type/async-import.d.ts',
          },
          'async-component': {
            enable: true,
            base: './type',
            name: 'async-component.d.ts',
            path: './type/async-component.d.ts',
          },
        },
        logger: false,
      }),
      UniKuRoot({
        rootFileName: 'Root',
        excludePages: ['page/launch/index-page.vue'],
      }),
      UniManifest(),
      UnoCSS(),
      Uni(),
      isBuild && isWeb && compression(),
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
          drop_console: isBuild,
          drop_debugger: isBuild,
        },
      },
    },
  })
}
