<script lang="ts" setup>
const productStore = useProductsStore();
const product = computed(() => productStore.currentProduct);
onMounted(() => {
  productStore.currentProductRefresh();
});
</script>

<template>
  <section class="product-details-section section-container">
    {{ productStore.currentProductStatus }}
    <div class="product-details-card max-w-300 m-auto">
      <div class="card-image  group max-w-120 relative w-full aspect-square overflow-hidden">
        <AppProductImage
          v-if="product?.mainImage && product.sideImage"
          :main-image="product.mainImage"
          :side-image="product.sideImage"
          :alt="product.name"
        />
      </div>
    </div>
    <h2>!!!!!!!!!!!!!!!</h2>
    <h3>{{ product?.name }}</h3>
  </section>
</template>
