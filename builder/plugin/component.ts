import Components from '@uni-helper/vite-plugin-uni-components'

export const UniHelperVitePluginUniComponents = Components({
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
  dts: 'dts/components.d.ts',
})
