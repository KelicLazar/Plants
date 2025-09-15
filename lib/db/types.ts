import type { UserWithAnonymous, UserWithRole } from "better-auth/plugins";
import type { H3Event, H3EventContext } from "h3";
import type { RouteLocationRaw } from "vue-router";

import type db from ".";
import type { getCart } from "./queries/cart";
import type { getOrdersByUser } from "./queries/order";
import type { getProducts } from "./queries/product";

// Database or Transaction Type
export type DBorTX = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];
export type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type Product = Awaited<ReturnType<typeof getProducts>>[number];
export type CartItem = Awaited<ReturnType<typeof getCart>>[number];
export type Order = Awaited<ReturnType<typeof getOrdersByUser>>[number];

export type Link = { label?: string; icon?: string; to?: RouteLocationRaw; description: string };

export type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: UserWithAnonymous & UserWithRole & { id: number };
  };
};
