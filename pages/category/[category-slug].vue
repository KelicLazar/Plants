<script lang="ts" setup>
const productsStore = useProductsStore();
</script>

<template>
  <section class="section-container pt-40">
    <div class="category-page ">
      <span v-if="productsStore.products" class="badge badge-secondary badge-xl">
        {{ productsStore?.products[0]?.productCategories[0].category.name }}</span>

      <h1 v-if="productsStore.products" class="text-2xl mt-8 max-w-220">
        {{ productsStore?.products[0]?.productCategories[0].category.description }}
      </h1>
      <AppProductList />
    </div>
  </section>
</template>
