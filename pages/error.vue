<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || "Unknown error";
</script>

<template>
  <div class="card bg-base-400 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4">
    <div role="alert" class="alert alert-error min-w-1/2">
      <Icon name="tabler:circle-x" size="24" />
      <span>Oh no! {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary">
      Home <Icon name="tabler:arrow-left" />
    </NuxtLink>
  </div>
</template>
