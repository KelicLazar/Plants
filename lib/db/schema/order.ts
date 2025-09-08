import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { addresses } from "./address";
import { user } from "./auth";
import { orderItems } from "./order-item";

export const orders = sqliteTable("orders", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  total: real("total").notNull(),
  addressId: int("address_id").references(() => addresses.id),
  status: text("status").notNull().default("pending"), // pending, paid, shipped, delivered, canceled
  createdAt: int("created_at").notNull().$default(() => Date.now()),
  updatedAt: int("updated_at").notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
  note: text("note"),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),
  orderItems: many(orderItems),
}));
