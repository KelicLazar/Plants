import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./auth";

export const addresses = sqliteTable("addresses", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  streetAddress: text("street_address").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  phone: text("phone"),
  createdAt: int("created_at").notNull().$default(() => Date.now()),
});

export const addressRelations = relations(addresses, ({ one }) => ({
  user: one(user, {
    fields: [addresses.userId],
    references: [user.id],
  }),
}));

export const InsertAddressSchema = createInsertSchema(addresses, {
  firstName: field => field.min(1),
  lastName: field => field.min(1),
  streetAddress: field => field.min(1),
  city: field => field.min(1),
  postalCode: field => field.min(1),
  country: field => field.min(1),
  phone: field => field.regex(/^\d{7,15}$/, {
    message: "Phone number must be 7-15 digits",
  }),
}).omit({
  userId: true,
  id: true,
  createdAt: true,
});

// @ts-expect-error nzm
export type InsertAddressType = z.infer<typeof InsertAddressSchema>;
