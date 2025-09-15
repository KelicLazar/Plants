import type { AuthenticatedEvent } from "~/lib/db/types";

export default function defineAnonymousEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      console.log("From DEFINE anonymous EVENT HANDLER", !event.context.user, event.context.user.isAnonymous);

      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }));
    }

    return handler(event as AuthenticatedEvent);
  });
}
