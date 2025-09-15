<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

import type { Link } from "~/lib/db/types";

const authStore = useAuthStore();

const isAdmin = computed(() => {
  return authStore?.user?.role === "admin";
});

const isAnonymous = computed(() => {
  return !authStore.user || authStore.user.isAnonymous;
});

const baseItems: NavigationMenuItem[] = [
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
];

const adminMenuItem: NavigationMenuItem = {
  label: "Admin",
  icon: "i-lucide-user-cog",
  slot: "admin" as const,
  children: [
    {
      slot: "admin-submenu" as const,
    },
  ],
};

const userMenuItem: NavigationMenuItem = {
  label: "My Account",
  icon: "tabler:user-square",
  children: [
    {
      slot: "user" as const,
    },
  ],
};

const loginMenuItem: NavigationMenuItem = {
  label: "Login",
  icon: "tabler:login",
  to: "/login",
};

const cartMenuItem: NavigationMenuItem = {
  label: "Cart",
  icon: "tabler:shopping-cart",
  to: "/cart",
  slot: "cart" as const,
};

const items = computed<NavigationMenuItem[][]>(() => {
  const firstGroup: NavigationMenuItem[] = [...baseItems];

  if (authStore.user && isAdmin.value) {
    firstGroup.push(adminMenuItem);
  }

  if (!isAnonymous.value) {
    firstGroup.push(userMenuItem);
  }
  else {
    firstGroup.push(loginMenuItem);
  }

  return [
    firstGroup,
    [cartMenuItem],
  ];
});

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
  description: "View your order history.",
}, {
  label: "Logout",
  icon: "tabler:logout",
  to: "/logout",
  description: "Sign out of your account.",
}];

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.cart?.length);
const eventHandlers = new Map();

onMounted(() => {
  const navLinks = document.querySelectorAll(".navigation-menu .navigation-menu-item");
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
});

onUnmounted(() => {
  eventHandlers.forEach(({ handleMouseEnter, handleMouseLeave }, link) => {
    link.removeEventListener("mouseenter", handleMouseEnter);
    link.removeEventListener("mouseleave", handleMouseLeave);
  });
  eventHandlers.clear();
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
      <NavigationFeaturedProducts />
    </template>

    <template #admin-submenu>
      <NavigationSubmenu :links="adminSubMenu" />
    </template>

    <template #user>
      <NavigationSubmenu :links="userSubMenu" />
    </template>

    <template #cart-trailing>
      <UBadge
        v-if="cartCount"
        :label="cartCount"
        variant="subtle"
        size="sm"
        color="secondary"
        class="cart-link lg:animate-bounce"
      />
    </template>
  </UNavigationMenu>
</template>
