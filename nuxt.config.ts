import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
import "./lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
    "@vueuse/nuxt",
  ],
  eslint: {
    config: {
      standalone: false, // <---
    },
  },
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    dataValue: "theme",
  },
  experimental: {
    typedPages: true,
  },
});
