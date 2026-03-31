import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import GitHub from 'next-auth/providers/github'

// auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: {
    strategy: "database",
  },
  //debug: false, // Active les logs détaillés
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Default redirect (root or login page) → go to dashboard
      if (url === baseUrl || url === `${baseUrl}/` || url === `${baseUrl}/auth/login`) {
        return `${baseUrl}/dashboard`
      }
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return `${baseUrl}/dashboard`
    },
    async session({ session, user }) {
      //console.log("📧 Session callback - user:", user)
      if (session.user) {
        session.user.email = user.email
      }
      return session
    }
  },
})


