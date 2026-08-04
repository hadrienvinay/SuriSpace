// app/space/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Espace',
  description: "Explorez le système solaire, les galaxies, les missions spatiales, les étoiles et l'astronomie — données interactives et visualisations.",
  keywords: ['espace', 'système solaire', 'astronomie', 'galaxies', 'missions spatiales', 'étoiles', 'constellations'],
  openGraph: {
    title: 'Espace | Suri Space',
    description: "Du Soleil aux confins de l'univers — système solaire, galaxies, missions et carte du ciel.",
    url: 'https://suri-space.vercel.app/space',
  },
};
import SolarLayout from '@/components/SolarLayout';
import { MapIcon, EarthIcon, RocketIcon, StarIcon } from '@/components/SpaceIcons';
import { GalaxyIcon } from '@/components/AtomsIcons';
import { SolarSystemIcon, TelescopeIcon } from '@/components/UniverseIcons';
import { JsonLd } from '@/components/JsonLd';
import { IcoMoon, IcoDish, IcoSunStar, IcoPlanetRing } from '@/components/SolarIcons';

const sections = [
  {
    href: '/space/carte',
    Icon: SolarSystemIcon,
    title: 'Système solaire',
    description: 'Système solaire en échelle logarithmique : planètes, sondes actives, zone habitable et distances en UA.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
    badge: 'Live',
  },
  {
    href: '/space/bodys',
    Icon: EarthIcon,
    title: 'Corps du Système Solaire',
    description: 'Soleil, planètes, lunes, astéroïdes et comètes — données physiques complètes et galerie illustrée.',
    gradient: 'from-orange-600/20 to-amber-600/20',
    border: 'border-orange-500/30',
    accent: 'text-orange-300',
  },
  {
    href: '/space/galaxies',
    Icon: GalaxyIcon,
    title: 'Galaxies',
    description: 'Notre Voie Lactée, Andromède et les 15 galaxies les plus remarquables de l\'univers observable.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
  },
  {
    href: '/space/missions',
    Icon: RocketIcon,
    title: 'Missions & Sondes',
    description: 'Apollo, Voyager, James Webb, Perseverance… 50+ missions historiques et en cours depuis 1957.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
  },
  {
    href: '/space/stars',
    Icon: MapIcon,
    title: 'Carte du Ciel',
    description: 'Étoiles voisines, types spectraux, constellations et nébuleuses — cartographie stellaire interactive.',
    gradient: 'from-yellow-600/20 to-black-600/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
  },
  {
    href: '/space/stars/star',
    Icon: StarIcon,
    title: "Etoiles",
    description: 'Informations et détails des principales étoiles de notre ciel (hémisphère nord pour le moment)',
    gradient: 'from-yellow-400/40 to-amber-400/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
  },
  {
    href: '/space/astronomie',
    Icon: TelescopeIcon,
    title: 'Astronomie',
    description: 'Histoire de l\'astronomie, instruments à travers le temps, catalogue Messier (110 objets) et observatoires terrestres et spatiaux.',
    gradient: 'from-indigo-600/20 to-violet-600/20',
    border: 'border-indigo-500/30',
    accent: 'text-indigo-300',
  },
  {
    href: '/space/exoplanetes',
    Icon: function ExoIcon() {
      return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="12" fill="rgba(96,165,250,0.15)" stroke="#60A5FA" strokeWidth="1.5" />
          <ellipse cx="28" cy="28" rx="22" ry="7" fill="none" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="10" cy="14" r="3" fill="rgba(251,191,36,0.4)" stroke="#FBBF24" strokeWidth="1" />
          <circle cx="44" cy="12" r="2" fill="rgba(167,139,250,0.5)" stroke="#A78BFA" strokeWidth="0.8" />
          <circle cx="47" cy="38" r="1.5" fill="rgba(52,211,153,0.5)" stroke="#34D399" strokeWidth="0.8" />
          <circle cx="28" cy="24" r="3" fill="rgba(96,165,250,0.6)" />
        </svg>
      );
    },
    title: 'Exoplanètes',
    description: '20 mondes au-delà du système solaire — Proxima b, TRAPPIST-1e, Kepler-452b, zones habitables et méthodes de détection.',
    gradient: 'from-blue-600/20 to-violet-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
  },
];

const facts = [
  { value: '4,6 Ga', label: 'âge du Système Solaire' },
  { value: '8', label: 'planètes + 5 planètes naines officielles' },
  { value: '1 UA', label: '= 149,6 millions de km, Terre–Soleil' },
  { value: '~200 UA', label: 'diamètre de l\'héliosphère' },
  { value: '299 792 km/s', label: 'vitesse de la lumière' },
  { value: '13,8 Ga', label: 'âge de l\'Univers observable' },
];

const highlights = [
  { Icon: IcoSunStar,    label: 'Soleil',    sub: '99,86 % de la masse',  color: '#FCD34D' },
  { Icon: IcoPlanetRing, label: 'Jupiter',   sub: '318 × Terre',          color: '#FB923C' },
  { Icon: IcoMoon,       label: 'Lune',      sub: 'à 384 400 km',         color: '#C4B5FD' },
  { Icon: IcoDish,       label: 'Voyager 1', sub: '~163 UA de la Terre',  color: '#60A5FA' },
];

export default function EspaceHome() {
  return (
    <SolarLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Espace', item: 'https://suri-space.vercel.app/space' },
        ]},
        { '@type': 'CollectionPage', name: "L'Espace", url: 'https://suri-space.vercel.app/space',
          description: "Explorez le système solaire, les galaxies, les missions spatiales, les étoiles et l'astronomie.",
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />

      {/* Hero immersif */}
      <div className="relative min-h-[58vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-16">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 620, height: 620, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: '#60A5FA', opacity: 0.28, filter: 'blur(110px)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 40px #60A5FA)' }}>
            <SolarSystemIcon size={120} />
          </div>
          <div className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#60A5FA' }}>
            Encyclopédie · Espace
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            L'Espace
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Du Soleil aux confins de l'univers observable — explorez notre système solaire,
            les missions spatiales, les étoiles et les galaxies lointaines.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* En bref — chiffres clés + highlights */}
        <div className="pb-9 mb-11" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            En bref
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {facts.map((f, i) => (
              <div
                key={i}
                className="text-center rounded-xl border py-3.5 px-3"
                style={{ background: 'rgba(96,165,250,0.04)', borderColor: 'rgba(96,165,250,0.16)' }}
              >
                <div
                  className="text-[15px] font-extrabold"
                  style={{ color: '#60A5FA', fontFamily: "'Exo 2', monospace" }}
                >
                  {f.value}
                </div>
                <div className="text-[10.5px] text-gray-500 leading-snug mt-0.5">{f.label}</div>
              </div>
            ))}
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/8 py-3 px-3.5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="shrink-0" style={{ color: h.color }}><h.Icon size={22} /></span>
                <div>
                  <div className="text-xs font-bold text-white">{h.label}</div>
                  <div className="text-[10.5px] text-gray-500">{h.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section cards — doors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative block rounded-2xl border ${s.border} bg-linear-to-br ${s.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              {s.badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                  {s.badge}
                </span>
              )}
              <div className="mb-3 flex justify-center transition-transform duration-500 group-hover:scale-110">
                <s.Icon />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${s.accent} text-center`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed text-center">{s.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </SolarLayout>
  );
}
