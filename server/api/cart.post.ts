import { addToCart, getCart } from "~/lib/db/queries/cart";

export default defineEventHandler(async (event) => {
  console.log(event.context, "EVENT CONTEXT");
  if (!event.context.user) {
    console.log(event.context.user, "EVENT CONTEXT user");

    // return sendError(event, createError({
    //   statusCode: 401,
    //   statusMessage: "Unauthorized!!!",
    // }));
  }
  const data = await readBody(event);
  console.log("BLABLABLA", data, "BLAAAAA");
  return "Blbalbal";
  //   const cart = await addToCart();

//   console.log(cart);
//   return cart;
});
