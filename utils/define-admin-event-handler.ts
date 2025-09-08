import type { User } from "better-auth";
import type { UserWithAnonymous, UserWithRole } from "better-auth/plugins";
import type { H3Event, H3EventContext } from "h3";

type AdminEvent = H3Event & {
  context: H3EventContext & {
    user: UserWithAnonymous & UserWithRole;
  };
};

export default function defineAdminEventHandler<T>(handler: (event: AdminEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }));
    }
    console.log(event.context.user);

    return handler(event as AdminEvent);
  });
}
