'use client';
// components/ScienceLayout.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/sciences', label: 'Timeline', icon: '⏱️' },
  { href: '/sciences/scientists', label: 'Scientifiques', icon: '🔬' },
  { href: '/solar-system', label: 'Système Solaire', icon: '🪐' },
  { href: '/atoms', label: 'Atomes', icon: '⚛️' },
  { href: '/', label: 'Retour au blog', icon: '⬅️' },
];

export default function ScienceLayout({ children }: { children: React.ReactNode }) {
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
              'radial-gradient(ellipse at 15% 40%, rgba(99,102,241,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(168,85,247,0.10) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(34,211,238,0.06) 0%, transparent 40%)',
          }}
        />
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 2.5 : 1.5,
              height: i % 5 === 0 ? 2.5 : 1.5,
              background: `rgba(255,255,255,${0.12 + ((i * 41) % 55) / 100})`,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              boxShadow: i % 7 === 0 ? '0 0 4px rgba(255,255,255,0.3)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Top nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(2,8,23,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-5 py-3.5 flex items-center gap-3 overflow-x-auto">
          <Link href="/sciences" className="flex items-center gap-2.5 mr-4 shrink-0 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">🔬</span>
            <span className="text-md font-bold text-gray-400 uppercase tracking-widest hidden sm:block group-hover:text-white transition-colors">
              Sciences
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
                    ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50'
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

      <div className="relative z-10 pt-10 md:pt-8">{children}</div>
    </div>
  );
}
