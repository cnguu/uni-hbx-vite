import { createSSRApp } from 'vue'

import { routeInterceptor } from '@/composable/route.ts'
import { store } from '@/store'

import App from './App.vue'

import 'virtual:uno.css'

setActivePinia(store)

export const createApp = () => {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  return {
    app,
  }
}
