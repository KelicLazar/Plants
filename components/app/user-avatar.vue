<script lang="ts" setup>
import type { User } from "better-auth";

const { user } = defineProps<
{

  user: User;
}
>();
</script>

<template>
  <div class="avatar avatar-placeholder h-full w-full p-0 aspect-square">
    <div class="bg-neutral flex  text-neutral-content  w-8 h-8  rounded-full">
      <img
        v-if="user.image"
        :src="user?.image"
        alt=""
      >
      <span v-else class="">
        {{ user.name.charAt(0).toUpperCase() }}
        {{ user.name.charAt(1).toUpperCase() }}
      </span>
    </div>
  </div>
</template>
