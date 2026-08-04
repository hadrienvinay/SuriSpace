// app/page.tsx
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
import { JsonLd } from '@/components/JsonLd';
import Weather from '@/components/Weather';
import Ratp from '@/components/Ratp';
import Sncf from '@/components/Sncf';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Links from '@/components/ShowLinks';
import CVButton from '@/components/CVButton';
import QuizButton from '@/components/QuizModal';
import ScrollTrajectory from '@/components/ScrollTrajectory';
import { getCitationDuJour } from '@/data/citations';
import { getFactDuJour } from '@/data/facts';
import { getScientificEventDuJour } from '@/data/scientificEvents';
import { STATIC_POSTS } from '@/data/posts';
import { computeDailyInfo, computeEvents, type EventItem } from '@/lib/ephemerides';
import { SolarSystemIcon, TelescopeIcon, AtomIcon } from '@/components/UniverseIcons';
import { SunriseIcon, MetroIcon, SparkIcon } from '@/components/WidgetIcons';
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

const universeNav = [
  {
    href: '/solar-system',
    Icon: SolarSystemIcon,
    title: 'Espace',
    description: 'Système solaire, galaxies, missions spatiales et carte du ciel.',
    accent: '#60A5FA',
  },
  {
    href: '/sciences',
    Icon: TelescopeIcon,
    title: 'Sciences',
    description: 'Timeline interactive, grands scientifiques, formules et constantes.',
    accent: '#A78BFA',
  },
  {
    href: '/atoms',
    Icon: AtomIcon,
    title: 'Atomes',
    description: 'Tableau périodique, nucléosynthèse, abondance et histoire cosmique.',
    accent: '#34D399',
  },
];

const skills = ['C / C++', 'Python', 'Next.js', 'SQL', 'Embarqué', 'Git','LLM','HTML/CSS', 'Docker', 'CI/CD', 'PHP', 'JavaScript', 'TypeScript'];

const moocs = [
  { href: '/mooc/telecom-spatiale.html', label: 'Télécom Spatiale', Icon: IconAntenna, color: '#60A5FA' },
  { href: '/mooc/programmation-spatiale.html', label: 'Programmation Spatiale', Icon: IconCodeBrackets, color: '#A78BFA' },
  { href: 'https://astrum-rouge.vercel.app/', label: 'Astronomie', Icon: IconTelescopeSmall, color: '#34D399' },
  { href: '/mooc/formation-solaire.html', label: 'Énergie Solaire', Icon: IconSunRays, color: '#FBBF24' },
];

const projects = [
  {
    href: '/projects/2',
    Icon: IconCards,
    title: 'Belote Coinchée',
    desc: 'Jeu de coinche en Python — entraînement contre IA, moteur de règles complet.',
    tags: ['Python', 'IA', 'Pygame'],
    status: 'Terminé',
    statusColor: '#34D399',
  },
  {
    href: '/projects/1',
    Icon: IconRingedPlanet,
    title: 'Simulation système solaire',
    desc: 'Modèle gravitationnel 2D/3D avec les lois de Newton — système Terre-Lune et solaire complet.',
    tags: ['Python', 'C++', 'OpenGL'],
    status: 'Terminé',
    statusColor: '#22D3EE',
  },
  {
    href: '/projects/8',
    Icon: IconTrendUp,
    title: 'Bot de trading',
    desc: 'Reconnaissance de patterns chartistes sur métaux précieux — or et argent.',
    tags: ['Python', 'ML', 'Finance'],
    status: 'En cours',
    statusColor: '#FBBF24',
  },
  {
    href: '/projects/10',
    Icon: IconGlobeNetwork,
    title: 'Online Casino',
    desc: 'Casino en ligne multijoueur — backend en Node.js, frontend React, WebSocket.',
    tags: ['Next.js', 'React', 'WebSocket'],
    status: 'En ligne',
    statusColor: '#60A5FA',
  },
];

// ── Sky module SVG icons ───────────────────────────────────────────────────
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

