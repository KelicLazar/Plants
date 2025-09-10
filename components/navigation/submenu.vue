<script lang="ts" setup>
import type { Link, Product } from "~/lib/db/types";

const { links } = defineProps<{ links?: Link[]; products?: Product[] }>();
</script>

<template>
  <ul class="grid lg:grid-cols-2 gap-2 flex-col col-span-3 w-full  ">
    <li
      v-for="item in links"
      :key="item.label"
    >
      <NuxtLink :to="item.to" class="text-sm text-left flex gap-2 p-3 link-indicator bg-base-100 transition-colors hover:bg-base-content/10">
        <Icon
          v-if="item.icon"
          :name="item.icon"
          size="20"
          class="text-base-content"
        />
        <div class="flex flex-col">
          <p class="font-medium text-base-content">
            {{ item.label }}
          </p>
          <p class="text-base-content/60 max-lg:hidden ">
            {{ item.description }}
          </p>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
