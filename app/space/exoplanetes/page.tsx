import type { Metadata } from 'next';
import Link from 'next/link';
import SolarLayout from '@/components/layout/SolarLayout';
import { JsonLd } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Exoplanètes | Espace',
  description: '20 exoplanètes notables — Proxima b, TRAPPIST-1e, Kepler-452b — méthodes de détection, zones habitables et perspectives de vie extraterrestre.',
  keywords: ['exoplanètes', 'zone habitable', 'TRAPPIST', 'Kepler', 'transit', 'vie extraterrestre', 'détection'],
  openGraph: {
    title: 'Exoplanètes | Suri Space',
    description: 'Les mondes au-delà du système solaire — détection, caractérisation et zones habitables.',
    url: 'https://suri-space.vercel.app/space/exoplanetes',
  },
};

/* ── SVG diagrams (neutral palette, single accent) ─────────── */

function HabitableZoneSVG() {
  // Star temperature vs habitable zone — simplified diagram
  const stars = [
    { name: 'Soleil (G)',      hzIn: 0.95, hzOut: 1.37, r: 8 },
    { name: 'Proxima (M)',     hzIn: 0.04, hzOut: 0.07, r: 4 },
    { name: 'TRAPPIST-1 (M)',  hzIn: 0.03, hzOut: 0.05, r: 3.5 },
    { name: 'Tau Ceti (G)',    hzIn: 0.77, hzOut: 1.17, r: 7 },
    { name: 'Kepler-452 (G)',  hzIn: 0.98, hzOut: 1.38, r: 7.5 },
  ];

  // x: distance in AU (log scale 0.01 → 2), y: top to bottom = cool to hot star
  const W = 320, H = 130;
  const toX = (au: number) => 30 + (W - 40) * (Math.log10(au) - Math.log10(0.01)) / (Math.log10(2) - Math.log10(0.01));
  const starY = (i: number) => 18 + i * 22;

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 420 }}>
      {/* HZ shading (1 AU area) */}
      <rect x={toX(0.7)} y={10} width={toX(1.5) - toX(0.7)} height={H - 10} rx="3"
        fill="rgba(167,139,250,0.06)" />
      <text x={(toX(0.7) + toX(1.5)) / 2} y={8} textAnchor="middle" fontSize="5.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">Zone habitable</text>

      {/* Axis */}
      <line x1="30" y1={H} x2={W - 10} y2={H} stroke="#374151" strokeWidth="0.8" />
      {[0.01, 0.05, 0.1, 0.3, 0.5, 1, 1.5, 2].map(au => (
        <g key={au}>
          <line x1={toX(au)} y1={H} x2={toX(au)} y2={H + 4} stroke="#4B5563" strokeWidth="0.6" />
          <text x={toX(au)} y={H + 12} textAnchor="middle" fontSize="4.5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">{au} UA</text>
        </g>
      ))}

      {/* Stars + HZ bars */}
      {stars.map((s, i) => {
        const y = starY(i);
        return (
          <g key={s.name}>
            <circle cx={20} cy={y} r={s.r / 1.8} fill="#9CA3AF" />
            {/* HZ bar */}
            <rect x={toX(s.hzIn)} y={y - 4} width={toX(s.hzOut) - toX(s.hzIn)} height={8} rx="2"
              fill="rgba(167,139,250,0.15)" stroke="#A78BFA" strokeWidth="0.7" />
            <text x={26} y={y + 1.5} fontSize="5.5" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" dominantBaseline="middle">{s.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DetectionSVG({ method }: { method: 'transit' | 'radial' | 'direct' | 'microlens' }) {
  if (method === 'transit') return (
    <svg viewBox="0 0 120 60" width="120" height="60" xmlns="http://www.w3.org/2000/svg">
      {/* Star */}
      <circle cx="60" cy="20" r="12" fill="rgba(156,163,175,0.2)" stroke="#9CA3AF" strokeWidth="1" />
      {/* Planet passing in front */}
      <circle cx="60" cy="20" r="4" fill="rgba(167,139,250,0.7)" stroke="#A78BFA" strokeWidth="0.8" />
      {/* Light curve */}
      <path d="M10 50 L40 50 L45 42 L50 40 L70 40 L75 42 L80 50 L110 50" stroke="#9CA3AF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <text x="60" y="58" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Courbe de lumière</text>
    </svg>
  );
  if (method === 'radial') return (
    <svg viewBox="0 0 120 60" width="120" height="60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="25" r="10" fill="rgba(156,163,175,0.18)" stroke="#9CA3AF" strokeWidth="1" />
      <circle cx="80" cy="25" r="5" fill="rgba(167,139,250,0.5)" stroke="#A78BFA" strokeWidth="0.8" />
      {/* Doppler arrows */}
      <path d="M5 25 L20 25" stroke="#A78BFA" strokeWidth="1.2" markerEnd="url(#rv)" />
      <path d="M95 25 L110 25" stroke="#6B7280" strokeWidth="1.2" markerEnd="url(#rv2)" />
      <text x="12" y="18" textAnchor="middle" fontSize="5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">blueshift</text>
      <text x="103" y="18" textAnchor="middle" fontSize="5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">redshift</text>
      <text x="60" y="50" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Doppler spectroscopique</text>
      <defs>
        <marker id="rv" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,4 L4,2 Z" fill="#A78BFA" /></marker>
        <marker id="rv2" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,4 L4,2 Z" fill="#6B7280" /></marker>
      </defs>
    </svg>
  );
  if (method === 'direct') return (
    <svg viewBox="0 0 120 60" width="120" height="60" xmlns="http://www.w3.org/2000/svg">
      {/* Star with coronagraph mask */}
      <circle cx="50" cy="25" r="12" fill="rgba(156,163,175,0.18)" stroke="#9CA3AF" strokeWidth="1" />
      <circle cx="50" cy="25" r="7" fill="#020817" stroke="#374151" strokeWidth="1" strokeDasharray="2 1" />
      {/* Planet visible */}
      <circle cx="85" cy="20" r="3.5" fill="rgba(167,139,250,0.6)" stroke="#A78BFA" strokeWidth="0.8" />
      <line x1="85" y1="23.5" x2="85" y2="40" stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="2 1" opacity="0.5" />
      <text x="60" y="50" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Coronographe</text>
    </svg>
  );
  return (
    <svg viewBox="0 0 120 60" width="120" height="60" xmlns="http://www.w3.org/2000/svg">
      {/* Background source star */}
      <circle cx="100" cy="25" r="6" fill="rgba(156,163,175,0.16)" stroke="#9CA3AF" strokeWidth="0.8" />
      {/* Lens star + planet */}
      <circle cx="55" cy="25" r="8" fill="rgba(167,139,250,0.12)" stroke="#A78BFA" strokeWidth="0.8" />
      <circle cx="60" cy="18" r="2" fill="rgba(167,139,250,0.5)" stroke="#A78BFA" strokeWidth="0.6" />
      {/* Lensing arcs */}
      <path d="M100 25 Q75 10 55 25" stroke="#9CA3AF" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M100 25 Q75 40 55 25" stroke="#9CA3AF" strokeWidth="0.8" fill="none" opacity="0.5" />
      <text x="60" y="50" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Effet de lentille</text>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */

const EXOPLANETS = [
  {
    name: '51 Pegasi b',
    star: '51 Pegasi',
    dist: 50,
    size: 142,
    year: 1995,
    method: 'Vitesse radiale',
    hz: false,
    type: 'hot-jupiter',
    note: 'Premier exoplanète confirmé autour d\'une étoile de type solaire. Nobel 2019 pour Mayor & Queloz.',
  },
  {
    name: 'HD 209458 b',
    star: 'HD 209458',
    dist: 157,
    size: 135,
    year: 1999,
    method: 'Transit + VR',
    hz: false,
    type: 'hot-jupiter',
    note: 'Premier exoplanète dont l\'atmosphère a été détectée (sodium, H₂O, CO₂). Surnommé "Osiris".',
  },
  {
    name: 'Kepler-22b',
    star: 'Kepler-22',
    dist: 638,
    size: 24,
    year: 2011,
    method: 'Transit (Kepler)',
    hz: true,
    type: 'super-earth',
    note: 'Première exoplanète confirmée dans la zone habitable d\'une étoile solaire par Kepler.',
  },
  {
    name: 'Gliese 667 Cc',
    star: 'Gliese 667C',
    dist: 22,
    size: 38,
    year: 2011,
    method: 'Vitesse radiale',
    hz: true,
    type: 'super-earth',
    note: 'Super-Terre dans la ZH d\'une naine M. Système triple stellaire à seulement 22 années-lumière.',
  },
  {
    name: 'Tau Ceti e',
    star: 'Tau Ceti',
    dist: 12,
    size: 29,
    year: 2013,
    method: 'Vitesse radiale',
    hz: true,
    type: 'super-earth',
    note: 'L\'un des candidats habitables les plus proches. Tau Ceti est une étoile de type G, proche du Soleil.',
  },
  {
    name: 'Kepler-452b',
    star: 'Kepler-452',
    dist: 1400,
    size: 16,
    year: 2015,
    method: 'Transit (Kepler)',
    hz: true,
    type: 'super-earth',
    note: '"Cousin de la Terre" — orbite en 385 jours autour d\'une étoile G5 vieille de 6 Ga. Diamètre × 1,6 Terre.',
  },
  {
    name: 'GJ 1132 b',
    star: 'GJ 1132',
    dist: 39,
    size: 12,
    year: 2015,
    method: 'Transit',
    hz: false,
    type: 'rocky',
    note: 'Première planète rocheuse (proche de la taille terrestre) dont une atmosphère a été détectée (Hubble).',
  },
  {
    name: 'Proxima Centauri b',
    star: 'Proxima Centauri',
    dist: 4.2,
    size: 11,
    year: 2016,
    method: 'Vitesse radiale',
    hz: true,
    type: 'rocky',
    note: 'L\'exoplanète confirmée la plus proche de nous. Cible principale du projet Breakthrough Starshot.',
  },
  {
    name: 'TRAPPIST-1 e',
    star: 'TRAPPIST-1',
    dist: 39,
    size: 9,
    year: 2017,
    method: 'Transit (Spitzer)',
    hz: true,
    type: 'rocky',
    note: 'Meilleur candidat terrestre à ce jour. Même densité que la Terre, dans la ZH optimale de TRAPPIST-1.',
  },
  {
    name: 'TRAPPIST-1 f',
    star: 'TRAPPIST-1',
    dist: 39,
    size: 10,
    year: 2017,
    method: 'Transit (Spitzer)',
    hz: true,
    type: 'rocky',
    note: 'Dans la zone habitable froide. Possibilité d\'eau sous forme de glace ou liquide selon l\'atmosphère.',
  },
  {
    name: 'LHS 1140 b',
    star: 'LHS 1140',
    dist: 41,
    size: 14,
    year: 2017,
    method: 'Transit',
    hz: true,
    type: 'rocky',
    note: 'Super-Terre dans la ZH. Densité élevée, possiblement rocheuse. Bonne cible pour James Webb.',
  },
  {
    name: 'Ross 128 b',
    star: 'Ross 128',
    dist: 11,
    size: 13.5,
    year: 2017,
    method: 'Vitesse radiale',
    hz: true,
    type: 'rocky',
    note: '2ème exoplanète potentiellement habitable la plus proche. Étoile calme (peu de flares UV).',
  },
  {
    name: 'K2-18 b',
    star: 'K2-18',
    dist: 124,
    size: 27,
    year: 2015,
    method: 'Transit (Kepler K2)',
    hz: true,
    type: 'mini-neptune',
    note: 'Possible "monde océan" avec vapeur d\'eau détectée (Hubble 2019). James Webb analyse son atmosphère.',
  },
  {
    name: 'Wolf 1061 c',
    star: 'Wolf 1061',
    dist: 14,
    size: 43,
    year: 2015,
    method: 'Vitesse radiale',
    hz: true,
    type: 'super-earth',
    note: 'Super-Terre dans la ZH d\'une naine M à 14 al. L\'une des planètes habitables les plus proches.',
  },
  {
    name: 'Teegarden b',
    star: 'Teegarden\'s Star',
    dist: 12.5,
    size: 11,
    year: 2019,
    method: 'Vitesse radiale',
    hz: true,
    type: 'rocky',
    note: 'Score de similarité terrestre (ESI) de 0.95 — parmi les plus élevés jamais calculés.',
  },
  {
    name: 'TOI 700 d',
    star: 'TOI 700',
    dist: 101,
    size: 11,
    year: 2020,
    method: 'Transit (TESS)',
    hz: true,
    type: 'rocky',
    note: 'Première planète de taille terrestre dans la ZH découverte par TESS. Confirmée par Spitzer.',
  },
  {
    name: 'WASP-17 b',
    star: 'WASP-17',
    dist: 1000,
    size: 190,
    year: 2009,
    method: 'Transit',
    hz: false,
    type: 'hot-jupiter',
    note: '"Planète bouffie" — l\'une des plus grandes connues malgré sa faible masse. Orbite rétrograde.',
  },
  {
    name: 'HD 40307 g',
    star: 'HD 40307',
    dist: 42,
    size: 71,
    year: 2012,
    method: 'Vitesse radiale',
    hz: true,
    type: 'super-earth',
    note: 'Super-Terre dans la ZH d\'une naine K. L\'une des premières planètes > 7 M⊕ dans une ZH.',
  },
  {
    name: 'HR 8799 e',
    star: 'HR 8799',
    dist: 130,
    size: 10,
    year: 2010,
    method: 'Imagerie directe',
    hz: false,
    type: 'giant',
    note: 'Première exoplanète imagée directement en infrarouge avec spectre d\'atmosphère. Système de 4 planètes.',
  },
  {
    name: 'Gliese 436 b',
    star: 'Gliese 436',
    dist: 33,
    size: 21,
    year: 2004,
    method: 'Vitesse radiale + Transit',
    hz: false,
    type: 'mini-neptune',
    note: '"Glace brûlante" — Neptune chaud avec glace d\'eau sous haute pression malgré une température de 439°C.',
  },
];

const DETECTION_METHODS = [
  {
    key: 'transit' as const,
    name: 'Méthode des transits',
    pct: '~76 %',
    desc: 'La planète passe devant son étoile et diminue légèrement sa luminosité. Utilisée par Kepler et TESS.',
    instruments: ['Kepler', 'K2', 'TESS', 'CHEOPS', 'JWST'],
    limit: 'Ne détecte que les systèmes vus par la tranche (1–2 % des cas).',
  },
  {
    key: 'radial' as const,
    name: 'Vitesse radiale',
    pct: '~19 %',
    desc: 'La gravité de la planète fait osciller légèrement son étoile. L\'effet Doppler trahit ce mouvement.',
    instruments: ['HARPS (ESO)', 'ESPRESSO', 'HIRES (Keck)'],
    limit: 'Favorise les planètes massives et proches. Difficile pour les planètes terrestres lointaines.',
  },
  {
    key: 'direct' as const,
    name: 'Imagerie directe',
    pct: '~1 %',
    desc: 'On photographie la planète directement après avoir masqué l\'étoile (coronographe).',
    instruments: ['VLT (SPHERE)', 'Gemini (GPI)', 'Roman Space Telescope (futur)'],
    limit: 'Limité aux planètes jeunes, chaudes et lointaines de leur étoile.',
  },
  {
    key: 'microlens' as const,
    name: 'Microlentille gravitationnelle',
    pct: '~3 %',
    desc: 'Une étoile et sa planète agissent comme une lentille gravitationnelle amplifiant la lumière d\'une étoile d\'arrière-plan.',
    instruments: ['OGLE', 'MOA', 'Roman Space Telescope'],
    limit: 'Événement unique et non répétable. Surtout efficace pour les planètes lointaines ou orphelines.',
  },
];

const TYPE_LABELS: Record<string, string> = {
  'hot-jupiter':  'Jupiter chaud',
  'super-earth':  'Super-Terre',
  'rocky':        'Terrestre',
  'mini-neptune': 'Mini-Neptune',
  'giant':        'Géante',
};

/* ── Page ─────────────────────────────────────────────────── */

export default function ExoplanetesPage() {
  const hzCount = EXOPLANETS.filter(e => e.hz).length;

  return (
    <SolarLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Espace', item: 'https://suri-space.vercel.app/space' },
          { '@type': 'ListItem', position: 3, name: 'Exoplanètes', item: 'https://suri-space.vercel.app/space/exoplanetes' },
        ]},
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-600 mb-8">
          <Link href="/space" className="hover:text-white transition-colors">Espace</Link>
          <span className="text-gray-700">›</span>
          <span className="text-violet-400">Exoplanètes</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
          style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
          Exoplanètes
        </h1>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Plus de 5 700 exoplanètes confirmées à ce jour. Ces mondes au-delà de notre système solaire
          redéfinissent notre vision de la place de la Terre dans l&apos;univers.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {[`${EXOPLANETS.length} planètes présentées`, `${hzCount} dans la zone habitable`, '4 méthodes de détection', '5 700+ confirmées'].map(s => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>
          ))}
        </div>

        {/* ── 1. Detection methods ──────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #60A5FA, #A78BFA)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Méthodes de détection
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            On ne voit pas directement les exoplanètes — on les déduit de leurs effets sur leur étoile ou sur la lumière environnante.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {DETECTION_METHODS.map(m => (
              <div key={m.key} className="rounded-xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="rounded-lg border border-white/8 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <DetectionSVG method={m.key} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>{m.name}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-violet-300" style={{ background: 'rgba(167,139,250,0.12)' }}>{m.pct}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {m.instruments.map(inst => (
                    <span key={inst} className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-500">{inst}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 italic">{m.limit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Habitable zone ────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #60A5FA, #A78BFA)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Zone habitable
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            La zone habitable (ou "zone de Goldilocks") est la région autour d&apos;une étoile où l&apos;eau liquide
            peut exister en surface. Elle dépend de la température et de la taille de l&apos;étoile.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border border-white/8 p-5 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <HabitableZoneSVG />
            </div>
            <div className="space-y-3">
              {[
                { label: 'Zone habitable conservative', desc: '0,95–1,37 UA pour le Soleil. Eau liquide stable sur des Ga. Critère le plus strict.' },
                { label: 'Naines M (étoiles rouges)', desc: 'ZH très proche (0,03–0,1 UA). Planètes tidalement verrouillées, mais nombreuses et longue durée de vie stellaire.' },
                { label: 'ESI (Earth Similarity Index)', desc: 'Score 0–1 comparant la taille, densité, température et flux stellaire à la Terre. ESI > 0,8 = candidat sérieux.' },
                { label: 'Biosignatures recherchées', desc: 'O₂, O₃, CH₄ (déséquilibre), H₂O, CO₂, N₂O — détectables par JWST en spectroscopie de transit.' },
              ].map(item => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 bg-violet-400" />
                  <div>
                    <span className="font-semibold text-sm text-violet-300">{item.label} — </span>
                    <span className="text-gray-400 text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Exoplanet catalog ─────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #60A5FA, #A78BFA)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              {EXOPLANETS.length} exoplanètes notables
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-4 max-w-xl">
            Taille en % du rayon terrestre (100 = taille de la Terre).
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.entries(TYPE_LABELS).map(([k, v]) => (
              <span key={k} className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-500">{v}</span>
            ))}
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />Zone habitable
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXOPLANETS.map(p => (
              <div key={p.name} className="rounded-xl border border-white/8 p-4 hover:border-white/20 hover:bg-white/[0.045] transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>{p.name}</h3>
                    <p className="text-xs text-gray-600">{p.star}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {p.hz && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold bg-emerald-900/40 text-emerald-400 border border-emerald-700/40">ZH</span>
                    )}
                    <span className="text-xs px-1.5 py-0.5 rounded-full border border-white/10 text-gray-500">
                      {TYPE_LABELS[p.type]}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs mb-2.5">
                  <div>
                    <span className="text-gray-600">Distance</span>
                    <div className="text-gray-300 font-medium">{p.dist} al</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Taille</span>
                    <div className="text-gray-300 font-medium">{p.size > 100 ? `×${(p.size/100).toFixed(1)} T` : `${p.size}% T`}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Découverte</span>
                    <div className="text-gray-300 font-medium">{p.year}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-1.5">
                  <span className="text-gray-500 font-medium">Méthode : </span>{p.method}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{p.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <div className="pt-10 border-t border-white/6">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Explorer aussi</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { href: '/space/bodys',    label: 'Corps célestes', desc: 'Planètes du système solaire' },
              { href: '/space/missions', label: 'Missions',        desc: 'JWST, Kepler, TESS en détail' },
              { href: '/space/stars',    label: 'Carte du ciel',   desc: 'Étoiles voisines et leur type' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="group rounded-xl border border-white/8 p-4 hover:border-white/20 transition-all duration-200 block"
                style={{ background: 'rgba(255,255,255,0.015)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-200">{l.label}</span>
                  <span className="text-gray-600 text-sm group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                </div>
                <p className="text-xs text-gray-600 leading-tight">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </SolarLayout>
  );
}
