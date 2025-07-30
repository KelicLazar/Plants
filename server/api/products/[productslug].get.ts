import { findProductBySlug } from "~/lib/db/queries/product";
import { wait } from "~/utils/wait";

export default defineEventHandler(async (event) => {
  await wait(1);
  const slug = getRouterParam(event, "productslug") || "";
  console.log("2222222222222222222", slug);

  const product = await findProductBySlug(slug);
  console.log("curr product", product);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "product not found.",
    });
  }
  return product;
});
