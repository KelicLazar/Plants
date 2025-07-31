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
    // fallback if unsupported
    useColorMode().preference = theme;
    return;
  }

  document.startViewTransition(() => {
    useColorMode().preference = theme;
  });
}
</script>

<template>
  <div class="dropdown">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      Theme
      <svg
        width="12px"
        height="12px"
        class="inline-block h-2 w-2 fill-current opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
      >
        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
      </svg>
    </div>
    <ul
      data-lenis-prevent
      tabindex="0"
      class="dropdown-content bg-accent text-accent-content rounded-box z-1 w-52 p-2 shadow-2xl max-h-96 overflow-y-auto"
      @keydown.tab.stop
    >
      <li v-for="theme, index in themes" :key="theme">
        <input
          :tabindex="index"
          type="radio"
          :value="theme"
          name="theme-dropdown"
          class="btn theme-controller btn-sm btn-block btn-ghost justify-start"
          :aria-label="theme.charAt(0).toUpperCase() + theme.slice(1)"
          @change="setTheme(theme)"
        >
      </li>
    </ul>
  </div>
</template>
