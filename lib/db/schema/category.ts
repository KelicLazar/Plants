import type z from "zod";

import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { productCategories } from "./product-categories";

export const categories = sqliteTable("categories", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  parentId: int("parent_id"), // null = top level
});
export const categoriesRelations = relations(categories, ({ many }) => ({
  productCategories: many(productCategories),
}));
export const InsertCategory = createInsertSchema(categories, {
  name: field => field.min(1).max(30),
  description: field => field.min(1).max(200),
  parentId: field => field.int().optional(),

}).omit({
  id: true,
  slug: true,
});

// @ts-expect-error nzm
export type InsertCategoryType = z.infer<typeof InsertCategory>;
