import type z from "zod";

import { relations } from "drizzle-orm";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { products } from "./product";

export const carts = sqliteTable("carts", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id").notNull(), // NULL for unauthenticated users
  productId: int("product_id").notNull(),
  quantity: int("quantity").notNull().default(1),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const cartRelations = relations(carts, ({ one }) => ({
  product: one(products, {
    fields: [carts.productId],
    references: [products.id],
  }),
}));

export const insertCartSchema = createInsertSchema(carts, {
  quantity: field => field.int().min(1).max(999),
  productId: field => field.int().positive(),
  userId: field => field.int().positive(),
});
// @ts-expect-error nzm
export type InsertCartType = z.infer<typeof insertCartSchema>;
