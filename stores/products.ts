import { defineStore } from "pinia";

import type { Product } from "~/lib/db/types";

export const useProductsStore = defineStore("useProductsStore", () => {
  const route = useRoute();

  const totalCount = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(12);
  const orderBy = ref("created_at");
  const sort = ref("desc");
  const currentCategory = ref<string | null>(null);

  const resetFilters = () => {
    currentPage.value = 1;
    orderBy.value = "created_at";
    sort.value = "desc";
    currentCategory.value = null;
  };

  // Watch for route changes and reset when navigating to different pages
  watch(() => route.path, (newPath, oldPath) => {
    // Only reset if moving between different page types
    if (newPath !== oldPath) {
      // Reset when moving away from category pages
      if (oldPath?.includes("/category/") && !newPath?.includes("/category/")) {
        resetFilters();
      }
      // Reset when moving to different category
      else if (newPath?.includes("/category/") && oldPath?.includes("/category/")) {
        currentPage.value = 1; // Reset page but keep other filters
      }
      // Reset when moving to products page from elsewhere
      else if (newPath?.includes("/products") && !oldPath?.includes("/products")) {
        resetFilters();
      }
    }
  });

  const productsRequestUrl = computed(() =>
    `/api/products/?page=${currentPage.value}&limit=${itemsPerPage.value}&orderBy=${orderBy.value}&sort=${sort.value}&category=${currentCategory.value}`,
  );

  const {
    data: products,
    refresh: refreshProducts,
    status: productsStatus,
  } = useFetch<Product[]>(productsRequestUrl, {
    server: false,
  });

  watch(productsRequestUrl, () => {
    refreshProducts();
  });

  const currentProductRequestUrl = computed(() => {
    return `/api/products/${route.params.productslug}`;
  });
  const {
    data: currentProduct,
    refresh: currentProductRefresh,
    status: currentProductStatus,
  } = useFetch<Product>(currentProductRequestUrl, {
    lazy: true,
    immediate: false,
    watch: false,
  });

  watch(currentProductRequestUrl, () => {
    currentProductRefresh();
  });

  return {
    products,
    refreshProducts,
    productsStatus,
    totalCount,
    currentCategory,
    itemsPerPage,
    currentPage,
    orderBy,
    currentProduct,
    currentProductStatus,
    currentProductRefresh,
    currentProductRequestUrl,
    resetFilters,
  };
});
