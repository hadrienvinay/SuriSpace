// components/SolarLayout.tsx
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const navItems = [
  { href: '/solar-system', label: 'Carte interactive', icon: '🗺️' },
  { href: '/solar-system/missions', label: 'Missions & Sondes', icon: '🚀' },
];

export default function SolarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen text-white relative overflow-hidden"
      style={{
        fontFamily: "'Exo 2', 'Space Mono', monospace",
        background: '#020817',
      }}>
      {/* Deep space background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(30,58,138,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(88,28,135,0.1) 0%, transparent 50%)',
        }} />
        {/* Stars */}
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              background: `rgba(255,255,255,${0.2 + Math.random() * 0.6})`,
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              boxShadow: i % 8 === 0 ? '0 0 3px rgba(255,255,255,0.5)' : 'none',
            }} />
        ))}
      </div>

      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(2,8,23,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
          <Link href="/solar-system" className="flex items-center gap-1.5 mr-3 shrink-0">
            <span className="text-lg">⚛️</span>
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden sm:block">Système solaire</span>
          </Link>
          <span className="text-gray-700 text-xs">›</span>
          <Link href="/solar-system" className="flex items-center gap-1.5 mr-2 shrink-0">
            <span className="text-lg">🌌</span>
            <span className="text-xs font-mono text-gray-400 hidden sm:block">Système Solaire</span>
          </Link>
          <span className="text-gray-700 text-xs">›</span>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 rounded-md text-[11px] font-medium tracking-wide uppercase transition-all shrink-0 flex items-center gap-1.5 ${
                pathname === item.href
                  ? 'bg-blue-900/50 text-blue-300 border border-blue-700/40'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="relative z-10 pt-12">
        {children}
      </div>
    </div>
  );
}
