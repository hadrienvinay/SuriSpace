// proxy.ts
import { auth } from "@/lib/auth" // ton fichier de config auth
import { NextResponse } from "next/server"

export default auth((req) => {
  const token = req.auth
  const path = req.nextUrl.pathname

  /*console.log("=== DEBUG MIDDLEWARE ===")
  console.log("Requested path:", path)
  console.log("Auth token:", token)
  console.log("=========================")  */

  // Liste des emails autorisés
  const allowedEmails = [
    "hadrien.vinay@yahoo.fr"
  ]

  // Vérifier si l'utilisateur est connecté
  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url))
  }

  // Vérifier si l'email est autorisé
  if (token?.user?.email && !allowedEmails.includes(token.user.email)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*','/posts/new'],
}