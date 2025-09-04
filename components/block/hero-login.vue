<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content bg-base-300 p-12 rounded-xl shadow-xl flex-col lg:grid lg:grid-cols-2  gap-0">
      <div class="text-center col-span-2 flex flex-col lg:text-left max-w-md order-1">
        <h1 class="text-5xl text-center font-bold">
          Login now!
        </h1>
        <p class="py-6 text-center">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>

        <button
          type="button"
          class=" text-white w-full cursor-pointer bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2 mr-2 mb-2"
          @click="authStore.signIn"
        >
          <Icon name="tabler:brand-google-filled" size="20" />Login with Google<div />
        </button>
      </div>
      <div class="card hidden bg-base-100 w-full max-w-sm shrink-0 lg:flex-1 shadow-2xl">
        <div class="card-body">
          <fieldset class="fieldset">
            <label class="label">Email</label>
            <input
              type="email"
              class="input"
              placeholder="Email"
            >
            <label class="label">Password</label>
            <input
              type="password"
              class="input"
              placeholder="Password"
            >
            <div><a class="link link-hover">Forgot password?</a></div>
            <button class="btn btn-primary mt-4">
              Login
            </button>
            <div class="divider">
              OR
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
