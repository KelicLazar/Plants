<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { AppInputField } from "#components";

import { ProductFormSchema } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();
const categoryStore = useCategoryStore();
const productStore = useProductsStore();
const submitError = ref("");
const mainPreview = ref("");
const sidePreview = ref("");

const categories = computed(() => categoryStore.categories);

const { handleSubmit, errors, setErrors, meta } = useForm({
  validationSchema: toTypedSchema(ProductFormSchema),
});

function selectImage(event: Event, isSide: boolean = false) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // image.value = file;
    if (isSide) {
      sidePreview.value = URL.createObjectURL(file);
    }
    else {
      mainPreview.value = URL.createObjectURL(file);
    }
  }
}
const onSubmit = handleSubmit(async (formValues) => {
  // console.log("submiting");
  // console.log(formValues);
  submitError.value = "";
  try {
    // Create FormData instead of sending JSON
    const formData = new FormData();
    if (formValues.mainImage) {
      formData.append("mainImage", formValues.mainImage);
    }
    if (formValues.sideImage) {
      formData.append("sideImage", formValues.sideImage);
    }
    // Add text fields
    formData.append("name", formValues.name);
    formData.append("description", formValues.description || "");
    formData.append("price", formValues.price.toString());
    formData.append("stock", formValues.stock.toString());

    // Add category IDs as JSON string or individual entries
    if (formValues.categoryIds && formValues.categoryIds.length > 0) {
      formData.append("categoryIds", JSON.stringify(formValues.categoryIds));
    }

    const res = await $csrfFetch("/api/product", {
      method: "post",
      body: formData,
    });
    if (res.id) {
      productStore.refreshProducts();
      navigateTo("/products");
    }
    // console.log(res, "?????res");
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
  <div class="container flex pt-30 flex-col max-w-md-mx-auto p-4 max-w-120 m-auto">
    <h1 class="text-lg">
      Add Product
    </h1>
    <p class="text-sm">
      Fill out this form to add new product in store.
    </p>
    <div class="form-wrapper">
      <form class="" @submit.prevent="onSubmit">
        <AppInputField
          :error="errors.name"
          name="name"
          label="Name"
        />
        <AppInputField
          :error="errors.description"
          type="textarea"
          name="description"
          label="Description"
        />

        <div class="grid grid-cols-2 gap-4">
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
        </div>
        <div class="grid grid-cols-2 gap-4 my-3">
          <div>
            <Field v-slot="{ handleChange, handleBlur, errorMessage }" name="mainImage">
              <label class="block mb-1 font-medium">Main Image</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                class="file-input file-input-bordered  w-full"
                @change="(e) => { handleChange(e, true);selectImage(e) }"
                @blur="handleBlur"
              >
              <p v-if="errorMessage" class="text-error mt-1 text-sm">
                {{ errorMessage }}
              </p>
              <img
                v-if="mainPreview"
                class="aspect-square mt-2"
                :src="mainPreview"
                alt=""
              >
            </Field>
          </div>
          <div>
            <Field v-slot="{ handleChange, handleBlur, errorMessage }" name="sideImage">
              <label class="block mb-1 font-medium">Side Image </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                class="file-input file-input-bordered  w-full"
                @change="(e) => { handleChange(e, true);selectImage(e, true) }"
                @blur="handleBlur"
              >
              <p v-if="errorMessage" class="text-error mt-1 text-sm">
                {{ errorMessage }}
              </p>

              <img
                v-if="sidePreview"
                class="aspect-square mt-2"
                :src="sidePreview"
                alt=""
              >
            </Field>
          </div>
        </div>

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
              class="rounded-lg py-3  grid grid-rows-3 grid-flow-col md:grid-cols-3 md:grid-flow-row overflow-auto gap-2"
              :class="{ 'border-error': errorMessage }"
            >
              <div
                v-for="category in categories"
                :key="category.id"
                class="form-control md:overflow-hidden"
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
                  <span class="label-text text-base-content">{{ category.name }}</span>
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
          <button
            class="btn btn-outline"
            type="button"
            @click="() => console.log(errors, meta)"
          >
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
  </div>
</template>
