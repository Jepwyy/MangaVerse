<script setup lang="ts">
import { ref } from 'vue'
import axios from '../api/api'
import { useMutation } from 'vue-query'
import { RouterLink } from 'vue-router'
import LoaderBar from '@/components/LoaderBar.vue'

const searchQuery = ref('')

const {
  mutate,
  data: mangaData,
  isLoading,
  error
} = useMutation(async (query: string) => {
  const response = await axios.get(`meta/anilist-manga/${query}`)
  return response.data
})

const onSubmit = () => {
  if (searchQuery.value) {
    mutate(searchQuery.value)
  }
}
</script>
<template>
  <div>
    <div class="flex justify-center items-center h-[20rem]">
      <div class="flex flex-col gap-8 w-full">
        <img
          src="../assets/logo.png"
          alt="logo"
          class="h-[5.5rem] self-center shadow-lg shadow-[#1a1a1a] p-2"
        />
        <form class="flex items-center justify-center px-4" @submit.prevent="onSubmit">
          <input
            v-model="searchQuery"
            type="text"
            class="bg-[#1C1C1C] text-xl px-6 py-2 text-[#525252] placeholder:text-[#525252] w-full max-w-md rounded-l-lg focus-visible:outline-0"
            placeholder="Search manga..."
          />
          <button type="submit" class="bg-primary text-white py-[9px] px-4 rounded-r-lg">
            <v-icon name="io-search-sharp" scale="1.3" />
          </button>
        </form>
      </div>
    </div>
    <LoaderBar v-if="isLoading" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div
      v-else
      class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-[.81rem] lg:px-[20rem] md:px-[5rem] px-4"
    >
      <RouterLink v-for="item in mangaData?.results" :key="item.id" :to="`/info/${item.id}`">
        <div className="w-[100%]  rounded-md ">
          <img className=" aspect-[2/3]" :src="item.image" />
          <div className="bg-[#242424] flex items-center justify-between p-1  leading-none">
            <div
              className="flex items-center text-[#fff] gap-[.10rem] md:text-[.8rem] text-[.7rem]"
            >
              <span className="flex items-center bg-[#03C988] py-[.15rem] px-[.25rem] rounded">
                <v-icon name="si-bookstack" /> {{ item.totalChapters }}
              </span>
            </div>
            <div className="text-[#aaaaaa] md:text-[.9rem] text-[.7rem] font-medium">
              {{ item.status }}
            </div>
          </div>
          <div className="md:text-[1rem] text-[.9rem] font-normal leading-none text-[#aaaaaa]">
            <p className="line-clamp-2">
              {{ item.title.english == null ? item.title.userPreferred : item.title.userPreferred }}
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
