<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const orderId = route.query.orderId as string | undefined;

const { data: result, pending, error } = useFetch(`/api/orders/${orderId}`);

const order = computed(() => result.value?.order);
const items = computed(() => result.value?.items || []);
</script>

<template>
  <div class="min-h-screen bg-base-100 flex items-center justify-center p-6">
    <div class="max-w-2xl w-full card bg-base-200 shadow-xl p-6 space-y-6">
      <!-- Success header -->
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <div class="btn btn-circle btn-success btn-lg text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 class="text-2xl font-bold">
          Thank you for your order!
        </h1>
        <p class="text-base-content/70">
          We’ve received your order and it’s being processed.
        </p>
      </div>

      <!-- Loading & Error states -->
      <div v-if="pending" class="text-center">
        <span class="loading loading-spinner loading-lg" />
      </div>
      <div v-else-if="error" class="text-center text-error">
        Failed to load order details.
      </div>

      <!-- Order details -->
      <div v-else-if="order" class="space-y-2">
        <h2 class="font-semibold text-lg">
          Order Details
        </h2>
        <div class="divide-y divide-base-300 border border-base-300 rounded-lg">
          <div class="p-3 flex justify-between">
            <span class="font-medium">Order ID</span>
            <span>#{{ order.id }}</span>
          </div>
          <div class="p-3 flex justify-between">
            <span class="font-medium">Order Date</span>
            <span>{{ new Date(order.createdAt).toLocaleDateString() }}</span>
          </div>
          <div class="p-3 flex justify-between">
            <span class="font-medium">Total</span>
            <span class="font-bold">${{ order.total }}</span>
          </div>
          <div class="p-3">
            <span class="font-medium block mb-1">Items</span>
            <ul class="list-disc list-inside text-sm space-y-1">
              <li v-for="item in items" :key="item.id">
                {{ item.product.name }} × {{ item.quantity }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <NuxtLink to="/products" class="btn btn-primary">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
