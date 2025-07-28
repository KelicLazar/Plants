<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { AppInputField } from "#components";

import { ProductFormSchema } from "~/lib/db/schema";

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(ProductFormSchema),
});
const { $csrfFetch } = useNuxtApp();
const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);
const submitError = ref("");

const onSubmit = handleSubmit(async (values) => {
  submitError.value = "";
  try {
    const _ = await $csrfFetch("/api/product", {
      method: "post",
      body: values,
    });
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
  <div class="container flex  flex-col max-w-md-mx-auto p-4 max-w-120 m-auto">
    <h1 class="text-lg">
      Add Product
    </h1>
    <p class="text-sm">
      Fill out this form to add new product in store.
    </p>
    <form class="" @submit.prevent="onSubmit">
      <AppInputField :error="errors.name" name="name" label="Name" />
      <AppInputField :error="errors.description" name="description" label="Description" />
      <AppInputField
        :error="errors.price"
        type="number"
        name="price"
        label="Price (in RSD)"
      />
      <AppInputField
        :error="errors.stock"
        type="number"
        name="stock"
        label="Available quantity"
      />
      <!-- Category Multiselect with Checkboxes -->
      <Field
        v-slot="{ field, errorMessage, handleChange }"
        name="categoryIds"
      >
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Categories *</span>
          </label>
          <div
            class="rounded-lg py-3  grid grid-cols-3 gap-2"
            :class="{ 'border-error': errorMessage }"
          >
            <div
              v-for="category in categories"
              :key="category.id"
              class="form-control overflow-hidden"
            >
              <label class="label text-primary-content cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm "
                  :value="category.id"
                  :checked="field.value?.includes(category.id)"
                  @change="(e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const currentValues = field.value || [];
                    let newValues;

                    if (target.checked) {
                      newValues = [...currentValues, category.id];
                    }
                    else {
                      newValues = currentValues.filter((id: number) => id !== category.id);
                    }

                    handleChange(newValues);
                  }"
                >
                <span class="label-text">{{ category.name }}</span>
              </label>
            </div>
            <div v-if="!categories?.length" class="text-gray-500 text-sm">
              No categories available
            </div>
          </div>
          <label v-if="errorMessage" class="label">
            <span class="label-text-alt text-error">{{ errorMessage }}</span>
          </label>
        </div>
      </Field>

      <div class="form-actions w-fit flex gap-2 mt-4 ml-auto ">
        <button class="btn btn-outline" type="button">
          Cancel
        </button>
        <button class="btn btn-primary" type="submit">
          Add Product
        </button>
      </div>
      <p v-if="submitError" class="text-error-content bg-error p-2 mt-4">
        {{ submitError }}
      </p>
    </form>
  </div>
</template>
