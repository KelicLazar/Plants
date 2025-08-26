<script lang="ts" setup>
const authStore = useAuthStore();

// Initialize session first
const sessionData = await authStore.init();

// If no user exists after init, sign in anonymously
if (!sessionData?.data?.value?.user) {
  await authStore.signInAnonymously();
}
</script>

<template>
  <div>
    <AppHeader />
    <main class="min-h-lvh w-full bg-base-100 text-base-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
