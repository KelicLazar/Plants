import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const products = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  price: real().notNull(),
  stock: int().notNull().$default(() => 0),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const InsertProduct = createInsertSchema(products, {
  name: field => field.min(1).max(150),
  description: field => field.max(300),
  price: field => field.int(),
  stock: field => field.int(),
}).extend({
  categoryIds: z.array(z.number().int().min(1)).nonempty("Select at least one category"),
});
