import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertProductType, ProductFormType } from "../schema";

import db from "..";
import { productCategories, products } from "../schema";

const nanoid = customAlphabet("1234567890qwertyuioplkjhgfdsazxcvbnm");
export async function getProducts(page = 1, limit = 12) {
  const offset = (page - 1) * limit;
  return db.query.products.findMany({
    with: {
      productCategories: {
        with: {
          category: true,
        },
      },
    },
    limit,
    offset,
  });
}

export async function findProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
  });
}

export async function findProductsByName(name: string) {
  return db.query.products.findFirst({
    where: eq(products.name, name),
  });
}

export async function findUniqueProductSlug(slug: string) {
  let existing = !!(await findProductBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await findProductBySlug(idSlug));
    if (!existing)
      return idSlug;
  }
  return slug;
}

export async function insertProduct(productData: InsertProductType & { slug: string; categoryIds: string[] }) {
  const { categoryIds, ...data } = productData;

  const product = await db.transaction(async (tx) => {
    const [newProduct] = await tx.insert(products).values(data).returning();

    if (newProduct.id && categoryIds && categoryIds.length > 0) {
      const categoryRelations = categoryIds.map(categoryId => ({
        productId: newProduct.id,
        categoryId: Number.parseInt(categoryId, 10),
      }));
      await tx.insert(productCategories).values(categoryRelations);
    }

    return newProduct;
  });
  return product;
}
