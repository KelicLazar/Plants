<script lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div>
    <AppHeader />
    <main class="pt-30 min-h-lvh">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
