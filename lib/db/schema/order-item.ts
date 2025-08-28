import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { orders } from "./order";
import { products } from "./product";

export const orderItems = sqliteTable("order_items", {
  id: int("id").primaryKey({ autoIncrement: true }),
  orderId: int("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: int("product_id").notNull().references(() => products.id),
  quantity: int("quantity").notNull(),
  price: real("price").notNull(),
});

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
