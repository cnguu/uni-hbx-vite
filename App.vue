<script setup lang="ts">
import { interceptorOptions } from '@/interceptor/route.ts'

onLaunch(() => {
  console.log(`【APP】onLaunch`)

  // #ifdef APP
  plus.device.setWakelock(true)
  // #endif

  const currentPage = getCurrentPage()
  const currentRoute = currentPage ? `/${currentPage.route}` : void 0
  interceptorOptions.invoke?.({
    url: currentRoute,
  })
})

onShow(() => {
  console.log(`【APP】onShow`)
})

onHide(() => {
  console.log(`【APP】onHide`)
})
</script>

<style lang="scss">
@import '@/style/global.scss';
@import '@/style/font/uhv.scss';
</style>
