import { defineStore } from "pinia";

export const useCategoryStore = defineStore("useCategoryStore", () => {
  const { data: categories, refresh: refreshCategories, status: categoriesStatus } = useFetch("/api/category");

  return {
    categories,
    refreshCategories,
    categoriesStatus,
  };
});
