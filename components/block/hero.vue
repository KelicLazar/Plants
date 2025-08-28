<template>
  <div
    class="hero min-h-screen overflow-hidden"
  >
    <video
      src="/hero-video-2.mp4"
      autoplay
      loop
      playsinline
      muted
      class="w-full  h-full object-cover"
    />

    <div class="hero-overlay bg-base-200/30" />
    <div class="hero-content text-neutral-content md:text-center ">
      <div class="max-w-280 ">
        <h1 class="mb-8 text-5xl md:text-7xl xl:text-8xl font-bold">
          <small class="">Little</small> <span class="relative whitespace-nowrap">G<span class="hidden md:inline">r</span><Icon
            class="text-green-600 md:!hidden md:scale-200 md:px-7 md:my-2"
            name="tabler:plant"
            size="30"
          />een </span> <span class="relative">
            <Icon
              class="!hidden md:!flex absolute  md:-right-20 md:-top-21 z-0 rotate-20 scale-35 md:scale-55 xl:scale-100 text-primary"
              name="tabler:plant"
              size="218"
            />
            <span class="relative z-1">Won<span>d</span>e</span><span>r</span><span class="relative z-1">s</span></span>
        </h1>
        <p class="mb-8 text-lg  md:text-2xl font-serif">
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
