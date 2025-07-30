<script lang="ts" setup>
const productsStore = useProductsStore();
</script>

<template>
  <section class="section-container pt-40">
    <div class="category-page ">
      <span v-if="productsStore.products" class="badge badge-secondary badge-xl">
        {{ productsStore?.products[0]?.productCategories[0].category.name }}</span>
      <div v-else class="badge badge-xl skeleton  w-24 h-6 rounded" />
      <h1 v-if="productsStore.products" class="text-2xl mt-8 max-w-220">
        {{ productsStore?.products[0]?.productCategories[0].category.description }}
      </h1>
      <div v-else class="mt-8 max-w-220 h-16 skeleton animate-pulse  w-3/4" />
      <AppProductList />
    </div>
  </section>
</template>
