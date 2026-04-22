// app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Suri Space',
  description: "Portfolio et blog d'Hadrien Vinay — Espace, physique atomique, sciences, projets personnels et plus encore.",
  keywords: ['portfolio', 'Hadrien Vinay', 'espace', 'sciences', 'astronomie', 'physique', 'aéronautique'],
  openGraph: {
    title: 'Suri Space — Portfolio d\'Hadrien Vinay',
    description: "Explorez l'espace, la chimie atomique, les sciences et mes projets personnels.",
    url: 'https://suri-space.vercel.app',
  },
};
import { JsonLd } from '@/components/JsonLd';
import Weather from '@/components/Weather';
import Ratp from '@/components/Ratp';
import Links from '@/components/ShowLinks';
import CVButton from '@/components/CVButton';
import { getCitationDuJour } from '@/data/citations';
import { SolarSystemIcon, TelescopeIcon, AtomIcon } from '@/components/UniverseIcons';
import { SunriseIcon, MetroIcon, SparkIcon } from '@/components/WidgetIcons';

const universeCards = [
  {
    href: '/solar-system',
    Icon: SolarSystemIcon,
    title: 'Espace',
    description: 'Système solaire, galaxies, missions spatiales et carte du ciel.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
    glow: '#60A5FA',
  },
  {
    href: '/sciences',
    Icon: TelescopeIcon,
    title: 'Sciences',
    description: 'Timeline interactive, grands scientifiques, formules et constantes.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
    glow: '#A78BFA',
  },
  {
    href: '/atoms',
    Icon: AtomIcon,
    title: 'Atomes',
    description: 'Tableau périodique, nucléosynthèse, abondance et histoire cosmique.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    glow: '#34D399',
  },
];

const skills = ['C / C++', 'Python', 'Next.js', 'SQL', 'Embarqué', 'Git','LLM','HTML/CSS', 'Docker', 'CI/CD', 'PHP', 'JavaScript', 'TypeScript'];

const projects = [
  {
    href: '/projects/2',
    icon: '🃏',
    title: 'Belote Coinchée',
    desc: 'Jeu de coinche en Python — entraînement contre IA, moteur de règles complet.',
    tags: ['Python', 'IA', 'Pygame'],
    status: 'Terminé',
    statusColor: 'text-emerald-400',
    statusDot: 'bg-emerald-400',
    border: 'border-violet-500/30',
    gradient: 'from-violet-600/10 to-purple-600/10',
    glow: '#A78BFA',
  },
  {
    href: '/projects/1',
    icon: '🪐',
    title: 'Simulation système solaire',
    desc: 'Modèle gravitationnel 2D/3D avec les lois de Newton — système Terre-Lune et solaire complet.',
    tags: ['Python', 'C++', 'OpenGL'],
    status: 'Terminé',
    statusColor: 'text-cyan-400',
    statusDot: 'bg-cyan-400',
    border: 'border-cyan-500/30',
    gradient: 'from-cyan-600/10 to-teal-600/10',
    glow: '#22D3EE',
  },
  {
    href: '/projects/8',
    icon: '📈',
    title: 'Bot de trading',
    desc: 'Reconnaissance de patterns chartistes sur métaux précieux — or et argent.',
    tags: ['Python', 'ML', 'Finance'],
    status: 'En cours',
    statusColor: 'text-amber-400',
    statusDot: 'bg-amber-400',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-600/10 to-green-600/10',
    glow: '#34D399',
  },
  {
    href: '/projects/10',
    icon: '🌐',
    title: 'Online Casino',
    desc: 'Casino en ligne multijoueur — backend en Node.js, frontend React, WebSocket.',
    tags: ['Next.js', 'React', 'WebSocket'],
    status: 'En ligne',
    statusColor: 'text-emerald-400',
    statusDot: 'bg-emerald-400',
    border: 'border-blue-500/30',
    gradient: 'from-blue-600/10 to-cyan-600/10',
    glow: '#60A5FA',
  },
];

