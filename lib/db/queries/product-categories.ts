import db from "..";
import { productCategories } from "../schema";

export async function insertProductCategories(productId: number, categoriesId: number[]) {
  categoriesId.forEach((cat) => {
    db.insert(productCategories).values({ productId, categoryId: cat });
  });
}
