<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:grid lg:grid-cols-2  gap-0">
      <div class="text-center col-span-2 flex flex-col lg:text-left max-w-md order-1">
        <h1 class="text-5xl text-center font-bold">
          Login now!
        </h1>
        <p class="py-6 text-center">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
          quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button class="btn bg-[#db4437] w-fit m-auto text-center ml-auto text-white  font-light " @click="authStore.signIn">
          <Icon name="tabler:brand-google-filled" size="20" />
          Login with Google
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
