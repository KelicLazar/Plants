import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const carts = sqliteTable("carts", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id"), // NULL for unauthenticated users
  sessionId: text("session_id").notNull(), // For tracking unauthenticated users
  productId: int("product_id").notNull(),
  quantity: int("quantity").notNull().default(1),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const insertCartSchema = createInsertSchema(carts, {
  quantity: field => field.int().min(1).max(999),
  productId: field => field.int().positive(),
  userId: field => field.int(),
});
