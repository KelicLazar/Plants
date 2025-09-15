import slugify from "slug";

import { findUniqueProductSlug, insertProduct } from "~/lib/db/queries/product";
import { InsertProduct } from "~/lib/db/schema";
import env from "~/lib/env";
import defineAdminEventHandler from "~/utils/define-admin-event-handler";

// server/api/product.post.ts
export default defineAdminEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data received",
    });
  }

  // Extract files and other data
  const mainImageFile = formData.find(item => item.name === "mainImage");
  const sideImageFile = formData.find(item => item.name === "sideImage");

  const getField = (name: string) =>
    formData.find(field => field.name === name && field.type !== "file")?.data.toString().trim();

  // Get required fields
  const name = getField("name");
  const description = getField("description");
  const price = getField("price");
  const stock = getField("stock");
  const categoryIdsRaw = getField("categoryIds");

  if (!name || !price || !stock || !categoryIdsRaw) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: name, price, stock, or categoryIds.",
    });
  }
  // ... extract other fields

  // Parse numeric fields
  const priceNumber = Number(price);
  const stockNumber = Number(stock);

  if (Number.isNaN(priceNumber) || Number.isNaN(stockNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Price and stock must be valid numbers.",
    });
  }

  let categoryIds: string[] = [];
  try {
    categoryIds = JSON.parse(categoryIdsRaw);
    if (!Array.isArray(categoryIds))
      throw new Error("Failed");
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid categoryIds format. Must be an array.",
    });
  }

  // Upload images
  let mainImageUrl, sideImageUrl;

  if (mainImageFile?.data) {
    mainImageUrl = await uploadImage(mainImageFile);
  }

  if (sideImageFile?.data) {
    sideImageUrl = await uploadImage(sideImageFile);
  }
  if (!mainImageUrl || !sideImageUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "Main and Side image are required.",
    });
  }

  const slug = await findUniqueProductSlug(slugify(name));

  const productData = { mainImage: mainImageUrl, sideImage: sideImageUrl, name, description, price: +price, stock: +stock };

  const validateData = InsertProduct.parse(productData);

  return await insertProduct({ ...validateData, slug, categoryIds });
});

// Updated upload function for multipart data
async function uploadImage(fileItem: any) {
  // Convert buffer to base64 for Cloudinary
  const base64File = `data:${fileItem.type};base64,${fileItem.data.toString("base64")}`;

  const formData = new FormData();
  formData.append("file", base64File);
  formData.append("upload_preset", env.CLAUDINARY_PRESET);
  formData.append("public_id", fileItem.filename || `${Date.now()}`);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLAUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data.error) {
      console.error("Cloudinary error:", data.error);
      throw new Error(data.error.message);
    }

    return data.secure_url; // Return just the URL
  }
  catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
