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
  { href: '/atoms/particules', label: 'Particules', icon: '✴️' },
  { href: '/solar-system', label: 'Systeme solaire', icon: '🗺️' },
  { href: '/sciences', label: 'Sciences', icon: '🔬' },
  { href: '/', label: 'Retour au blog', icon: '⬅️' },


];

export default function AtomicLayout({ children }: { children: React.ReactNode }) {
const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#050A18] text-white relative overflow-hidden"       
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif", background: '#020817' }}>
      {/* Starfield bg */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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
        <div className="max-w-screen-2xl mx-auto px-5 py-4 flex items-center gap-3 overflow-x-auto">
          <Link href="/atoms" className="flex items-center gap-2.5 mr-4 shrink-0">
            <span className="text-2xl ">⚛️</span>
            <span className="text-md font-bold tracking-widest text-violet-300 uppercase hidden sm:block">
              Atoms
            </span>
          </Link>
          <span className="text-gray-700 text-base">›</span>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {navItems.slice(1).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded text-sm font-bold tracking-wider whitespace-nowrap transition-all shrink-0 ${
                  pathname === item.href 
                    ? 'bg-violet-600/40 text-violet-200 border border-violet-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>{item.label}
              </Link>
            ))}

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
