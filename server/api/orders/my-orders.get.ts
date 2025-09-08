import { getOrdersByUser } from "~/lib/db/queries/order";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized!!!",
    }));
  }

  const orders = await getOrdersByUser(event.context.user.id);
  console.log(orders);

  return { orders };
});
