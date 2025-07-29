<script lang="ts" setup>
import type { getProducts } from "~/lib/db/queries/product";

defineProps<{
  product: Product;
}>();

function isNewProduct(createdAt: number, daysAgo: number): boolean {
  const now = Date.now();
  const pastDays = daysAgo * 24 * 60 * 60 * 1000;
  return now - createdAt <= pastDays;
}

type Product = Awaited<ReturnType<typeof getProducts>>[number];
</script>

<template>
  <div class="card bg-base-100 w-full shadow-sm">
    <div
      v-if="product.mainImage || product.sideImage"
      class="group relative w-full aspect-square overflow-hidden"
    >
      <figure
        v-if="product.mainImage"
        class="w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
      >
        <img
          :src="product.mainImage"
          :alt="product.name"
        >
      </figure>
      <figure
        v-if="product.sideImage"
        class="w-full h-full absolute top-0 left-0 object-cover object-right transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      >
        <img
          :src="product.sideImage"
          :alt="product.name"
        >
      </figure>
    </div>

    <div class="card-body">
      <h2 class="card-title">
        {{ product.name }}
        <div v-if="isNewProduct(product.createdAt, 1)" class="badge badge-secondary">
          NEW
        </div>
      </h2>
      <p>{{ product.description }}</p>
      <div class="card-actions">
        <div v-for="category in product.productCategories" :key="`${category.productId}-${category.categoryId}`" class="badge badge-outline">
          {{ category.category.name }}
        </div>
      </div>
    </div>
    <div class="card-footer p-5 flex justify-end">
      <button class="btn btn-primary">
        Add to cart
      </button>
    </div>
  </div>
</template>
