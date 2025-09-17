import { and, desc, eq } from "drizzle-orm";

import type { DBorTX } from "../types";

import database from "..";
import { orders } from "../schema";

export async function insertOrder(userId: number, addressId: number, total: number, note: string | undefined, db: DBorTX = database) {
  const [inserted] = await db.insert(orders).values({ userId, total, addressId, note }).returning();
  return inserted;
}

export async function getOrderById(orderId: number) {
  const [order] = await database
    .select()
    .from(orders)
    .where(and(eq(orders.id, orderId)))
    .limit(1);

  return order;
}

export async function getOrdersByUser(userId: number) {
  return database.query.orders.findMany({
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
    where: eq(orders.userId, userId),
    orderBy: desc(orders.createdAt),
  });
}
export async function getOrders() {
  return database.select().from(orders);
}
