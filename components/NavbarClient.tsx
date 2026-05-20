'use client';
// components/NavbarClient.tsx
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
// import SearchModal from '@/components/SearchModal';
import {
  NavPlanetIcon, NavScienceIcon, NavAtomIcon, NavLeafIcon, NavBiologieIcon,
  IcoHome, IcoMap, IcoGlobe, IcoGalaxy, IcoRocket, IcoTelescope, IcoStar,
  IcoClock, IcoUser, IcoSigma, IcoInfinity,
  IcoFlask, IcoExplosion, IcoChart, IcoRadiation,
  IcoLeaf, IcoHouse, IcoSun, IcoApple,
  IcoHeart, IcoDna, IcoTree, IcoEvolution, IcoAtp,
  IcoGene, IcoShield, IcoEarth,
  IcoScroll, IcoExoplanet,
} from '@/components/NavIcons';

/* ─── Types ───────────────────────────────────────────────── */
type ItemIcon = React.ComponentType<{ color: string }>;
type NavItem = { href: string; label: string; Icon: ItemIcon };
type TopIcon = React.ComponentType<{ size?: number; color?: string }>;

/* ─── Nav data ────────────────────────────────────────────── */
const DROPDOWNS: { label: string; Icon: TopIcon; color: string; items: NavItem[] }[] = [
  {
    label: 'Espace',
    Icon: NavPlanetIcon,
    color: '#60A5FA',
    items: [
      { href: '/solar-system',            label: 'Accueil',          Icon: IcoHome      },
      { href: '/solar-system/carte',      label: 'Carte interactive', Icon: IcoMap      },
      { href: '/solar-system/bodys',      label: 'Corps célestes',   Icon: IcoGlobe     },
      { href: '/solar-system/galaxies',   label: 'Galaxies',         Icon: IcoGalaxy    },
      { href: '/solar-system/missions',   label: 'Missions & Sondes',Icon: IcoRocket    },
      { href: '/solar-system/astronomie', label: 'Astronomie',       Icon: IcoTelescope },
      { href: '/solar-system/stars',        label: 'Carte du ciel',    Icon: IcoStar       },
      { href: '/solar-system/exoplanetes', label: 'Exoplanètes',      Icon: IcoExoplanet  },
    ],
  },
  {
    label: 'Sciences',
    Icon: NavScienceIcon,
    color: '#A78BFA',
    items: [
      { href: '/sciences',            label: 'Accueil',       Icon: IcoHome     },
      { href: '/sciences/timeline',   label: 'Timeline',      Icon: IcoClock    },
      { href: '/sciences/scientists', label: 'Scientifiques', Icon: IcoUser     },
      { href: '/sciences/formules',   label: 'Formules',      Icon: IcoSigma    },
      { href: '/sciences/constantes', label: 'Constantes',    Icon: IcoInfinity },
      { href: '/sciences/histoire',  label: 'Histoire',      Icon: IcoScroll   },
    ],
  },
  {
    label: 'Atomes',
    Icon: NavAtomIcon,
    color: '#34D399',
    items: [
      { href: '/atoms',                label: 'Accueil',            Icon: IcoHome      },
      { href: '/atoms/tableau',        label: 'Tableau périodique', Icon: IcoFlask     },
      { href: '/atoms/nucleosynthese', label: 'Nucléosynthèse',     Icon: IcoExplosion },
      { href: '/atoms/abondance',      label: 'Abondance',          Icon: IcoChart     },
      { href: '/atoms/particules',     label: 'Particules',         Icon: IcoRadiation },
    ],
  },
  {
    label: 'Biologie',
    Icon: NavBiologieIcon,
    color: '#34D399',
    items: [
      { href: '/biologie',          label: 'Accueil',        Icon: IcoHome  },
      { href: '/biologie/corps',    label: 'Corps Humain',   Icon: IcoHeart },
      { href: '/biologie/cellules', label: 'Cellules & ADN', Icon: IcoDna   },
      { href: '/biologie/vivant',      label: 'Le Vivant',      Icon: IcoTree      },
      { href: '/biologie/evolution',   label: 'Évolution',      Icon: IcoEvolution },
      { href: '/biologie/metabolisme', label: 'Métabolisme',    Icon: IcoAtp       },
      { href: '/biologie/genetique',   label: 'Génétique',      Icon: IcoGene      },
      { href: '/biologie/sante',       label: 'Santé',          Icon: IcoShield    },
    ],
  },
  {
    label: 'Nature',
    Icon: NavLeafIcon,
    color: '#22C55E',
    items: [
      { href: '/nature',             label: 'Accueil',             Icon: IcoHome   },
      { href: '/nature/plantes',     label: 'Plantes & Jardinage', Icon: IcoLeaf   },
      { href: '/nature/mon-potager', label: 'Mon Potager',         Icon: IcoHouse  },
      { href: '/nature/saison',      label: 'Saisons',             Icon: IcoSun    },
      { href: '/nature/nutrition',   label: 'Nutrition',           Icon: IcoApple  },
    ],
  },
];

