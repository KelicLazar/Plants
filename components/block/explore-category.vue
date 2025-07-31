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
    class="explore-category-section p-30 bg-gradient-to-b to-base-100 from-50% from-base-content to-50% ..."
  >
    <div class="explore-category-container section-container m-auto bg-cover bg-top flex items-end p-24 aspect-100/54" :style="{ backgroundImage: `url(${image})` }">
      <div class="explore-category-content-wrapper p-12  h-fit max-w-1/2 w-full bg-base-100 ">
        <span>{{ headline }}</span>
        <h1 class="text-5xl mb-4">
          {{ title }}
        </h1>
        <p class="text-xl">
          {{ description }}
        </p>
        <slot />
      </div>
    </div>
  </section>
</template>
