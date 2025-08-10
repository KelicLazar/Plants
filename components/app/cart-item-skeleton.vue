<script lang="ts" setup>
// No props needed for skeleton component
</script>

<template>
  <tr class="hover">
    <!-- Remove Button Column -->
    <td>
      <div class="btn btn-sm  skeleton h-8 w-8" />
    </td>

    <!-- Product Info Column -->
    <td>
      <div class="flex items-center gap-3">
        <!-- Product Image Skeleton -->
        <div class="avatar">
          <div class="h-16 w-16 skeleton " />
        </div>

        <!-- Product Details Skeleton -->
        <div class="flex flex-col gap-2">
          <!-- Product Name -->
          <div class="skeleton h-4 w-32" />
          <!-- Product Description -->
          <div class="skeleton h-3 w-48" />
        </div>
      </div>
    </td>

    <!-- Price Column -->
    <td>
      <div class="flex w-25 flex-col gap-2">
        <!-- Price Skeleton -->
        <div class="skeleton h-6 w-20" />
        <!-- Stock Badge Skeleton -->
        <div class="skeleton h-5 w-16 " />
      </div>
    </td>

    <!-- Quantity Controls Column -->
    <td>
      <div class="flex gap-2 items-center">
        <!-- Minus Button -->
        <div class="skeleton btn btn-sm rounded-full   h-8 w-8" />

        <!-- Quantity Input -->
        <div class="skeleton h-8 w-16 " />

        <!-- Plus Button -->
        <div class="skeleton btn btn-sm rounded-full h-8 w-8" />
      </div>
    </td>

    <!-- Total Price Column -->
    <td
      class=""
    >
      <div
        class="w-30 ml-auto"
      >
        <div class="skeleton h-6 w-24 " />
      </div>
    </td>
  </tr>
</template>
