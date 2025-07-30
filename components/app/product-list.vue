<script lang="ts" setup>
const productsStore = useProductsStore();
const route = useRoute();
const test = ref("");
onMounted(() => {
  // console.log("On mounted runned,", route.params?.categoryslug[0]);

  if (route.params.categoryslug) {
    // test.value = route.params.categoryslug;
    productsStore.currentCategory = `${route.params.categoryslug}`;
  }
});
</script>

<template>
  <div class="section-container">
    {{ test }}
    <div class="product-list-actions flex flex-row  py-4 mb-2 mt-4 gap-2 items-center justify-end">
      <label class="input border-accent/30 text-accent bg-accent/10">
        <Icon
          name="tabler:search"
          class=""
          size="20"
        />
        <input
          type="search "
          class="font-bold"
          required
          placeholder="Search Product"
        >
      </label>
      <div class="dropdown dropdown-hover dropdown-end m-0 ">
        <div
          tabindex="0"
          role="button"
          class="btn m-0 btn-accent   border-accent/30"
        >
          <Icon name="tabler:arrows-sort" size="20" />
          Sort
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 min-w-40 p-2 shadow-sm">
          <li>
            <button class="" @click="productsStore.orderBy = 'price'">
              Price
            </button>
          </li>
          <li>
            <button class="" @click="productsStore.orderBy = 'created_at'">
              Newest
            </button>
          </li>
          <li>
            <button class="" @click="productsStore.orderBy = 'name'">
              Name
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="product-list section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      <template v-if="productsStore.productsStatus === 'pending' || productsStore.productsStatus === 'idle'">
        <AppProductCardSkeleton v-for="n in 12" :key="n" />
      </template>

      <AppProductCard
        v-for="product in productsStore.products"
        v-else
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
