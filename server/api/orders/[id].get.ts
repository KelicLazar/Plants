import { getOrderById } from "~/lib/db/queries/order";
import { getOrderItemsByOrderId } from "~/lib/db/queries/order-items";
import defineAnonymousEventHandler from "~/utils/define-anonymous-event-handler";

export default defineAnonymousEventHandler(async (event) => {
  const orderId = getRouterParam(event, "id");
  if (!orderId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Order ID is required",
      }),
    );
  }

  const order = await getOrderById(+orderId);

  if (order.userId !== event.context.user.id) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized.",
        cause: "Unauthorized",
      }),
    );
  }

  if (!order) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Order not found",
      }),
    );
  }
  const orderItems = await getOrderItemsByOrderId(order.id);

  return { order, items: orderItems };
});
