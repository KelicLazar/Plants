import { and, eq } from "drizzle-orm";

import type { InsertCartType } from "~/lib/db/schema";

import db from "..";
import { carts } from "../schema";

export async function getCart(userId: number = 1) {
  return db.query.carts.findMany({
    with: {
      product: true,
    },
    where: eq(carts.userId, userId),
  });
}

export async function addToCart(data: InsertCartType) {
//   const [inserted] = await db.insert(categories).values({ ...values, slug }).returning();

  const existing = await db.query.carts.findFirst({
    where:
    and(
      eq(carts.userId, data.userId),
      eq(carts.productId, data.productId),
    ),
  });
  console.log("EXISTING", existing);
  if (existing) {
    const newQuantity = existing.quantity + 1;
    return updateCart(existing.id, newQuantity);
  }
  else {
    const [inserted] = await db.insert(carts).values({ ...data }).returning();
    return inserted;
  }
}

export async function updateCart(cartId: number, newQuantity: number) {
  const [updated] = await db.update(carts).set({ quantity: newQuantity }).where(eq(carts.id, cartId)).returning();
  return updated;
}

export async function transferAnonymousCart(fromUserId: number, toUserId: number) {
  const updated = await db.update(carts).set({ userId: toUserId }).where(eq(carts.userId, fromUserId));
  console.log(updated);
  return updated;
}

export async function deleteCartItem(cartId: number) {
  const [deleted] = await db.delete(carts)
    .where(
      eq(carts.id, cartId),
    )
    .returning();

  return deleted;
}
