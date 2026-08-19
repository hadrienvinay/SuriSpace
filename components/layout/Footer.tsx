// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { NavPlanetIcon, NavScienceIcon, NavAtomIcon, NavLeafIcon } from '@/components/icons/NavIcons';

const WORLD_LINKS = [
  { href: '/space', label: 'Espace',   Icon: NavPlanetIcon,  color: '#60A5FA' },
  { href: '/sciences',     label: 'Sciences', Icon: NavScienceIcon, color: '#A78BFA' },
  { href: '/atoms',        label: 'Atomes',   Icon: NavAtomIcon,    color: '#34D399' },
  { href: '/nature',       label: 'Nature',   Icon: NavLeafIcon,    color: '#22C55E' },
];

const PAGE_LINKS = [
  { href: '/posts',    label: 'Articles' },
  { href: '/projects', label: 'Projets'  },
  { href: '/about',    label: 'À propos' },
  { href: '/contact',  label: 'Contact'  },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-8 border-t"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(2,8,23,0.85)',
        backdropFilter: 'blur(16px)',
        fontFamily: "'Exo 2', 'Space Grotesk', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col lg:flex-row items-center gap-3 lg:gap-5">

        {/* Brand + status */}
        <Link href="/" className="inline-flex items-center gap-2.5 group shrink-0">
          <Image src="/icon.svg" alt="Logo" width={20} height={20} className="rounded shrink-0" />
          <span className="font-bold text-white text-sm hidden sm:block group-hover:text-violet-300 transition-colors">
            Suri<span className="text-violet-400">&apos;s Blog</span>
          </span>
          <span
            className="hidden md:inline-flex items-center gap-1.5 pl-2.5 ml-1 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-400/80"
            style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
              style={{ boxShadow: '0 0 6px #34D399', animation: 'footerPulse 2.4s ease-in-out infinite' }}
            />
            système nominal
          </span>
        </Link>

        <div className="hidden lg:block h-4 w-px bg-white/8 shrink-0" />

        {/* World icons + page links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 flex-1">
          {WORLD_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                <l.Icon size={13} color={l.color} />
              </span>
              {l.label}
            </Link>
          ))}
          <span className="text-gray-800 text-xs hidden sm:inline">·</span>
          {PAGE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-gray-600 hover:text-gray-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block h-4 w-px bg-white/8 shrink-0" />

        {/* Right: build badge + GitHub + copyright */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden xl:inline-block text-[10px] font-mono text-gray-700 px-2 py-0.5 rounded-md border border-white/8">
            Next.js · Vercel
          </span>
          <Link
            href="https://github.com/hadrienvinay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <p className="text-xs text-gray-700 font-mono">
            © {new Date().getFullYear()}
          </p>
        </div>

      </div>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </footer>
  );
}
