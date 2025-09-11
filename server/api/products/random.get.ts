import type { DrizzleError } from "drizzle-orm";

import { getRandomProducts } from "~/lib/db/queries/product";

export default defineCachedEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const limit = Number(query.limit) || 3;
    const exclude = Number(query.exclude) || 0;
    const result = await getRandomProducts(limit, exclude);
    return result;
  }
  catch (err) {
    const error = err as DrizzleError;
    console.error("Error:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
}, {
  maxAge: 60 * 60 * 24, // 24h
  name: "random-products",
  getKey: async (event) => {
    const query = getQuery(event);
    const limit = query.limit || "3";
    const exclude = query.exclude || 0;
    return `random-products-${limit}-${exclude}`;
  },
  swr: true,
  varies: ["limit", "exclude"],
});
