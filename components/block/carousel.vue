<script lang="ts" setup>
import { AppProductCard } from "#components";

const { title } = defineProps<{
  title?: string;
}>();
const productsStore = useProductsStore();

const exclude = computed(() => productsStore?.currentProduct?.id);
const { data: products } = useFetch("/api/products/random", {
  query: {
    limit: 7,
    exclude,
  },
});
</script>

<template>
  <section class="py-20 section-container px-3 md:px-10">
    <div class="section-heading w-full flex justify-between items-end  m-auto mb-12 text-5xl">
      <h2
        v-if="title"
        class="text-3xl md:text-5xl "
        v-html="title"
      />
    </div>

    <UCarousel
      v-if="products"
      v-slot="{ item }"
      :items="products"
      class="w-full mx-auto py-2"
      :auto-scroll="{
        stopOnInteraction: false,
        stopOnMouseEnter: true,

      }"
      loop
      :ui="{
        item: 'my-2 basis-3/4 sm:basis-48/100 md:basis-40/100 lg:basis-30/100 xl:basis-2/7',
        container: 'flex items-stretch',
      }"
    >
      <AppProductCard
        :product="item"
        class="h-full w-full"
      />
    </UCarousel>

    <div class="section-footer  m-auto mt-8 flex justify-end">
      <NuxtLink to="/products" class="btn btn-accent btn-lg  group">
        View all plants
        <Icon
          name="tabler:arrow-up-right"
          size="20"
          class="group-hover:rotate-45 transition-all"
        />
      </NuxtLink>
    </div>
  </section>
</template>
