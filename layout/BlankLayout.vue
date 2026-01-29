<script setup lang="ts">
defineOptions({
  // 空白布局
  name: 'BlankLayout',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view class="size-full">
    <slot />
  </view>
</template>
