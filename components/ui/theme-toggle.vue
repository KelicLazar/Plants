<script lang="ts" setup>
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "autumn-dark",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

function setTheme(theme: string) {
  if (!document.startViewTransition) {
    useColorMode().preference = theme;
    return;
  }

  document.startViewTransition(() => {
    useColorMode().preference = theme;
  });
}
</script>

<template>
  <div class="dropdown dropdown-end group m-0 p-0 h-unset self-stretch">
    <!-- Trigger button (use button for reliable focus) -->
    <button
      type="button"
      class="btn border-0 h-full px-4 py-2 shadow-none outline-0 bg-transparent hover:bg-base-200 focus:outline-none"
    >
      <div
        class="grid shrink-0 grid-cols-2 gap-0.5 p-1 transition-all
               group-hover:border-base-content/20
               group-focus-within:border-base-content/20
               group-[.dropdown-open]:border-base-content/20"
      >
        <!-- Square 1 -->
        <div
          class="bg-base-content size-1.5 transition-all delay-50 duration-500
                 group-hover:translate-x-3.5 group-focus-within:translate-x-3.5 group-[.dropdown-open]:translate-x-3.5
                 group-hover:rotate-[130deg] group-focus-within:rotate-[130deg] group-[.dropdown-open]:rotate-[130deg]"
        />
        <!-- Square 2 -->
        <div
          class="bg-primary size-1.5 transition-all delay-100 duration-300
                 group-hover:translate-y-2 group-focus-within:translate-y-2 group-[.dropdown-open]:translate-y-2
                 group-hover:rotate-[60deg] group-focus-within:rotate-[60deg] group-[.dropdown-open]:rotate-[60deg]"
        />
        <!-- Square 3 -->
        <div
          class="bg-secondary size-1.5 transition-all delay-150 duration-300
                 group-hover:-translate-y-2 group-focus-within:-translate-y-2 group-[.dropdown-open]:-translate-y-2
                 group-hover:-rotate-[70deg] group-focus-within:-rotate-[70deg] group-[.dropdown-open]:-rotate-[70deg]"
        />
        <!-- Square 4 -->
        <div
          class="bg-accent size-1.5 transition-all delay-200 duration-300
                 group-hover:-translate-x-2.5 group-focus-within:-translate-x-2.5 group-[.dropdown-open]:-translate-x-2.5
                 group-hover:translate-y-1 group-focus-within:translate-y-1 group-[.dropdown-open]:translate-y-1
                 group-hover:-rotate-[150deg] group-focus-within:-rotate-[150deg] group-[.dropdown-open]:-rotate-[150deg]"
        />
      </div>

      <!-- Chevron that also rotates when open -->
      <Icon
        name="tabler:chevron-down"
        class="theme-dropdown-arrow transition-transform duration-200
               group-hover:rotate-180 group-focus-within:rotate-180 group-[.dropdown-open]:rotate-180"
      />
    </button>

    <!-- Dropdown list -->
    <ul
      data-lenis-prevent
      tabindex="0"
      class="dropdown-content bg-base-100 text-base-content rounded-box z-1 w-52 p-2 shadow-2xl max-h-96 overflow-y-auto"
      @keydown.tab.stop
    >
      <li v-for="(theme, index) in themes" :key="theme">
        <input
          :tabindex="index"
          type="radio"
          :value="theme"
          name="theme-dropdown"
          class="btn theme-controller btn-sm btn-block btn-ghost justify-start hover:bg-base-300"
          :class="{ '!bg-primary': theme === useColorMode().preference, '!text-primary-content': theme === useColorMode().preference }"
          :aria-label="theme.charAt(0).toUpperCase() + theme.slice(1)"
          @change="setTheme(theme)"
        >
      </li>
    </ul>
  </div>
</template>
