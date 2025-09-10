<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

import type { Link, Product } from "~/lib/db/types";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "All Products",
      icon: "tabler:plant",
      to: "/products",
    },
    {
      label: "Featured Products",
      icon: "i-lucide-star",
      children: [
        {
          slot: "featured-products" as const,
        },
      ],
    },
    {
      label: "Admin",
      icon: "i-lucide-user-cog",
      children: [
        {
          slot: "admin" as const,
        },
      ],
    },
    { label: "My Account", icon: "tabler:user-square", children: [
      {
        slot: "user" as const,
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

const adminSubMenu: Link[] = [{
  label: "Add Product",
  icon: "i-lucide-sprout",
  to: "/admin/products/add",
  description: "Create and publish a new product.",
}, {
  label: "Add Category",
  icon: "tabler:category-plus",
  to: "/admin/category/add",
  description: "Organize products by adding a category.",
}, {
  label: "Manage Orders",
  icon: "material-symbols-light:orders",
  to: "/admin/orders",
  description: "View, track, and update customer orders.",
}, {
  label: "Manage Users",
  icon: "tabler:users",
  to: "/admin/users",
  description: "Manage registered users, roles, and permissions.",
}];

const userSubMenu: Link[] = [{
  label: "Orders",
  icon: "tabler:truck-delivery",
  to: "/user/orders",
  description: "Create and publish a new product.",
}, {
  label: "Logout",
  icon: "tabler:logout",
  to: "/logout",
  description: "Sign out of your account.",
}];
const { $csrfFetch } = useNuxtApp();

const featuredProducts = ref<Product[]>([]);
onMounted(async () => {
  const data = await $csrfFetch("/api/products/popular", {
    query: { limit: 4 },
  });
  console.log("this is response", data);

  featuredProducts.value = data;
});

onMounted(() => {
  const navLinks = document.querySelectorAll(".navigation-menu .navigation-menu-item");
  const eventHandlers = new Map();
  navLinks.forEach((link) => {
    const handleMouseEnter = () => {
      const isLg = window.innerWidth > 1024;
      if (isLg && link.getAttribute("data-state") === "closed") {
        link.querySelector("button")?.click();
      }
    };

    const handleMouseLeave = () => {
      const isLg = window.innerWidth > 1024;
      if (isLg && link.getAttribute("data-state") === "open") {
        link.querySelector("button")?.click();
      }
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    eventHandlers.set(link, { handleMouseEnter, handleMouseLeave });
  });

  onUnmounted(() => {
    eventHandlers.forEach(({ handleMouseEnter, handleMouseLeave }, link) => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    });
    eventHandlers.clear();
  });
});
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    highlight-color="primary"
    :highlight="true"
    class="navigation-menu"
    :unmount-on-hide="false"
    :ui="{
      root: 'navigation-menu-root',
      list: 'navigation-menu-list',
      item: 'navigation-menu-item',
      link: 'navigation-menu-link',
      linkLabel: 'navigation-menu-link-label',
      linkTrailing: 'navigation-menu-link-trailing',
      linkLeadingIcon: 'navigation-menu-link-leading-icon',
      childList: 'navigation-menu-child-list',
      childItem: 'navigation-menu-child-item',
      childLink: 'navigation-menu-child-link',
      childLinkLabel: 'navigation-menu-child-link-label',
      childLinkDescription: 'navigation-menu-child-link-description',
      childLinkIcon: 'navigation-menu-child-link-icon',
      separator: 'navigation-menu-separator',
      viewport: 'navigation-menu-viewport',
      content: 'navigation-menu-content',
    }"
  >
    <template #featured-products>
      <NavigationFeaturedProducts :products="featuredProducts" />
    </template>

    <template #admin>
      <NavigationSubmenu :links="adminSubMenu" />
    </template>

    <template #user>
      <NavigationSubmenu :links="userSubMenu" />
    </template>
  </UNavigationMenu>
</template>
