<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  image: string;
  headline?: string;
  isReverse?: boolean;
}>();
</script>

<template>
  <section
    class="
    explore-category-section
     px-3 py-8 md:p-12 xl:p-30 bg-gradient-to-b to-base-100 from-50% from-base-content to-50%"
  >
    <div class="explore-category-container section-container m-auto bg-cover bg-top flex items-end p-4 md:p-8 pt-60 md:pt-70 xl:p-8 xl:pt-0 xl:aspect-100/70 2xl:aspect-100/55 " :style="{ backgroundImage: `url(${image})` }">
      <div class="explore-category-content-wrapper p-4 md:p-8 xl:p-12  h-fit max-w-200 w-full bg-base-100 ">
        <span>{{ headline }}</span>
        <h1 class="md:text-3xl xl:text-5xl mb-4">
          {{ title }}
        </h1>
        <p class="text-xs md:text-lg xl:text-xl">
          {{ description }}
        </p>
        <slot />
      </div>
    </div>
  </section>
</template>
