import { and, asc, desc, eq, exists, getTableColumns, gt, gte, sql } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertProductType } from "../schema";
import type { DBorTX, Product } from "../types";

import db from "..";
import { categories, orderItems, productCategories, products } from "../schema";

const nanoid = customAlphabet("1234567890qwertyuioplkjhgfdsazxcvbnm");
const sortableFields = {
  created_at: products.createdAt,
  updated_at: products.updatedAt,
  name: products.name,
  price: products.price,
  // Add other sortable fields as needed
};
export type SortableField = keyof typeof sortableFields;
export async function getProducts(
  page = 1,
  limit = 20,
  orderBy: SortableField = "created_at",
  sortOrder = "desc",
  categorySlug: string,
) {
  const offset = (page - 1) * limit;

  // Validate the orderBy field
  const sortField = sortableFields[orderBy] || sortableFields.created_at;
  const orderClause = sortOrder === "asc" ? asc(sortField) : desc(sortField);

  const whereClause = categorySlug && categorySlug !== "null" && categorySlug.trim() !== ""
    ? exists(
        db.select()
          .from(productCategories)
          .innerJoin(categories, eq(productCategories.categoryId, categories.id))
          .where(
            and(
              eq(productCategories.productId, products.id),
              eq(categories.slug, categorySlug),
            ),
          ),
      )
    : undefined;

  return db.query.products.findMany({
    with: {
      productCategories: {
        with: {
          category: true,
        },
      },
    },
    where: whereClause,
    limit,
    offset,
    orderBy: orderClause,
  });
}

export async function getRandomProducts(limit: number = 5) {
  const randomProducts = await db
    .query
    .products
    .findMany({
      with: {
        productCategories: {
          with: {
            category: true,
          },
        },
      },
      orderBy: sql`RANDOM()`,
      limit,
    });

  return randomProducts;
}

export async function getMostPopularProducts(limit: number = 3) {
  const mostPopularProducts = await db.select({
    ...getTableColumns(products),
  })
    .from(orderItems)
    .innerJoin(products, eq(products.id, orderItems.productId))
    .where(gt(products.stock, 0))
    .groupBy(products.id)
    .orderBy(desc(sql`SUM(${orderItems.quantity})`))
    .limit(limit);

  return mostPopularProducts;
}

export async function findProductBySlug(slug: string) {
  // console.log(slug, "Slug from query");
  return db.query.products.findFirst({
    with: {
      productCategories: {
        with: {
          category: true,
        },
      },
    },
    where: eq(products.slug, slug),
  });
}
export async function findProductById(id: number) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
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

export async function updateProduct(productId: number, newValues: Partial<Product>, database: DBorTX = db) {
  const updated = await database.update(products)
    .set(newValues)
    .where(eq(products.id, productId));

  return updated;
}

export async function updateProductStock(productId: number, quantity: number, database: DBorTX = db) {
  const updateResult = await database.update(products)
    .set({
      stock: sql`stock - ${quantity}`,
    })
    .where(and(
      eq(products.id, productId),
      gte(products.stock, quantity),
    ))
    .returning();

  return updateResult;
}
