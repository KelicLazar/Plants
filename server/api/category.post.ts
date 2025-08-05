import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { findCategoryByName, findUniqueCategorySlug, insertCategory } from "~/lib/db/queries/category";
import { InsertCategory } from "~/lib/db/schema";
import sendZodError from "~/utils/send-zod-error";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized!!!",
    }));
  }
  const result = await readValidatedBody(event, InsertCategory.safeParse);
  if (!result.success) {
    return sendZodError(event, result.error as any);
  }
  const existingCategory = await findCategoryByName(result.data.name);
  if (existingCategory) {
    throw createError({
      statusCode: 409,
      statusMessage: "A category with that name already exists.",
    });
  }

  const slug = await findUniqueCategorySlug(slugify(result.data.name));

  try {
    return await insertCategory(result.data, slug);
  }
  catch (e) {
    const error = e as DrizzleError;
    throw error;
  }
});
