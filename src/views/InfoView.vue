<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import axios from '../api/api'
import { useQuery } from 'vue-query'
import LoaderBar from '@/components/LoaderBar.vue'
const route = useRoute()
const {
  data: mangaInfo,
  isLoading,
  error
} = useQuery(['info'], async () => {
  const res = await axios.get(`meta/anilist-manga/info/${route.params.id}?provider=mangareader`)
  return res.data
})
</script>
<template>
  <div v-if="isLoading"><LoaderBar /></div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else className="text-white pb-20">
    <img
      className=" w-full h-[10rem] lg:h-[15rem] brightness-50"
      :src="
        mangaInfo?.cover == null
          ? 'https://i.pinimg.com/originals/c0/c4/f0/c0c4f06b14625c8fb9c4cdcbaa58c6d8.png'
          : mangaInfo?.cover
      "
    />
    <div className="lg:px-24 px-6 flex justify-between mt-4 gap-5">
      <div>
        <div className="lg:text-2xl text-lg font-medium text-white">
          {{ mangaInfo?.title.english }}
        </div>
        <div className="lg:text-base text-sm font-normal text-[#aaaaaa]">
          {{ mangaInfo?.title.native }}
        </div>
      </div>
      <div>
        <Link
          className="py-2 px-2 rounded-md text-sm font-medium uppercase flex items-center justify-center bg-[#ff0000]"
          :to="`https://www.youtube.com/watch?v=${mangaInfo?.trailer?.id}`"
        >
          Trailer
        </Link>
      </div>
    </div>
    <div className="lg:px-24 px-6 flex flex-col lg:flex-row lg:mt-3 gap-5 lg:gap-0">
      <div className=" lg:w-[20%] w-full lg:pr-10 lg:px-0 px-16">
        <div className="lg:w-[70%] flex flex-col gap-3">
          <img className="w-[100%] mt-[2.7rem]" :src="mangaInfo?.image" />
          <RouterLink
            :to="`/read/${route.params.id}/${mangaInfo.chapters[0].id}`"
            className="w-full border border-[#07bf67] text-[#07bf67] hover:text-white hover:bg-[#07bf67] py-2 rounded-md text-sm font-medium uppercase flex items-center justify-center"
          >
            Start Reading
          </RouterLink>
          <div className="flex gap-3 justify-center flex-wrap">
            <span
              v-for="(genre, index) in mangaInfo.genres"
              :key="index"
              className="border border-[#aaa] px-2 rounded-full text-[#aaa] font-light text-sm"
            >
              {{ genre }}
            </span>
          </div>
        </div>
      </div>
      <div className="lg:w-[40%] w-full">
        <h1 className="font-bold text-white text-lg mb-2">DETAILS</h1>
        <div className="border-t-2 border-[#07bf67]">
          <table className="lg:w-[80%] w-full">
            <tbody>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">POPULARITY</td>
                <td className="text-end font-medium pt-3 pb-1">
                  {{ mangaInfo?.popularity }}
                </td>
              </tr>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">STATUS</td>
                <td className="text-end font-medium pt-3 pb-1">{{ mangaInfo?.status }}</td>
              </tr>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">RELEASE YEAR</td>
                <td className="text-end font-medium pt-3 pb-1">{{ mangaInfo?.releaseDate }}</td>
              </tr>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">START DATE</td>
                <td className="text-end font-medium pt-3 pb-1">
                  {{ mangaInfo?.startDate.month }}, {{ mangaInfo?.startDate.day }},
                  {{ mangaInfo?.startDate.year }}
                </td>
              </tr>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">END DATE</td>
                <td className="text-end font-medium pt-3 pb-1">
                  {{ mangaInfo?.endDate.month }}, {{ mangaInfo?.endDate.day }},
                  {{ mangaInfo?.endDate.year }}
                </td>
              </tr>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">RATING</td>
                <td className="text-end font-medium pt-3 pb-1">{{ mangaInfo?.rating }}</td>
              </tr>
              <tr className="border-b border-[#444]">
                <td className="text-[#aaa] pt-3 pb-1">TYPE</td>
                <td className="text-end font-medium pt-3 pb-1">{{ mangaInfo?.type }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="lg:w-[40%] w-full">
        <h1 className="font-bold text-white text-lg mb-2">STORYLINE</h1>
        <div className="border-t-2 border-[#07bf67]">
          <div className="mt-3 text-sm">
            <div v-html="mangaInfo.description" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <RouterLink
        :to="`/read/${route.params.id}/${chapter.id}`"
        v-for="chapter in mangaInfo.chapters"
        :key="chapter.id"
        class="flex items-center bg-[#1D1E1F] px-10 gap-4 py-2 border-b border-gray-800"
      >
        <v-icon name="si-bookstack" scale="2" />
        <div>
          <h1 class="font-bold"># {{ chapter.chapter }}</h1>
          <p class="font-thin">{{ chapter.title }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
