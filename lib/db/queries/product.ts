import { and, asc, desc, eq, exists } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertProductType, ProductFormType } from "../schema";

import db from "..";
import { categories, productCategories, products } from "../schema";
import { findCategoryBySlug } from "./category";

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
  limit = 12,
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
