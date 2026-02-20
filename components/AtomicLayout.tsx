'use client'
// components/AtomicLayout.tsx
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
const navItems = [
  { href: '/atoms', label: 'Accueil', icon: '⚛️' },
  { href: '/atoms/tableau', label: 'Tableau périodique', icon: '🧪' },
  { href: '/atoms/nucleosynthese', label: 'Nucléosynthèse', icon: '💥' },
  { href: '/atoms/abondance', label: 'Abondance', icon: '📊' },
  { href: '/atoms/histoire', label: 'Histoire', icon: '🌌' },
];

export default function AtomicLayout({ children }: { children: React.ReactNode }) {
const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#050A18] text-white font-['Space_Mono',monospace] relative overflow-hidden">
      {/* Starfield bg */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Static stars via CSS */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 42%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 38% 8%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 52% 67%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 67% 23%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 85%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 45%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 78%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 93% 12%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 90%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 55%, rgba(200,200,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 30%, rgba(255,220,200,0.5) 0%, transparent 100%),
            radial-gradient(2px 2px at 18% 62%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 72% 38%, rgba(200,220,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 70%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 95%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 20%, rgba(255,255,200,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 55%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 48%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 3% 35%, rgba(255,255,255,0.6) 0%, transparent 100%)
          `
        }} />
        {/* Nebula glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #1D4ED8, transparent 70%)' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #DB2777, transparent 70%)' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
        style={{ background: 'rgba(5,10,24,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          <Link href="/atoms" className="flex items-center gap-2 mr-4 shrink-0">
            <span className="text-2xl">⚛️</span>
            <span className="text-sm font-bold tracking-widest text-violet-300 uppercase hidden sm:block">
              Atoms
            </span>
          </Link>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {navItems.slice(1).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all shrink-0 ${
                  pathname === item.href 
                    ? 'bg-violet-600/40 text-violet-200 border border-violet-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>{item.label}
              </Link>
            ))}
              <Link
                key="home"
                href="/"
                className={`px-3 py-1.5 rounded text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all shrink-0`}
              >
                <span className="mr-1.5">⬅️</span>Retour
              </Link>
          </div>
          
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-16">
        {children}
      </div>
    </div>
  );
}
