<template>
  <div
    class="hero min-h-screen"
  >
    <video
      src="/hero-video-2.mp4"
      autoplay
      loop
      playsinline
      muted
      class="w-full h-full "
    />

    <div class="hero-overlay" />
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-280">
        <h1 class="mb-8 text-8xl font-bold">
          <small class="text-4xl">Little</small> <span class="text-green-600">Green</span> <span class="relative">
            <Icon
              class="absolute -right-20 -top-21 z-0 rotate-20 text-primary"
              name="tabler:plant"
              size="218"
            />
            <span class="relative z-1">Won<span>d</span>e</span><span>r</span><span class="relative z-1">s</span></span>
        </h1>
        <p class="mb-8 text-2xl font-serif">
          Discover a handpicked collection of small cacti and colorful succulents — low-maintenance plants that bring life, charm, and calm to any space. Perfect for desks, shelves, and sunny corners. Rooted in beauty, grown with love.
        </p>
        <NuxtLink to="/products" class="btn btn-primary btn-lg">
          Explore Plants
          <Icon name="tabler:arrow-up-right" size="24" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
