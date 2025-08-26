<script lang="ts" setup>
const productStore = useProductsStore();
const cartStore = useCartStore();
const product = computed(() => productStore.currentProduct);
const status = computed(() => productStore.currentProductStatus);
const isLoading = ref(false);
const toast = useToast();
const bigImage = ref<string>("");
const router = useRouter();

// Set big image when product loads or changes
watch(product, (newProduct) => {
  if (newProduct?.mainImage) {
    bigImage.value = newProduct.mainImage;
  }
}, { immediate: true });

// Fetch product data on mount
onMounted(async () => {
  await productStore.currentProductRefresh();
});

// Helper function to set big image
function setBigImage(imageUrl: string) {
  bigImage.value = imageUrl;
}

async function handleAddToCart(productId: number) {
  isLoading.value = true;

  const res = await cartStore.addToCart(productId);

  if (res.error) {
    toast.add({
      title: res.error,
      description: "",
      color: "error",
      ui: {
        root: "bg-error-200 text-error-content",
      },
      avatar: {
        src: product?.value?.mainImage || "",
      },
    });
  }
  else {
    toast.add({
      title: `${product?.value?.name} added to cart!`,
      color: "success",
      ui: {
        root: "bg-success-200 text-success-content",
      },
      actions: [{
        icon: "tabler:shopping-cart",
        label: "View Cart",
        color: "primary",
        variant: "solid",
        ui: {
          base: "rounded-none cursor-pointer",
        },

        onClick: (_) => {
          router.push("/cart");
        },
      }],
      avatar: {
        src: product?.value?.mainImage || "",
      },
    });
  }
  isLoading.value = false;
}
</script>

<template>
  <section class="product-details-section px-3 pt-4 pb-12  section-container m-0 flex ">
    <!-- Loading State -->

    <div v-if="status === 'pending' || status === 'idle'" class="flex justify-center w-full  items-center min-h-96">
      <AppProductDetailsSkeleton />
    </div>

    <!-- Error State -->
    <div v-else-if="status === 'error'" class="alert alert-error max-w-md mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Failed to load product details</span>
    </div>

    <!-- Success State with Product Data -->
    <div v-else-if="product" class="product-details-card  lg:mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 max-w-140 lg:max-w-280 gap-8">
        <!-- Image Section -->
        <div class="product-images flex flex-col  md:flex-row-reverse md:justify-end md:gap-4">
          <!-- Main Display Image -->
          <div class="main-image  mb-4">
            <div class="w-full aspect-square overflow-hidden  bg-base-200">
              <img
                v-if="bigImage"
                :src="bigImage"
                :alt="product.name"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-base-content/50">
                No image available
              </div>
            </div>
          </div>

          <!-- Thumbnail Images -->
          <div class="thumbnails flex md:flex-col  gap-2">
            <button
              v-if="product.mainImage"
              class="w-20 h-20 overflow-hidden border-2 hover:border-primary transition-colors"
              :class="{ 'border-primary': bigImage === product.mainImage }"
              @click="setBigImage(product.mainImage)"
            >
              <img
                :src="product.mainImage"
                :alt="`${product.name} - Main`"
                class="w-full h-full object-cover"
              >
            </button>

            <button
              v-if="product.sideImage"
              class="w-20 h-20 overflow-hidden  border-2 hover:border-primary transition-colors"
              :class="{ 'border-primary': bigImage === product.sideImage }"
              @click="setBigImage(product.sideImage)"
            >
              <img
                :src="product.sideImage"
                :alt="`${product.name} - Side`"
                class="w-full h-full object-cover"
              >
            </button>
          </div>
        </div>

        <!-- Product Info Section -->
        <div class="product-info">
          <h1 class="text-3xl font-bold mb-4">
            {{ product.name }}
          </h1>

          <div v-if="product.description" class="description mb-6">
            <h3 class="text-base-content/80">
              {{ product.description }}
            </h3>
          </div>

          <div class="stock-info mb-6">
            <span class="badge badge-soft" :class="product.stock > 10 ? 'badge-success' : 'badge-error'">
              {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
            </span>
          </div>

          <!-- Categories -->
          <div v-if="product.productCategories?.length" class="categories mb-6">
            <span class="flex text-lg font-semibold mb-2">
              Categories
            </span>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="pc in product.productCategories"
                :key="pc.categoryId"
                :to="`/category/${pc.category.slug}`"
                class="badge badge-accent  badge-outline badge-soft hover:bg-accent hover:text-accent-content transition-all "
              >
                {{ pc.category.name }}
              </NuxtLink>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="actions flex gap-4 justify-between ">
            <span class="product-price badge  badge-ghost badge-soft  text-lg h-auto">
              {{ product.price }} RSD
            </span>
            <button
              class="btn  group btn-primary flex-1"
              :disabled="product.stock === 0 || isLoading"
              @click="handleAddToCart(product.id)"
            >
              <Icon
                name="tabler:shopping-cart"
                class=" group-hover:animate-bounce"
                :class="{ 'animate-bounce': isLoading }"
                size="22"
              />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Product Found -->
    <div v-else class="alert alert-warning max-w-md mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <span>Product not found</span>
    </div>
  </section>
</template>
