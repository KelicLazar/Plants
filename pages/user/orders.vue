<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import { h, resolveComponent } from "vue";

import type { Order } from "~/lib/db/types";

const { $csrfFetch } = useNuxtApp();
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");

const orders = ref<Order[]>([]);
onMounted(async () => {
  const res = await $csrfFetch("/api/orders/my-orders");
  orders.value = res.orders || [];
});

const columns: TableColumn<Order>[] = [

  {
    accessorKey: "id",
    header: () => h("div", { class: " text-base-content" }, "#"),
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "createdAt",
    header: () => h("div", { class: " hidden lg:block text-base-content" }, "Date"),
    cell: ({ row }) =>
      h("span", { class: "hidden lg:block" }, new Date(row.getValue("createdAt")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })),
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: " text-base-content" }, "Status"),
    cell: ({ row }) => {
      const color = {
        paid: "success" as const,
        failed: "error" as const,
        refunded: "neutral" as const,
        pending: "primary" as const,
      }[row.getValue("status") as string];
      //   return row.getValue("status");
      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status"));
    },
  },
  {
    accessorKey: "orderItems",
    header: () => h("div", { class: "hidden lg:block text-base-content" }, "Items"),
    cell: ({ row }) => {
      const count = (row.getValue("orderItems") as unknown[] | undefined)?.length ?? 0;
      return h("span", { class: "hidden lg:block" }, count);
    },
  },
  {
    accessorKey: "total",
    header: () => h("div", { class: "text-right text-base-content" }, "Amount"),
    cell: ({ row }) => {
      const formatted = `${(row.getValue("total") || 0).toLocaleString()}RSD`;

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    id: "expand",
    cell: ({ row }) =>
      h(UButton, {
        "color": "base",
        "variant": "ghost",
        "icon": "i-lucide-chevron-down",
        "square": true,
        "aria-label": "Expand",
        "class": "text-right flex ml-auto hover:bg-base-content/20 hover:cursor-pointer",
        "ui": {
          leadingIcon: [
            "transition-transform bg-base-content ",
            row.getIsExpanded() ? "duration-200 rotate-180" : "",
          ],
        },
        "onClick": () => row.toggleExpanded(),
      }),
  },
];

const expanded = ref();
</script>

<template>
  <div class="max-w-240 m-auto pt-30 px-4 mb-20">
    <h1 class="md:text-3xl">
      My Orders
    </h1>
    <div class="grid grid-cols-12">
      <UTable
        v-model:expanded="expanded"
        :data="orders"
        :columns="columns"
        :ui="{ tr: 'data-[expanded=true]:bg-base-content/15 border-0.5 border-base-content/10 ',
               td: 'text-base-content',

        }"
        class="col-span-12"
      >
        <template #expanded="{ row }">
          <div class="flex  justify-between">
            <div class="lg:hidden flex mt-4 mb-2 px-3">
              <strong>Ordered Items: </strong>
              <small>
                <em>
                  ({{ (row.getValue("orderItems") as unknown[] | undefined)?.length ?? 0 }})
                </em>
              </small>
            </div>
            <div class="lg:hidden flex mt-4 mb-2 px-3">
              <strong class="hidden sm:flex lg:hidden">Order Date:</strong>
              <span>{{ new Date(row.getValue("createdAt")).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }) }}</span>
            </div>
          </div>
          <div
            v-for="item, index in row.original.orderItems"
            :key="item.id"
            :class="{ 'bg-base-100': index % 2 === 0, 'bg-base-content/7': index % 2 !== 0 }"
            class="items-center gap-4 pb-4 lg:pt-4 grid grid-cols-12 px-3 "
          >
            <img
              :src="item.product.mainImage || ''"
              alt=""
              class="col-span-3 min-w-12 sm:col-span-2 lg:col-span-1 object-cover aspect-square"
            >
            <div class="flex flex-col gap-1 col-span-9 sm:col-span-10 lg:col-span-5">
              <span class="text-xl">{{ item.product.name }}</span>
              <p class="max-w-160 flex whitespace-normal">
                {{ item.product.description }}
              </p>
            </div>
            <div class="product-info-details col-span-12 lg:col-span-6 grid grid-cols-3">
              <div class="flex flex-col gap-2 items-left justify-center">
                <strong>Quantity:</strong> <span> {{ item.quantity }}</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="flex flex-col  gap-2 items-start">
                  <strong>Price:</strong> <span>{{ (item.product.price).toLocaleString() }} RSD</span>
                </div>
              </div>
              <div class="flex flex-col gap-2 items-end justify-center">
                <strong>Total</strong> <span> {{ (item.quantity * item.product.price).toLocaleString() }}RSD</span>
              </div>
            </div>
          </div>
        <!-- <pre>{{ row.original }}</pre> -->
        </template>
      </UTable>
    </div>
  </div>
</template>

<style>
@media (max-width: 1024px) {
  thead tr th:nth-child(2),
  thead tr th:nth-child(4),
  tbody tr td:nth-child(2),
  tbody tr td:nth-child(4) {
    display: none;
  }
}
tbody tr[data-expanded="true"] + tr td {
  padding: 0;
}
</style>
