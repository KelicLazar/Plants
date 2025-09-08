<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

import { h, resolveComponent } from "vue";

import type { Order } from "~/lib/db/types";

const { $csrfFetch } = useNuxtApp();
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");

const orders = ref<Order[]>([]);
const router = useRouter();
onMounted(async () => {
  const res = await $csrfFetch("/api/orders/my-orders");
  console.log("res", res.orders);
  orders.value = res.orders || [];
  console.log("All routes:", router);
});

const columns: TableColumn<Order>[] = [
  {
    id: "expand",
    cell: ({ row }) =>
      h(UButton, {
        "color": "neutral",
        "variant": "ghost",
        "icon": "i-lucide-chevron-down",
        "square": true,
        "aria-label": "Expand",
        "ui": {
          leadingIcon: [
            "transition-transform",
            row.getIsExpanded() ? "duration-200 rotate-180" : "",
          ],
        },
        "onClick": () => row.toggleExpanded(),
      }),
  },
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      console.log(row, "THIS IS ROW");
      return row.getValue("createdAt");
      return new Date(row.getValue("date")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
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
    header: "Number of Products",
    cell: ({ row }) => {
    //   const formatted = `${(row.getValue("total") || 0).toLocaleString()}RSD`;
      return (row.getValue("orderItems") as unknown[] | undefined)?.length ?? 0;

    //   return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "total",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      const formatted = `${(row.getValue("total") || 0).toLocaleString()}RSD`;

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
];

const expanded = ref({ 0: true });
</script>

<template>
  <div class="section-container pt-30 px-4">
    <h1 class="md:text-3xl">
      My Orders
    </h1>
    <div class="grid grid-cols-12">
      <UTable
        v-model:expanded="expanded"
        :data="orders"
        :columns="columns"
        :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
        class="col-span-12"
      >
        <template #expanded="{ row }">
          <div
            v-for="item, index in row.original.orderItems"
            :key="item.id"
            :class="{ 'bg-base-100': index % 2 === 0, 'bg-base-300': index % 2 !== 0 }"
            class="flex items-center gap-4 py-4 px-0"
          >
            <img
              :src="item.product.mainImage || ''"
              alt=""
              class="w-16 h-16"
            >
            <div class="flex flex-col gap-1 ">
              <span class="text-xl">{{ item.product.name }}</span>
              <p class="max-w-160 flex whitespace-normal">
                {{ item.product.description }}
              </p>
            </div>
            <span>{{ item.quantity }}</span>
            <span>{{ (item.product.price).toLocaleString() }} RSD</span>
            <span>{{ (item.quantity * item.product.price).toLocaleString() }}RSD</span>
          </div>
        <!-- <pre>{{ row.original }}</pre> -->
        </template>
      </UTable>
    </div>
  </div>
</template>
