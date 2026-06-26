'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreateLinkModal } from '@/components/CreateLinkModal';
import { ProjectLinkModal } from '@/components/ProjectLinkModal';
import DeleteLinkButton from '@/components/DeleteLinkButton';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import { QuillIcon, BookIcon }                          from '@/components/ArticlesIcons';
import { BarChartIcon, GalaxyIcon }                     from '@/components/AtomsIcons';
import { CodeIcon }                                     from '@/components/ProjectsIcons';
import { SolarSystemIcon, TelescopeIcon, AtomIcon }     from '@/components/UniverseIcons';
import { LeafIcon, SunIcon }                            from '@/components/NatureIcons';
import { StarIcon }                                     from '@/components/SpaceIcons';
import { SigmaIcon, ScientistIcon, InfinityIcon }       from '@/components/SciencesIcons';

// ── Inline dashboard icons ────────────────────────────────────────────────────

function GaugeIcon({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow */}
      <circle cx="0" cy="0" r="42" fill="rgba(96,165,250,0.08)" />
      {/* Dial arc */}
      <path d="M -34 14 A 36 36 0 0 1 34 14" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="6" strokeLinecap="round" />
      {/* Colored fill arc — animated */}
      <path d="M -34 14 A 36 36 0 0 1 34 14" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round"
        strokeDasharray="113" strokeDashoffset="113">
        <animate attributeName="stroke-dashoffset" values="113;28;113" dur="4s" repeatCount="indefinite" />
      </path>
      {/* Tick marks */}
      {[-60,-30,0,30,60].map((a, i) => (
        <g key={a} transform={`rotate(${a - 90})`}>
          <line x1="30" y1="0" x2={i === 2 ? 24 : 27} y2="0"
            stroke={i === 2 ? '#A78BFA' : 'rgba(255,255,255,0.25)'}
            strokeWidth={i === 2 ? 2 : 1} strokeLinecap="round" />
        </g>
      ))}
      {/* Needle — sweeps back and forth */}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values="-60 0 0; 40 0 0; -60 0 0" dur="4s" repeatCount="indefinite" />
        <line x1="0" y1="4" x2="0" y2="-28" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="4" r="1.5" fill="#A78BFA" />
      </g>
      {/* Center cap */}
      <circle cx="0" cy="0" r="5" fill="rgba(15,23,42,0.9)" stroke="#60A5FA" strokeWidth="1" />
      <circle cx="0" cy="0" r="2" fill="#60A5FA" />
    </svg>
  );
}

