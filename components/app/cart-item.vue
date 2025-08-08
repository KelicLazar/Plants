<script lang="ts" setup>
// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import type { CartItem } from "~/lib/db/types";

const { item } = defineProps<{
  item: CartItem;
}
>();
const { $csrfFetch } = useNuxtApp();
const cartStore = useCartStore();
const authStore = useAuthStore();

// const quantity = ref(item.quantity);
const quantity = toRef(item.quantity);
const isLoading = ref(false);
const isRemoving = ref(false);

watch(() => item.quantity, (newVal) => {
  quantity.value = newVal;
});

watch(quantity, (newVal) => {
  if (newVal < 1) {
    quantity.value = 1;
  }
  else if (newVal > item.product.stock) {
    quantity.value = item.product.stock;
  }
});

async function updateQuantity(itemId: number, newQuantity: number) {
  if (newQuantity < 1) {
    quantity.value = 1;
    newQuantity = 1;
  }
  if (newQuantity > item.product.stock) {
    quantity.value = item.product.stock;
    newQuantity = item.product.stock;
  }
  isLoading.value = true;
  try {
    console.log("Updating quantity:", itemId, newQuantity);

    const reqBody = {
      id: item.id,
      quantity: newQuantity,

    };

    const res = await $csrfFetch(`/api/cart`, {
      method: "patch",
      body: reqBody,
    });

    if (res) {
      cartStore.refreshCart();
    }
  }
  catch (error) {
    console.error("Failed to update quantity:", error);
    // Reset quantity on error
    quantity.value = item.quantity;
  }
  finally {
    isLoading.value = false;
  }
}

async function removeFromCart(itemId: number) {
  if (!authStore.user?.id) {
    return;
  }
  isRemoving.value = true;

  const reqBody = {
    cartId: itemId,
  };

  const res = await $csrfFetch("/api/cart", {
    method: "delete",
    body: reqBody,
  });
  if (res) {
    cartStore.refreshCart();
  }
  isRemoving.value = false;
}
</script>

<template>
  <tr
    class="hover"
  >
    <td>
      <button
        class="btn btn-sm btn-error btn-outline"

        @click="removeFromCart(item.id)"
      >
        <Icon
          name="tabler:trash"
          size="16"
        />
      </button>
    </td>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="h-16 w-16">
            <img
              v-if="item?.product?.mainImage"
              :src="item?.product?.mainImage"
              :alt="item.product.name"
              class="object-cover"
            >
          </div>
        </div>
        <div>
          <div class="font-bold text-base">
            {{ item.product.name }}
          </div>
          <div class="text-sm opacity-50">
            {{ item.product.description || 'No description' }}
          </div>
        </div>
      </div>
    </td>

    <!-- Price -->
    <td>
      <div class="text-lg font-semibold flex w-25 flex-col">
        {{ item.product.price }} RSD
        <span class="badge badge-soft text-xs  badge-success" :class="{ 'badge-warning': item.product.stock < 10, '!badge-error': item.product.stock < 5 }">In stock: {{ item.product.stock }}</span>
      </div>
    </td>

    <!-- Quantity Input -->
    <td>
      <div class="flex gap-2  items-center">
        <button
          class="btn btn-sm btn-outline btn-circle"
          :disabled="isLoading"
          @click="updateQuantity(item.id, item.quantity - 1)"
        >
          <Icon name="tabler:minus" size="16" />
        </button>

        <input
          v-model.number="quantity"
          type="number"
          min="1"
          :max="item.product.stock"
          class="input input-sm input-bordered w-16 text-center"
          :disabled="isLoading"
          @blur="updateQuantity(item.id, quantity)"
          @keyup.enter="updateQuantity(item.id, quantity)"
        >

        <button
          class="btn btn-sm btn-outline btn-circle"
          :disabled="isLoading"
          @click="updateQuantity(item.id, item.quantity + 1)"
        >
          <Icon name="tabler:plus" size="16" />
        </button>
      </div>
    </td>

    <!-- Total Price -->
    <td>
      <div class="text-lg font-bold text-primary w-30">
        <span v-if="isLoading" class="animate-pulse duration-75">Calculating...</span>
        <span v-else>

          {{ (item.product.price * quantity).toLocaleString() }} RSD
        </span>
      </div>
    </td>

    <!-- Remove Button -->
  </tr>
</template>
