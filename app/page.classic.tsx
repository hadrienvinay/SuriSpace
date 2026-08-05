// app/page.classic.tsx — SAUVEGARDE de l'ancienne home (design "cartes empilées").
// Fichier inerte : Next.js ne route que app/page.tsx exact, donc ceci n'est pas une route active.
// Pour restaurer : `cp app/page.classic.tsx app/page.tsx`.
import type { Metadata } from 'next';
import type React from 'react';
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
import Image from 'next/image';
import { JsonLd } from '@/components/common/JsonLd';
import Weather from '@/components/widgets/Weather';
import Ratp from '@/components/widgets/Ratp';
import Sncf from '@/components/widgets/Sncf';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import Links from '@/components/common/ShowLinks';
import CVButton from '@/components/buttons/CVButton';
import QuizButton from '@/components/modal/QuizModal';
import { getCitationDuJour } from '@/data/citations';
import { getFactDuJour } from '@/data/facts';
import { getScientificEventDuJour } from '@/data/scientificEvents';
import { STATIC_POSTS } from '@/data/posts';
import { computeDailyInfo, computeEvents, type EventItem } from '@/lib/ephemerides';
import { SolarSystemIcon, TelescopeIcon, AtomIcon } from '@/components/icons/UniverseIcons';
import { SunriseIcon, MetroIcon, SparkIcon } from '@/components/icons/WidgetIcons';
import prisma from '@/lib/prisma';

const FACT_CATEGORY_COLORS: Record<string, string> = {
  'Élément': '#34D399',
  'Étoile': '#FBBF24',
  'Scientifique': '#A78BFA',
};

const SCI_EVENT_CATEGORY_COLORS: Record<string, string> = {
  'Naissance':  '#60A5FA',
  'Décès':      '#9CA3AF',
  'Découverte': '#F59E0B',
  'Histoire':   '#F472B6',
};

// ── Upcoming astronomical events (moon phases, equinoxes, oppositions…) ───────
function getUpcomingEvents(count: number, from: Date = new Date()): EventItem[] {
  const events: EventItem[] = [];
  let cursor = new Date(from.getFullYear(), from.getMonth(), 1);
  const todayStart = new Date(from.getFullYear(), from.getMonth(), from.getDate());

  for (let i = 0; events.length < count && i < 6; i++) {
    const monthEvents = computeEvents(cursor);
    for (const e of monthEvents) {
      const eventDate = new Date(cursor.getFullYear(), cursor.getMonth(), e.dayNumber);
      if (eventDate >= todayStart) events.push(e);
    }
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  return events.slice(0, count);
}

const universeCards = [
  {
    href: '/space',
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

// ── Sky banner SVG icons ──────────────────────────────────────────────────────
function SvgSunrise() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="9.5" x2="12" y2="9.5" stroke="#FCD34D" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M 3.3 9.5 A 3.2 3.2 0 0 1 9.7 9.5 Z" fill="#FCD34D"/>
      <line x1="6.5" y1="1.5" x2="6.5" y2="3"   stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="2.2" y1="3.8" x2="3.2" y2="4.8" stroke="#FCD34D" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="10.8" y1="3.8" x2="9.8" y2="4.8" stroke="#FCD34D" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

function SvgSunset() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="8.5" x2="12" y2="8.5" stroke="#FB923C" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M 3.3 8.5 A 3.2 3.2 0 0 1 9.7 8.5 Z" fill="#FB923C"/>
      <line x1="1.8" y1="5.2" x2="2.9" y2="6.2" stroke="#FB923C" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="11.2" y1="5.2" x2="10.1" y2="6.2" stroke="#FB923C" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="1"   y1="7.2" x2="2.2" y2="7.2" stroke="#FB923C" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="12"  y1="7.2" x2="10.8" y2="7.2" stroke="#FB923C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

function SvgMoonPhase({ percent, isWaxing }: { percent: number; isWaxing: boolean }) {
  const R = 5, cx = 7, cy = 7;
  if (percent >= 95) return (
    <svg width="14" height="14" viewBox="0 0 14 14"><circle cx={cx} cy={cy} r={R} fill="rgba(230,236,255,0.88)"/></svg>
  );
  if (percent <= 5) return (
    <svg width="14" height="14" viewBox="0 0 14 14"><circle cx={cx} cy={cy} r={R} fill="rgba(18,28,58,0.9)" stroke="rgba(150,170,220,0.35)" strokeWidth="0.8"/></svg>
  );
  const f   = percent / 100;
  const tx  = +(R * Math.abs(2 * f - 1)).toFixed(2);
  const gibbous = f > 0.5;
  const litRight = isWaxing;
  const outerSweep  = litRight ? 1 : 0;
  const termSweep   = litRight ? (gibbous ? 1 : 0) : (gibbous ? 0 : 1);
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <circle cx={cx} cy={cy} r={R} fill="rgba(18,28,58,0.9)" stroke="rgba(150,170,220,0.3)" strokeWidth="0.7"/>
      <path
        d={`M${cx} ${cy-R} A${R} ${R} 0 0 ${outerSweep} ${cx} ${cy+R} A${tx} ${R} 0 0 ${termSweep} ${cx} ${cy-R}Z`}
        fill="rgba(225,232,255,0.88)"
      />
    </svg>
  );
}

function SvgPlanet() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="3" fill="rgba(96,165,250,0.65)" stroke="rgba(96,165,250,0.85)" strokeWidth="0.6"/>
      <ellipse cx="7" cy="7" rx="6.2" ry="2.2" stroke="rgba(96,165,250,0.55)" strokeWidth="0.9" transform="rotate(-22 7 7)"/>
    </svg>
  );
}

