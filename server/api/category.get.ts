import { getCategories } from "~/lib/db/queries/category";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized!!!",
    }));
  }
  const result = await getCategories();

  console.log(result);
  return result;
});
