import { eq } from "drizzle-orm";

import db from "..";
import { carts } from "../schema";

export async function getCart(userId: number) {
  return db.query.carts.findMany({
    with: {
      product: true,
    },
    where: eq(carts.userId, userId),
  });
}

export async function addToCart(productId: number, quantity: number, userId: number) {
//   const [inserted] = await db.insert(categories).values({ ...values, slug }).returning();
  const [inserted] = await db.insert(carts).values({ productId, quantity, userId }).returning();
  return inserted;
}

export async function transferAnonymousCart(fromUserId: number, toUserId: number) {
  const updated = await db.update(carts).set({ userId: toUserId }).where(eq(carts.userId, fromUserId));
  console.log(updated);
  return updated;
}
