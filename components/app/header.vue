<script lang="ts" setup>
const header = ref();

onMounted(() => {
  let prevPosY = window.scrollY;
  if (window.scrollY > 10) {
    header.value.classList.add("not-top");
  }
  addEventListener("scroll", () => {
    const posY = window.scrollY;
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
  });
});
</script>

<template>
  <div class="drawer drawer-end z-100">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
    >
    <div ref="header" class="my-header drawer-content z-50 bg-accent text-accent-content min-h-16 lg:py-2 fixed w-full  flex flex-col">
      <!-- Navbar -->
      <div class="navbar  m-auto px-3 lg:px-0 mt-0 max-w-400">
        <div class=" flex-1 py-2">
          <span class="p-2 text-xl">Nuxt Starter Theme</span>
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <li><a>Navbar Item 1</a></li>
            <li><a>Navbar Item 2</a></li>
          </ul>
        </div>
        <UiThemeToggle />
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay" />
      <ul class="menu bg-base-300 flex text-2xl top-20 z-50 w-full max-w-100  min-h-full w-80 p-4 pt-30">
        <!-- Sidebar content here -->
        <li class="hover:bg-primary hover:text-primary-content ">
          <a class="py-0">Sidebar Item 1</a>
        </li>
        <li class="hover:bg-primary hover:text-primary-content ">
          <a class="py-0">Sidebar Item 2</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.my-header {
  transition: all 0.3s;
}
.my-header.not-top {
  box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.164);
}
.my-header.hide {
  transform: translateY(-100%);
  box-shadow: unset;
}
</style>
