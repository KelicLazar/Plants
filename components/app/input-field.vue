<script lang="ts" setup>
const props = defineProps<
  {
    error?: string;
    label: string;
    name: string;
    type?: string;
    disabled?: boolean;
    value?: string;
  }
>();
</script>

<template>
  <fieldset class="fieldset flex justify-start flex-col ">
    <legend class="fieldset-legend text-left">
      {{ props.label }}
    </legend>
    <Field
      :value="props.value"
      :disabled="props.disabled"
      :as="type === 'textarea' ? 'textarea' : 'input'"
      :name="name"
      :type="type || 'text'"
      class="w-full flex"
      :class="{ 'input-error': props.error,
                'input': !type || type !== 'textarea',
                'textarea': type === 'textarea' }"
    />
    <div v-if="props.error" class="label text-error">
      {{ props.error }}
    </div>
  </fieldset>
</template>
