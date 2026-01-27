<script setup lang="ts">
import { routeTo } from '@/util/routeUtil.ts'

definePage({
  style: {
    navigationBarTitleText: '登录',
  },
})

const toPageA = () => {
  routeTo(PageUrlConst.PAGE_A_INDEX_PAGE)
}

onLoad(() => {
  uni.hideTabBar()
})
</script>

<template>
  <blank-layout>
    <view style="height: 400px" />
    <view class="text-64rpx text-purple">登录</view>
    <view @click="toPageA">分包</view>
  </blank-layout>
</template>
