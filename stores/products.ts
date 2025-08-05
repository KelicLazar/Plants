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

  watch(() => route.path, (newPath, oldPath) => {
    if (newPath !== oldPath) {
      if (oldPath?.includes("/category/") && !newPath?.includes("/category/")) {
        resetFilters();
      }
      else if (newPath?.includes("/category/") && oldPath?.includes("/category/")) {
        currentPage.value = 1;
      }
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
    sort,
  };
});
