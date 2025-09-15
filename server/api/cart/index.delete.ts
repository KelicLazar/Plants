import { deleteCartItem } from "~/lib/db/queries/cart";
import defineAnonymousEventHandler from "~/utils/define-anonymous-event-handler";

export default defineAnonymousEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.cartId) {
    const removed = await deleteCartItem(body.cartId);

    return removed;
  }
});
