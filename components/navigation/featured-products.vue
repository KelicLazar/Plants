<script lang="ts" setup>
import { ref } from "vue";

const { data: featuredProducts, status } = useCsrfFetch("/api/products/popular", {
  query: { limit: 4 },
});
const isLoading = computed(() => status.value === "pending" || status.value === "idle");

const hoveredId = ref<number | null>(null);
</script>

<template>
  <div class="grid w-full col-span-2 grid-cols-12 max-lg:grid-cols-1 py-2 lg:p-4 gap-8 bg-transparent">
    >
    <template v-if="isLoading">
      <div class="z-20 order-2 col-span-5 max-lg:hidden relative">
        <div class="aspect-square w-full bg-base-200 animate-pulse rounded-lg" />
        <div class="size-full max-w-40 bg-base-200/20 absolute top-0 left-0" />
      </div>

      <ul class="grid lg:grid-cols-1 order-1 flex-col col-span-7 max-lg:col-span-1 max-lg:gap-2">
        <li
          v-for="n in 4"
          :key="n"
          class="animate-pulse"
        >
          <div class="p-3 hover:bg-base-content/10 transition-colors">
            <div class="w-full h-32 absolute top-0 left-0 bg-base-200 rounded lg:hidden opacity-30" />

            <div class="h-5 bg-base-200 rounded mb-2 max-lg:relative" :style="{ width: `${Math.random() * 40 + 60}%` }" />

            <div class="max-lg:hidden space-y-2 relative">
              <div class="h-4 bg-base-200/60 rounded" :style="{ width: `${Math.random() * 20 + 80}%` }" />
              <div class="h-4 bg-base-200/60 rounded" :style="{ width: `${Math.random() * 30 + 50}%` }" />
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template v-else-if="featuredProducts?.length">
      <div class="z-20 order-2 col-span-5 max-lg:hidden relative">
        <img
          src="/navigation.jpg"
          class="aspect-square object-cover z-1 size-full absolute top-0 left-0"
          alt="Explore Cacti and Succulents"
        >

        <div
          v-for="item in featuredProducts"
          :key="item.id"
          class="size-full absolute z-1 top-0 left-0 transition-opacity duration-600"
          :class="{ 'opacity-100': hoveredId === item.id, 'opacity-0': hoveredId !== item.id }"
        >
          <img
            v-if="item.mainImage"
            class="size-full object-cover"
            :src="item.mainImage"
            :alt="item.name"
          >
        </div>

        <div class="size-full max-w-40 bg-base-200/20 absolute top-0 left-0" />
      </div>

      <ul class="grid lg:grid-cols-1 order-1 flex-col col-span-7 max-lg:col-span-1 max-lg:gap-2">
        <li
          v-for="item in featuredProducts"
          :key="item.id"
        >
          <NuxtLink
            :to="`/products/${item.slug}`"
            class="text-sm text-left flex flex-col p-3 max-lg:flex max-lg:relative transition-colors hover:bg-base-content/10"
            @mouseenter="hoveredId = item.id"
            @mouseleave="hoveredId = null"
          >
            <img
              v-if="item.mainImage"
              :src="item.mainImage"
              :alt="item.name"
              class="w-full h-full absolute top-0 left-0 object-cover brightness-75 opacity-30 lg:hidden"
            >
            <p class="font-medium text-base-content flex items-center gap-2 max-lg:relative">
              {{ item.name }}
            </p>
            <p class="text-base-content/60 line-clamp-2 max-lg:hidden relative">
              {{ item.description }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </div>
</template>
