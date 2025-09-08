import type { DrizzleError } from "drizzle-orm";

import { getRandomProducts } from "../../lib/db/queries/product";

export default defineEventHandler(async (_) => {
  try {
    const result = await getRandomProducts(3);
    return result;
  }
  catch (err) {
    const error = err as DrizzleError;
    console.error("Error:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
