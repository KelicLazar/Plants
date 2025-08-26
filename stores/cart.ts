import { defineStore } from "pinia";

export const useCartStore = defineStore("useCartStore", () => {
  const authStore = useAuthStore();
  const { $csrfFetch } = useNuxtApp();

  const { data: cart, refresh: refreshCart, status: cartStatus } = useFetch("/api/cart", {
    server: false,
  });

  async function addToCart(productId: number) {
    if (!authStore.user?.id) {
      return { error: "You must be logged in to add to cart" };
    }

    const reqBody = {
      productId,
      userId: +authStore.user.id,
      quantity: 1,
    };
    try {
      const res = await $csrfFetch("/api/cart", {
        method: "post",
        body: reqBody,
      });
      refreshCart();
      return { data: res, error: null };
    }
    catch (error) {
      const errorMessage = extractErrorMessage(error);

      return { data: null, error: errorMessage };
    }
  }

  return {
    cart,
    refreshCart,
    cartStatus,
    addToCart,
  };
});
