<script lang="ts" setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

defineProps<{
  title: string;
  description: string;
  headline?: string;
  imageUrl: string;
  isReverse?: boolean;
}>();

gsap.registerPlugin(ScrollTrigger);

const imageRightRef = ref<HTMLElement | null>(null);
const imageLeftRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (imageRightRef.value) {
    gsap.to(imageRightRef.value, {
      y: -16, // moves 100px down (adjust for effect)
      //   clipPath: "polygon(56% 10%, 100% 10%, 100% 100%, 56% 100%)",
      ease: "none",
      delay: 3,
      stagger: 2,
      scrollTrigger: {
        trigger: imageRightRef.value,
        start: "middle 80%", // when element enters viewport
        end: "middle 20%", // when element leaves viewport
        scrub: true,

        // ties animation to scroll
      },
    });
  }
  if (imageLeftRef.value) {
    gsap.to(imageLeftRef.value, {
      y: 16, // moves 100px down (adjust for effect)
      //   clipPath: "polygon(0 0%, 54% 0%, 54% 100%, 0 100%)",
      ease: "none",
      delay: 3,
      scrollTrigger: {
        trigger: imageLeftRef.value,
        start: "middle 80%", // when element enters viewport
        end: "middle 20%", // when element leaves viewport
        scrub: true,
        // ties animation to scroll
      },
    });
  }
});
</script>

<template>
  <section
    class="
   section-split-image
   py-40
   m-auto
   "
  >
    <div
      class="  max-w-320 m-auto split-image-container flex gap-20 justify-between  items-center"
      :class="{ 'flex-row-reverse': isReverse }"
    >
      <div class="split-image-content max-w-160">
        <span class="split-image-heading">
          {{ headline }}
        </span>
        <h2 class="text-6xl mb-6" v-html="title" />
        <p class="text-lg">
          {{ description }}
        </p>
        <slot />
      </div>
      <div class="split-image-image-wrapper relative max-w-120 w-full aspect-square">
        <img
          ref="imageLeftRef"
          :src="imageUrl"
          :alt="title"
          class="split-image--left absolute top-0  -translate-y-4 w-full h-full object-cover"
        >
        <img
          ref="imageRightRef"
          :src="imageUrl"
          :alt="title"
          class="split-image--right top-0 translate-y-4 absolute w-full h-full object-cover"
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
