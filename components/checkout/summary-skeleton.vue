<template>
  <div>
    <div class="checkout-summary border-0 shadow-md border-base-content bg-base-200 p-3">
      <div class="checkout-summary-heading flex py-4 justify-between border-b-1 border-base-content/50">
        <div class="skeleton h-5 w-16 rounded" />
        <div class="skeleton h-5 w-10 rounded" />
      </div>

      <div class="checkout-summary-products-list">
        <div
          v-for="item in 3"
          :key="item"
          class="checkout-summary-product-item py-2 flex items-center"
        >
          <div class="flex items-center gap-2 text-md relative p-0">
            <div class="relative mr-2">
              <div class="skeleton w-14 h-14 rounded" />

              <div class="skeleton w-6 h-6 rounded-full absolute right-0 top-0 translate-x-1.5 -translate-y-1.5" />
            </div>
            <div class="skeleton h-5 w-32 rounded" />
          </div>
          <div class="skeleton h-5 w-20 ml-auto rounded" />
        </div>
      </div>

      <div class="py-4 flex justify-between border-b-1 border-base-content">
        <div class="skeleton h-4 w-24 rounded" />
        <div class="skeleton h-4 w-12 rounded" />
      </div>

      <div class="checkout-summary-footer text-xl flex py-4 justify-between font-bold">
        <div class="skeleton h-6 w-12 rounded" />
        <div class="skeleton h-6 w-24 rounded" />
      </div>

      <div class="checkout-summary-actions">
        <div class="skeleton h-12 w-full rounded-lg" />
      </div>
    </div>
  </div>
</template>
