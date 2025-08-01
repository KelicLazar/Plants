<script lang="ts" setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

defineProps<{
  title: string;
  description: string;
  headline?: string;
  imageUrl: string;
  isReverse?: boolean;
}>();

gsap.registerPlugin(ScrollTrigger);

// these refs are now local per component instance
const leftImgRef = ref<HTMLElement | null>(null);
const rightImgRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (leftImgRef.value) {
    gsap.to(leftImgRef.value, {
      y: 16,
      ease: "none",
      delay: 0, // remove delay to avoid confusion
      scrollTrigger: {
        trigger: leftImgRef.value,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }

  if (rightImgRef.value) {
    gsap.to(rightImgRef.value, {
      y: -16,
      ease: "none",
      delay: 0,
      scrollTrigger: {
        trigger: rightImgRef.value,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }
});
</script>

<template>
  <section class="section-split-image py-40 m-auto">
    <div
      class="max-w-320 m-auto split-image-container flex gap-20 justify-between items-center"
      :class="{ 'flex-row-reverse': isReverse }"
    >
      <div class="split-image-content max-w-160">
        <span class="split-image-heading">{{ headline }}</span>
        <h2 class="text-6xl mb-6" v-html="title" />
        <p class="text-lg">
          {{ description }}
        </p>
        <slot />
      </div>
      <div class="split-image-image-wrapper relative max-w-120 w-full aspect-square">
        <img
          ref="leftImgRef"
          :src="imageUrl"
          :alt="title"
          class="split-image--left absolute top-0 -translate-y-4 w-full h-full object-cover"
        >
        <img
          ref="rightImgRef"
          :src="imageUrl"
          :alt="title"
          class="split-image--right absolute top-0 translate-y-4 w-full h-full object-cover"
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.split-image--left {
  clip-path: polygon(0 0%, 49% 0%, 49% 100%, 0 100%);
}

.split-image--right {
  clip-path: polygon(51% 0%, 100% 0%, 100% 100%, 51% 100%);
}
</style>
