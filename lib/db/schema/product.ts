import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { productCategories } from "./product-categories";

export const products = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  price: real().notNull(),
  stock: int().notNull().$default(() => 0),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const productsRelations = relations(products, ({ many }) => ({
  productCategories: many(productCategories),
}));

export const InsertProduct = createInsertSchema(products, {
  name: field => field.min(1).max(150),
  description: field => field.max(300),
  price: field => field.int(),
  stock: field => field.int(),
}).omit(
  {
    createdAt: true,
    updatedAt: true,
    id: true,
    slug: true,
  },
);

export const ProductFormSchema = z.object({
  name: z.string().min(1).max(150),
  description: z.string().max(300).nullable(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  categoryIds: z.array(z.number().int().min(1)).nonempty("Select at least one category"),
});

// @ts-expect-error nzm
export type InsertProductType = z.infer<typeof InsertProduct>;
export type ProductFormType = z.infer<typeof ProductFormSchema>;
