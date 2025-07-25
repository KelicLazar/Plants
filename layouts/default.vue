<script lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
