export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server)
    return;

  const authStore = useAuthStore();

  if (to.path.startsWith("/admin")) {
    if (!authStore.user || authStore.user.role !== "admin") {
      return navigateTo("/login");
    }
  }

  if (to.path.startsWith("/user")) {
    if (!authStore.user || authStore.user.isAnonymous) {
      return navigateTo("/login");
    }
  }
});
