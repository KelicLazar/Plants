import { findProductBySlug } from "~/lib/db/queries/product";
import { wait } from "~/utils/wait";

export default defineEventHandler(async (event) => {
  await wait(1);
  const slug = getRouterParam(event, "productslug") || "";

  const product = await findProductBySlug(slug);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "product not found.",
    });
  }
  return product;
});
