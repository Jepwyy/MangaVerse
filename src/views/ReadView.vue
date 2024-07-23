<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/api'
import { useQuery } from 'vue-query'
import LoaderBar from '@/components/LoaderBar.vue'
import { computed, ref, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const { data: mangaInfo, isLoading: infoLoad } = useQuery(['info', route.params.id], async () => {
  const res = await axios.get(`meta/anilist-manga/info/${route.params.id}?provider=mangareader`)
  return res.data
})
const {
  data: mangeChapters,
  isLoading,
  error
} = useQuery(['chapters', route.params.lang, route.params.chap], async () => {
  const res = await axios.get(
    `meta/anilist-manga/read?chapterId=${route.params.title}/${route.params.lang}/${route.params.chap}&provider=mangareader`
  )
  return res.data
})

const currentIndex = ref(0)
const totalChapters = ref(0)
const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < totalChapters.value - 1)

watch(mangaInfo, (newInfo) => {
  currentIndex.value = newInfo?.chapters.findIndex(
    (chapter: any) =>
      chapter.id == `${route.params.title}/${route.params.lang}/${route.params.chap}`
  )

  totalChapters.value = newInfo.chapters.length
})
const prevChapter = async (chapter: string) => {
  await router.push(`/read/${route.params.id}/${chapter}`)
  router.go(0)
}

const nextChapter = async (chapter: string) => {
  await router.push(`/read/${route.params.id}/${chapter}`)
  router.go(0)
}
</script>
<template>
  <div>
    <h1 class="m-4 text-gray-400 font-bold text-lg capitalize">{{ route.params.chap }}</h1>
  </div>
  <div v-if="isLoading | infoLoad"><LoaderBar /></div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else class="flex flex-col justify-center">
    <img
      v-for="manga in mangeChapters"
      :src="manga.img"
      :alt="manga.page"
      :key="manga.page"
      class="max-w-screen-sm w-full self-center"
    />
  </div>
  <div class="flex justify-center items-center mt-8 gap-2">
    <button
      :disabled="!hasPrev"
      @click="prevChapter(mangaInfo.chapters[currentIndex - 1].id)"
      class="px-4 h-10 rounded-md text-gray-500 bg-[#181919] hover:bg-[#1e1f1f] font-bold capitalize disabled:cursor-not-allowed disabled:bg-[#121212]"
    >
      prev
    </button>
    <h1 class="m-4 text-gray-400 font-bold text-lg capitalize">{{ route.params.chap }}</h1>
    <button
      :disabled="!hasNext"
      @click="nextChapter(mangaInfo.chapters[currentIndex + 1].id)"
      class="px-4 h-10 rounded-md text-gray-500 bg-[#181919] hover:bg-[#1e1f1f] font-bold capitalize disabled:cursor-not-allowed disabled:bg-[#121212]"
    >
      next
    </button>
  </div>
</template>
