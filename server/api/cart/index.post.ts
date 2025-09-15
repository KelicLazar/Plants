import { addToCart, findCartItem, updateCart } from "~/lib/db/queries/cart";
import { findProductById } from "~/lib/db/queries/product";
import { insertCartSchema } from "~/lib/db/schema";
import defineAnonymousEventHandler from "~/utils/define-anonymous-event-handler";
import sendZodError from "~/utils/send-zod-error";

export default defineAnonymousEventHandler(async (event) => {
  const result = await readValidatedBody(event, insertCartSchema.safeParse);
  if (!result.success) {
    return sendZodError(event, result.error as any);
  }

  const product = await findProductById(result.data.productId);
  if (!product) {
    throw createError({
      statusCode: 404,
      message: "Product not found.",
    });
  }
  const existingCartItem = await findCartItem(result.data.userId, result.data.productId);

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + 1;
    if (product.stock < newQuantity) {
      throw createError({
        statusCode: 409,
        message: `You already added maximum available quantity of this product (${product.stock} in stock)`,
      });
    }
    return updateCart(existingCartItem.id, newQuantity);
  }

  if (product.stock < result.data.quantity) {
    throw createError({
      statusCode: 409,
      message: "Product is out of stock!",
    });
  }
  return addToCart(result.data);
});
