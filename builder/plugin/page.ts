import UniPages from '@uni-helper/vite-plugin-uni-pages'

import { handlePageName, scanPageFilter, writePageConst } from '../util.ts'

export const UniHelperVitePluginUniPages = UniPages({
  dir: 'page',
  subPackages: ['page-a'],
  exclude: ['**/component/**/**.*'],
  routeBlockLang: 'jsonc',
  dts: 'dts/uni-pages.d.ts',
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
})
