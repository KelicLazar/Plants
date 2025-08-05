<template>
  <section class="product-details-section section-container">
    <div class="product-details-card max-w-280 mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 max-w-140 lg:max-w-280 gap-8">
        <!-- Image Section Skeleton -->
        <div class="product-images flex flex-col  md:flex-row-reverse md:justify-end md:gap-4">
          <!-- Main Display Image Skeleton -->
          <div class="main-image mb-4 flex-1">
            <div class="w-full aspect-square overflow-hidden bg-base-200">
              <div class="skeleton w-full h-full" />
            </div>
          </div>

          <!-- Thumbnail Images Skeleton -->
          <div class="thumbnails flex flex-row md:flex-col gap-2">
            <div class="w-20 h-20 overflow-hidden ">
              <div class="w-full h-full skeleton" />
            </div>
            <div class="w-20 h-20 overflow-hidden ">
              <div class="w-full h-full skeleton" />
            </div>
          </div>
        </div>

        <!-- Product Info Section Skeleton -->
        <div class="product-info">
          <!-- Product Name Skeleton -->
          <div class="mb-4">
            <div class="skeleton h-9 w-3/4 mb-2" />
            <div class="skeleton h-9 w-1/2" />
          </div>

          <!-- Description Skeleton -->
          <div class="description mb-6">
            <div class="skeleton h-6 w-24 mb-2" />
            <div class="skeleton h-4 w-full mb-2" />
            <div class="skeleton h-4 w-full mb-2" />
            <div class="skeleton h-4 w-2/3" />
          </div>

          <!-- Stock Info Skeleton -->
          <div class="stock-info mb-6">
            <div class="skeleton h-6 w-32" />
          </div>

          <!-- Categories Skeleton -->
          <div class="categories mb-6">
            <div class="skeleton h-6 w-20 mb-2" />
            <div class="flex flex-wrap gap-2">
              <div class="skeleton h-6 w-16" />
              <div class="skeleton h-6 w-20" />
              <div class="skeleton h-6 w-14" />
            </div>
          </div>

          <!-- Action Buttons Skeleton -->
          <div class="actions flex gap-4 items-center">
            <!-- Price Skeleton -->
            <div class="price">
              <div class="skeleton h-12 w-24" />
            </div>
            <!-- Button Skeleton -->
            <div class="skeleton h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
