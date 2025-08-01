<script lang="ts" setup>
const productsStore = useProductsStore();

// Computed current category based on currentCategory slug
const currCategory = computed(() => {
  const product = productsStore.products?.[0];
  return product?.productCategories?.find(
    cat => cat.category.slug === productsStore.currentCategory,
  )?.category;
});
</script>

<template>
  <section class="section-container pt-40">
    <div class="category-page">
      <template v-if="productsStore.products && currCategory">
        <span class="badge badge-secondary badge-xl">
          {{ currCategory.name }}
        </span>
      </template>
      <div v-else class="badge badge-xl skeleton w-24 h-6 rounded" />

      <template v-if="productsStore.products && currCategory">
        <h1 class="text-2xl mt-8 max-w-220">
          {{ currCategory.description }}
        </h1>
      </template>
      <div v-else class="mt-8 max-w-220 h-16 skeleton animate-pulse w-3/4" />

      <AppProductList />
    </div>
  </section>
</template>
