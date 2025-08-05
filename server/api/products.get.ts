import type { DrizzleError } from "drizzle-orm";

import type { SortableField } from "~/lib/db/queries/product";

import { getProducts } from "~/lib/db/queries/product";
import { wait } from "~/utils/wait";

export default defineEventHandler(async (event) => {
  await wait(0.5);
  try {
    const query = getQuery(event);
    const limit = Number.parseInt(query.limit as string) || 12;
    const page = Number.parseInt(query.page as string) || 1;
    const orderBy: SortableField = (query.orderBy as SortableField) || "created_at";
    const categorySlug = query.category as string;
    const sort = (query.sort) as string;

    // const sort = query.sort || "desc";

    const result = await getProducts(page, limit, orderBy, sort, categorySlug);

    return result;
  }
  catch (err) {
    const error = err as DrizzleError;
    console.error("Error:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
