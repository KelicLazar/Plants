import { deleteCartItem } from "~/lib/db/queries/cart";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized!!!",
    }));
  }
  const body = await readBody(event);

  if (body.cartId) {
    const removed = await deleteCartItem(body.cartId);

    return removed;
  }
});
