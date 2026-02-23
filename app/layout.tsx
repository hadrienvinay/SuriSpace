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
      <body className="flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Deep space background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 space-background"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(30,58,138,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(88,28,135,0.12) 0%, transparent 50%)',
          }}
        />
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 2.5 : 1.5,
              height: i % 5 === 0 ? 2.5 : 1.5,
              background: `rgba(255,255,255,${0.15 + ((i * 37) % 60) / 100})`,
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              boxShadow: i % 6 === 0 ? '0 0 4px rgba(255,255,255,0.4)' : 'none',
            }}
          />
        ))}
      </div>
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 backdrop-blur bg-white/70 border-b border-gray-200/40 dark:border-gray-700/40 z-50">
          <NavBar/>            
        </header>


        {/* CONTENT */}
        <main className="flex-1 md:px-0 sm:px-0 pt-10 pb-2 ">
          {children}
        </main>


        {/* FOOTER */}
        <footer className="py-6 text-center text-gray-500 border-t ">
          © Hadrien Vinay — Blog Page - {new Date().getFullYear()}
        </footer>
      </ThemeProvider>
      </body>
    </html>
  );
}
