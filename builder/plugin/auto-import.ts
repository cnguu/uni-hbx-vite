import AutoImport from 'unplugin-auto-import/vite'

export const UnpluginAutoImport = AutoImport({
  imports: [
    'vue',
    'uni-app',
    {
      unocss: ['uno'],
    },
    'pinia',
    {
      '@/constant/pageConst.ts': ['PageUrlConst'],
      '@/util/eventUtil.ts': ['uniEvent'],
      '@/util/sharedUtil.ts': ['getCurrentPage', 'sleep'],
      '@/util/storageUtil.ts': ['uniStorage'],
    },
  ],
  dts: 'dts/auto-import.d.ts',
  dirs: ['store/module'],
  ignore: [],
  eslintrc: { enabled: true },
  vueTemplate: true,
})
