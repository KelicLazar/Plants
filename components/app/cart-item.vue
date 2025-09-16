<script lang="ts" setup>
// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import type { CartItem } from "~/lib/db/types";

const { item, setUpdating } = defineProps<{
  item: CartItem;
  setUpdating?: (value: boolean) => void;
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
  setUpdating(true);
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
    setUpdating(false);
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
  <div class="flex gap-2 md:gap-4 mb-8 justify-between">
    <div class="product-image shrink-0 ">
      <div class="flex">
        <img
          v-if="item?.product?.mainImage"
          :src="item?.product?.mainImage"
          :alt="item.product.name"
          class="w-20 md:w-32 lg:w-40 object-cover"
        >
      </div>
    </div>
    <div class="product-info flex-1 ">
      <div class="product-details">
        <NuxtLink :to="`/products/${item.product.slug}`" class="flex items-center gap-3">
          <div>
            <div class="font-bold md:text-xl flex">
              {{ item.product.name }}
            </div>
            <div class="text-md opacity-50 hidden lg:flex">
              {{ item.product.description || 'No description' }}
            </div>
            <div class="flex flex-col mt-2 gap-1">
              <span class="badge badge-soft text-xs px-1 md:px-2 badge-success" :class="{ 'badge-warning': item.product.stock < 10, '!badge-error': item.product.stock < 5 }">In stock: {{ item.product.stock }}</span>

              <span class="text-sm opacity-50 ">
                {{ item.product.price.toLocaleString() }} RSD / pc
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="product-actions flex items-stretch gap-2 mt-4">
        <div
          class="quantity-actions h-10 w-fit border-1 border-base-content/30 py-1 px-2  flex items-center"
          :class="{ 'skeleton': isLoading, 'cursor-not-allowed': isLoading }"
        >
          <button
            class="w-5 h-5 bg-transparent cursor-pointer"
            :class="{ 'cursor-not-allowed': isLoading }"
            :disabled="isLoading"
            @click="updateQuantity(item.id, item.quantity - 1)"
          >
            <Icon name="tabler:minus" size="14" />
          </button>

          <input
            v-model.number="quantity"
            type="number"
            min="1"
            :max="item.product.stock"
            class="  input input-sm  h-8 p-0 w-8 md:w-16 !border-none !bg-transparent !outline-none !shadow-none text-center"
            :disabled="isLoading"
            @blur="updateQuantity(item.id, quantity)"
            @keyup.enter="updateQuantity(item.id, quantity)"
          >
          <!-- <div>{{ quantity }}</div> -->

          <button
            class="w-5 h-5 bg-transparent cursor-pointer"
            :disabled="isLoading"
            :class="{ 'cursor-not-allowed': isLoading }"
            @click="updateQuantity(item.id, item.quantity + 1)"
          >
            <Icon name="tabler:plus" size="14" />
          </button>
        </div>
        <button
          class="border-1 h-10 w-10 flex items-center justify-center border-error/30 hover:bg-error/30 group transition-all cursor-pointer"
          :disabled="isLoading"
          :class="{ '!cursor-not-allowed': isLoading }"
          @click="removeFromCart(item.id)"
        >
          <Icon
            name="tabler:trash"
            size="20"
            class=" bg-error group-hover:bg-white/80"
          />
        </button>
      </div>
      <div class="product-total-mobile mt-2 text-xl hidden md:flex lg:hidden">
        <div v-if="isLoading" class="skeleton h-8 w-28" />
        <span v-else>
          {{ (item.product.price * quantity).toLocaleString() }} RSD
        </span>
      </div>
    </div>

    <div class="product-total md:text-xl ml-auto md:hidden lg:flex">
      <div v-if="isLoading" class="skeleton h-8 w-28" />
      <span v-else>
        {{ (item.product.price * quantity).toLocaleString() }} RSD
      </span>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
