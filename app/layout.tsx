import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "../components/ThemeProvider"
import ThemeToggle from "../components/ThemeToggle"
import { auth } from "@/lib/auth";
import prisma from '@/lib/prisma'
import  NavBar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: "Suri Space",
  description: "Blog Moderne realisé par Hadrien Vinay 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const session = await getServerSession(authConfig);

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white text-white dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/40 dark:border-gray-700/40 z-50">
          <NavBar/>            
        </header>

        {/* CONTENT */}
        <main className="max-w-6xl mx-auto px-6 pt-10 pb-10">
          {children}
        </main>

        <div className="fixed right-2 top-40 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
          <a href="https://www.linkedin.com/in/hadrien-vinay/">
              <div className="p-2 hover:text-primary hover:dark:text-primary">
                  <svg className="lg:w-6 lg:h-6 w-4 h-4 text-blue-500" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                          d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          clipRule="evenodd" />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                  </svg>

              </div>
          </a>
          <a href="https://github.com/hadrienvinay">
              <div className="p-2 hover:text-green-500 hover:dark:text-green-500">
                  <svg className="lg:w-6 lg:h-6 w-4 h-4 text-green-600" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                      clipRule="evenodd" />
                  </svg>
              </div>
          </a>
          <a href="https://www.youtube.com/@hadrien154/featured">
              <div className="p-2 hover:text-primary hover:dark:text-primary">
                  <svg className="lg:w-6 lg:h-6 w-4 h-4 text-red-600" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path fillRule="evenodd"
                          d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                          clipRule="evenodd" />
                  </svg>
              </div>
          </a>
        </div>

        {/* FOOTER */}
        <footer className="py-6 text-center text-gray-500 border-t border-gray-200 dark:border-gray-700">
          © {new Date().getFullYear()} Hadrien Vinay — Blog Page
        </footer>
      </ThemeProvider>
      </body>
    </html>
  );
}
