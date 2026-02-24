'use client';
// components/NavbarClient.tsx
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';

/* ─── Nav data ────────────────────────────────────────────── */
//Nav on the left of the sidebar
//const MAIN_LINKS = [];

const DROPDOWNS = [
  {
    label: 'Espace',
    icon: '🪐',
    color: '#60A5FA',
    items: [
      { href: '/solar-system',           label: 'Accueil',                  icon: '👾' },
      { href: '/solar-system/carte',     label: 'Carte interactive',        icon: '🗺️' },
      { href: '/solar-system/bodys',     label: 'Corps du système solaire', icon: '🌍' },
      { href: '/solar-system/galaxies',  label: 'Galaxies',                 icon: '🌌' },
      { href: '/solar-system/missions',  label: 'Missions & Sondes',        icon: '🚀' },
      { href: '/solar-system/astronomie',label: 'Astronomie',               icon: '🔭' },
      { href: '/solar-system/stars',     label: 'Carte du ciel',            icon: '⭐' },
    ],
  },
  {
    label: 'Sciences',
    icon: '🔬',
    color: '#A78BFA',
    items: [
      { href: '/sciences',            label: 'Accueil',        icon: '🔬' },
      { href: '/sciences/timeline',   label: 'Timeline',       icon: '⏱️' },
      { href: '/sciences/scientists', label: 'Scientifiques',  icon: '👨‍🔬' },
      { href: '/sciences/formules',   label: 'Formules',       icon: '∑'  },
      { href: '/sciences/constantes', label: 'Constantes',     icon: '∞'  },
    ],
  },
  {
    label: 'Atomes',
    icon: '⚛️',
    color: '#34D399',
    items: [
      { href: '/atoms',                label: 'Accueil',            icon: '⚛️' },
      { href: '/atoms/tableau',        label: 'Tableau périodique', icon: '🧪' },
      { href: '/atoms/nucleosynthese', label: 'Nucléosynthèse',     icon: '💥' },
      { href: '/atoms/abondance',      label: 'Abondance',          icon: '📊' },
      { href: '/atoms/particules',     label: 'Particules',         icon: '✴️' },
    ],
  },
];

const END_LINKS = [
    { href: '/posts',    label: 'Articles' },
  { href: '/projects', label: 'Projets'  },
  { href: '/about',   label: 'À propos' },
  { href: '/contact', label: 'Contact'  },
];

/* ─── Link styles (always dark) ──────────────────────────── */
const linkCls = (active: boolean) =>
  `px-3 py-2 rounded-lg text-md font-semibold tracking-wide transition-all ${
    active
      ? 'bg-violet-800/70 text-white'
      : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
  }`;

/* ─── Dropdown ────────────────────────────────────────────── */
function Dropdown({
  label, icon, color, items,
}: {
  label: string; icon: string; color: string;
  items: { href: string; label: string; icon: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = items.some((i) => pathname === i.href || pathname.startsWith(i.href + '/'));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-md font-semibold tracking-wide transition-all ${
          isActive
            ? 'bg-violet-800/70 text-white'
            : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
        }`}
      >
        <span className="text-base">{icon}</span>
        {label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 w-56 rounded-2xl border shadow-2xl py-1.5 z-50"
          style={{
            background: 'rgba(5,8,25,0.97)',
            borderColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="mx-3 mb-2 mt-1 h-px rounded-full" style={{ background: `${color}40` }} />
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 mx-1.5 px-3 py-2 rounded-xl text-md font-medium transition-all ${
                  active
                    ? 'bg-violet-800/70 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────── */
export default function NavbarClient({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group" onClick={close}>
            <Image src="/favicon.ico" alt="Logo" width={30} height={30} className="rounded shrink-0" />
            <span className="font-bold text-white text-xl hidden sm:block group-hover:text-violet-300 transition-colors">
              Suri<span className="text-violet-400">'s Blog</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {session && (
                 <Link key={"dashboard"} href={"/dashboard"} className={linkCls(pathname === "/dashboard")}>{"Dashboard"}</Link>

              )}
            {/*MAIN_LINKS.map((l) => ( <Link key={l.href} href={l.href} className={linkCls(pathname === l.href)}>{l.label}</Link>))*/}

            <span className="mx-2 text-gray-700 text-md">|</span>

            {DROPDOWNS.map((d) => (
              <Dropdown key={d.label} label={d.label} icon={d.icon} color={d.color} items={d.items} />
            ))}

            <span className="mx-2 text-gray-700 text-md">|</span>

            {END_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(pathname === l.href)}>{l.label}</Link>
            ))}

            {/* Theme toggle 
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="ml-1 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-violet-900/40 transition-all"
                aria-label="Thème"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            )}*/}

            {/* Auth */}
            {session ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-xs text-gray-600 hidden lg:block">
                  {session.user?.name || session.user?.email}
                </span>
                <Link href="/api/auth/signout"
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-red-700/60 hover:bg-red-600 text-white transition-all">
                  Déco
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-violet-900/40 transition-all"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/6"
          style={{ background: 'rgba(3,6,20,0.98)' }}>
          <div className="px-4 py-3 space-y-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            {/* COMMENTING FOR NOW MAIN_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}
                className={`block px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                  pathname === l.href
                    ? 'bg-violet-800/70 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                }`}>
                {l.label}
              </Link>
            ))

            <div className="h-px mx-1 my-2 bg-white/6" />*/}
            {session && (
                 <Link key={"dashboard"} href={"/dashboard"} className={`block px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                  pathname === "/dashboard"
                    ? 'bg-violet-800/70 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                }`}>Dashboard</Link>
              )}

            {DROPDOWNS.map((d) => {
              const isExp = expanded === d.label;
              const isAct = d.items.some((i) => pathname === i.href || pathname.startsWith(i.href + '/'));
              return (
                <div key={d.label}>
                  <button
                    onClick={() => setExpanded(isExp ? null : d.label)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                      isAct
                        ? 'bg-violet-800/70 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                    }`}
                  >
                    <span className="flex items-center gap-2.5"><span>{d.icon}</span>{d.label}</span>
                    <svg className={`w-4 h-4 transition-transform ${isExp ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExp && (
                    <div className="mt-1 ml-4 space-y-0.5 pb-1">
                      {d.items.map((item) => (
                        <Link key={item.href} href={item.href} onClick={close}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-md font-medium transition-all ${
                            pathname === item.href
                              ? 'bg-violet-800/70 text-white'
                              : 'text-gray-500 hover:text-white hover:bg-violet-900/40'
                          }`}>
                          <span>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="h-px mx-1 my-2 bg-white/6" />

            {END_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}
                className={`block px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                  pathname === l.href
                    ? 'bg-violet-800/70 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                }`}>
                {l.label}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-1">
              {/*mounted && (
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="px-3 py-2.5 rounded-xl text-md text-gray-400 hover:text-white hover:bg-violet-900/40 transition-all">
                  {theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
                </button>
              )*/}
              {session && (
                <Link href="/api/auth/signout" onClick={close}
                  className="text-xs px-3 py-2 rounded-lg bg-red-700/60 hover:bg-red-600 text-white transition-all">
                  Déconnexion
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
