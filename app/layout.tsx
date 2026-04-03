import "./globals.css";
import type { Metadata } from 'next';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://suri-space.vercel.app'),
  title: {
    default: 'Suri Space',
    template: '%s | Suri Space',
  },
  description: "Portfolio et blog d'Hadrien Vinay — Explorez l'espace, la physique, la chimie atomique, les projets et les sciences.",
  keywords: ['portfolio', 'Hadrien Vinay', 'espace', 'astronomie', 'physique', 'chimie', 'tableau périodique', 'sciences', 'aéronautique'],
  authors: [{ name: 'Hadrien Vinay' }],
  creator: 'Hadrien Vinay',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Suri Space',
    title: 'Suri Space',
    description: "Portfolio et blog d'Hadrien Vinay — Espace, sciences et projets.",
    images: [{ url: '/blog.png', width: 1200, height: 630, alt: 'Suri Space — Portfolio Hadrien Vinay' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suri Space',
    description: "Portfolio et blog d'Hadrien Vinay — Espace, sciences et projets.",
    images: ['/blog.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#020817" />
        <meta name="google-site-verification" content="PqO9oQhvNlVwu7NcTg2wRbHE5iBzwN1UrF_-_xCzLM8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="flex flex-col">
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
          <header
            className="fixed top-0 left-0 right-0 z-50"
            style={{ background: 'rgba(2,8,23,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <NavBar />
          </header>

          {/* CONTENT */}
          <main className="flex-1 pt-16 pb-2 relative z-10">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

      </body>
    </html>
  );
}
