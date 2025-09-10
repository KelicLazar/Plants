<script lang="ts" setup>
import { ref } from "vue";

import type { Product } from "~/lib/db/types";

const { products } = defineProps<{ products: Product[] }>();

// Track hovered product id
const hoveredId = ref<number | null>(null);
</script>

<template>
  <div class="grid w-full col-span-2 grid-cols-12 max-lg:grid-cols-1 py-2 lg:p-4 gap-8 bg-transparent">
    <!-- Left image area -->
    <div class="row-span-3 z-20 order-2 col-span-5  max-lg:hidden relative  ">
      <!-- Default background -->
      <img
        src="/navigation.jpg"
        class="aspect-square object-cover z-1 size-full absolute top-0 left-0"
        alt="Explore Cacti and Succulents"
      >

      <!-- Product images -->
      <div
        v-for="item in products"
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

    <!-- Product links -->
    <ul class="grid lg:grid-cols-1 order-1 flex-col col-span-7 max-lg:col-span-1  max-lg:gap-2">
      <li
        v-for="item in products"
        :key="item.id"
      >
        <NuxtLink
          :to="`/products/${item.slug}`"
          class="text-sm text-left flex flex-col  p-3 max-lg:flex max-lg:relative transition-colors hover:bg-base-content/10"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
        >
          <img
            v-if="item.mainImage"
            :src="item.mainImage"
            :alt="item.name"
            class="w-full h-full absolute top-0 left-0 object-cover brightness-75 opacity-30  lg:hidden"
          >
          <p class="font-medium text-base-content flex items-center gap-2 max-lg:relative">
            {{ item.name }}
          </p>
          <p class="text-base-content/60 line-clamp-2 max-lg:hidden  relative">
            {{ item.description }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