// ── Project icons ────────────────────────────────────────────────────────────
function IconCards({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="12" height="16" rx="2" transform="rotate(-12 3 6)" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <rect x="8" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M14 9 L14.9 11 L17 11.2 L15.5 12.6 L15.9 14.7 L14 13.6 L12.1 14.7 L12.5 12.6 L11 11.2 L13.1 11 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function IconRingedPlanet({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.3"/>
      <ellipse cx="12" cy="12" rx="10.5" ry="3.6" stroke="currentColor" strokeWidth="1.3" transform="rotate(-18 12 12)"/>
    </svg>
  );
}

function IconTrendUp({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17 L9.5 10.5 L13.5 14.5 L21 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 6 H21 V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconGlobeNetwork({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.3"/>
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" stroke="currentColor" strokeWidth="1.1" opacity="0.7"/>
      <path d="M3.5 12 H20.5" stroke="currentColor" strokeWidth="1.1" opacity="0.7"/>
      <path d="M5 7.5 H19 M5 16.5 H19" stroke="currentColor" strokeWidth="1.1" opacity="0.7"/>
    </svg>
  );
}

// ── MOOC icons ────────────────────────────────────────────────────────────────
function IconAntenna({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3 L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="12" cy="13.5" r="1.6" fill="currentColor"/>
      <path d="M8 6 Q12 2 16 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M5.5 8.5 Q12 1.5 18.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M8 21 L16 21 L14 15 L10 15 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function IconCodeBrackets({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6 L3.5 12 L9 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 6 L20.5 12 L15 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 4 L10.5 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function IconTelescopeSmall({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14 L16 8 L18 12 L6 18 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
      <path d="M6 18 L4.5 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M17 15 L20 16.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <circle cx="17.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  );
}

function IconSunRays({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M12 2.5 V5 M12 19 V21.5 M21.5 12 H19 M5 12 H2.5 M18.5 5.5 L16.8 7.2 M7.2 16.8 L5.5 18.5 M18.5 18.5 L16.8 16.8 M7.2 7.2 L5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
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
  const allPosts = [
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
  ].sort((a, b) => b.sortTime - a.sortTime);

  const [leadPost, ...restPosts] = allPosts.slice(0, 3);
  const todayFr = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div
      className="max-w-6xl mx-auto px-6 pb-20"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif", color: '#e9eaf2' }}
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
      <div id="wp-hero" className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 py-12 md:py-16 items-start">
        <div className="md:col-span-7">
          <h1
            className="font-extrabold leading-[1.04] tracking-tight mb-7 text-[46px] sm:text-[58px] lg:text-[72px]"
            style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}
          >
            Explorer{' '}
            <span style={{ color: '#C4B5FD' }}>l&apos;espace</span>
            , les{' '}
            <span style={{ color: '#C4B5FD' }}>sciences</span>{' '}
            et mon parcours 
          </h1>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-md mb-7">
            Un carnet de bord pour partager mes projets, mon parcours, mes idées et tout ce qui me passionne, de l&apos;infiniment grand à l&apos;infiniment petit.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <CVButton />
            <Link
              href="/about"
              className="text-sm font-semibold text-white relative pb-0.5 group"
            >
              Qui suis-je ?
              <span className="absolute left-0 right-0 bottom-0 h-px bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative pl-7" style={{ borderLeft: '3px solid #60A5FA' }}>
          <span
            className="absolute select-none"
            style={{
              top: -34, left: -8, fontSize: 96, fontWeight: 800, color: '#60A5FA', opacity: 0.18,
              fontFamily: 'Georgia, "Times New Roman", serif', lineHeight: 1,
            }}
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="text-[22px] font-semibold italic leading-snug mb-3.5" style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
            {citation.texte}
          </p>
          <cite className="not-italic text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {citation.auteur} — {citation.ouvrage}, {citation.date}
          </cite>
        </div>
      </div>

      {/* ── Univers à explorer (bande de navigation) ── */}
      <div id="wp-univers" className="flex flex-col sm:flex-row border-y border-white/8 py-5">
        {universeNav.map((u, i) => (
          <Link
            key={u.href}
            href={u.href}
            className={`group flex-1 flex items-center gap-3 px-0 sm:px-6 py-3 sm:py-0 ${i > 0 ? 'sm:border-l border-white/8 border-t sm:border-t-0' : ''}`}
          >
            <div className="shrink-0 flex items-center justify-center" style={{ filter: `drop-shadow(0 0 10px ${u.accent})` }}>
              <u.Icon size={50} />
            </div>
            <div>
              <div className="text-[16.5px] font-bold mb-0.5 transition-colors" style={{ color: '#e9eaf2' }}>
                <span className="group-hover:opacity-80">{u.title}</span>
              </div>
              <div className="text-[12.5px] text-gray-500 leading-relaxed">{u.description}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Corps : colonne principale + rail latéral ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-14 pt-12">
        <div className="md:col-span-8">

          {/* Le savais-tu */}
          <div id="wp-savais-tu" className="flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-3.5">
            Le savais-tu ?
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ color: FACT_CATEGORY_COLORS[fact.category], background: `${FACT_CATEGORY_COLORS[fact.category]}12` }}
            >
              {fact.category}
            </span>
          </div>
          <div className="py-5 border-b border-white/7">
            <p className="text-[21px] font-bold leading-snug mb-2" style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
              {fact.text}
            </p>
            <div className="flex items-center gap-3.5 flex-wrap mt-3">
              <Link href={fact.href} className="text-[13px] font-bold" style={{ color: FACT_CATEGORY_COLORS[fact.category] }}>
                {fact.source} →
              </Link>
              <QuizButton />
            </div>
          </div>

          {/* Ce jour-là */}
          {sciEvent && (
            <>
              <div className="flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-3.5 mt-7">
                Ce jour-là dans l&apos;histoire
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ color: SCI_EVENT_CATEGORY_COLORS[sciEvent.category], background: `${SCI_EVENT_CATEGORY_COLORS[sciEvent.category]}12` }}
                >
                  {sciEvent.category}
                </span>
                <span className="font-mono normal-case tracking-normal text-gray-600">{sciEvent.yearLabel}</span>
              </div>
              <div className="py-5 border-b border-white/7">
                <p className="text-[15px] text-gray-300 leading-relaxed mb-2">{sciEvent.text}</p>
                {sciEvent.href ? (
                  <Link href={sciEvent.href} className="text-[13px] font-bold" style={{ color: SCI_EVENT_CATEGORY_COLORS[sciEvent.category] }}>
                    {sciEvent.source} →
                  </Link>
                ) : (
                  <span className="text-[13px] font-bold" style={{ color: SCI_EVENT_CATEGORY_COLORS[sciEvent.category] }}>
                    {sciEvent.source}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Derniers articles */}
          {leadPost && (
            <div className="mt-10">
              <div className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-4">Derniers articles</div>
              <Link href={leadPost.href} className="group block mb-2">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={leadPost.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    alt={leadPost.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent flex items-end p-6">
                    <h3 className="text-3xl font-extrabold text-white" style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
                      {leadPost.title}
                    </h3>
                  </div>
                </div>
                <div className="text-[11px] text-gray-600 font-mono mb-1">{leadPost.dateLabel}</div>
                {leadPost.excerpt && (
                  <p className="text-sm text-gray-500 leading-relaxed">{leadPost.excerpt}</p>
                )}
              </Link>

              {restPosts.map(post => (
                <Link key={post.key} href={post.href} className="group flex gap-4 py-4 border-b border-white/6">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={post.image} fill sizes="64px" alt={post.title} className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[16.5px] font-bold mb-1 group-hover:text-blue-300 transition-colors">{post.title}</div>
                    <div className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</div>
                  </div>
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/posts" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Tous les articles →
                </Link>
              </div>
            </div>
          )}

          {/* Projets récents — liste numérotée */}
          <div id="wp-projets" className="mt-14 pt-14 border-t border-white/8">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-gray-500">Projets récents</div>
              <div className="flex-1 h-px bg-white/6" />
              <Link href="/projects" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Tous les projets →
              </Link>
            </div>
            {projects.map((p, i) => (
              <Link key={p.href} href={p.href} className="group flex items-baseline gap-6 py-5 border-b border-white/6">
                <span className="font-mono text-2xl font-bold shrink-0 w-10" style={{ color: 'rgba(96,165,250,0.35)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[17.5px] font-bold mb-1 flex items-center gap-2">
                    <span className="shrink-0 flex items-center" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <p.Icon size={18} />
                    </span>
                    <span className="group-hover:text-blue-300 transition-colors">{p.title}</span>
                  </div>
                  <p className="text-[13.5px] text-gray-500 leading-relaxed mb-2">{p.desc}</p>
                  <div className="flex gap-2.5">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[11px] text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs shrink-0" style={{ color: p.statusColor }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.statusColor }} />
                  {p.status}
                </div>
              </Link>
            ))}
          </div>

          {/* Formations */}
          <div className="pt-8 mt-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-gray-500">Formations à explorer</div>
              <div className="flex-1 h-px bg-white/6" />
            </div>
            <style>{`
              .mooc-pill {
                background: color-mix(in srgb, var(--mooc-color) 4%, transparent);
                border-color: color-mix(in srgb, var(--mooc-color) 19%, transparent);
                box-shadow: 0 0 0 rgba(0,0,0,0);
              }
              .mooc-pill:hover {
                background: color-mix(in srgb, var(--mooc-color) 10%, transparent);
                border-color: color-mix(in srgb, var(--mooc-color) 33%, transparent);
                box-shadow: 0 6px 20px color-mix(in srgb, var(--mooc-color) 15%, transparent);
              }
            `}</style>
            <div className="flex flex-wrap gap-3">
              {moocs.map(m => (
                <a
                  key={m.href}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mooc-pill group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl text-[13px] font-semibold border transition-all hover:-translate-y-0.5"
                  style={{ ['--mooc-color' as string]: m.color, color: m.color }}
                >
                  <span className="shrink-0 flex items-center justify-center">
                    <m.Icon size={16} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[9px] uppercase tracking-[0.14em] opacity-60">MOOC</span>
                    <span>{m.label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Rail latéral ── */}
        <div className="md:col-span-4 flex flex-col gap-8">

          {/* Carte du ciel — module compressé */}
          <Link
            href="/solar-system/astronomie/ciel"
            className="group relative overflow-hidden rounded-2xl px-6 py-6 text-center border border-blue-500/15 transition-all hover:border-blue-400/35"
            style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(15,30,80,0.9) 0%, rgba(5,8,25,0.95) 100%)' }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {[
                [8,20],[15,70],[25,40],[35,15],[45,80],[55,35],[65,60],[72,18],[80,75],[88,45],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={i % 3 === 0 ? '1' : '0.6'} fill="white" opacity={0.08 + (i % 4) * 0.04}>
                  <animate attributeName="opacity" values={`${0.06 + (i % 4) * 0.04};${0.18 + (i % 3) * 0.06};${0.06 + (i % 4) * 0.04}`} dur={`${2.2 + (i % 5) * 0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
            <div className="relative z-10">
              <div className="flex justify-center mb-3" style={{ filter: 'drop-shadow(0 0 14px rgba(96,165,250,0.5))' }}>
                <svg width="44" height="44" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="28" r="13" fill="#0b1a42" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.6" />
                  <path d="M 22 15 A 13 13 0 0 1 35 28 A 9 9 0 1 0 22 15 Z" fill="#1e3a7a" opacity="0.9" />
                  {[[40, 10, 1.4], [44, 22, 1.0], [36, 6, 0.9]].map(([x, y, r], i) => (
                    <circle key={i} cx={x} cy={y} r={r} fill="white" opacity="0.7">
                      <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>
              </div>
              <div className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest mb-1 capitalize">{todayFr}</div>
              <div className="text-[16.5px] font-bold text-white mb-4">Carte du ciel du soir</div>
              <div className="flex flex-col gap-2 text-left mb-4">
                {([
                  { svg: <SvgSunrise />,  label: 'Lever',    value: daily.sunriseStr },
                  { svg: <SvgSunset />,   label: 'Coucher',  value: daily.sunsetStr  },
                  { svg: <SvgMoonPhase percent={daily.moonPercent} isWaxing={daily.isWaxing} />, label: 'Lune', value: `${daily.moonPercent}%` },
                  { svg: <SvgPlanet />,   label: 'Planètes', value: daily.visiblePlanetNames.length > 0 ? `${daily.visiblePlanetNames.length} visible${daily.visiblePlanetNames.length > 1 ? 's' : ''}` : 'aucune' },
                ] as { svg: React.ReactNode; label: string; value: string }[]).map(chip => (
                  <div key={chip.label} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <span className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {chip.svg}{chip.label}
                    </span>
                    <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{chip.value}</span>
                  </div>
                ))}
              </div>
              <span className="text-[12.5px] font-bold text-blue-300">Voir la carte →</span>
            </div>
          </Link>

          {/* Éphémérides — agenda */}
          {events.length > 0 && (
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2.5">Éphémérides à venir</div>
              {events.map((e, i) => (
                <div key={i} className="flex gap-3 py-2.5 border-b border-white/6 text-[13px]">
                  <span className="font-mono text-violet-400 shrink-0 w-12">{e.date}</span>
                  <span className="text-gray-500 leading-snug">{e.icon} {e.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Météo */}
          <div>
            <div className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2.5 flex items-center gap-1.5">
              <SunriseIcon size={14} /> Météo
            </div>
            <ErrorBoundary label="Météo Paris">    <Weather city="Paris" />    </ErrorBoundary>
            <ErrorBoundary label="Météo Madrid">   <Weather city="Madrid" />   </ErrorBoundary>
            <ErrorBoundary label="Météo Arcachon"> <Weather city="Arcachon" /> </ErrorBoundary>
          </div>

          {/* Transports */}
          <div>
            <div className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2.5 flex items-center gap-1.5">
              <MetroIcon size={14} /> Transports
            </div>
            <ErrorBoundary label="Métro ligne 10"><Ratp /></ErrorBoundary>
            <div className="my-2 h-px bg-white/6" />
            <ErrorBoundary label="Trains Arcachon"><Sncf /></ErrorBoundary>
          </div>

          {/* Compétences */}
          <div>
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
            <div className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2.5 flex items-center gap-1.5">
              <SparkIcon size={14} /> Compétences
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="skill-badge inline-flex items-center px-2.5 py-1 rounded-lg text-[11.5px] font-semibold border border-violet-500/30 text-violet-300"
                  style={{ background: 'rgba(139,92,246,0.10)' }}
                >
                  <span className="skill-shimmer" aria-hidden />
                  <span className="relative z-[1]">{s}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Media / links ── */}
      <div id="wp-liens" className="border-t border-white/6 pt-10 mt-14">
        <h2 className="text-[15px] font-bold tracking-widest uppercase text-gray-500 mb-6">
          Médias et ressources utiles
        </h2>
        <Links />
      </div>

      <ScrollTrajectory />
    </div>
  );
}
