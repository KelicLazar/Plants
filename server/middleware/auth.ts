import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user
    ? { ...session.user, id: +session.user.id }
    : undefined;
  if (event.path.startsWith("/dashboard")) {
    if (!session?.user.id) {
      await sendRedirect(event, "/login", 302);
    }
  }
});
