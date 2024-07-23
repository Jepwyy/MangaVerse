<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="h-[100vh] flex flex-col">
    <NavBar />
    <div class="bg-[#101112] h-full overflow-y-auto pb-[5rem]"><RouterView /></div>
  </div>
</template>
