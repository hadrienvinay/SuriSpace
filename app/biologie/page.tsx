import type { Metadata } from 'next';
import Link from 'next/link';
import BiologieLayout from '@/components/layout/BiologieLayout';
import { JsonLd } from '@/components/common/JsonLd';
import { HeartIcon, CellIcon, TreeOfLifeIcon } from '@/components/icons/BiologieIcons';

export const metadata: Metadata = {
  title: 'Biologie',
  description: 'Explorez le corps humain, la cellule, l\'ADN, l\'arbre du vivant, l\'évolution, la génétique, la santé et l\'écologie — une encyclopédie illustrée du vivant.',
  keywords: ['biologie', 'corps humain', 'cellule', 'ADN', 'génétique', 'vivant', 'évolution', 'métabolisme', 'santé', 'écologie'],
  openGraph: {
    title: 'Biologie | Suri Space',
    description: 'Corps humain, génétique, évolution, santé et écologie — encyclopédie du vivant.',
    url: 'https://suri-space.vercel.app/biologie',
  },
};

/* ── Highlight SVGs (36px inline) ────────────────────────── */
function HlCell() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <ellipse cx="18" cy="18" rx="14" ry="12" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.2" />
      <ellipse cx="18" cy="18" rx="6" ry="5" fill="rgba(16,185,129,0.3)" stroke="#10B981" strokeWidth="1" />
      <circle cx="10" cy="12" r="2" fill="rgba(6,182,212,0.5)" />
    </svg>
  );
}
function HlEvolution() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 28 C8 20 14 12 22 10 C30 8 32 14 28 18 C24 22 18 20 16 26 C14 30 16 34 20 34"
        stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="34" r="3" fill="rgba(167,139,250,0.5)" stroke="#A78BFA" strokeWidth="1" />
    </svg>
  );
}
function HlAtp() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M22 4 L12 18 H18 L12 32 L28 16 H22 Z" fill="rgba(251,191,36,0.35)" stroke="#FBBF24" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="8" cy="18" r="3" fill="rgba(251,191,36,0.4)" />
      <circle cx="28" cy="8" r="2" fill="rgba(251,191,36,0.3)" />
    </svg>
  );
}
function HlDna() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M10 4 C24 8 10 16 24 22 C10 28 24 32 10 32" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M26 4 C12 8 26 16 12 22 C26 28 12 32 26 32" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="12" y1="9" x2="24" y2="11" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="17" x2="26" y2="17" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Section card inline icons (48px) ────────────────────── */
function EvolutionIcon({ size = 48, color = '#A78BFA' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <path d="M6 42 C10 30 18 18 28 14 C38 10 42 18 36 24 C30 30 22 27 20 35 C18 40 20 46 26 46"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="26" cy="44" r="4" fill={`${color}40`} stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="14" r="3" fill={`${color}30`} stroke={color} strokeWidth="1" />
    </svg>
  );
}
function AtpIcon({ size = 48, color = '#FBBF24' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <path d="M28 4 L14 22 H22 L14 44 L38 22 H30 Z" fill={`${color}30`} stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="8" cy="22" r="4" fill={`${color}40`} stroke={color} strokeWidth="1.2" />
      <circle cx="38" cy="8" r="3" fill={`${color}30`} />
    </svg>
  );
}
function GeneIcon({ size = 48, color = '#F472B6' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <path d="M14 4 C32 10 14 22 32 28 C14 34 32 44 14 44" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M34 4 C16 10 34 22 16 28 C34 34 16 44 34 44" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {[12, 22, 32].map((y, i) => (
        <line key={i} x1="18" y1={y} x2="30" y2={y + 2} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      <circle cx="32" cy="22" r="5" fill={`${color}35`} stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
function ShieldIcon({ size = 48, color = '#EF4444' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <path d="M24 4 L6 12 L6 26 Q6 38 24 44 Q42 38 42 26 L42 12 Z" fill={`${color}15`} stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 24 L21 30 L33 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {[0,1,2].map((i) => <circle key={i} cx={16 + i * 8} cy={16} r="2" fill={`${color}40`} />)}
    </svg>
  );
}
function EarthIcon({ size = 48, color = '#34D399' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
      <circle cx="24" cy="24" r="20" fill={`${color}10`} stroke={color} strokeWidth="1.8" />
      <ellipse cx="24" cy="24" rx="10" ry="20" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="4" y1="24" x2="44" y2="24" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="4" y1="16" x2="44" y2="16" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="4" y1="32" x2="44" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M18 10 Q20 12 18 14 Q20 16 18 18" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */
const sections = [
  {
    href: '/biologie/corps',
    Icon: HeartIcon,
    title: 'Corps Humain',
    description: '8 systèmes — circulatoire, nerveux, digestif, respiratoire… schéma SVG interactif avec organes et faits clés.',
    gradient: 'from-orange-600/20 to-rose-600/20',
    border: 'border-orange-500/30',
    accent: 'text-orange-300',
    iconColor: '#F97316',
  },
  {
    href: '/biologie/cellules',
    Icon: CellIcon,
    title: 'Cellules',
    description: 'Procaryote vs eucaryote, ADN, codons, mitose, méiose et organites — la vie à l\'échelle microscopique.',
    gradient: 'from-cyan-600/20 to-teal-600/20',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-300',
    iconColor: '#06B6D4',
  },
  {
    href: '/biologie/vivant',
    Icon: TreeOfLifeIcon,
    title: 'Le Vivant',
    description: 'Arbre du vivant, 3 domaines, 5 règnes — animaux, plantes, champignons, bactéries et virus.',
    gradient: 'from-emerald-600/20 to-green-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    iconColor: '#10B981',
  },
  {
    href: '/biologie/evolution',
    Icon: EvolutionIcon,
    title: 'Évolution',
    description: 'Darwin, Lamarck, sélection naturelle, spéciation, fossiles clés et frise logarithmique 4 Ga → présent.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
    iconColor: '#A78BFA',
  },
  {
    href: '/biologie/metabolisme',
    Icon: AtpIcon,
    title: 'Métabolisme',
    description: 'ATP, respiration cellulaire (Krebs, chaîne respiratoire), photosynthèse et fermentation.',
    gradient: 'from-yellow-600/20 to-orange-600/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
    iconColor: '#FBBF24',
  },
  {
    href: '/biologie/genetique',
    Icon: GeneIcon,
    title: 'Génétique',
    description: 'Lois de Mendel, carré de Punnett interactif, mutations, maladies génétiques et CRISPR.',
    gradient: 'from-pink-600/20 to-fuchsia-600/20',
    border: 'border-pink-500/30',
    accent: 'text-pink-300',
    iconColor: '#F472B6',
  },
  {
    href: '/biologie/sante',
    Icon: ShieldIcon,
    title: 'Santé',
    description: '5 grandes catégories de maladies, vaccins, immunité, antibiotiques et grandes pandémies.',
    gradient: 'from-red-600/20 to-rose-600/20',
    border: 'border-red-500/30',
    accent: 'text-red-300',
    iconColor: '#EF4444',
  },
];

const highlights = [
  { Icon: HlCell,      label: 'Cellule',    sub: '~10 µm de diamètre'           },
  { Icon: HlDna,       label: 'Génome',     sub: '3,2 Md de paires de bases'    },
  { Icon: HlEvolution, label: 'Évolution',  sub: '4 Ga — origine de la vie'     },
  { Icon: HlAtp,       label: 'ATP',        sub: '~40 kg produits/jour'         },
];

const facts = [
  { value: '37 000 Md', label: 'cellules dans le corps humain'           },
  { value: '86 Md',     label: 'neurones dans le cerveau'                },
  { value: '~40 kg',    label: 'd\'ATP produit par le corps par jour'    },
  { value: '~8,7 M',    label: 'd\'espèces eucaryotes estimées'          },
  { value: '4 Ga',      label: 'âge des premières traces de vie'         },
  { value: '1 000×',    label: 'le taux d\'extinction actuel vs naturel' },
];

/* ── Page ─────────────────────────────────────────────────── */
export default function BiologieHome() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
        ]},
        { '@type': 'CollectionPage', name: 'Biologie', url: 'https://suri-space.vercel.app/biologie',
          description: 'Corps humain, génétique, évolution, santé et écologie — encyclopédie du vivant.',
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />

      {/* Hero immersif */}
      <div className="relative min-h-[58vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-16">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 620, height: 620, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: '#10B981', opacity: 0.28, filter: 'blur(110px)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 40px #10B981)' }}>
            <HeartIcon size={92} color="#10B981" />
          </div>
          <div className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#10B981' }}>
            Encyclopédie · Biologie
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight"
            style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
          >
            Biologie
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Du battement d&apos;un cœur à la double hélice de l&apos;ADN, de la sélection naturelle aux écosystèmes —
            explorez les mécanismes qui animent la vie sur Terre.
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
                style={{ background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.16)' }}
              >
                <div
                  className="text-[15px] font-extrabold"
                  style={{ color: '#10B981', fontFamily: "'Exo 2', monospace" }}
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
                <span className="shrink-0"><h.Icon /></span>
                <div>
                  <div className="text-xs font-bold text-white">{h.label}</div>
                  <div className="text-[10.5px] text-gray-500">{h.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section cards — doors, 4-col on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative block rounded-2xl border ${s.border} bg-linear-to-br ${s.gradient} p-5 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div className="mb-3 flex justify-center transition-transform duration-500 group-hover:scale-110">
                <s.Icon size={44} color={s.iconColor} />
              </div>
              <h3 className={`text-lg font-bold mb-1.5 ${s.accent} text-center`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed text-center">{s.description}</p>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </BiologieLayout>
  );
}
