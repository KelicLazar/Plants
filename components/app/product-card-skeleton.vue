<template>
  <div class=" bg-base-100 w-full shadow-sm">
    <div
      class="w-full aspect-square skeleton"
    />

    <div class="card-body pb-4 ">
      <h2 class="card-title text-2xl mb-2 w-5/6  h-10 skeleton  " />
      <div class="product-categories flex gap-2 flex-wrap ">
        <div class="  h-4 skeleton w-16" />
        <div class=" h-4 skeleton w-40" />
        <div class=" h-4 skeleton w-30" />
        <div class="  h-4 skeleton w-20" />
      </div>
    </div>
    <div class="card-footer  p-5 pt-2 grid grid-cols-2 gap-5 justify-between  items-end">
      <span class="product-price badge w-full h-8 skeleton " />
      <button class="btn skeleton w-full h-8" />
    </div>
  </div>
</template>
