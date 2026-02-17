// components/Navbar_client.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Session } from "next-auth";
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import Image from 'next/image';

export default function NavbarClient({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link id="logo-link" href="/" className="flex items-center text-2xl font-bold">
            <Image 
              src="/favicon.ico" alt="Logo" width={40} height={40} className="mr-2 flex-shrink-0"
              />
            Suri's <span className="text-blue-600"> Blog</span>
          </Link>
          {/* Desktop Menu - Visible sur grands écrans */}
          <div className="hidden gap-2 md:flex md:items-center lg:space-x-8">
            { session ? (
            <Link href="/dashboard" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            ) : null}
            <Link href="/posts" className="hover:bg-gray-700 px-3 py-2 rounded-md">
              Articles
            </Link>
            <Link href="/projects" className="hover:bg-gray-700 px-3 py-2 rounded-md">
              Projets
            </Link>
            <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md">
              À propos
            </Link>
            <Link href="/periodic_table" className="hover:bg-gray-700 px-3 py-2 rounded-md">
              Tableau
            </Link>
            <Link href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md">
              Contact
            </Link>
            {/* Bouton Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 hover:cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            )}
          </div>

          {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Bonjour, {session.user?.name || session.user?.email}
                </span>
                <Link href="/api/auth/signout" className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md">
                  Déconnexion
                </Link>
              </div>
            ) : (null
              
              /*<div className="flex items-center space-x-4"></div><Link href="/api/auth/signin" className="bg-purple-700 hover:bg-purple-800 px-3 py-2 rounded-md">
                Connexion
              </Link>*/ 
            )}

          {/* Bouton collapse - Visible uniquement sur petits écrans */}
          <div className="md:hidden">
            <button id="mobile-menu-button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none" aria-expanded={isOpen}>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  // Icône X quand le menu est ouvert
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  // Icône hamburger quand le menu est fermé
                  <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile - Visible uniquement sur petits écrans quand isOpen = true */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          { session ? (
          <Link href="/dashboard" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          ) : null}
          <Link href="/posts" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
            Articles
          </Link>
          <Link href="/projects" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
            Projets
          </Link>
          <Link href="/about" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
            À propos
          </Link>
          <Link href="/contact" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          {/* Theme Toggle Mobile */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="block w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              {theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}