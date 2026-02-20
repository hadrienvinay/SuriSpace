import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"
import  NavBar from '@/components/Navbar'

export const metadata = {
  title: "Suri Space",
  description: "Blog Moderne realisé par Hadrien Vinay 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white text-white dark:bg-black dark:text-white flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark">
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/40 dark:border-gray-700/40 z-50">
          <NavBar/>            
        </header>

        {/* CONTENT */}
        <main className="flex-1 md:px-0 sm:px-0 mx-auto lg:px-6 pt-10 pb-14">
          {children}
        </main>


        {/* FOOTER */}
        <footer className="py-6 text-center text-gray-500 border-t border-gray-200 dark:border-gray-700">
          © Hadrien Vinay — Blog Page - {new Date().getFullYear()}
        </footer>
      </ThemeProvider>
      </body>
    </html>
  );
}
