<script setup lang="ts">
defineProps<{
  height?: string
}>()
</script>
<template>
  <div class="w-full flex justify-center">
    <img src="../assets/loader.svg" alt="loader" :class="height ? height : 'h-[2rem]'" />
  </div>
</template>
