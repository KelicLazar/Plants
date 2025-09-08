<!-- pages/[...slug].vue -->
<template>
  <div class="min-h-screen flex flex-col items-center relative justify-center text-center overflow-hidden">
    <img
      src="../public/error.404.png"
      alt=""
      class="absolute size-full top-1/2 left-1/2 w-1/1 -translate-x-1/2 -translate-y-1/2 brightness-50  object-cover "
    >
    <div class="z-1">
      <h1 class="text-8xl font-bold text-green-600 hover:text-orange-500 transition-colors cursor-default">
        404
      </h1>
      <p class="mt-4 text-xl">
        Oops! The page you are looking for does not exist.
      </p>
      <NuxtLink to="/" class="mt-6 btn bg-orange-500 text-black shadow-2xl hover:bg-green-600 transition-colors">
        Go back home
        <Icon name="tabler:home" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
