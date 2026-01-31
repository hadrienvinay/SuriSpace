// components/Navbar.jsx
import NavbarClient from './NavbarClient';
import { auth } from "@/lib/auth";
import prisma from '@/lib/prisma';

export default async function Navbar() {
  const session = await auth();
  let user = null;
  if (session && session.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      }
    });
  }
  return <NavbarClient session={session} />;
}