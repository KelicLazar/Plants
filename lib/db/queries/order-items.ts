import { eq } from "drizzle-orm";

import type { CartItem, DBorTX } from "../types";

import database from "..";
import { orderItems } from "../schema";

export async function insertOrderItem(orderId: number, values: CartItem[], db: DBorTX = database) {
  const orderItemsData = values.map(item => ({
    orderId,
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,
  }));
  const [inserted] = await db.insert(orderItems).values(orderItemsData).returning();
  return inserted;
}

export async function getOrderItemsByOrderId(orderId: number) {
  return database.query.orderItems.findMany({
    with: {
      product: true,
    },
    where: eq(orderItems.orderId, orderId),
  });
}
