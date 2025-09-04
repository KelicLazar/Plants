import z from "zod";

import { updateCart } from "~/lib/db/queries/cart";
import sendZodError from "~/utils/send-zod-error";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, z.object({
    id: z.number(),
    quantity: z.number(),
  }).safeParse);
  if (!result.success) {
    return sendZodError(event, result.error as any);
  }
  const cart = await updateCart(result.data.id, result.data.quantity);

  return cart;
});
