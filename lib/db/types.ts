import type db from ".";
import type { getCart } from "./queries/cart";
import type { getProducts } from "./queries/product";

// Database or Transaction Type
export type DBorTX = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];
export type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type Product = Awaited<ReturnType<typeof getProducts>>[number];
export type CartItem = Awaited<ReturnType<typeof getCart>>[number];
