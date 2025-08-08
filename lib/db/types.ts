import type { getCart } from "./queries/cart";
import type { getProducts } from "./queries/product";

export type Product = Awaited<ReturnType<typeof getProducts>>[number];
export type CartItem = Awaited<ReturnType<typeof getCart>>[number];
