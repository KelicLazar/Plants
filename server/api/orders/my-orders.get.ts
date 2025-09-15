import { getOrdersByUser } from "~/lib/db/queries/order";
import defineUserEventHandler from "~/utils/define-user-event-handler";

export default defineUserEventHandler(async (event) => {
  const orders = await getOrdersByUser(event.context.user.id);
  console.log(orders);

  return { orders };
});
