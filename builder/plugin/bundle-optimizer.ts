import Optimization from '@uni-ku/bundle-optimizer'

export const UniKuBundleOptimizer = Optimization({
  enable: {
    optimization: true,
    'async-import': true,
    'async-component': true,
  },
  logger: false,
})
