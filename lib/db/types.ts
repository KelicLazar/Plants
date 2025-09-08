import type db from ".";
import type { getCart } from "./queries/cart";
import type { getOrders, getOrdersByUser } from "./queries/order";
import type { getProducts } from "./queries/product";

// Database or Transaction Type
export type DBorTX = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];
export type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type Product = Awaited<ReturnType<typeof getProducts>>[number];
export type CartItem = Awaited<ReturnType<typeof getCart>>[number];
export type Order = Awaited<ReturnType<typeof getOrdersByUser>>[number];
