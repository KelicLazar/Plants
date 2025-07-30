import type { getProducts } from "./queries/product";

export type Product = Awaited<ReturnType<typeof getProducts>>[number];
