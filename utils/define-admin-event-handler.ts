import type { AuthenticatedEvent } from "~/lib/db/types";

export default function defineAdminEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user || event.context.user.role !== "admin") {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "You need admin permissions to do this.",
      }));
    }
    console.log(event.context.user);

    return handler(event as AuthenticatedEvent);
  });
}
