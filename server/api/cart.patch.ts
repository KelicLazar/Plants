import z from "zod";

import { addToCart, getCart, updateCart } from "~/lib/db/queries/cart";
import { insertCartSchema } from "~/lib/db/schema";
import sendZodError from "~/utils/send-zod-error";
import { wait } from "~/utils/wait";

export default defineEventHandler(async (event) => {
  await wait(1);
  console.log(event.context, "EVENT CONTEXT");
  if (!event.context.user) {
    console.log(event.context.user, "EVENT CONTEXT user");

    // return sendError(event, createError({
    //   statusCode: 401,
    //   statusMessage: "Unauthorized!!!",
    // }));
  }

  const result = await readValidatedBody(event, z.object({
    id: z.number(),
    quantity: z.number(),
  }).safeParse);
  if (!result.success) {
    return sendZodError(event, result.error as any);
  }
  // return "Blbalbal";
  console.log(result.data, "CART DATA");

  const cart = await updateCart(result.data.id, result.data.quantity);

  console.log(cart);
  return cart;
});
