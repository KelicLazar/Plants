import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient({
  plugins: [
    anonymousClient(),
  ],
});

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    // console.log("!!!!|", data, "DATA");

    session.value = data;
    return data; // Return session data so component can check user status
  }
  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/products",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }
  async function signInAnonymously() {
    // console.log("loging incognito");

    try {
      const { csrf } = useCsrf();
      const headers = new Headers();
      headers.append("csrf-token", csrf);
      const user = await authClient.signIn.anonymous({
        fetchOptions: {
          headers,
        },
      });
      // console.log("Anonymous user created:", user);
      return user;
    }
    catch (error) {
      console.error("Failed to sign in anonymously:", error);
      throw error;
    }
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({ fetchOptions: {
      headers,
    } });
    navigateTo("/");
    await signInAnonymously();
  }
  return {
    loading,
    signIn,
    init,
    user,
    signOut,
    signInAnonymously,
  };
});
