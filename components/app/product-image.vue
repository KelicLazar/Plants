<script lang="ts" setup>
defineProps<{
  mainImage: string | null;
  sideImage: string | null;
  alt: string;
}>();
</script>

<template>
  <figure
    v-if="mainImage"
    class=" w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0 "
  >
    <img
      :src="mainImage"
      :alt="alt"
    >
  </figure>
  <figure
    v-if="sideImage"
    class="w-full h-full absolute top-0 left-0 object-cover object-right transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-110 "
  >
    <img
      :src="sideImage"
      :alt="alt"
    >
  </figure>
</template>
