// app/solar-system/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Espace',
  description: "Explorez le système solaire, les galaxies, les missions spatiales, les étoiles et l'astronomie — données interactives et visualisations.",
  keywords: ['espace', 'système solaire', 'astronomie', 'galaxies', 'missions spatiales', 'étoiles', 'constellations'],
  openGraph: {
    title: 'Espace | Suri Space',
    description: "Du Soleil aux confins de l'univers — système solaire, galaxies, missions et carte du ciel.",
    url: 'https://surispace.fr/solar-system',
  },
};
import SolarLayout from '@/components/SolarLayout';

const sections = [
  {
    href: '/solar-system/carte',
    icon: '🗺️',
    title: 'Système solaire',
    description: 'Système solaire en échelle logarithmique : planètes, sondes actives, zone habitable et distances en UA.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
    badge: 'Live',
  },
  {
    href: '/solar-system/bodys',
    icon: '🌍',
    title: 'Corps du Système Solaire',
    description: 'Soleil, planètes, lunes, astéroïdes et comètes — données physiques complètes et galerie illustrée.',
    gradient: 'from-orange-600/20 to-amber-600/20',
    border: 'border-orange-500/30',
    accent: 'text-orange-300',
  },
  {
    href: '/solar-system/galaxies',
    icon: '🌌',
    title: 'Galaxies',
    description: 'Notre Voie Lactée, Andromède et les 15 galaxies les plus remarquables de l\'univers observable.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
  },
  {
    href: '/solar-system/missions',
    icon: '🚀',
    title: 'Missions & Sondes',
    description: 'Apollo, Voyager, James Webb, Perseverance… 50+ missions historiques et en cours depuis 1957.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
  },
  {
    href: '/solar-system/stars',
    icon: '🗺️',
    title: 'Carte du Ciel',
    description: 'Étoiles voisines, types spectraux, constellations et nébuleuses — cartographie stellaire interactive.',
    gradient: 'from-yellow-600/20 to-black-600/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
  },
  {
    href: '/solar-system/stars/star',
    icon: '⭐',
    title: "Etoiles",
    description: 'Informations et détails des principales étoiles de notre ciel (hémisphère nord pour le moment)',
    gradient: 'from-yellow-400/40 to-amber-400/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
  },
  {
    href: '/solar-system/astronomie',
    icon: '🔭',
    title: 'Astronomie',
    description: 'Histoire de l\'astronomie, instruments à travers le temps, catalogue Messier (110 objets) et observatoires terrestres et spatiaux.',
    gradient: 'from-indigo-600/20 to-violet-600/20',
    border: 'border-indigo-500/30',
    accent: 'text-indigo-300',
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
  { emoji: '☀️', label: 'Soleil', sub: '99,86 % de la masse' },
  { emoji: '🪐', label: 'Jupiter', sub: '318 × Terre' },
  { emoji: '🌙', label: 'Lune', sub: 'à 384 400 km' },
  { emoji: '🛸', label: 'Voyager 1', sub: '~163 UA de la Terre' },
];

export default function EspaceHome() {
  return (
    <SolarLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-6" style={{ filter: 'drop-shadow(0 0 40px #60A5FA)' }}>
            🪐
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight"
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

        {/* Quick highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="text-center rounded-2xl border border-white/6 py-4 px-3"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="text-3xl mb-1">{h.emoji}</div>
              <div className="text-sm font-bold text-white">{h.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{h.sub}</div>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
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
              <div className="text-4xl mb-3">{s.icon}</div>
              <h2 className={`text-xl font-bold mb-2 ${s.accent}`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {s.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Fun facts */}
        <div
          className="rounded-2xl border border-white/10 p-8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
            Quelques chiffres
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {facts.map((f, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Exo 2', monospace",
                  }}
                >
                  {f.value}
                </div>
                <div className="text-xs text-gray-500 leading-tight">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SolarLayout>
  );
}
