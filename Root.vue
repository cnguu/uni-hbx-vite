<script setup lang="ts">
defineOptions({
  name: 'Root',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view class="size-full">
    <ku-root-view />
  </view>
</template>