function DataGridIcon({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow */}
      <rect x="8" y="8" width="84" height="84" rx="10" fill="rgba(167,139,250,0.07)" />
      {/* Grid frame */}
      <rect x="12" y="12" width="76" height="76" rx="7" fill="rgba(167,139,250,0.06)"
        stroke="rgba(167,139,250,0.3)" strokeWidth="1.2" />
      {/* Header bar */}
      <rect x="12" y="12" width="76" height="14" rx="7" fill="rgba(167,139,250,0.18)" />
      <rect x="12" y="19" width="76" height="7" fill="rgba(167,139,250,0.18)" />
      {/* Header dots */}
      <circle cx="21" cy="19" r="2.5" fill="#F87171" />
      <circle cx="29" cy="19" r="2.5" fill="#FBBF24" />
      <circle cx="37" cy="19" r="2.5" fill="#4ADE80" />
      {/* Column dividers */}
      <line x1="46" y1="26" x2="46" y2="88" stroke="rgba(167,139,250,0.15)" strokeWidth="0.8" />
      <line x1="68" y1="26" x2="68" y2="88" stroke="rgba(167,139,250,0.15)" strokeWidth="0.8" />
      {/* Row lines + animated cells */}
      {[36, 50, 64, 78].map((y, row) => (
        <g key={y}>
          <line x1="12" y1={y} x2="88" y2={y} stroke="rgba(167,139,250,0.1)" strokeWidth="0.7" />
          {/* Cell fills that blink in staggered */}
          <rect x="14" y={y+1} width="30" height="12" rx="2" fill="rgba(167,139,250,0.08)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s"
              begin={`${row * 0.4}s`} repeatCount="indefinite" />
          </rect>
          <rect x="48" y={y+1} width="18" height="12" rx="2"
            fill={row % 2 === 0 ? 'rgba(96,165,250,0.14)' : 'rgba(52,211,153,0.12)'}>
            <animate attributeName="opacity" values="1;0.4;1" dur="2.8s"
              begin={`${row * 0.4 + 0.6}s`} repeatCount="indefinite" />
          </rect>
          <rect x="70" y={y+1} width="16" height="12" rx="2" fill="rgba(251,191,36,0.10)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s"
              begin={`${row * 0.4 + 1.2}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
    </svg>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface KnowledgeBaseItem {
  label: string;
  count: number;
  lines: number;
  color: string;
  icon: string;
}

export interface DashboardProps {
  messages:         { id: number; name: string; email: string; message: string }[];
  links:            { id: number; title: string; description?: string | null; link?: string | null; tag?: string | null; image?: string | null }[];
  projects:         { id: number; title: string; siteUrl?: string | null; siteUrlPublic: boolean; link?: string | null; tags: string[] }[];
  articleCount:     number;
  projectCount:     number;
  messageCount:     number;
  bookCount:        number;
  actionCount:      number;
  bourseOrderCount: number;
  pageCount:        number;
  componentCount:   number;
  apiRouteCount:    number;
  prismaModelCount: number;
  dataFileCount:    number;
  totalDataLines:   number;
  daysSinceCreation: number;
  knowledgeBase:    KnowledgeBaseItem[];
}

// ── Static constants ─────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  Sciences: '#60A5FA', Education: '#34D399', Actualité: '#FBBF24',
  Economie: '#A78BFA', Religion: '#F472B6', Musique: '#FB923C',
  Politique: '#F87171', Maths: '#22D3EE', Technologie: '#818CF8',
  Histoire: '#A3E635', Philosophie: '#2DD4BF', Sport: '#FCD34D',
};

const SITE_SECTIONS = [
  { label: 'Espace',   href: '/solar-system', pages: 13, color: '#60A5FA', Icon: SolarSystemIcon },
  { label: 'Sciences', href: '/sciences',     pages: 6,  color: '#A78BFA', Icon: TelescopeIcon   },
  { label: 'Atomes',   href: '/atoms',        pages: 7,  color: '#34D399', Icon: AtomIcon        },
  { label: 'Nature',   href: '/nature',       pages: 6,  color: '#4ADE80', Icon: LeafIcon        },
  { label: 'Articles', href: '/posts',        pages: 8,  color: '#C4B5FD', Icon: QuillIcon       },
  { label: 'Projets',  href: '/projects',     pages: 5,  color: '#818CF8', Icon: CodeIcon        },
];

// Uid-scoped wrappers — prevent SVG gradient id collisions when the same icon
// renders twice on the dashboard (e.g. QuillIcon in stats + KB map).
const QuillIconStat = (p: { size?: number }) => <QuillIcon {...p} uid="ds" />;
const QuillIconKb   = (p: { size?: number }) => <QuillIcon {...p} uid="dk" />;
const BookIconStat  = (p: { size?: number }) => <BookIcon  {...p} uid="ds" />;
const BookIconNav   = (p: { size?: number }) => <BookIcon  {...p} uid="dn" />;

const KB_ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  star:       StarIcon,
  orbit:      SolarSystemIcon,
  sigma:      SigmaIcon,
  leaf:       LeafIcon,
  sun:        SunIcon,
  scientist:  ScientistIcon,
  atom:       AtomIcon,
  galaxy:     GalaxyIcon,
  quote:      QuillIconKb,
  telescope:  TelescopeIcon,
};

// ── Small inline icons for anatomy section ───────────────────────────────────

function IconPage()      { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><line x1="5" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="5" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function IconPuzzle()    { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 6h2V4a2 2 0 014 0v2h2V2H2v4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M2 10h2v2a2 2 0 004 0v-2h2v4H2v-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>; }
function IconRoute()     { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 8h4M10 8h4M8 2v4M8 10v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>; }
function IconDatabase()  { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="4" rx="5" ry="2" stroke="currentColor" strokeWidth="1.3"/><path d="M3 4v4c0 1.1 2.2 2 5 2s5-.9 5-2V4" stroke="currentColor" strokeWidth="1.3"/><path d="M3 8v4c0 1.1 2.2 2 5 2s5-.9 5-2V8" stroke="currentColor" strokeWidth="1.3"/></svg>; }
function IconFile()      { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3"/><path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>; }
function IconCalendar()  { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><line x1="1" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1.2"/><line x1="5" y1="1" x2="5" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="11" y1="1" x2="11" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardClient({
  messages, links: initialLinks, projects: initialProjects,
  articleCount, projectCount, messageCount, bookCount,
  actionCount, bourseOrderCount,
  pageCount, componentCount, apiRouteCount, prismaModelCount, dataFileCount, totalDataLines,
  daysSinceCreation, knowledgeBase,
}: DashboardProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<DashboardProps['links'][number] | null>(null);
  const [links, setLinks]             = useState(initialLinks);
  const [sortKey, setSortKey]         = useState<'title' | 'tag' | null>(null);
  const [sortDir, setSortDir]         = useState<'asc' | 'desc'>('asc');
  const [barsVisible, setBarsVisible] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject]         = useState<DashboardProps['projects'][number] | null>(null);
  const [projects, setProjects]                     = useState(initialProjects);

  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const toggleSort = (key: 'title' | 'tag') => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sortedLinks = [...links].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (sortKey === 'title' ? (a.title ?? '') : (a.tag ?? '')).toLowerCase();
    const vb = (sortKey === 'title' ? (b.title ?? '') : (b.tag ?? '')).toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb, 'fr') : vb.localeCompare(va, 'fr');
  });

  const openEdit  = (item: DashboardProps['links'][number]) => { setEditingLink(item); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingLink(null); };
  const handleLinkSaved = (saved: DashboardProps['links'][number]) => {
    if (editingLink) setLinks(prev => prev.map(l => l.id === saved.id ? { ...l, ...saved } : l));
    else             setLinks(prev => [saved, ...prev]);
  };

  const openProjectEdit   = (item: DashboardProps['projects'][number]) => { setEditingProject(item); setIsProjectModalOpen(true); };
  const closeProjectModal = () => { setIsProjectModalOpen(false); setEditingProject(null); };
  const handleProjectSaved = (saved: DashboardProps['projects'][number]) => {
    if (editingProject) setProjects(prev => prev.map(p => p.id === saved.id ? { ...p, ...saved } : p));
    else                 setProjects(prev => [saved, ...prev]);
  };

  const totalKbEntries = knowledgeBase.reduce((s, k) => s + k.count, 0);
  const maxLines       = Math.max(...knowledgeBase.map(k => k.lines));

  const navCards = [
    {
      href: '/dashboard/actions', Icon: BarChartIcon, label: 'Actions',
      desc: 'Suivi portefeuille Suri', badge: actionCount, badgeLabel: 'positions',
      gradient: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/30',
      accent: 'text-blue-300', glow: '#60A5FA', accentHex: '#60A5FA',
    },
    {
      href: '/dashboard/bourse', Icon: InfinityIcon, label: 'Bourse',
      desc: 'Marchés financiers', badge: bourseOrderCount, badgeLabel: 'ordres',
      gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30',
      accent: 'text-emerald-300', glow: '#34D399', accentHex: '#34D399',
    },
    {
      href: '/dashboard/books', Icon: BookIconNav, label: 'Bibliothèque',
      desc: 'Livres lus et notes', badge: bookCount, badgeLabel: 'livres',
      gradient: 'from-violet-600/20 to-purple-600/20', border: 'border-violet-500/30',
      accent: 'text-violet-300', glow: '#A78BFA', accentHex: '#A78BFA',
    },
  ];

  type ContentStat = {
    label: string; value: number;
    Icon: React.ComponentType<{ size?: number }> | null;
    color: string; bg: string; border: string; hueRotate?: boolean;
  };
  const contentStats: ContentStat[] = [
    { label: 'Articles',      value: articleCount,     Icon: QuillIconStat, color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)'  },
    { label: 'Projets',       value: projectCount,     Icon: CodeIcon,      color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'   },
    { label: 'Livres',        value: bookCount,        Icon: BookIconStat,  color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)'   },
    { label: 'Messages',      value: messageCount,     Icon: null,         color: '#F472B6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)'  },
    { label: 'Positions',     value: actionCount,      Icon: BarChartIcon, color: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'   },
    { label: 'Ordres Bourse', value: bourseOrderCount, Icon: BarChartIcon, color: '#22D3EE', bg: 'rgba(34,211,238,0.08)',  border: 'rgba(34,211,238,0.2)',  hueRotate: true },
  ];

  const anatomyStats = [
    { label: 'Pages',          value: pageCount,        Icon: IconPage,     },
    { label: 'Composants',     value: componentCount,   Icon: IconPuzzle,   },
    { label: 'API Routes',     value: apiRouteCount,    Icon: IconRoute,    },
    { label: 'Modèles Prisma', value: prismaModelCount, Icon: IconDatabase, },
    { label: 'Fichiers data',  value: dataFileCount,    Icon: IconFile,     },
    { label: 'Jours en ligne', value: daysSinceCreation,Icon: IconCalendar, },
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-10 space-y-10"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <style>{`
        @keyframes statFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .stat-card {
          animation: statFadeUp 0.45s ease both;
          animation-delay: calc(var(--i, 0) * 55ms);
        }
      `}</style>

      {/* ── Header ── */}
      <div className="text-center">
        <div className="flex items-center justify-between max-w-lg mx-auto mb-2">
          <div style={{ filter: 'drop-shadow(0 0 18px #60A5FA)' }}>
            <GaugeIcon size={80} />
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold"
            style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}
          >
            Dashboard
          </h1>
          <div style={{ filter: 'drop-shadow(0 0 18px #A78BFA)' }}>
            <DataGridIcon size={80} />
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          {daysSinceCreation} jours en ligne &nbsp;·&nbsp; {totalDataLines.toLocaleString('fr-FR')} lignes de données
        </p>
      </div>

      {/* ── Content stats ── */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>Contenu</p>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {contentStats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card rounded-2xl p-4 flex flex-col gap-2"
              style={{ background: s.bg, border: `1px solid ${s.border}`, ['--i' as string]: i }}
            >
              <div style={s.hueRotate ? { filter: 'hue-rotate(160deg)' } : {}}>
                {s.Icon
                  ? <s.Icon size={26} />
                  : (
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Envelope body */}
                    <rect x="2" y="8" width="28" height="18" rx="3" fill={s.color + '18'} stroke={s.color} strokeWidth="1.5" />
                    {/* Flap fold lines (V shape) */}
                    <path d="M 2 8 L 16 19 L 30 8" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    {/* Bottom crease lines */}
                    <line x1="2" y1="26" x2="11" y2="18" stroke={s.color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    <line x1="30" y1="26" x2="21" y2="18" stroke={s.color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                    {/* Notification dot — pulsing */}
                    <circle cx="26" cy="8" r="5" fill="#020817" />
                    <circle cx="26" cy="8" r="4.5" fill={s.color + '30'}>
                      <animate attributeName="r" values="3.5;5;3.5" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="26" cy="8" r="3" fill={s.color} />
                  </svg>
                  )
                }
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              <p style={{ fontSize: 30, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Anatomy stats ── */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.22)' }}>Anatomie du site</p>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {anatomyStats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card rounded-2xl p-4 flex flex-col gap-2"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', ['--i' as string]: i + 6 }}
            >
              <div style={{ color: 'rgba(255,255,255,0.3)' }}><s.Icon /></div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              <p style={{ fontSize: 30, fontWeight: 800, color: 'rgba(255,255,255,0.7)', lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation cards ── */}
      <div>
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {navCards.map(c => (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative block rounded-2xl border ${c.border} bg-linear-to-br ${c.gradient} p-5 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              {/* Count badge */}
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: c.accentHex + '20', color: c.accentHex, border: `1px solid ${c.accentHex}40` }}>
                {c.badge} {c.badgeLabel}
              </div>
              <div className="mb-3" style={{ filter: `drop-shadow(0 0 12px ${c.glow})` }}>
                <c.Icon size={48} />
              </div>
              <h3 className={`text-base font-bold mb-1 ${c.accent}`}>{c.label}</h3>
              <p className="text-gray-400 text-sm">{c.desc}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Ouvrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Site map ── */}
      <div>
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Carte du site</h2>
        <div className="flex flex-wrap gap-3">
          {SITE_SECTIONS.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                minWidth: 88,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${s.color}30`; (e.currentTarget as HTMLElement).style.borderColor = s.color + '40'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <div style={{ position: 'relative' }}>
                <s.Icon size={34} />
                <span
                  style={{
                    position: 'absolute', top: -5, right: -10,
                    background: s.color, color: '#020817',
                    borderRadius: 99, fontSize: 9, fontWeight: 800,
                    padding: '1px 5px', lineHeight: 1.5,
                  }}
                >
                  {s.pages}
                </span>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Knowledge base ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500">Base de connaissances</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            {totalKbEntries.toLocaleString('fr-FR')} entrées · {totalDataLines.toLocaleString('fr-FR')} lignes
          </span>
        </div>
        <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {knowledgeBase.map(item => {
            const KbIcon = KB_ICON_MAP[item.icon];
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2 shrink-0" style={{ width: 140 }}>
                  {KbIcon && <div style={{ opacity: 0.7 }}><KbIcon size={16} /></div>}
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{item.label}</span>
                </div>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: barsVisible ? `${(item.lines / maxLines) * 100}%` : '0%',
                      background: `linear-gradient(90deg, ${item.color}70, ${item.color})`,
                      boxShadow: `0 0 6px ${item.color}50`,
                      transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                      willChange: 'width',
                    }}
                  />
                </div>
                <div style={{ width: 70, fontSize: 11, color: item.color, fontWeight: 700, textAlign: 'right', flexShrink: 0 }}>
                  {item.count} entrées
                </div>
                <div style={{ width: 56, fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'right', flexShrink: 0 }}>
                  {item.lines.toLocaleString('fr-FR')} l.
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Messages ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500">
            Messages reçus
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.25)' }}>
              {messageCount}
            </span>
          </h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {messages.length === 0 ? (
            <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>Aucun message reçu</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Nom', 'Email', 'Message'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, i) => (
                  <tr
                    key={msg.id}
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(52,211,153,0.05)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td className="px-4 py-3 font-medium text-white">{msg.name}</td>
                    <td className="px-4 py-3" style={{ color: '#60A5FA' }}>{msg.email}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.55)' }}>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Projets en ligne ── */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500">
            Projets en ligne
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(96,165,250,0.15)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.25)' }}>
              {projects.length}
            </span>
          </h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <Link href="/projects" className="text-xs hover:text-blue-300 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Page publique →
          </Link>
          <Link href="/projects/create" className="text-xs hover:text-blue-300 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Édition complète
          </Link>
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouveau projet
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {projects.length === 0 ? (
            <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>Aucun projet enregistré</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Titre', 'Site en ligne', 'Tags'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {projects.map((item, i) => (
                  <tr
                    key={item.id}
                    className="group"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(96,165,250,0.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td className="px-4 py-3 font-medium text-white" style={{ maxWidth: 180 }}>{item.title}</td>
                    <td className="px-4 py-3">
                      {item.siteUrl ? (
                        <div className="flex items-center gap-2">
                          <Link
                            href={item.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition-colors"
                            style={{ color: '#60A5FA', display: 'block', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {item.siteUrl}
                          </Link>
                          <span
                            style={{
                              padding: '1px 7px', borderRadius: 9999, fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap',
                              background: item.siteUrlPublic ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
                              color: item.siteUrlPublic ? '#34D399' : 'rgba(255,255,255,0.4)',
                              border: `1px solid ${item.siteUrlPublic ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.12)'}`,
                            }}
                          >
                            {item.siteUrlPublic ? 'Public' : 'Privé'}
                          </span>
                        </div>
                      ) : (
                        <span style={{ color: 'rgba(255,255,255,0.25)' }}>Pas encore en ligne</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(t => (
                          <span key={t} style={{ padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.25)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openProjectEdit(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', color: '#60A5FA', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }}
                        >
                          Modifier le lien
                        </button>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DeleteProjectButton projectId={item.id} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Liens & Ressources ── */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500">Liens &amp; Ressources</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle ressource
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {links.length === 0 ? (
            <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>Aucun lien enregistré</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {(['Titre', 'Description', 'Lien'] as const).map(h => (
                    <th
                      key={h}
                      onClick={h === 'Titre' ? () => toggleSort('title') : undefined}
                      className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', cursor: h === 'Titre' ? 'pointer' : 'default', userSelect: 'none' }}
                    >
                      {h}
                      {h === 'Titre' && <span style={{ marginLeft: 4, opacity: sortKey === 'title' ? 0.9 : 0.3 }}>{sortKey === 'title' ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}</span>}
                    </th>
                  ))}
                  <th
                    onClick={() => toggleSort('tag')}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                    style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}
                  >
                    Tags <span style={{ marginLeft: 4, opacity: sortKey === 'tag' ? 0.9 : 0.3 }}>{sortKey === 'tag' ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}</span>
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {sortedLinks.map((item, i) => (
                  <tr
                    key={item.id}
                    className="group"
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(167,139,250,0.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td className="px-4 py-3 font-medium text-white" style={{ maxWidth: 180 }}>{item.title}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 240 }}>{item.description}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={item.link ?? '#'}
                        className="hover:text-blue-300 transition-colors"
                        style={{ color: '#60A5FA', display: 'block', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {item.link}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(item.tag ?? '').split(',').map(t => t.trim()).filter(Boolean).map(t => (
                          <span key={t} style={{ padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: `${TAG_COLORS[t] ?? '#6B7280'}18`, color: TAG_COLORS[t] ?? '#9CA3AF', border: `1px solid ${TAG_COLORS[t] ?? '#6B7280'}35` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', color: '#a78bfa', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }}
                        >
                          Modifier
                        </button>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DeleteLinkButton linkId={item.id} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editLink={editingLink ? {
          id:          editingLink.id,
          title:       editingLink.title,
          description: editingLink.description ?? '',
          tag:         editingLink.tag         ?? '',
          link:        editingLink.link        ?? '',
        } : null}
        onSaved={(saved) => handleLinkSaved(saved)}
      />

      <ProjectLinkModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
        editProject={editingProject}
        onSaved={(saved) => handleProjectSaved(saved)}
      />
    </div>
  );
}
