import { relations } from "drizzle-orm";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";

import { categories } from "./category";
import { products } from "./product";

export const productCategories = sqliteTable("product_categories", {
  productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  categoryId: int("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
});

export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
  product: one(products, {
    fields: [productCategories.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [productCategories.categoryId],
    references: [categories.id],
  }),
}));
