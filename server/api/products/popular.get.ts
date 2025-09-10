import type { DrizzleError } from "drizzle-orm";

import { getMostPopularProducts } from "~/lib/db/queries/product";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const limit = Number(query.limit) || 3;
    const result = await getMostPopularProducts(limit);
    console.log(result, "RESULT FROM POPULAR.GET.TS");

    return result;
  }
  catch (err) {
    const error = err as DrizzleError;
    console.error("Error:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
