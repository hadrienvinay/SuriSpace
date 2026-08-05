// app/sciences/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sciences',
  description: "Timeline des découvertes scientifiques, formules fondamentales, constantes physiques et portraits des grands scientifiques de l'histoire.",
  keywords: ['sciences', 'physique', 'formules', 'constantes physiques', 'scientifiques', 'histoire des sciences'],
  openGraph: {
    title: 'Sciences | Suri Space',
    description: "Timeline scientifique, formules, constantes et portraits des grands scientifiques.",
    url: 'https://suri-space.vercel.app/sciences',
  },
};
import ScienceLayout from '@/components/layout/ScienceLayout';

function HlApple() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 8 Q 21 4 23 5" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M 18 8 Q 23 7 22 11" stroke="#34D399" strokeWidth="1.2" fill="rgba(52,211,153,0.25)" strokeLinecap="round"/>
      <path d="M 11 12 Q 6 12 6 19 Q 6 28 11 30 Q 14.5 32 18 30 Q 21.5 32 25 30 Q 30 28 30 19 Q 30 12 25 12 Q 21.5 10 18 12 Q 14.5 10 11 12 Z"
        fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.8)" strokeWidth="1.2"/>
    </svg>
  );
}
function HlLightning() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 22 4 L 11 20 H 19 L 14 32 L 25 16 H 17 Z" fill="#FBBF24" stroke="#FCD34D" strokeWidth="0.8" strokeLinejoin="round"/>
    </svg>
  );
}
function HlAtom() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="3.5" fill="#F87171"/>
      <ellipse cx="18" cy="18" rx="15" ry="5.5" stroke="#F87171" strokeWidth="1.2" opacity="0.75"/>
      <ellipse cx="18" cy="18" rx="15" ry="5.5" stroke="#F87171" strokeWidth="1.2" opacity="0.75" transform="rotate(60 18 18)"/>
      <ellipse cx="18" cy="18" rx="15" ry="5.5" stroke="#F87171" strokeWidth="1.2" opacity="0.75" transform="rotate(120 18 18)"/>
    </svg>
  );
}
function HlDna() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 11 4 C 26 9 9 16 26 21 C 9 26 26 31 11 32" stroke="#34D399" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M 25 4 C 9 9 26 16 9 21 C 26 26 9 31 25 32"  stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="13" y1="8"  x2="23" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11" y1="15" x2="25" y2="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11" y1="21" x2="25" y2="20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="13" y1="27" x2="23" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
import { JsonLd } from '@/components/common/JsonLd';
import {
  ClockIcon,
  ScientistIcon,
  SigmaIcon,
  InfinityIcon,
  MicroscopeIcon,
} from '@/components/icons/SciencesIcons';

const sections = [
  {
    href: '/sciences/timeline',
    Icon: ClockIcon,
    title: 'Timeline Interactive',
    description: 'De l\'Antiquité à aujourd\'hui — révolutions scientifiques, grands scientifiques et découvertes sur une frise chronologique.',
    gradient: 'from-indigo-600/20 to-violet-600/20',
    border: 'border-indigo-500/30',
    accent: 'text-indigo-300',
  },
  {
    href: '/sciences/scientists',
    Icon: ScientistIcon,
    title: 'Scientifiques',
    description: 'Portraits et biographies des plus grands esprits scientifiques — Newton, Einstein, Curie, Darwin et bien d\'autres.',
    gradient: 'from-purple-600/20 to-pink-600/20',
    border: 'border-purple-500/30',
    accent: 'text-purple-300',
  },
  {
    href: '/sciences/formules',
    Icon: SigmaIcon,
    title: 'Formules',
    description: 'Les équations fondamentales qui gouvernent l\'univers — mécanique, thermodynamique, électromagnétisme, relativité.',
    gradient: 'from-cyan-600/20 to-teal-600/20',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-300',
  },
  {
    href: '/sciences/constantes',
    Icon: InfinityIcon,
    title: 'Constantes',
    description: 'Vitesse de la lumière, constante de Planck, nombre d\'Avogadro… les valeurs immuables qui structurent la physique.',
    gradient: 'from-emerald-600/20 to-green-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
  },
  {
    href: '/sciences/histoire',
    Icon: function HistoryIcon() {
      return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="8" width="32" height="40" rx="5" fill="rgba(167,139,250,0.12)" stroke="#A78BFA" strokeWidth="1.5" />
          <rect x="16" y="14" width="24" height="2.5" rx="1.2" fill="#A78BFA" opacity="0.7" />
          <rect x="16" y="20" width="20" height="2" rx="1" fill="#A78BFA" opacity="0.5" />
          <rect x="16" y="26" width="22" height="2" rx="1" fill="#A78BFA" opacity="0.4" />
          <rect x="16" y="32" width="16" height="2" rx="1" fill="#A78BFA" opacity="0.3" />
          <circle cx="40" cy="40" r="9" fill="rgba(96,165,250,0.15)" stroke="#60A5FA" strokeWidth="1.5" />
          <line x1="40" y1="37" x2="40" y2="40" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="40" x2="42.5" y2="42.5" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    },
    title: 'Histoire des Sciences',
    description: 'Six révolutions scientifiques — de la philosophie grecque à l\'IA — paradigmes, ruptures et figures fondatrices.',
    gradient: 'from-violet-600/20 to-blue-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
  },
];

const facts = [
  { value: '~2 500', label: 'ans d\'histoire des sciences documentée' },
  { value: '1687', label: 'Principia Mathematica de Newton' },
  { value: 'E=mc²', label: 'formule la plus célèbre du monde' },
  { value: '1905', label: 'année miraculeuse d\'Einstein — 4 articles fondateurs' },
  { value: '~130', label: 'prix Nobel scientifiques depuis 1901' },
  { value: '6,022×10²³', label: 'nombre d\'Avogadro — atomes par mole' },
];

const highlights = [
  { Icon: HlApple,    label: 'Newton',   sub: 'Gravitation, 1687'    },
  { Icon: HlLightning,label: 'Einstein', sub: 'Relativité, 1905'     },
  { Icon: HlAtom,     label: 'Curie',    sub: 'Radioactivité, 1898'  },
  { Icon: HlDna,      label: 'Darwin',   sub: 'Évolution, 1859'      },
];

export default function SciencesHome() {
  return (
    <ScienceLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Sciences', item: 'https://suri-space.vercel.app/sciences' },
        ]},
        { '@type': 'CollectionPage', name: 'Sciences', url: 'https://suri-space.vercel.app/sciences',
          description: 'Timeline des découvertes scientifiques, formules fondamentales, constantes physiques et portraits des grands scientifiques.',
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />

      {/* Hero immersif */}
      <div className="relative min-h-[58vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-16">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 620, height: 620, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: '#A78BFA', opacity: 0.28, filter: 'blur(110px)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 40px #A78BFA)' }}>
            <MicroscopeIcon size={104} />
          </div>
          <div className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#A78BFA' }}>
            Encyclopédie · Sciences
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #A78BFA, #60A5FA, #34D399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            Les Sciences
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Des premières observations de l'Antiquité aux lois de la physique moderne —
            explorez l'histoire, les formules et les grandes figures qui ont façonné notre compréhension du monde.
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
                style={{ background: 'rgba(167,139,250,0.04)', borderColor: 'rgba(167,139,250,0.16)' }}
              >
                <div
                  className="text-[15px] font-extrabold"
                  style={{ color: '#A78BFA', fontFamily: "'Exo 2', monospace" }}
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

        {/* Section cards — doors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative block rounded-2xl border ${s.border} bg-linear-to-br ${s.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
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
    </ScienceLayout>
  );
}
