<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { Icon } from "#components";

import type { Product } from "~/lib/db/types";

const items = ref<NavigationMenuItem[][]>([
  [

    {
      label: "Featured Products",
      icon: "i-lucide-star",
      slot: "featured-products" as const,
      children: [
        {
          label: "Icons",
          description: "You have nothing to do, @nuxt/icon will handle it automatically.",

        },
        {
          label: "Colors",
          description: "Choose a primary and a neutral color from your Tailwind CSS theme.",
        },
        {
          label: "Theme",
          description: "You can customize components by using the `class` / `ui` props or in your app.config.ts.",
        },
      ],
    },
    {
      label: "Admin",
      icon: "i-lucide-user-cog",
      children: [
        {
          label: "Add Product",
          icon: "i-lucide-sprout",
          to: "/admin/products/add",
          description: "Create and publish a new product.",
        },
        {
          label: "Add Category",
          icon: "tabler:category-plus",
          to: "/admin/category/add",
          description: "Organize products by adding a category.",
        },
        {
          label: "Manage Orders",
          icon: "material-symbols-light:orders",
          to: "/admin/orders",
          description: "View, track, and update customer orders.",
        },
        {
          label: "Manage Users",
          icon: "tabler:users",
          to: "/admin/users",
          description: "Manage registered users, roles, and permissions.",
        },
      ],
    },
    { label: "My Account", icon: "tabler:user-square", slot: "myaccount" as const, children: [
      {
        label: "Orders",
        icon: "tabler:truck-delivery",
        to: "/user/orders",
        description: "Create and publish a new product.",
      },
      {
        label: "Logout",
        icon: "tabler:logout",
        to: "/logout",
        description: "Sign out of your account.",
      },

    ] },

  ],
  [
    {
      label: "Cart",
      icon: "tabler:shopping-cart",
      to: "/cart",
    },

  ],
]);
const { $csrfFetch } = useNuxtApp();
const { width } = useWindowSize();
// const featuredProducts = ref<Product[]>([]);
onMounted(async () => {
  const response = await $csrfFetch("/api/random-products");
  console.log("this is response", response);

  //  featuredProduct.value = response;
});
</script>

<template>
  <UNavigationMenu
    :orientation="width > 1024 ? 'horizontal' : 'vertical'"
    :items="items"
    highlight-color="primary"
    :highlight="true"
    class="bg-transparent max-lg:flex-col max-lg:w-full"
    :unmount-on-hide="false"
    :ui="{
      root: 'bg-green-500 text-base-content ',
      label: ' text-base-content',
      viewport: ' rounded-none bg-base-200',
      link: 'text-base-content text-md  hover:bg-base-content/10 ',
      arrow: 'bg-red-500 text-red-500 stroke-red-500',
      linkLeadingIcon: 'bg-base-content',
      childLinkLabel: 'text-base-content',
      childLinkDescription: 'text-base-content',
      childLinkIcon: 'text-base-content',
      childItem: 'text-red-500  hover:bg-base-content/10',
      childLink: 'hover:bg-base-content/10 before:rounded-none   ',
      separator: 'bg-base-200',
      content: '',
      childList: 'border-none pl-0 ml-1 ',
    }"
  >
    <template #featured-products-content="{ item }">
      <div class="grid grid-cols-5 gap-2 p-2 bg bg-transparent">
        <div class="row-span-3 col-span-2 relative">
          <img
            src="/navigation.jpg"
            class="aspect-square object-cover size-full "
            alt="Explore Cacti and Succulents"
          >
          <div class=" size-full bg-base-200/20 absolute top-0 left-0" />
        </div>
        <ul class="flex flex-col col-span-3">
          <li
            v-for="child in (item as any).children"
            :key="child.label"
          >
            <ULink class="text-sm text-left  p-3 transition-colors hover:bg-base-content/10">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
              <p class="text-muted line-clamp-2">
                {{ child.description }}
              </p>
            </ULink>
          </li>
        </ul>
        <NuxtLink class="btn col-span-5 w-full text-center justify-center btn-primary">
          View All Products
          <Icon name="tabler:plant" size="20" />
        </NuxtLink>
      </div>
    </template>
  </UNavigationMenu>
</template>
