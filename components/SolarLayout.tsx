'use client'
// components/SolarLayout.tsx
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const navItems = [
  { href: '/solar-system', label: 'Carte interactive', icon: '🗺️' },
  { href: '/solar-system/bodys', label: 'Corps du système solaire', icon: '🌍' },
  { href: '/solar-system/missions', label: 'Missions & Sondes', icon: '🚀' },
  { href: '/atoms', label: 'Atomes', icon: '⚛️' },
  { href: '/', label: 'Retour', icon: '⬅️' },

];

export default function SolarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif", background: '#020817' }}
    >
      {/* Deep space background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
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

      {/* Top nav — taller, bigger text */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(2,8,23,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-5 py-3.5 flex items-center gap-3 overflow-x-auto">
          <Link href="/solar-system" className="flex items-center gap-2.5 mr-4 shrink-0 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🌌</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest hidden sm:block group-hover:text-white transition-colors">
              Système Solaire
            </span>
          </Link>
          <span className="text-gray-700 text-base">›</span>
          <div className="flex gap-1.5 ml-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all shrink-0 flex items-center gap-2 ${
                  pathname === item.href
                    ? 'bg-blue-900/50 text-blue-200 border border-blue-700/50'
                    : 'text-gray-500 hover:text-white hover:bg-white/6 border border-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-10">{children}</div>
    </div>
  );
}
