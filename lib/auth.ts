import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GitHub from 'next-auth/providers/github'

// auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub({ allowDangerousEmailAccountLinking: true })],
  session: {
    strategy: "database",
  },
  //debug: false, // Active les logs détaillés
  callbacks: {
    async session({ session, user }) {
      //console.log("📧 Session callback - user:", user)
      if (session.user) {
        session.user.email = user.email
      }
      return session
    }
  },
})


