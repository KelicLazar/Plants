import db from "..";
import { carts } from "../schema";

export async function getCart() {
  return db.query.carts.findMany();
}

export async function addToCart(productId: number, quantity: number, userId: number, sessionId: string) {
//   const [inserted] = await db.insert(categories).values({ ...values, slug }).returning();
  const [inserted] = await db.insert(carts).values({ productId, quantity, userId, sessionId }).returning();
  return inserted;
}
