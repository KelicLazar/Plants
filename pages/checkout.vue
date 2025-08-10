<script lang="ts" setup>
const cartStore = useCartStore();

const cartTotal = computed(() => {
  return cartStore.cart?.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.product.price);
  }, 0);
});
const { handleSubmit, errors, setErrors, meta } = useForm({
//   validationSchema: toTypedSchema(ProductFormSchema),
});
function submitHandler() {

}
</script>

<template>
  <div class="section-container checkout-page pt-30">
    <h1 class="text-3xl">
      Checkout page
    </h1>
    <span class="text-2xl mt-5 flex mb-3">Enter details for delivery</span>
    <div class="grid grid-cols-12 gap-4 items-stretch">
      <form
        class="checkout-form col-span-7 grid grid-cols-12 gap-2"
        @submit="submitHandler"
      >
        <AppInputField
          :error="errors.fname"
          name="fName"
          label="First Name *"
          class="col-span-6"
        />
        <AppInputField
          :error="errors.lname"
          name="lName"
          class="col-span-6"
          label="Last Name *"
        />

        <AppInputField
          :error="errors.street"
          name="street"
          label="Street Address *"
          class="col-span-6"
        />
        <AppInputField
          :error="errors.houseNumber"
          name="houseNumber"
          label="Apartment number, floor number, etc."
          class="col-span-6"
        />
        <AppInputField
          :disabled="true"
          name="country"
          value="Serbia"
          label="Country"
          class="col-span-12"
        />

        <AppInputField
          :error="errors.phone"
          name="phone"
          class="col-span-6"
          label="Phone *"
        />
        <AppInputField
          :error="errors.city"
          name="city"
          label="City *"
          class="col-span-3"
        />

        <AppInputField
          :error="errors.postal"
          name="postal"
          label="Zip / Postal Code *"
          class="col-span-3"
        />
        <Field
          v-slot="{ field }"
          name="terms"
          type="radio"
          :value="true"
          :unchecked-value="false"
        >
          <label>
            <input
              type="checkbox"
              name="terms"
              v-bind="field"
              :value="true"
            >
            I agree
          </label>
        </Field>
        <AppInputField
          :error="errors.description"
          type="textarea"
          class="col-span-12"
          name="description"
          label="Note"
        />
      </form>
      <div class="cart-info col-span-5">
        <table class="table table-zebra w-full ">
          <!-- Table Header -->
          <thead>
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th class="text-right">
                Total
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr
              v-for="item in cartStore.cart"
              :key="item.id"
            >
              <td class="flex items-center gap-2 text-md">
                <img
                  v-if="item.product.mainImage"
                  :src="item.product.mainImage"
                  :alt="item.product.name"
                  class="w-10"
                >
                {{ item.product.name }}
              </td>
              <td>{{ item.product.price.toLocaleString() }} RSD</td>
              <td>x {{ item.quantity }}</td>
              <td class="text-primary text-lg text-right">
                {{ (item.quantity * item.product.price).toLocaleString() }} RSD
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-base-200  w-full ">
            <tr class="w-full">
              <th colspan="3" class="text-left text-lg">
                Subtotal:
              </th>
              <th colspan="1" class="text-xl text-right font-bold text-primary">
                {{ cartTotal?.toLocaleString() }} RSD
              </th>
            </tr>
            <tr>
              <th class="text-md">
                Delivery:
              </th>
              <th colspan="5" class="text-lg text-primary text-right">
                300 RSD
              </th>
            </tr>
            <tr class="w-full bg-base-300">
              <th colspan="3" class="text-left text-lg">
                Total:
              </th>
              <th colspan="1" class="text-xl text-right font-bold text-primary">
                {{ ((cartTotal || 0) + 300).toLocaleString() }} RSD
              </th>
            </tr>
            <tr class="">
              <th colspan="4" class="p-0 ">
                <button class="btn btn-xl btn-primary w-full hover:text-primary hover:bg-primary-content">
                  Order Now
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
