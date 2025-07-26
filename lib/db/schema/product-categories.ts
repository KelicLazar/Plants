import { int, sqliteTable, } from "drizzle-orm/sqlite-core";

import { categories } from "./category";
import { products } from "./product";

export const productCategories = sqliteTable("product_categories", {
  productId: int().notNull().references(() => products.id, { onDelete: "cascade" }),
  categoryId: int().notNull().references(() => categories.id, { onDelete: "cascade" }),
});
