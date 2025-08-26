<script setup lang="ts">
import type { NuxtError } from "#app";

const _ = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="min-h-screen bg-base-200 text-base-content flex items-center  justify-center flex-col">
    <div class="error-wrapper w-full text-center max-w-120 flex flex-col gap-2 p-3">
      <h2 class="text-error font-bold text-xl">
        {{ error?.statusCode }} {{ error?.message }}
      </h2>
      <button class="btn btn-error" @click="handleError">
        Clear errors
      </button>
    </div>
  </div>
</template>
