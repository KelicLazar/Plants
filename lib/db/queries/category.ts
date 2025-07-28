import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertCategoryType } from "./../schema/category";

import db from "..";
import { categories } from "./../schema/category";

const nanoid = customAlphabet("1234567890qwertyuioplkjhgfdsazxcvbnm");

export async function getCategories() {
  return db.query.categories.findMany();
}
export async function findCategoryBySlug(slug: string) {
  return db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
}

export async function findCategoryByName(name: string) {
  return db.query.categories.findFirst({
    where: eq(categories.name, name),
  });
}

export async function findUniqueCategorySlug(slug: string) {
  let existing = !!(await findCategoryBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await findCategoryBySlug(idSlug));
    if (!existing)
      return idSlug;
  }
  return slug;
}

export async function insertCategory(values: InsertCategoryType, slug: string) {
  const [inserted] = await db.insert(categories).values({ ...values, slug }).returning();
  return inserted;
}
