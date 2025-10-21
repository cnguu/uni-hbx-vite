import { fileURLToPath, URL } from 'node:url'
import Uni from '@uni-helper/plugin-uni'
import { isWeb } from '@uni-helper/uni-env'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniKuRoot from '@uni-ku/root'
import UnoCSS from '@unocss/vite'
import chalk from 'chalk'
import { consola } from 'consola'
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
  consola.box(chalk.greenBright.bold('UNI HBX VITE'))

  const isBuild = command === 'build'
  const envDir = fileURLToPath(new URL('./env/', import.meta.url))

  const UNI_PLATFORM = process.env.UNI_PLATFORM || ''
  consola.info('当前终端:', chalk.green(UNI_PLATFORM))

  const env = loadEnv(mode, envDir) as unknown as Env.ImportMeta
  const { VITE_SERVER_PORT, VITE_SERVER_PROXY } = env
  consola.info('当前环境变量:', beautifyJson(env))

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
        subPackages: [],
        exclude: ['**/components/**/**.*'],
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
      UniKuRoot({
        rootFileName: 'Root',
        excludePages: ['page/launch/index.page.vue'],
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
