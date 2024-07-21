<script setup lang="ts">
import { ref } from 'vue'
import axios from '../api/api'
import { useMutation } from 'vue-query'

const searchQuery = ref('')

// Define the mutation
const {
  mutate,
  data: mangaData,
  isLoading,
  error
} = useMutation(async (query: string) => {
  const response = await axios.get(`meta/anilist-manga/${query}`)
  return response.data
})

// Submit handler
const onSubmit = () => {
  if (searchQuery.value) {
    mutate(searchQuery.value)
  }
}
</script>
<template>
  <div>
    <h1>This is a search page</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="searchQuery" type="text" placeholder="Search manga" />
      <button type="submit">Search</button>
    </form>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <pre>{{ mangaData?.results }}</pre>
    </div>
  </div>
</template>
