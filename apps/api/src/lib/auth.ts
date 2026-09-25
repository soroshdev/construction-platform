import { prisma } from "@construction/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3002",
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3001"],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [
    username({
      displayUsername: false,
    }),
  ],
});
