import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma/client";

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/sign-in" },
  callbacks: {
    jwt({ token, user }) { if (user) token.role = user.role; return token; },
    session({ session, token }) { if (session.user) session.user.role = token.role as string; return session; },
    authorized({ auth, request }) { return request.nextUrl.pathname.startsWith("/admin") ? ["SUPER_ADMIN", "STAFF"].includes(String(auth?.user?.role)) : true; }
  },
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    async authorize(rawCredentials) {
      const parsed = credentialsSchema.safeParse(rawCredentials);
      if (!parsed.success) return null;
      const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
      if (!user?.passwordHash) return null;
      const valid = await compare(parsed.data.password, user.passwordHash);
      if (!valid) return null;
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    }
  })]
};
