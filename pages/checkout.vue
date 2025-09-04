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
  const res = await $csrfFetch("/api/order", {
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
    class="section-container checkout-page pt-30 px-4"
  >
    <h1 class="text-3xl">
      Checkout page
      <pre>
        {{ errors }}
      </pre>
    </h1>
    <span class="text-2xl mt-5 flex mb-3">Enter details for delivery</span>
    <form class="flex flex-row items-start gap-10 " @submit.prevent="submitHandler">
      <div
        class="flex-7  checkout-form grid  grid-cols-12 gap-2"
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
          class="col-span-6"
        />

        <AppInputField
          :error="errors.city"
          name="city"
          label="City *"
          class="col-span-3"
        />

        <AppInputField
          :error="errors.postalCode"
          name="postalCode"
          label="Zip / Postal Code *"
          class="col-span-3"
        />

        <AppInputField
          :error="errors.note"
          type="textarea"
          class="col-span-12"
          name="note"
          label="Note"
        />
      </div>
      <div class="flex-5 cart-info col-span-5">
        <div
          v-if="cartStore.cart.length === 0"
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
        <table v-else class="table table-fixed w-full ">
          <thead>
            <tr>
              <th class="w-full p-0">
                Products
              </th>

              <th class="text-right w-40">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <template
              v-if="cartStore.cartStatus === 'pending' || cartStore.cartStatus === 'idle'"
            >
              <tr
                v-for="item in 5"
                :key="item"
              >
                <td class="skeleton h-12 " />
                <td class="skeleton h-12 " />
              </tr>
            </template>
            <template
              v-else
            >
              <tr
                v-for="item in cartStore.cart"
                :key="item.id"
                class="py-2 pb-5 mb-4"
              >
                <td class="flex  items-center gap-2 my-2 text-md relative p-0">
                  <div class="relative mr-2">
                    <img
                      v-if="item.product.mainImage"
                      :src="item.product.mainImage"
                      :alt="item.product.name"
                      class="w-14 aspect-square  object-cover"
                    >
                    <span class="badge badge-soft border-2 aspect-square rounded-full absolute flex items-center justify-center  p-0 right-0 top-0 translate-x-1.5 -translate-y-1.5">{{ item.quantity }}</span>
                  </div>
                  <span class="text-lg">{{ item.product.name }}</span>
                </td>
                <td class="text-primary text-lg text-right">
                  {{ (item.quantity * item.product.price).toLocaleString() }} RSD
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot class="bg-base-200  w-full ">
            <tr class="w-full bg-base-300">
              <th colspan="1" class="text-left text-lg">
                Total:
              </th>
              <th colspan="1" class="text-xl text-right font-bold text-primary">
                {{ (cartTotal || 0).toLocaleString() }} RSD
              </th>
            </tr>
            <tr class="">
              <th colspan="4" class="p-0 ">
                <button
                  :disabled="isLoading"
                  :class="{ skeleton: isLoading }"
                  class="btn btn-xl btn-primary w-full hover:text-primary hover:bg-primary-content"
                >
                  <span v-if="!isLoading">  Order Now</span>
                  <span v-else class="animate-pulse ">Processing..</span>
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </form>
  </div>
</template>
