import { VitePluginUniCdn as CnguuVitePluginUniCdn } from '@cnguu/vite-plugin-uni-cdn'

export const VitePluginUniCdn = (cdn: string) => {
  return CnguuVitePluginUniCdn({
    cdn,
  })
}
