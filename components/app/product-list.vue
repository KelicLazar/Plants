<script lang="ts" setup>
const productsStore = useProductsStore();
</script>

<template>
  <div class="section">
    {{ productsStore.currentPage }}
    {{ productsStore.itemsPerPage }}
    <button class="btn btn-error" @click="() => { productsStore.currentPage++; productsStore.itemsPerPage = 1; }">
      Click
    </button>
    <div class="product-list section-container grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <AppProductCard v-for="product in productsStore.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