export default function Home() {
  const citation = getCitationDuJour();
  return (
    <div
      className="max-w-7xl mx-auto px-4 py-10 space-y-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Suri Space',
        url: 'https://suri-space.vercel.app',
        description: "Portfolio et blog d'Hadrien Vinay — Espace, physique atomique, sciences et projets.",
        author: {
          '@type': 'Person',
          name: 'Hadrien Vinay',
          url: 'https://suri-space.vercel.app/about',
        },
      }} />

      {/* ── Hero ── */}
      <div className="text-center pt-6">
        <h1
          className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 pb-2"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Suri&apos;s Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-3">
          Un espace pour centraliser mes projets, mes explorations scientifiques et mes idées.
          Réalisé avec Next.js, Prisma, NextAuth et diverses API.
        </p>
        <p className="text-gray-600 text-sm max-w-3xl mx-auto italic mb-8 leading-relaxed">
          &ldquo;{citation.texte}&rdquo;{' '}
          <span className="text-gray-500 not-italic">— {citation.auteur}, {citation.ouvrage}, {citation.date}</span>
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <CVButton />
          <Link href="/about" className="px-6 py-3 rounded-xl font-semibold text-white border border-white/10 hover:bg-white/6 transition-all">
            Qui suis-je ?
          </Link>
        </div>
      </div>

      {/* ── Universe sections ── */}
      <div>
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
          Univers à explorer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {universeCards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative block rounded-2xl border ${c.border} bg-linear-to-br ${c.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div
                className="mb-3 flex justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ filter: `drop-shadow(0 0 16px ${c.glow})` }}
              >
                <c.Icon />
              </div>
              <h3 className={`text-xl font-bold mb-1.5 text-center ${c.accent}`}>{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed text-center">{c.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Widgets ── */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Météo */}
        <div
          className="p-5 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h3 className="text-base font-bold text-gray-300 mb-3 flex items-center gap-2">
            <SunriseIcon size={22} />
            <span>Météo</span>
          </h3>
          <div className="space-y-2">
            <Weather city="Paris" />
            <Weather city="Madrid" />
            <Weather city="Arcachon" />
          </div>
        </div>

        {/* Transports */}
        <div
          className="p-5 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h3 className="text-base font-bold text-gray-300 mb-3 flex items-center gap-2">
            <MetroIcon size={22} />
            <span>Transports</span>
          </h3>
          <Ratp />
        </div>

        {/* Compétences */}
        <div
          className="p-5 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <style>{`
            @keyframes skillShimmer {
              0%   { transform: translateX(-130%) skewX(-14deg); }
              100% { transform: translateX(230%)  skewX(-14deg); }
            }
            .skill-badge {
              position: relative;
              overflow: hidden;
              cursor: default;
              transition: transform .28s ease, border-color .28s, color .28s, background .28s, box-shadow .28s;
            }
            .skill-badge:hover {
              transform: translateY(-2px) scale(1.06);
              border-color: rgba(196,181,253,0.75);
              color: #fff;
              background: rgba(139,92,246,0.22);
              box-shadow: 0 10px 26px rgba(139,92,246,0.35), 0 0 0 1px rgba(196,181,253,0.15) inset;
            }
            .skill-shimmer {
              position: absolute;
              top: 0; bottom: 0; left: -20%; right: -20%;
              background: linear-gradient(90deg, transparent 10%, rgba(245,243,255,0.45) 50%, transparent 90%);
              transform: translateX(-130%) skewX(-14deg);
              pointer-events: none;
            }
            .skill-badge:hover .skill-shimmer {
              animation: skillShimmer .9s ease-out;
            }
          `}</style>
          <h3 className="text-base font-bold text-gray-300 mb-3 flex items-center gap-2">
            <SparkIcon size={22} />
            <span>Compétences</span>
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((s) => (
              <span
                key={s}
                className="skill-badge inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold border border-violet-500/30 text-violet-300"
                style={{ background: 'rgba(139,92,246,0.10)' }}
              >
                <span className="skill-shimmer" aria-hidden />
                <span className="relative z-[1]">{s}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent projects ── */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">Projets récents</h2>
          <div className="flex-1 h-px bg-white/6" />
          <Link href="/projects" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            Tous les projets →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className={`group relative p-5 rounded-2xl border ${p.border} bg-linear-to-br ${p.gradient} transition-all duration-300 hover:scale-[1.02] hover:brightness-110 overflow-hidden`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              {/* glow corner */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ background: p.glow }}
              />

              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-3xl"
                  style={{ filter: `drop-shadow(0 0 10px ${p.glow})` }}
                >
                  {p.icon}
                </span>
                <span className={`flex items-center gap-1.5 text-xs font-medium ${p.statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${p.statusDot} animate-pulse`} />
                  {p.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.desc}</p>

              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs font-medium text-gray-300 border border-white/10"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3">
                  Voir →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Media / links ── */}
      <div className="border-t border-white/6 pt-10">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
          Médias et ressources utiles
        </h2>
        <Links />
      </div>

    </div>
  );
}
