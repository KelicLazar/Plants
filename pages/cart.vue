<script lang="ts" setup>
import { AppCartItem } from "#components";

const cartStore = useCartStore();

const cartItems = computed(() => {
  return cartStore.cart || [];
});
const cartTotal = computed(() => {
  return cartStore.cart?.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.product.price);
  }, 0);
});
</script>

<template>
  <div class="section-container cart-page pt-30">
    <h1 class="text-3xl">
      Manage your cart
    </h1>
    <div class="overflow-x-auto">
      <table class="table table-zebra bg-base-100 w-full ">
        <!-- Table Header -->
        <thead>
          <tr>
            <th>Actions</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody>
          <template v-if="cartStore.cartStatus === 'idle' || cartStore.cartStatus === 'pending'">
            <AppCartItemSkeleton v-for="item, index in 5" :key="index" />
          </template>
          <AppCartItem
            v-for="item in cartItems"
            :key="item.id"
            :item="item"
          />
          <!-- Empty State -->
          <tr v-if="cartStore.cartStatus === 'success' && cartItems.length === 0">
            <td colspan="5" class="text-center py-8">
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
            </td>
          </tr>
        </tbody>

        <!-- Table Footer with Totals -->
        <tfoot v-if="cartItems.length > 0" class="bg-base-300 w-full">
          <tr class="w-full">
            <th colspan="3" />
            <th colspan="1" class="text-left text-lg">
              Total:
            </th>
            <th colspan="1" class="text-xl font-bold text-primary">
              {{ cartTotal?.toLocaleString() }} RSD
            </th>
          </tr>
          <tr class="w-full">
            <th colspan="3" class="text-right text-lg" />
            <th colspan="2" class="text-xl font-bold text-primary p-0">
              <NuxtLink to="/checkout" class="btn btn-primary text-primary-content w-full hover:bg-primary-content hover:text-primary">
                Proceed to Checkout
              </NuxtLink>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
