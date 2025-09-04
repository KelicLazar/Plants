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
const toast = useToast();
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
    quantity.value = 0;
    newQuantity = 0;
    return removeFromCart(itemId);
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
    toast.add({
      title: `${item.product.name} remove from cart`,
      color: "error",
      avatar: {
        src: item.product.mainImage || "",
      },
      ui: {
        root: "bg-error-200 flex items-center justify-center",
      },

    });
  }
  isRemoving.value = false;
}
</script>

<template>
  <tr
    class="hover"
  >
    <td class="max-w-4">
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
      <NuxtLink :to="`/products/${item.product.slug}`" class="flex items-center gap-3">
        <div class="avatar">
          <div class="h-10 w-10 md:h-16 md:w-16">
            <img
              v-if="item?.product?.mainImage"
              :src="item?.product?.mainImage"
              :alt="item.product.name"
              class="object-cover"
            >
          </div>
        </div>
        <div>
          <div class="font-bold text-base hidden md:flex">
            {{ item.product.name }}
          </div>
          <div class="text-sm opacity-50 hidden lg:flex">
            {{ item.product.description || 'No description' }}
          </div>
        </div>
      </NuxtLink>
    </td>

    <!-- Price -->
    <td class="p-1">
      <div class="md:text-lg font-semibold flex w-20 md:w-25 flex-col">
        {{ item.product.price }} RSD
        <span class="badge badge-soft text-xs px-1 md:px-2 badge-success" :class="{ 'badge-warning': item.product.stock < 10, '!badge-error': item.product.stock < 5 }">In stock: {{ item.product.stock }}</span>
      </div>
    </td>

    <!-- Quantity Input -->
    <td>
      <div class="flex gap-2  items-center">
        <button
          class="btn w-5 h-5 md:btn-sm btn-outline btn-circle"
          :disabled="isLoading"
          @click="updateQuantity(item.id, item.quantity - 1)"
        >
          <Icon name="tabler:minus" size="14" />
        </button>

        <div v-if="isLoading" class="skeleton  h-8 w-8 md:w-16 " />

        <input
          v-else
          v-model.number="quantity"
          type="number"
          min="1"
          :max="item.product.stock"
          class="input input-sm input-bordered h-8 p-0 w-8 md:w-16 text-center"
          :disabled="isLoading"
          @blur="updateQuantity(item.id, quantity)"
          @keyup.enter="updateQuantity(item.id, quantity)"
        >

        <button
          class="btn w-5 h-5 md:btn-sm btn-outline btn-circle"
          :disabled="isLoading"
          @click="updateQuantity(item.id, item.quantity + 1)"
        >
          <Icon name="tabler:plus" size="14" />
        </button>
      </div>
    </td>

    <!-- Total Price -->
    <td>
      <div class="text-lg font-bold text-primary w-30">
        <div v-if="isLoading" class="skeleton h-6 w-full" />
        <span v-else>
          {{ (item.product.price * quantity).toLocaleString() }} RSD
        </span>
      </div>
    </td>
  </tr>
</template>
