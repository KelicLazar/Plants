import { getProducts } from "~/lib/db/queries/product";

export default defineEventHandler(async (_) => {
  const result = await getProducts();

  console.log(result);
  return result;
});
