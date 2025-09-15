<script lang="ts" setup>
const authStore = useAuthStore();

authStore.signOut();
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <div class="flex justify-center mb-4">
          <div class="loading loading-spinner loading-lg text-primary" />
        </div>
        <h2 class="card-title justify-center text-2xl mb-2">
          Logging out...
        </h2>
        <p class="text-base-content/70">
          Please wait while we securely sign you out.
        </p>
        <div class="divider" />
        <p class="text-sm text-base-content/50">
          You'll be redirected shortly.
        </p>
      </div>
    </div>
  </div>
</template>
