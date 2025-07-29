import { defineStore } from "pinia";

import type { Product } from "~/components/app/product-card.vue";

export const useProductsStore = defineStore("useProductsStore", () => {
  const totalCount = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(12);
  const currentCategory = ref<string | null>(null);
  const requestUrl = computed(() =>
    `/api/product/?page=${currentPage.value}&limit=${itemsPerPage.value}`,
  );
  const { data: products, refresh: refreshProducts, status: productsStatus } = useFetch<Product[]>(requestUrl);

  watch([currentPage, itemsPerPage], () => {
    refreshProducts();
  });
  return {
    products,
    refreshProducts,
    productsStatus,
    totalCount,
    currentCategory,
    itemsPerPage,
    currentPage,
  };
});
