import { defineStore } from "pinia";

export const useCartStore = defineStore("useCartStore", () => {
  const { data: cart, refresh: refreshCart, status: cartStatus } = useFetch("/api/cart");

  return {
    cart,
    refreshCart,
    cartStatus,
  };
});
