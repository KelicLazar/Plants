import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  event.context.user = session?.user
    ? { ...session.user, id: +session.user.id }
    : undefined;

  if (event.path.startsWith("/admin")) {
    if (!session?.user || session.user.role !== "admin") {
      return sendRedirect(event, "/login", 302);
    }
  }
  if (event.path.startsWith("/user")) {
    if (!session?.user || session.user.isAnonymous) {
      return sendRedirect(event, "/login", 302);
    }
  }
});
