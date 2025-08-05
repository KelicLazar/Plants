<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { InsertCategory } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const categoryStore = useCategoryStore();

const submitError = ref("");
const categories = computed(() => categoryStore.categories);

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertCategory as any),
});

const onSubmit = handleSubmit(async (values) => {
  submitError.value = "";
  try {
    const _ = await $csrfFetch("/api/category", {
      method: "post",
      body: values,
    });

    await categoryStore.refreshCategories();
  }
  catch (e) {
    const error = e as FetchError;
    if (error?.data?.data) {
      setErrors(error.data.data);
    }
    submitError.value = getFetchErrorMessage(error);
  }
});
</script>

<template>
  <div class="container  max-w-md-mx-auto p-4 pt-30 m-auto text-center">
    <h1 class="text-lg">
      Add Product Category
    </h1>
    <p class="text-sm">
      Fill out this form to add new category for the products in store.
    </p>

    <form class="max-w-120 m-auto" @submit.prevent="onSubmit">
      <AppInputField
        :error="errors.name"
        name="name"
        label="Name"
      />
      <AppInputField
        :error="errors.description"
        name="description"
        label="Description"
        type="textarea"
      />
      <Field
        v-slot="{ field, errorMessage, handleChange }"
        name="parentId"
      >
        <label class="block text-left mb-1">Parent Category</label>
        <select

          v-bind="field"
          class="select select-bordered w-full"
          @change="(e:any) => handleChange(e.target?.value === '-1' ? undefined : Number(e.target?.value))"
        >
          <option :value="-1">
            None (Top Level)
          </option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <p v-if="errorMessage" class="text-error text-sm mt-1">
          {{ errorMessage }}
        </p>
      </Field>
      <div class="flex justify-end gap-2 mt-4">
        <button
          class="btn btn-outline"
          type="button"
          @click="router.back"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Add Category
        </button>
      </div>
      <p v-if="submitError" class="text-error-content bg-error p-2 mt-4">
        {{ submitError }}
      </p>
    </form>
  </div>
</template>
