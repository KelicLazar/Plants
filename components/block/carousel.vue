<script lang="ts" setup>
import { AppProductCard } from "#components";

const productsStore = useProductsStore();
</script>

<template>
  <section class="py-20 section-container">
    <div class="section-heading w-full flex justify-between items-end  m-auto mb-12 text-5xl">
      <h1 class="">
        Checkout our <br>Most Popular plants
      </h1>
      <NuxtLink to="/products" class="btn btn-accent btn-lg  group">
        View all plants
        <Icon
          name="tabler:arrow-up-right"
          size="20"
          class="group-hover:rotate-45 transition-all"
        />
      </NuxtLink>
    </div>
    <div class="carousel bg-transparent shadow-2xl flex  w-full   m-auto space-x-4">
      <div
        v-for="product in productsStore.products"

        :key="product.id"
        class="carousel-item w-2/7"
      >
        <AppProductCard
          :product="product"
          class="carousel-item"
        />
      </div>
    </div>

    <div class="section-footer  m-auto mt-8 flex justify-end" />
  </section>
</template>
