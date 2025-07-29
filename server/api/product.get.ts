import type { DrizzleError } from "drizzle-orm";

import { getProducts } from "~/lib/db/queries/product";

export default defineEventHandler(async (event) => {
  try {
    console.log("Reached handler");

    const query = getQuery(event);
    const limit = Number.parseInt(query.limit as string) || 12;
    const page = Number.parseInt(query.page as string) || 1;

    const result = await getProducts(page, limit);
    console.log("Result:", limit, page);

    return result;
  }
  catch (err) {
    const error = err as DrizzleError;
    console.error("Error:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
