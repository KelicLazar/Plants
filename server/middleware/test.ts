export default defineEventHandler(async (event) => {
  console.log("DOes this runs every time?", event.node.req.url);
});
