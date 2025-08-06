import { getCart } from "~/lib/db/queries/cart";

export default defineEventHandler(async (event) => {
  console.log(event.context, "EVENT CONTEXT ???????????????????????????????@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", event.context.user);
  if (!event.context.user) {
    console.log(event.context.user, "EVENT CONTEXT user");

    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized!!!",
    }));
  }
  const cart = await getCart(event.context.user.id);

  console.log("Get cart", cart);
  return cart;
});
