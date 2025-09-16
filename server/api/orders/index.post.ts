import z from "zod";

import db from "~/lib/db";
import { insertAddress } from "~/lib/db/queries/address";
import { clearUserCart, getCart } from "~/lib/db/queries/cart";
import { insertOrder } from "~/lib/db/queries/order";
import { insertOrderItem } from "~/lib/db/queries/order-items";
import { updateProductStock } from "~/lib/db/queries/product";
import { AddressFormSchema } from "~/lib/db/schema";
import defineAnonymousEventHandler from "~/utils/define-anonymous-event-handler";
import extractErrorMessage from "~/utils/extract-error-message";
import sendZodError from "~/utils/send-zod-error";
import { wait } from "~/utils/wait";

export default defineAnonymousEventHandler(async (event) => {
  const result = await readValidatedBody(event, AddressFormSchema.extend({
    note: z.string(),
  }).safeParse);

  if (!result.success) {
    return sendZodError(event, result.error as any);
  }

  const { note, ...addressData } = result.data;
  const userId = event.context.user.id;
  try {
    const randomWaitTime = Math.floor(Math.random() * 5) + 2;
    console.log("userid", userId, randomWaitTime, "waiting....");
    await wait(randomWaitTime);
    const orderResult = await db.transaction(async (tx) => {
      // INSERT ADDRESS
      const insertedAddress = await insertAddress(addressData, userId, tx);

      // GET CART ITEMS
      const cartItems = await getCart(userId);
      if (!cartItems.length) {
        throw createError({
          statusCode: 400,
          message: "Your cart is empty.",
        });
      }

      // CALCULATE TOTAL ORDER VALUE
      let orderTotal = 0;
      cartItems.forEach((item) => {
        orderTotal += item.quantity * item.product.price;
      });

      // INSERT ORDER
      const insertedOrder = await insertOrder(userId, insertedAddress.id, orderTotal, note, tx);

      // INSERT ORDER ITEMS
      await insertOrderItem(insertedOrder.id, cartItems, tx);

      // UPDATE PRODUCTS STOCK

      for (const item of cartItems) {
        const updateResult = await updateProductStock(
          item.product.id,
          item.quantity,
          tx,
        );

        if (updateResult.length === 0) {
          throw createError({
            statusCode: 400,
            statusMessage: `Not enough stock for ${item.product.name}`,
            cause: "STOCK",
            data: updateResult,
          });
        }
      }

      // REMOVE CART ITEMS
      await clearUserCart(userId, tx);
      return insertedOrder;
    });
    return { success: true, message: "Order placed successfully.", order: orderResult };
  }
  catch (error: any) {
    console.error("Order failed:", error);
    const errorMessage = extractErrorMessage(error);
    return { data: null, error: errorMessage, cause: error.cause };
  }
});
