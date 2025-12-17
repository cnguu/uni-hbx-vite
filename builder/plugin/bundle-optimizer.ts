import Optimization from '@uni-ku/bundle-optimizer'

export const UniKuBundleOptimizer = Optimization({
  enable: {
    optimization: true,
    'async-import': true,
    'async-component': true,
  },
  dts: {
    enable: true,
    base: 'dts',
    'async-import': {
      enable: true,
      base: 'dts',
      name: 'async-import.d.ts',
      path: 'dts/async-import.d.ts',
    },
    'async-component': {
      enable: true,
      base: 'dts',
      name: 'async-component.d.ts',
      path: 'dts/async-component.d.ts',
    },
  },
  logger: false,
})
