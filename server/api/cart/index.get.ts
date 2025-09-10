import type { CartItem } from "~/lib/db/types";

import { deleteCartItem, getCart, updateCart } from "~/lib/db/queries/cart";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized!!!",
    }));
  }
  let cart = await getCart(event.context.user.id);
  const changes: { item: CartItem; status: "updated" | "removed" }[] = [];
  for (const item of cart) {
    if (item.product.stock <= 0) {
      // Remove item if stock is 0
      await deleteCartItem(item.id);
      changes.push({ item, status: "removed" });
    }
    else if (item.quantity > item.product.stock) {
      // Cap quantity to stock
      await updateCart(item.id, item.product.stock);
      changes.push({ item, status: "updated" });
      item.quantity = item.product.stock;
    }
  }
  if (changes) {
    cart = await getCart(event.context.user.id);
  }

  return { cart, changes };
});
