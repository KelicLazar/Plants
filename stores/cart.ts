import { defineStore } from "pinia";

export const useCartStore = defineStore("useCartStore", () => {
  const { data: cart, refresh: refreshCart, status: cartStatus } = useFetch("/api/cart", {
    server: false,
  });

  return {
    cart,
    refreshCart,
    cartStatus,
  };
});
