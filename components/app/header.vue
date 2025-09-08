<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const header = ref<HTMLElement | null>(null);
const authStore = useAuthStore();
const cartStore = useCartStore();
const cartCount = computed(() => cartStore.cart?.length);

onMounted(() => {
  let prevPosY = window.scrollY;

  if (window.scrollY > 10 && header.value) {
    header.value.classList.add("not-top");
  }

  const onScroll = () => {
    const posY = window.scrollY;

    if (!header.value)
      return;

    if (posY < 10) {
      header.value.classList.remove("not-top");
    }
    else {
      header.value.classList.add("not-top");
    }

    if (posY <= prevPosY || posY <= 0) {
      header.value.classList.remove("hide");
    }
    else {
      header.value.classList.add("hide");
    }

    prevPosY = posY;
  };

  window.addEventListener("scroll", onScroll);

  onUnmounted(() => window.removeEventListener("scroll", onScroll));
});
</script>

<template>
  <div
    ref="header"
    class="my-header z-100 bg-transparent hover:bg-base-100  hover:text-base-content text-base-content min-h-16  fixed w-full flex lg:py-2  flex-col"
  >
    <div class="navbar m-auto px-3 mt-0 max-w-400 flex justify-between">
      <div class="flex-1 flex-row py-2">
        <NuxtLink to="/" class="p-0 flex md:text-xl gap-2">
          <Icon name="tabler:plant" size="24" />
          Small Plants Shop
        </NuxtLink>
      </div>

      <div class="drawer flex max-lg:flex-row-reverse flex-row items-center w-fit drawer-end lg:drawer-open lg:min-h-0">
        <input
          id="my-drawer-2"
          type="checkbox"
          class="drawer-toggle "
        >
        <div class="drawer-content">
          <label
            for="my-drawer-2"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost lg:hidden"
          >
            <Icon name="tabler:menu-3" size="24" />
          </label>
        </div>
        <div class="drawer-side  !overflow-visible  max-lg:h-full lg:h-auto ">
          <label
            for="my-drawer-2"
            aria-label="close sidebar"
            class="drawer-overlay"
          />
          <div class="max-lg:bg-base-200 max-lg:w-7/10 max-lg:text-base-content flex flex-row lg:items-center  min-h-full lg:min-h-0 max-lg:pt-20 max-lg:px-3">
            <AppNavigationMenu />
          </div>
        </div>
        <div class="divider divider-horizontal mx-0" />
        <UiThemeToggle />
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-header {
  transition: all 0.3s;
}
.my-header.hide {
  transform: translateY(-100%);
  box-shadow: unset;
}

/* Optional: custom animation */
@keyframes ping-short {
  0% {
    transform: scale(1.25);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-ping-short {
  animation: ping-short 0.3s ease;
}
</style>
