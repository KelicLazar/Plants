<script lang="ts" setup>
import z from "zod";

import { AddressFormSchema } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();
const cartStore = useCartStore();
const toast = useToast();
const isLoading = ref(false);
const cartTotal = computed(() => {
  return cartStore.cart?.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.product.price);
  }, 0);
});
const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(AddressFormSchema.extend({
    note: z.string().optional(),
  })),
});

const submitHandler = handleSubmit(async (values) => {
  console.log(values, meta);
  isLoading.value = true;
  const res = await $csrfFetch("/api/orders", {
    method: "post",
    body: values,
  });
  isLoading.value = false;
  if (res.error) {
    toast.add({
      title: res.error,
      description: "",
      color: "error",
      ui: {
        root: "bg-error-200",
        title: "text-error-content",
      },
    });
    if (res.cause === "STOCK") {
      console.log();

      cartStore.refreshCart();
    }
  }
  else {
    console.log(res, "!!!res");
    navigateTo(`/thank-you?orderId=${res.order.id}`);
  }
});

onMounted(() => {
  cartStore.refreshCart();
});
</script>

<template>
  <div
    class="section-container checkout-page pt-30 px-4 pb-20"
  >
    <h1 class="text-3xl">
      Checkout page
    </h1>
    <span class="text-2xl mt-5 flex mb-3">Enter details for delivery</span>
    <form class="flex flex-col lg:flex-row items-start gap-10 " @submit.prevent="submitHandler">
      <div
        class="flex-7 w-full checkout-form grid  grid-cols-12 gap-2"
      >
        <AppInputField
          :error="errors.firstName"
          name="firstName"
          label="First Name *"
          class="col-span-6"
        />
        <AppInputField
          :error="errors.lastName"
          name="lastName"
          class="col-span-6"
          label="Last Name *"
        />
        <AppInputField
          :error="errors.phone"
          name="phone"
          class="col-span-12"
          label="Phone *"
        />

        <AppInputField
          :disabled="true"
          name="country"
          value="Serbia"
          label="Country"
          class="col-span-12"
        />
        <AppInputField
          :error="errors.streetAddress"
          name="streetAddress"
          label="Street Address *"
          class="col-span-12 md:col-span-6"
        />

        <AppInputField
          :error="errors.city"
          name="city"
          label="City *"
          class="col-span-6 md:col-span-3"
        />

        <AppInputField
          :error="errors.postalCode"
          name="postalCode"
          label="Zip / Postal Code *"
          class="col-span-6 md:col-span-3"
        />

        <AppInputField
          :error="errors.note"
          type="textarea"
          class="col-span-12"
          name="note"
          label="Note"
        />
      </div>
      <div class="flex-5 cart-info col-span-5  w-full">
        <div
          v-if="cartStore.cart.length === 0 && cartStore.cartStatus === 'success'"
          class="flex flex-col items-center justify-center text-center space-y-4 p-10 bg-base-200  border border-base-300 shadow-sm"
        >
          <div class="w-16 h-16 flex items-center justify-center rounded-full bg-base-300 text-base-content/70">
            <Icon name="tabler:shopping-cart-off" size="32" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">
              Your cart is empty
            </h2>
            <p class="text-base-content/70 mt-1">
              Looks like you haven't added anything yet.
            </p>
          </div>
          <NuxtLink to="/products" class="btn btn-primary">
            Browse Products
          </NuxtLink>
        </div>
        <CheckoutSummarySkeleton v-else-if="cartStore.cartStatus === 'pending' || cartStore.cartStatus === 'idle'" />
        <div v-else class="checkout-summary border-0 shadow-md border-base-content bg-base-200 p-3">
          <div class="checkout-summary-heading flex py-4 justify-between border-b-1 border-base-content/50">
            <span>Products</span>
            <span>Total</span>
          </div>
          <div class="checkout-summary-products-list">
            <div
              v-for="item in cartStore.cart"
              :key="item.id"
              class="checkout-summary-product-item py-2  flex items-center"
            >
              <div class="flex  items-center gap-2 text-md relative p-0">
                <div class="relative mr-2">
                  <img
                    v-if="item.product.mainImage"
                    :src="item.product.mainImage"
                    :alt="item.product.name"
                    class="w-14 aspect-square  object-cover"
                  >
                  <span class="badge badge-soft border-2 aspect-square rounded-full absolute flex items-center justify-center  p-0 right-0 top-0 translate-x-1.5 -translate-y-1.5">{{ item.quantity }}</span>
                </div>
                <span class="text-md md:text-lg">{{ item.product.name }}</span>
              </div>
              <div class="text-base-content ml-auto text-lg text-right">
                {{ (item.quantity * item.product.price).toLocaleString() }} RSD
              </div>
            </div>
          </div>
          <div class="py-4 flex justify-between border-b-1 border-base-content">
            <span class="text-base-content/50">Free Shipping:</span>
            <span class="">
              0 RSD
            </span>
          </div>
          <div class="checkout-summary-footer text-xl flex py-4  justify-between font-bold text-primary">
            <span>Total:</span>
            <span class="">
              {{ (cartTotal || 0).toLocaleString() }} RSD
            </span>
          </div>
          <div class="checkout-summary-actions">
            <button
              :disabled="isLoading"
              :class="{ skeleton: isLoading }"
              class="sticky bottom-10 lg:flex lg:bottom-unset btn btn-xl btn-primary w-full hover:text-primary hover:bg-primary-content"
            >
              <span v-if="!isLoading">  Order Now</span>
              <span v-else class="animate-pulse ">Processing..</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
