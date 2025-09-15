import { findProductBySlug } from "~/lib/db/queries/product";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "productslug") || "";

  const product = await findProductBySlug(slug);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found.",
    });
  }
  return product;
});
