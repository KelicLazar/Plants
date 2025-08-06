import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, anonymous, createAuthMiddleware } from "better-auth/plugins";

import db from "./db";
import { transferAnonymousCart } from "./db/queries/cart";
import * as schema from "./db/schema";
import env from "./env";

export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  plugins: [
    admin(),
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        await transferAnonymousCart(+anonymousUser.user.id, +newUser.user.id);
      },
    }),
  ],
  advanced: {
    generateId: false,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
