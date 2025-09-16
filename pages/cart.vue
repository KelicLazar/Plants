<script lang="ts" setup>
import { AppCartItem } from "#components";

const cartStore = useCartStore();
const isUpdating = ref(false);
function setUpdating(value: boolean) {
  isUpdating.value = value;
}
const cartItems = computed(() => {
  return cartStore.cart || [];
});
const cartTotal = computed(() => {
  return cartStore.cart?.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.product.price);
  }, 0);
});
onMounted(() => {
  cartStore.refreshCart();
});
</script>

<template>
  <div
    class="section-container cart-page pt-20 lg:pt-30 px-3 pb-6"
  >
    <h1 class="text-3xl mb-12 md:mb-20">
      Manage your cart
    </h1>
    <div v-if="cartItems.length" class="flex justify-between gap-5 md:gap-10 lg:gap-12 flex-col md:flex-row">
      <div class="cart-list flex-1">
        <AppCartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          :set-updating="setUpdating"
        />
      </div>

      <div class="cart-summary pb-6 md:p-4 bg-base-100 md:shadow-xl md:border-2 border-base-content/20 sticky max-md:bottom-0 md:top-30 h-fit md:min-w-80 lg:min-w-100 xl:min-w-120">
        <div class="text-sm max-md:hidden md:text-2xl md:mb-4">
          Cart Summary
        </div>
        <div class="max-md:hidden py-4 flex justify-between border-b-1 border-base-content/20">
          <span>Products:</span>
          <span v-if="!isUpdating" class="">
            {{ cartTotal?.toLocaleString() }} RSD
          </span>
          <span v-else class="skeleton w-20 h-6" />
        </div>
        <div class="max-md:hidden py-4 flex justify-between border-b-1 border-base-content">
          <span class="text-base-content/50">Free Shipping:</span>
          <span class="">
            0 RSD
          </span>
        </div>

        <div class="py-2 md:py-4 text-md flex justify-between md:text-xl">
          <span>Total:</span>
          <span v-if="!isUpdating" class="text-md md:text-2xl">
            <strong>
              {{ cartTotal?.toLocaleString() }} RSD
            </strong>
          </span>
          <span v-else class="skeleton w-24 h-8" />
        </div>

        <div class="text-xl font-bold text-primary" />
        <button
          class="btn btn-primary max-md:sticky max-md:bottom-0 md:btn-lg lg:btn-xl  text-primary-content w-full hover:bg-primary-content hover:text-primary"
          :class="{ 'skeleton': isUpdating, 'cursor-not-allowed': isUpdating }"
          :disabled="isUpdating"
          @click="navigateTo('/checkout')"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
    <div v-if="!cartItems.length && cartStore.cartStatus === 'success'">
      <div class="flex flex-col items-center gap-4">
        <Icon
          name="tabler:shopping-cart-off"
          size="48"
          class="opacity-50"
        />
        <div class="text-lg opacity-50">
          Your cart is empty
        </div>
        <NuxtLink to="/products" class="btn btn-primary">
          Start Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
