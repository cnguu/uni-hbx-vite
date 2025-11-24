<script setup lang="ts">
import IndexTest from '@/page/home/component/IndexTest.vue'

definePage({
  style: {
    navigationBarTitleText: '首页',
  },
})

onLoad(() => {
  uni.hideTabBar()
})
</script>

<template>
  <blank-layout>
    <view>首页</view>
    <index-test />
  </blank-layout>
</template>
