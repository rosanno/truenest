import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "./lib/prisma";

// Custom error class for invalid login
class CustomError extends CredentialsSignin {
  code = "custom_error";
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

// Optional specialized class
class InvalidLoginError extends CustomError {
  constructor(message = "Invalid username or password.") {
    super(message);
    this.code = "invalid_login";
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
          throw new CustomError("Missing credentials.");
        }

        const isEmail = identifier.includes("@");

        const user = await prisma.user.findUnique({
          where: isEmail ? { email: identifier } : { username: identifier },
        });

        if (!user || !user.password) {
          throw new CustomError("User not found.");
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
          throw new InvalidLoginError("Incorrect password.");
        }

        return {
          id: user.id,
          username: user.username,
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
