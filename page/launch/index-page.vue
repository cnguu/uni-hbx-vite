<script setup lang="ts">
import { CacheKeyEnum } from '@/enum/cacheEnum'
import { reLaunch, switchTab } from '@/util/routeUtil'

definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '启动',
  },
})

onLoad(() => {
  uni.hideTabBar()
})

onMounted(() => {
  setTimeout(() => {
    const token = uniStorage.get(CacheKeyEnum.TOKEN)
    if (token) {
      switchTab(PageUrlConst.PAGE_HOME_INDEX_PAGE)
    } else {
      reLaunch(PageUrlConst.PAGE_LOGIN_INDEX_PAGE)
    }
  }, 900)
})
</script>

<template>
  <blank-layout>
    <view>启动</view>
  </blank-layout>
</template>
