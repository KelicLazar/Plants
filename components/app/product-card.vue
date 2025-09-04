<script lang="ts" setup>
import type { Product } from "~/lib/db/types";

const { product } = defineProps<{
  product: Product;
}>();
const toast = useToast();
// const { $csrfFetch } = useNuxtApp();
// const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();
const isLoading = ref(false);
// const authStore = useAuthStore();

function isNewProduct(createdAt: number, daysAgo: number): boolean {
  const now = Date.now();
  const pastDays = daysAgo * 24 * 60 * 60 * 1000;
  return now - createdAt <= pastDays;
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
        src: product.mainImage || "",
      },
    });
  }
  else {
    toast.add({
      title: `${product.name} added to cart!`,
      color: "success",
      ui: {
        root: "bg-success-200 text-success-content rounded-none",
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
        src: product.mainImage || "",
      },
    });
  }
  isLoading.value = false;
}
</script>

<template>
  <div class="card shadow-sm pb-2 before  before:bg-accent before:left-0 before:h-1.5 before:origin-bottom-left before:bottom-0 before:duration-400 before:scale-x-0 before:scale-y-0 before:transition-all hover:before:scale-y-100 hover:before:scale-x-100  group bg-base-150 w-full  hover:bg-base-200/40  duration-300 transition-all ">
    <NuxtLink
      v-if="product.mainImage || product.sideImage"
      :to="`/products/${product.slug}`"
      class="relative w-full aspect-square overflow-hidden "
    >
      <AppProductImage
        :main-image="product.mainImage"
        :side-image="product.sideImage"
        :alt="product.name"
      />
      <div v-if="isNewProduct(product.createdAt, 7)" class="absolute z-2 top-4 right-4 badge badge-secondary">
        NEW
      </div>
    </NuxtLink>

    <div class="card-body pb-4 px-3">
      <h2 class="card-title text-2xl mb-2">
        <NuxtLink :to="`/products/${product.slug}`">
          {{ product.name }}
        </NuxtLink>
      </h2>
      <div class="product-categories  flex gap-2 flex-wrap ">
        <NuxtLink
          v-for="category in product.productCategories"
          :key="`${category.productId}-${category.categoryId}`"
          :to="`/category/${category.category.slug}`"
          class="badge badge-accent  badge-outline badge-soft flex whitespace-nowrap text-xs hover:bg-accent hover:text-accent-content transition-all"
        >
          {{ category.category.name }}
        </NuxtLink>
      </div>

      <!-- <p>{{ product.description }}</p> -->
    </div>
    <div class="card-footer  p-3 pt-2 flex   justify-between  items-center">
      <span class="product-price  text-sm sm:text-lg badge h-full badge-outline">
        {{ product.price.toLocaleString() }} RSD
      </span>
      <button
        :disabled="isLoading || product.stock < 1"
        class="btn btn-sm sm:btn-md btn-primary  group"
        @click="handleAddToCart(product.id)"
      >
        <template v-if="product.stock < 1">
          <Icon
            name="tabler:shopping-cart-off"
            class=""
            :class="{ 'animate-bounce': isLoading }"
            size="22"
          />
          <span>Out of stock</span>
        </template>
        <template v-else>
          <Icon
            name="tabler:shopping-cart"
            class=""
            :class="{ 'animate-bounce': isLoading }"
            size="22"
          />
          <span>Add to cart</span>
        </template>
      </button>
    </div>
  </div>
</template>
