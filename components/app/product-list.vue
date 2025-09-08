<script lang="ts" setup>
const productsStore = useProductsStore();
const route = useRoute();
onMounted(() => {
  productsStore.currentPage = +`${route.query.page || 1}`;
});

function handleSort(orderBy: string, sort: string = "desc") {
  if (orderBy)
    productsStore.orderBy = orderBy;

  productsStore.sort = sort;
}
</script>

<template>
  <div class="section-container pb-20 ">
    <div class="product-list-actions flex flex-row  py-4 mb-2 mt-4 gap-2 items-center justify-end">
      <label class="input border-accent/30 text-accent bg-accent/10">
        <Icon
          name="tabler:search"
          class=""
          size="20"
        />
        <input
          disabled
          type="search "
          class="font-bold w-full"

          placeholder="Search Product"
        >
      </label>
      <div class="dropdown dropdown-hover dropdown-end m-0 ">
        <div
          tabindex="0"
          role="button"
          class="btn m-0 btn-accent border-accent/30"
        >
          <Icon name="tabler:arrows-sort" size="20" />
          Sort
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 min-w-50 p-2 shadow-sm">
          <li>
            <button class="" @click="handleSort('price', 'asc')">
              Price (Lowest First)
            </button>
          </li>
          <li>
            <button class="" @click="handleSort('price', 'desc')">
              Price (Highest First)
            </button>
          </li>
          <li>
            <button class="" @click="handleSort('created_at', 'desc')">
              Newest
            </button>
          </li>

          <li>
            <button class="" @click="handleSort('created_at', 'asc')">
              Oldest
            </button>
          </li>
          <li>
            <button class="" @click="handleSort('name', 'asc')">
              Name (A-Z)
            </button>
          </li>

          <li>
            <button class="" @click="handleSort('created_at', 'desc')">
              Name (Z-A)
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="product-list section-container grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-4">
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
