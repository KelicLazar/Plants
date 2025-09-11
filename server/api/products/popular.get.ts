import type { DrizzleError } from "drizzle-orm";

import { getMostPopularProducts } from "~/lib/db/queries/product";

export default defineCachedEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const limit = Number(query.limit) || 3;
    const result = await getMostPopularProducts(limit);

    return result;
  }
  catch (err) {
    const error = err as DrizzleError;
    console.error("Error:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
}, {
  maxAge: 60 * 60 * 24, // 24h
  name: "popular-products",
  getKey: async (event) => {
    const query = getQuery(event);
    const limit = query.limit || "3";
    return `popular-products-${limit}`;
  },
  swr: true,
  varies: ["limit"],
});
