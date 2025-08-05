<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const header = ref<HTMLElement | null>(null);
const authStore = useAuthStore();

onMounted(() => {
  let prevPosY = window.scrollY;

  if (window.scrollY > 10 && header.value) {
    header.value.classList.add("not-top");
  }

  const onScroll = () => {
    const posY = window.scrollY;

    if (!header.value)
      return;

    if (posY < 10) {
      header.value.classList.remove("not-top");
    }
    else {
      header.value.classList.add("not-top");
    }

    if (posY <= prevPosY || posY <= 0) {
      header.value.classList.remove("hide");
    }
    else {
      header.value.classList.add("hide");
    }

    prevPosY = posY;
  };

  window.addEventListener("scroll", onScroll);

  // Optional: cleanup if component unmounts
  // onUnmounted(() => window.removeEventListener('scroll', onScroll));
});

const menuLinks = computed(() => {
  const baseLinks = [
    { label: "Products", to: "/products", authRequired: true },
    { label: "Add Category", to: "/dashboard/add-category", authRequired: true },
    { label: "Add Product", to: "/dashboard/add-product", authRequired: true },
    { label: "Login", to: "/login", authRequired: false },
  ];

  if (authStore.user) {
    return baseLinks.filter(link => link.authRequired);
  }
  else {
    return baseLinks.filter(link => !link.authRequired);
  }
});
</script>

<template>
  <div class="drawer drawer-end z-100">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
    >
    <div
      ref="header"
      class="my-header drawer-content z-50 bg-accent text-accent-content min-h-16 lg:py-2 fixed w-full flex flex-col"
    >
      <!-- Navbar -->
      <div class="navbar m-auto px-3 mt-0 max-w-400">
        <div class="flex-1 py-2">
          <NuxtLink to="/" class="p-2 md:text-xl gap-2">
            <Icon name="tabler:plant" size="24" />
            Small Plants Shop
          </NuxtLink>
        </div>

        <!-- Desktop menu -->
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <li v-for="link in menuLinks" :key="link.to">
              <NuxtLink :to="link.to">
                {{ link.label }}
              </NuxtLink>
            </li>
            <li v-if="authStore.user">
              <span>{{ authStore.user.email }}</span>
            </li>
            <li v-if="authStore.user">
              <button @click="authStore.signOut">
                Logout
              </button>
            </li>
          </ul>
        </div>

        <UiThemeToggle />

        <!-- Mobile menu button -->
        <div class="flex-none lg:hidden">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>

    <!-- Mobile drawer menu -->
    <div class="drawer-side">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <ul class="menu bg-base-300 flex flex-col text-2xl top-20 z-50 w-80 p-4 pt-30 min-h-full">
        <li
          v-for="link in menuLinks"
          :key="link.to"
          class="hover:bg-primary hover:text-primary-content"
        >
          <NuxtLink :to="link.to">
            {{ link.label }}
          </NuxtLink>
        </li>
        <li v-if="authStore.user" class="px-2 pt-6">
          <span>{{ authStore.user.email }}</span>
        </li>
        <li v-if="authStore.user" class="px-2">
          <button @click="authStore.signOut">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.my-header {
  transition: all 0.3s;
}
.my-header.not-top {
  box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.164);
}
.my-header.hide {
  transform: translateY(-100%);
  box-shadow: unset;
}
</style>
