import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { findUniqueProductSlug, insertProduct } from "~/lib/db/queries/product";
import { ProductFormSchema } from "~/lib/db/schema";
import sendZodError from "~/utils/send-zod-error";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, ProductFormSchema.safeParse);
  // console.log("Result", result);
  if (!result.success) {
    return sendZodError(event, result.error as any);
  }
  const slug = await findUniqueProductSlug(slugify(result.data.name));
  let product;

  try {
    product = await insertProduct({ ...result.data, slug });
  }
  catch (e) {
    const error = e as DrizzleError;
    console.log("insert Error", error.message);
    throw error;
  }

  console.log("PRoduct", product);
});
