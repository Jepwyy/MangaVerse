<script setup lang="ts">
import { useRoute } from 'vue-router'
import axios from '../api/api'
import { useQuery } from 'vue-query'
const route = useRoute()

const { data, isLoading, error } = useQuery(['info'], async () => {
  const res = await axios.get(
    `meta/anilist-manga/read?chapterId=${route.params.title}/${route.params.lang}/${route.params.chap}&provider=mangareader`
  )
  return res.data
})
</script>
<template>
  <div>
    <h1>This is an read page</h1>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
  <img
    src="https://c-1.mreadercdn.com/_v2/1/0dcb8f9eaacfd940603bd75c7c152919c72e45517dcfb1087df215e3be94206cfdf45f64815888ea0749af4c0ae5636fabea0abab8c2e938ab3ad7367e9bfa52/3b/b7/3bb700a5dffe55a356dcb99d5c758f09/3bb700a5dffe55a356dcb99d5c758f09_1900.jpeg?t=515363393022bbd440b0b7d9918f291a&ttl=1908547557"
    alt=""
  />
</template>
