<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
  },
})

onLoad(() => {
  uni.hideTabBar()
})
</script>

<template>
  <blank-layout>
    <view>登录</view>
  </blank-layout>
</template>
