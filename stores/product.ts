import { defineStore } from "pinia";

export const useProductStore = defineStore("useProductStore", () => {
  const { data: products, refresh: refreshProducts, status: productsStatus } = useFetch("/api/product");

  return {
    products,
    refreshProducts,
    productsStatus,
  };
});
