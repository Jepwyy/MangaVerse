<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from '../api/api'
import { useQuery } from 'vue-query'
const route = useRoute()
const { data, isLoading, error } = useQuery(['info'], async () => {
  const res = await axios.get(`meta/anilist-manga/info/${route.params.id}?provider=mangareader`)
  return res.data
})
</script>
<template>
  <div>
    <h1>This is an info page</h1>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
