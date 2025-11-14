<script setup lang="ts">
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
  </blank-layout>
</template>
