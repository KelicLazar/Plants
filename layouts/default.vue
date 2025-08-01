<script lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div>
    <AppHeader />
    <main class="min-h-lvh w-full">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
