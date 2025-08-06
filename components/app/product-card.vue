<script lang="ts" setup>
import type { Product } from "~/lib/db/types";

defineProps<{
  product: Product;
}>();

const { $csrfFetch } = useNuxtApp();

const cartStore = useCartStore();
// const authStore = useAuthStore();
async function addToCart(productId: number) {
  const reqBody = {
    productId,

  };

  const res = await $csrfFetch("/api/cart", {
    method: "post",
    body: reqBody,
  });
  if (res) {
    cartStore.refreshCart();
  }
}
function isNewProduct(createdAt: number, daysAgo: number): boolean {
  const now = Date.now();
  const pastDays = daysAgo * 24 * 60 * 60 * 1000;
  return now - createdAt <= pastDays;
}
</script>

<template>
  <div class="card group bg-base-150 w-full shadow-sm hover:bg-base-200/40 hover:-translate-y-1.5 duration-300 transition-all ">
    <NuxtLink
      v-if="product.mainImage || product.sideImage"
      :to="`/products/${product.slug}`"
      class="relative w-full aspect-square overflow-hidden"
    >
      <AppProductImage
        :main-image="product.mainImage"
        :side-image="product.sideImage"
        :alt="product.name"
      />
      <div v-if="isNewProduct(product.createdAt, 1)" class="absolute z-2 top-4 right-4 badge badge-secondary">
        NEW
      </div>
    </NuxtLink>

    <div class="card-body pb-4 px-3">
      <h2 class="card-title text-2xl mb-2">
        <NuxtLink :to="`/products/${product.slug}`">
          {{ product.name }}
        </NuxtLink>
      </h2>
      <div class="product-categories flex gap-2 flex-wrap ">
        <NuxtLink
          v-for="category in product.productCategories"
          :key="`${category.productId}-${category.categoryId}`"
          :to="`/category/${category.category.slug}`"
          class="badge badge-accent  badge-outline badge-soft flex whitespace-nowrap text-xs hover:bg-accent hover:text-accent-content transition-all"
        >
          {{ category.category.name }}
        </NuxtLink>
      </div>

      <!-- <p>{{ product.description }}</p> -->
    </div>
    <div class="card-footer  p-3 pt-2 flex  justify-between  items-end">
      <span class="product-price badge text-sm sm:text-lg badge-ghost badge-soft  h-full ">
        {{ product.price }} RSD
      </span>
      <button class="btn btn-sm sm:btn-md btn-primary  group" @click="addToCart(product.id)">
        <Icon
          name="tabler:shopping-cart"
          class=" group-hover:animate-bounce"
          size="22"
        />
        Add to cart
      </button>
    </div>
  </div>
</template>
