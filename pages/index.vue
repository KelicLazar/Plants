<script lang="ts" setup>
const productStore = useProductStore();

const products = computed(() => productStore.products);
</script>

<template>
  <div class="">
    <BlockHero />
    <BlockCarousel />
    <div v-for="product, index in products" :key="product.id">
      <span class="text-xl">
        {{ index }}  {{ product.name }}

        <span v-for="cat, i in product.productCategories" :key="`${product.id}-${cat.categoryId}`" class="text-md p-3">{{ cat.category.name }}{{ i }}</span>
      </span>
    </div>
  </div>
</template>
