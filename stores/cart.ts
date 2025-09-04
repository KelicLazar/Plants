import { useToast } from "#imports"; // Nuxt UI toast composable
import { defineStore } from "pinia";
import { computed, watch } from "vue";

export const useCartStore = defineStore("useCartStore", () => {
  const authStore = useAuthStore();
  const { $csrfFetch } = useNuxtApp();

  // Fetch cart
  const { data: response, refresh: refreshCart, status: cartStatus } = useFetch("/api/cart", {
    server: false,
  });

  // Reactive accessors
  const cart = computed(() => response.value?.cart ?? []);
  const changes = computed(() => response.value?.changes ?? []);

  // Add product to cart
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

  // Toast notifications for backend changes
  const toast = useToast();
  watch(
    changes,
    (newChanges) => {
      if (!newChanges?.length)
        return;

      for (const change of newChanges) {
        if (change.status === "updated") {
          toast.add({
            title: "Cart Updated",
            description: "Some items had fewer units available. We adjusted your cart to match stock.",
            color: "warning",

            ui: {
              root: "bg-error-200 text-error-content",
            },
            avatar: {
              src: change.item.product.mainImage || "",
            },
            actions: [
              {
                label: "View Cart",
                onClick: () => { navigateTo("/cart"); },
              },
            ],
          });
        }
        else if (change.status === "removed") {
          toast.add({
            title: `${change.item.product.name} is removed from Cart.`,
            description: "A product in your cart is no longer available and has been removed.",
            color: "error",
            ui: {
              root: "bg-warning-200 text-error-content",
            },
            avatar: {
              src: change.item.product.mainImage || "",
            },
            actions: [
              {
                label: "View Cart",
                onClick: () => { navigateTo("/cart"); },
              },
            ],
          });
        }
      }
    },
    { deep: true },
  );

  return {
    cart,
    changes,
    refreshCart,
    cartStatus,
    addToCart,
  };
});
