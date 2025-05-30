import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "./lib/prisma";

export class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { identifier, password } = credentials as Record<"identifier" | "password", string>;

        if (!identifier || !password) {
          throw new CustomAuthError("Missing credentials.");
        }

        const isEmail = identifier.includes("@");

        const user = await prisma.user.findUnique({
          where: isEmail ? { email: identifier } : { username: identifier },
          include: {
            profile: true,
          },
        });

        if (!user || !user.password) {
          throw new CustomAuthError("User not found.");
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
          throw new CustomAuthError("Incorrect password.");
        }

        return {
          id: user.id,
          username: user.username,
          name: user.profile?.firstName + " " + user.profile?.lastName,
          email: user.email,
          role: user.roleId,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const customUser = user as {
          id: string | number;
          username?: string;
          role?: string;
        };

        return {
          ...token,
          id: String(customUser.id),
          username: customUser.username,
          role: customUser.role,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
          role: token.role as string,
        },
      };
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