export default async function Home() {
  const citation   = getCitationDuJour();
  const fact       = getFactDuJour();
  const sciEvent   = getScientificEventDuJour();
  const daily      = computeDailyInfo();
  const events     = getUpcomingEvents(3);
  const dbPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, resume: true, image: true, createdAt: true },
  });

  // Fusionne les articles DB (publiés) avec les articles statiques (en dur, hors DB)
  const latestPosts = [
    ...dbPosts.map(p => ({
      key: `db-${p.id}`, href: `/posts/${p.id}`, title: p.title,
      excerpt: p.resume, image: p.image || '/default.png',
      dateLabel: p.createdAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
      sortTime: p.createdAt.getTime(),
    })),
    ...STATIC_POSTS.map(p => ({
      key: p.href, href: p.href, title: p.title,
      excerpt: p.excerpt, image: p.image,
      dateLabel: p.year,
      sortTime: new Date(`${p.year}-06-30`).getTime(),
    })),
  ]
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 3);
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
          Bienvenue sur le blog d'Hadrien Vinay ! Un espace pour centraliser mes projets, des connaissances et des idées.
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

      {/* ── Formations à explorer ── */}
      <div>
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
          Formations à explorer
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/mooc/telecom-spatiale.html"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-blue-300 border border-blue-500/25 hover:bg-blue-500/10 transition-all"
          >
            MOOC · Télécom Spatiale
          </a>
          <a
            href="/mooc/programmation-spatiale.html"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-violet-300 border border-violet-500/25 hover:bg-violet-500/10 transition-all"
          >
            MOOC · Programmation Spatiale
          </a>
          <a
            href="https://astrum-rouge.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/10 transition-all"
          >
            MOOC · Astronomie
          </a>
          <a
            href="/mooc/formation-solaire.html"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-amber-300 border border-amber-500/25 hover:bg-amber-500/10 transition-all"
          >
            MOOC · Énergie Solaire
          </a>
        </div>
      </div>

      {/* ── Le savais-tu ? ── */}
      <div
        className="rounded-2xl border border-white/8 p-6"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Le savais-tu ?</span>
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-semibold border"
            style={{
              color: FACT_CATEGORY_COLORS[fact.category],
              borderColor: `${FACT_CATEGORY_COLORS[fact.category]}40`,
              background: `${FACT_CATEGORY_COLORS[fact.category]}12`,
            }}
          >
            {fact.category}
          </span>
        </div>
        <p className="text-gray-300 text-base leading-relaxed mb-3">{fact.text}</p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link
            href={fact.href}
            className="text-sm font-semibold transition-colors"
            style={{ color: FACT_CATEGORY_COLORS[fact.category] }}
          >
            {fact.source} →
          </Link>
          <QuizButton />
        </div>
      </div>

      {/* ── Timeline scientifique du jour ── */}
      {sciEvent && (
        <div
          className="rounded-2xl border border-white/8 p-6"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Ce jour-là dans l&apos;histoire</span>
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-semibold border"
              style={{
                color: SCI_EVENT_CATEGORY_COLORS[sciEvent.category],
                borderColor: `${SCI_EVENT_CATEGORY_COLORS[sciEvent.category]}40`,
                background: `${SCI_EVENT_CATEGORY_COLORS[sciEvent.category]}12`,
              }}
            >
              {sciEvent.category}
            </span>
            <span className="text-xs font-mono text-gray-600">{sciEvent.yearLabel}</span>
          </div>
          <p className="text-gray-300 text-base leading-relaxed mb-3">{sciEvent.text}</p>
          {sciEvent.href ? (
            <Link
              href={sciEvent.href}
              className="text-sm font-semibold transition-colors"
              style={{ color: SCI_EVENT_CATEGORY_COLORS[sciEvent.category] }}
            >
              {sciEvent.source} →
            </Link>
          ) : (
            <span className="text-sm font-semibold" style={{ color: SCI_EVENT_CATEGORY_COLORS[sciEvent.category] }}>
              {sciEvent.source}
            </span>
          )}
        </div>
      )}

      {/* ── Carte du ciel ── */}
      {(() => {
        const todayFr = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        return (
          <Link
            href="/space/astronomie/ciel"
            className="group flex items-center gap-5 rounded-2xl border border-blue-500/20 px-6 py-4 transition-all duration-300 hover:border-blue-400/40 hover:brightness-110 overflow-hidden relative"
            style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(15,30,80,0.7) 0%, rgba(5,8,25,0.8) 100%)' }}
          >
            {/* Micro-stars background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {[
                [8,20],[15,70],[25,40],[35,15],[45,80],[55,35],[65,60],[72,18],[80,75],[88,45],[93,28],[97,65],
                [12,55],[30,88],[50,12],[70,90],[85,20],[42,65],[58,48],[78,38],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={i % 3 === 0 ? '1' : '0.6'} fill="white" opacity={0.08 + (i % 4) * 0.04}>
                  <animate attributeName="opacity" values={`${0.06 + (i % 4) * 0.04};${0.18 + (i % 3) * 0.06};${0.06 + (i % 4) * 0.04}`} dur={`${2.2 + (i % 5) * 0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>

            {/* Moon + stars icon */}
            <div className="shrink-0 relative z-10" style={{ filter: 'drop-shadow(0 0 14px rgba(96,165,250,0.5))' }}>
              <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="28" r="13" fill="#0b1a42" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.6" />
                <path d="M 22 15 A 13 13 0 0 1 35 28 A 9 9 0 1 0 22 15 Z" fill="#1e3a7a" opacity="0.9" />
                {[
                  [40, 10, 1.4], [44, 22, 1.0], [36, 6, 0.9], [48, 14, 0.8], [42, 30, 0.7],
                ].map(([x, y, r], i) => (
                  <circle key={i} cx={x} cy={y} r={r} fill="white" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 relative z-10 min-w-0">
              <div className="text-xs font-mono text-blue-400/60 uppercase tracking-widest mb-0.5 capitalize">{todayFr}</div>
              <div className="text-base font-bold text-white mb-2">Carte du ciel du soir</div>
              <div className="flex flex-wrap gap-2">
                {([
                  { svg: <SvgSunrise />,  label: 'Lever',    value: daily.sunriseStr },
                  { svg: <SvgSunset />,   label: 'Coucher',  value: daily.sunsetStr  },
                  { svg: <SvgMoonPhase percent={daily.moonPercent} isWaxing={daily.isWaxing} />, label: 'Lune', value: `${daily.moonPercent}%` },
                  { svg: <SvgPlanet />,   label: 'Planètes', value: daily.visiblePlanetNames.length > 0 ? `${daily.visiblePlanetNames.length} visible${daily.visiblePlanetNames.length > 1 ? 's' : ''}` : 'aucune' },
                ] as { svg: React.ReactNode; label: string; value: string }[]).map(chip => (
                  <span key={chip.label} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium border border-white/8"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)' }}>
                    <span className="flex items-center">{chip.svg}</span>
                    <span style={{ color: 'rgba(255,255,255,0.28)' }}>{chip.label}</span>
                    <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>{chip.value}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0 relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-blue-300 border border-blue-500/25 transition-all group-hover:bg-blue-500/10 group-hover:border-blue-400/40"
              style={{ background: 'rgba(96,165,250,0.06)' }}>
              Voir la carte
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        );
      })()}

      {/* ── Éphémérides — prochains événements ── */}
      {events.length > 0 && (
        <div>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            Éphémérides à venir
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {events.map((e, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-white/8 p-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="text-2xl shrink-0" style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.4))' }}>
                  {e.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-violet-400/70 uppercase tracking-wider mb-0.5">{e.date}</div>
                  <p className="text-sm text-gray-300 leading-snug">{e.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
            <ErrorBoundary label="Météo Paris">    <Weather city="Paris" />    </ErrorBoundary>
            <ErrorBoundary label="Météo Madrid">   <Weather city="Madrid" />   </ErrorBoundary>
            <ErrorBoundary label="Météo Arcachon"> <Weather city="Arcachon" /> </ErrorBoundary>
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
          <ErrorBoundary label="Métro ligne 10"><Ratp /></ErrorBoundary>
          <div className="my-3 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <ErrorBoundary label="Trains Arcachon"><Sncf /></ErrorBoundary>
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

      {/* ── Latest articles ── */}
      {latestPosts.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">Derniers articles</h2>
            <div className="flex-1 h-px bg-white/6" />
            <Link href="/posts" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              Tous les articles →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.key}
                href={post.href}
                className="group relative block rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={post.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-600 font-mono mb-1">{post.dateLabel}</div>
                  <h3 className="text-base font-bold text-white mb-1.5 leading-snug">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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