const END_LINKS = [
  { href: '/posts',    label: 'Articles' },
  { href: '/projects', label: 'Projets'  },
  { href: '/about',    label: 'À propos' },
  { href: '/contact',  label: 'Contact'  },
];

/* ─── Link styles ──────────────────────────────────────────── */
const linkCls = (active: boolean) =>
  `px-3 py-2 rounded-lg text-md font-semibold tracking-wide transition-all ${
    active
      ? 'bg-violet-800/70 text-white'
      : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
  }`;

/* ─── Dropdown ─────────────────────────────────────────────── */
function Dropdown({ label, Icon: TopIcon, color, items }: {
  label: string;
  Icon: TopIcon;
  color: string;
  items: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const ref   = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isActive = items.some((i) => pathname === i.href || pathname.startsWith(i.href + '/'));

  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
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
        <TopIcon size={18} color={isActive ? color : undefined} />
        {label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 w-56 rounded-2xl border shadow-2xl py-1.5 z-50"
          style={{ background: 'rgba(5,8,25,0.97)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}
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
                <span className="shrink-0 w-4 flex items-center justify-center">
                  <item.Icon color={active ? color : 'currentColor'} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Navbar ───────────────────────────────────────────────── */
export default function NavbarClient({ session }: { session: Session | null }) {
  const pathname    = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded,   setExpanded]   = useState<string | null>(null);

  const close = () => setMobileOpen(false);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group" onClick={close}>
            <Image src="/icon.svg" alt="Logo" width={28} height={28} className="rounded shrink-0" />
            <span className="font-bold text-white text-xl hidden sm:block group-hover:text-violet-300 transition-colors">
              Suri<span className="text-violet-400">&apos;s Blog</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            {session && (
              <Link href="/dashboard" className={linkCls(pathname === '/dashboard')}>Dashboard</Link>
            )}

            <span className="mx-2 text-gray-700">|</span>

            {DROPDOWNS.map((d) => (
              <Dropdown key={d.label} label={d.label} Icon={d.Icon} color={d.color} items={d.items} />
            ))}

            <span className="mx-2 text-gray-700">|</span>

            {END_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(pathname === l.href)}>{l.label}</Link>
            ))}

            {/* <span className="mx-2 text-gray-700">|</span> */}
            {/* <SearchModal /> */}

            {session && (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-xs text-gray-600 hidden lg:block">
                  {session.user?.name || session.user?.email}
                </span>
                <Link href="/api/auth/signout"
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-red-700/60 hover:bg-red-600 text-white transition-all">
                  Déco
                </Link>
              </div>
            )}
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
        <div className="md:hidden border-t border-white/6" style={{ background: 'rgba(3,6,20,0.98)' }}>
          <div className="px-4 py-3 space-y-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>

            {session && (
              <Link href="/dashboard" onClick={close}
                className={`block px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                  pathname === '/dashboard' ? 'bg-violet-800/70 text-white' : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                }`}>
                Dashboard
              </Link>
            )}

            {DROPDOWNS.map((d) => {
              const isExp = expanded === d.label;
              const isAct = d.items.some((i) => pathname === i.href || pathname.startsWith(i.href + '/'));
              return (
                <div key={d.label}>
                  <button
                    onClick={() => setExpanded(isExp ? null : d.label)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                      isAct ? 'bg-violet-800/70 text-white' : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <d.Icon size={18} color={isAct ? d.color : undefined} />
                      {d.label}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${isExp ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExp && (
                    <div className="mt-1 ml-4 space-y-0.5 pb-1">
                      {d.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link key={item.href} href={item.href} onClick={close}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-md font-medium transition-all ${
                              active ? 'bg-violet-800/70 text-white' : 'text-gray-500 hover:text-white hover:bg-violet-900/40'
                            }`}>
                            <span className="shrink-0 w-4 flex items-center justify-center">
                              <item.Icon color={active ? d.color : 'currentColor'} />
                            </span>
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="h-px mx-1 my-2 bg-white/6" />

            {END_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}
                className={`block px-3 py-2.5 rounded-xl text-md font-semibold transition-all ${
                  pathname === l.href ? 'bg-violet-800/70 text-white' : 'text-gray-400 hover:text-white hover:bg-violet-900/40'
                }`}>
                {l.label}
              </Link>
            ))}

            {session && (
              <div className="pt-1">
                <Link href="/api/auth/signout" onClick={close}
                  className="text-xs px-3 py-2 rounded-lg bg-red-700/60 hover:bg-red-600 text-white transition-all inline-block">
                  Déconnexion
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
