import type { Metadata } from 'next';
import Link from 'next/link';
import BiologieLayout from '@/components/layout/BiologieLayout';
import { JsonLd } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Évolution | Biologie',
  description: 'Darwin, Lamarck, sélection naturelle, dérive génétique, spéciation et fossiles — les mécanismes et l\'histoire de l\'évolution du vivant.',
  keywords: ['évolution', 'Darwin', 'Lamarck', 'sélection naturelle', 'spéciation', 'fossiles', 'biologie'],
  openGraph: {
    title: 'Évolution | Suri Space',
    description: 'Théorie de l\'évolution, mécanismes évolutifs, spéciation et grands fossiles.',
    url: 'https://suri-space.vercel.app/biologie/evolution',
  },
};

/* ── SVG Diagrams ─────────────────────────────────────────── */

function NaturalSelectionSVG() {
  const colors = ['#10B981', '#10B981', '#6B7280', '#10B981', '#6B7280', '#10B981', '#10B981', '#6B7280'];
  const sizes  = [12, 10, 7, 12, 8, 11, 10, 6];
  return (
    <svg viewBox="0 0 260 130" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 320 }}>
      {/* Labels */}
      <text x="50" y="12" textAnchor="middle" fontSize="8" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">GÉNÉRATION 1</text>
      <text x="210" y="12" textAnchor="middle" fontSize="8" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">GÉNÉRATION 2</text>

      {/* Gen 1 — varied population */}
      {[[20,50],[40,80],[60,45],[80,75],[100,55],[25,90],[75,95],[50,65]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={sizes[i]} fill={`${colors[i]}30`} stroke={colors[i]} strokeWidth="1.2" />
      ))}

      {/* Selection pressure arrow */}
      <path d="M 115 65 L 145 65" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#redArr)" strokeLinecap="round" />
      <text x="130" y="58" textAnchor="middle" fontSize="6.5" fill="#EF4444" fontFamily="'Exo 2',sans-serif">Sélection</text>
      <text x="130" y="78" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">(pression env.)</text>

      {/* Gen 2 — survivors + offspring */}
      {[[165,50],[190,80],[215,48],[175,90],[230,75],[160,70],[205,95],[250,60]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i < 5 ? 11 + (i % 2) : 9} fill="#10B98130" stroke="#10B981" strokeWidth="1.2" />
      ))}

      {/* Defs */}
      <defs>
        <marker id="redArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 Z" fill="#EF4444" />
        </marker>
      </defs>

      <text x="50" y="118" textAnchor="middle" fontSize="6.5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Variation (taille, couleur…)</text>
      <text x="210" y="118" textAnchor="middle" fontSize="6.5" fill="#10B981" fontFamily="'Exo 2',sans-serif">Population adaptée</text>
    </svg>
  );
}

function SpeciationSVG() {
  return (
    <svg viewBox="0 0 260 180" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 320 }}>
      {/* Ancestral population */}
      <ellipse cx="130" cy="20" rx="30" ry="12" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.5" />
      <text x="130" y="23" textAnchor="middle" fontSize="7" fill="#10B981" fontFamily="'Exo 2',sans-serif" fontWeight="600">Pop. ancestrale</text>

      {/* Trunk */}
      <line x1="130" y1="32" x2="130" y2="60" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />

      {/* Geographic barrier */}
      <rect x="118" y="60" width="24" height="28" rx="2" fill="rgba(239,68,68,0.1)" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" />
      <text x="130" y="72" textAnchor="middle" fontSize="6" fill="#EF4444" fontFamily="'Exo 2',sans-serif">Barrière</text>
      <text x="130" y="81" textAnchor="middle" fontSize="6" fill="#EF4444" fontFamily="'Exo 2',sans-serif">géogr.</text>

      {/* Left branch */}
      <path d="M 118 74 Q 80 90 60 120" stroke="#06B6D4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Right branch */}
      <path d="M 142 74 Q 180 90 200 120" stroke="#A78BFA" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Species A */}
      <ellipse cx="60" cy="135" rx="34" ry="13" fill="rgba(6,182,212,0.15)" stroke="#06B6D4" strokeWidth="1.5" />
      <text x="60" y="138" textAnchor="middle" fontSize="7" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" fontWeight="600">Espèce A</text>

      {/* Species B */}
      <ellipse cx="200" cy="135" rx="34" ry="13" fill="rgba(167,139,250,0.15)" stroke="#A78BFA" strokeWidth="1.5" />
      <text x="200" y="138" textAnchor="middle" fontSize="7" fill="#A78BFA" fontFamily="'Exo 2',sans-serif" fontWeight="600">Espèce B</text>

      {/* Time labels */}
      <text x="6" y="23" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">t₀</text>
      <text x="6" y="138" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">t₁</text>
      <line x1="14" y1="20" x2="14" y2="145" stroke="#6B7280" strokeWidth="0.7" strokeDasharray="2 2" />

      <text x="130" y="165" textAnchor="middle" fontSize="6.5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Spéciation allopatrique — isolement géographique</text>
    </svg>
  );
}

function EvolutionTimelineSVG() {
  // Logarithmic scale: tMin = 0.01 Ma (10 ka), tMax = 4000 Ma (4 Ga)
  const tMin = 0.01;
  const tMax = 4000;
  const x0 = 18, W = 384, axisY = 90;
  const lMin = Math.log10(tMin);
  const lMax = Math.log10(tMax);
  const toX = (t: number) => x0 + W * (1 - (Math.log10(t) - lMin) / (lMax - lMin));

  // 9 events chosen so same-side events are well-spaced on the log axis
  const EVENTS: { t: number; label: string; date: string; color: string; above: boolean }[] = [
    { t: 4000,  label: 'Procaryotes',      date: '4 Ga',    color: '#34D399', above: true  },
    { t: 2000,  label: 'Eucaryotes',        date: '2 Ga',    color: '#06B6D4', above: false },
    { t: 600,   label: 'Multicellulaires', date: '600 Ma',  color: '#A78BFA', above: true  },
    { t: 230,   label: 'Dinosaures',        date: '230 Ma',  color: '#FBBF24', above: false },
    { t: 66,    label: 'Ext. K-Pg',         date: '66 Ma',   color: '#F97316', above: true  },
    { t: 3.2,   label: 'Lucy',              date: '3,2 Ma',  color: '#EF4444', above: false },
    { t: 0.315, label: 'H. sapiens',        date: '315 ka',  color: '#10B981', above: true  },
    { t: 0.07,  label: 'Exode Afrique',     date: '70 ka',   color: '#60A5FA', above: false },
    { t: 0.012, label: 'Néolithique',       date: '12 ka',   color: '#34D399', above: true  },
  ];

  const TICKS = [
    { t: 4000, label: '4 Ga'   },
    { t: 1000, label: '1 Ga'   },
    { t: 100,  label: '100 Ma' },
    { t: 10,   label: '10 Ma'  },
    { t: 1,    label: '1 Ma'   },
    { t: 0.1,  label: '100 ka' },
    { t: 0.01, label: '10 ka'  },
  ];

  const TICK_H = 26;

  return (
    <svg viewBox="0 0 420 178" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 680 }}>
      {/* Scale note */}
      <text x="210" y="11" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">
        Échelle logarithmique — 10 ka à 4 Ga · chaque décade occupe la même largeur
      </text>

      {/* Axis */}
      <line x1={x0} y1={axisY} x2={x0 + W} y2={axisY} stroke="#374151" strokeWidth="1.5" />
      {/* Left cap */}
      <text x={x0 - 2} y={axisY + 4} textAnchor="end" fontSize="5" fill="#4B5563" fontFamily="'Exo 2',sans-serif">Passé</text>
      {/* Right arrow + label */}
      <polygon points={`${x0 + W + 4},${axisY} ${x0 + W - 2},${axisY - 3} ${x0 + W - 2},${axisY + 3}`} fill="#374151" />
      <text x={x0 + W + 7} y={axisY + 4} fontSize="5" fill="#4B5563" fontFamily="'Exo 2',sans-serif">Présent</text>

      {/* Decade ticks */}
      {TICKS.map(({ t, label }) => {
        const x = toX(t);
        return (
          <g key={t}>
            <line x1={x} y1={axisY - 3} x2={x} y2={axisY + 3} stroke="#4B5563" strokeWidth="0.9" />
            <text x={x} y={axisY + 11} textAnchor="middle" fontSize="4.8" fill="#4B5563" fontFamily="'Exo 2',sans-serif">
              {label}
            </text>
          </g>
        );
      })}

      {/* Events */}
      {EVENTS.map((e, i) => {
        const x = toX(e.t);
        const dir = e.above ? -1 : 1;
        const tipY = axisY + dir * TICK_H;
        const angle = e.above ? -45 : 45;
        const ly = tipY + dir * 3;
        return (
          <g key={i}>
            {/* Tick line */}
            <line x1={x} y1={axisY} x2={x} y2={tipY} stroke={e.color} strokeWidth="1" opacity="0.5" />
            {/* Dot on axis */}
            <circle cx={x} cy={axisY} r="3" fill={e.color} />
            {/* Label group — rotated ±45° around the anchor at tick tip */}
            <g transform={`rotate(${angle}, ${x}, ${ly})`}>
              <text x={x + 2} y={ly}
                fontSize="6" fill={e.color} fontFamily="'Exo 2',sans-serif"
                fontWeight="700" textAnchor="start">
                {e.label}
              </text>
              <text x={x + 2} y={ly + 8}
                fontSize="5" fill={e.color} fontFamily="'Exo 2',sans-serif"
                textAnchor="start" opacity="0.75">
                {e.date}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */

const THEORIES = [
  {
    name: 'Jean-Baptiste Lamarck',
    year: 1809,
    color: '#F97316',
    work: 'Philosophie Zoologique',
    theory: 'Hérédité des caractères acquis. Les organes se renforcent par l\'usage et cette modification est transmise aux descendants.',
    example: 'La girafe allonge son cou durant sa vie → ses petits naissent avec un cou plus long.',
    verdict: 'Invalidé : les modifications somatiques ne sont pas héritables (sauf épigénétique marginale).',
    valid: false,
  },
  {
    name: 'Charles Darwin',
    year: 1859,
    color: '#10B981',
    work: 'On the Origin of Species',
    theory: 'Sélection naturelle : variation aléatoire → pression environnementale → survie différentielle → hérédité.',
    example: 'Les girafes à long cou atteignent mieux les feuilles → elles survivent mieux → transmettent leurs gènes.',
    verdict: 'Validé et enrichi par la génétique moderne (Synthèse Évolutive Moderne, années 1940).',
    valid: true,
  },
  {
    name: 'Gregor Mendel',
    year: 1866,
    color: '#A78BFA',
    work: 'Versuche über Pflanzenhybriden',
    theory: 'Lois de l\'hérédité par des "facteurs" discrets (gènes). Fournit le mécanisme de transmission absent chez Darwin.',
    example: 'Croisements de pois : loi de ségrégation (3:1), loi d\'assortiment indépendant.',
    verdict: 'Fondateur de la génétique. Redécouvert en 1900, réconcilié avec Darwin dans la Synthèse Moderne.',
    valid: true,
  },
];

const MECHANISMS = [
  {
    name: 'Sélection naturelle',
    color: '#10B981',
    desc: 'Les individus possédant des variations avantageuses survivent et se reproduisent davantage. Au fil des générations, ces traits deviennent plus fréquents.',
    conditions: ['Variation héréditaire dans la population', 'Lutte pour la survie (ressources limitées)', 'Sélection différentielle selon l\'environnement'],
  },
  {
    name: 'Mutation',
    color: '#EF4444',
    desc: 'Modifications aléatoires de la séquence d\'ADN. Source primaire de toute variation génétique. La plupart sont neutres ou délétères, rarement bénéfiques.',
    conditions: ['Erreurs de réplication de l\'ADN', 'Rayonnements ionisants, mutagènes chimiques', 'Transposons (éléments mobiles du génome)'],
  },
  {
    name: 'Dérive génétique',
    color: '#FBBF24',
    desc: 'Changements aléatoires des fréquences alléliques, indépendants de la sélection. Particulièrement important dans les petites populations.',
    conditions: ['Effet fondateur (nouvelle colonie)', 'Goulot d\'étranglement (catastrophe)', 'Fixation ou disparition d\'allèles par hasard'],
  },
  {
    name: 'Flux de gènes',
    color: '#60A5FA',
    desc: 'Échange d\'allèles entre populations via la migration d\'individus ou le transport de gamètes (pollen). Peut homogénéiser ou diversifier.',
    conditions: ['Migration entre populations', 'Dispersion de pollen ou graines', 'Hybridation inter-espèces (rare)'],
  },
];

const FOSSILS = [
  { name: 'Stromatolites', age: '3 500 Ma', color: '#34D399', desc: 'Premières traces de vie — colonies de cyanobactéries. Certains existent encore dans la baie Shark (Australie).' },
  { name: 'Pikaia', age: '505 Ma', color: '#60A5FA', desc: 'L\'un des premiers cordés (ancêtre des vertébrés). Découvert dans le schiste de Burgess (Canada).' },
  { name: 'Tiktaalik', age: '375 Ma', color: '#06B6D4', desc: 'Poisson à nageoires articulées. Lien entre poissons et tétrapodes — début de la conquête terrestre.' },
  { name: 'Archaeopteryx', age: '150 Ma', color: '#A78BFA', desc: 'Transition reptiles/oiseaux : plumes d\'oiseau, mâchoires et griffes de reptile. "Chaînon manquant" célèbre.' },
  { name: 'Pakicetus', age: '50 Ma', color: '#F97316', desc: 'Ancêtre terrestre des cétacés. Pattes fonctionnelles, vivait près des rivières — début du retour à la mer.' },
  { name: 'Lucy (Australopithecus afarensis)', age: '3,2 Ma', color: '#FBBF24', desc: 'Hominidé bipède, découvert en Éthiopie (1974). Cerveau petit mais bipédie confirmée — étape clé vers Homo.' },
  { name: 'Homo heidelbergensis', age: '600 000 a', color: '#EF4444', desc: 'Ancêtre commun de Homo sapiens et Néandertal. Premiers outils de chasse organisée.' },
  { name: 'Homo sapiens (Jebel Irhoud)', age: '315 000 a', color: '#10B981', desc: 'Plus anciens Homo sapiens connus (Maroc, 2017). Traits modernes combinés avec archaïques.' },
];

const SPECIATION_TYPES = [
  {
    name: 'Allopatrique',
    color: '#06B6D4',
    desc: 'Isolement géographique (montagne, mer, glacier) → deux populations évoluent indépendamment → incompatibilité reproductive.',
    example: 'Pinsons de Darwin aux Galápagos — isolement insulaire a produit 13 espèces.',
  },
  {
    name: 'Sympatrique',
    color: '#A78BFA',
    desc: 'Spéciation sans barrière géographique — via polyploïdie (plantes), différence de niche, ou sélection disruptive.',
    example: 'Pomme vs aubépine : Rhagoletis pomonella a colonisé la pomme en 1864, divergeant de la population sur aubépine.',
  },
  {
    name: 'Péripatrique',
    color: '#F97316',
    desc: 'Petite population fondatrice (périphérie du territoire) isolée → dérive génétique intense + sélection → nouvelle espèce rapide.',
    example: 'Théorie d\'Ernst Mayr ; modèle dominant pour les espèces insulaires endémiques.',
  },
  {
    name: 'Parapatrique',
    color: '#FBBF24',
    desc: 'Populations adjacentes avec zone de contact réduite. Sélection différentielle de chaque côté de la frontière malgré flux de gènes.',
    example: 'Lézard Sceloporus grammicus — chromosome différent de part et d\'autre d\'une vallée mexicaine.',
  },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function EvolutionPage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Évolution', item: 'https://suri-space.vercel.app/biologie/evolution' },
        ]},
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-600 mb-8">
          <Link href="/biologie" className="hover:text-white transition-colors">Biologie</Link>
          <span className="text-gray-700">›</span>
          <span className="text-emerald-400">Évolution</span>
        </nav>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Évolution
        </h1>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Comment la vie se transforme au fil du temps — des premiers mécanismes théorisés par Lamarck et Darwin
          aux forces évolutives modernes, la spéciation et les grands jalons fossiles.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {['4 Ga de vie', '3 théoriciens', '4 mécanismes évolutifs', '4 types de spéciation', '8 fossiles clés'].map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>
          ))}
        </div>

        {/* ── 1. Timeline ──────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              4 milliards d&apos;années d&apos;évolution
            </h2>
          </div>
          <div
            className="rounded-2xl border border-emerald-500/20 p-6 overflow-x-auto"
            style={{ background: 'rgba(16,185,129,0.04)', boxShadow: '0 0 48px rgba(16,185,129,0.07), inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            <EvolutionTimelineSVG />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Ga = milliards d&apos;années. Échelle non linéaire pour lisibilité.
          </p>
        </section>

        {/* ── 2. Lamarck vs Darwin vs Mendel ───────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Les théoriciens de l&apos;évolution
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            La compréhension de l&apos;évolution s&apos;est construite progressivement, de l&apos;intuition de Lamarck à la Synthèse Évolutive Moderne.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {THEORIES.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border p-5"
                style={{ borderColor: `${t.color}30`, background: `${t.color}06` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: t.color }}>{t.year}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: t.valid ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)',
                      color: t.valid ? '#10B981' : '#EF4444',
                    }}
                  >
                    {t.valid ? 'Confirmé' : 'Infirmé'}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-0.5" style={{ color: t.color, fontFamily: "'Exo 2', sans-serif" }}>{t.name}</h3>
                <p className="text-gray-500 text-xs italic mb-3">{t.work}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{t.theory}</p>
                <p className="text-gray-500 text-xs leading-snug mb-3">
                  <span className="text-gray-400 font-semibold">Ex. </span>{t.example}
                </p>
                <p
                  className="text-xs leading-snug italic"
                  style={{ color: t.valid ? '#10B981' : '#EF4444', opacity: 0.8 }}
                >
                  {t.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Natural selection diagram ─────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Les 4 mécanismes évolutifs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {MECHANISMS.map((m) => (
              <div
                key={m.name}
                className="rounded-xl border p-5"
                style={{ borderColor: `${m.color}35`, background: `${m.color}07` }}
              >
                <h3 className="font-bold text-base mb-2" style={{ color: m.color, fontFamily: "'Exo 2', sans-serif" }}>
                  {m.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{m.desc}</p>
                <ul className="space-y-1">
                  {m.conditions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: m.color }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Natural selection diagram */}
          <div
            className="rounded-2xl border border-emerald-500/20 p-6"
            style={{ background: 'rgba(16,185,129,0.04)', boxShadow: '0 0 40px rgba(16,185,129,0.07), inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">
              Sélection naturelle — schéma
            </h3>
            <div className="flex justify-center">
              <NaturalSelectionSVG />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              {[
                { step: '1', label: 'Variation',  desc: 'Individus différents au sein d\'une population', color: '#10B981' },
                { step: '2', label: 'Sélection',  desc: 'L\'environnement favorise certains phénotypes',   color: '#EF4444' },
                { step: '3', label: 'Hérédité',   desc: 'Les traits avantageux sont transmis aux descendants', color: '#60A5FA' },
              ].map((s) => (
                <div key={s.step}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2"
                    style={{ background: `${s.color}25`, color: s.color }}
                  >
                    {s.step}
                  </div>
                  <div className="font-bold text-sm mb-1" style={{ color: s.color }}>{s.label}</div>
                  <div className="text-xs text-gray-500 leading-tight">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Speciation ────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              La Spéciation
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            La spéciation est le processus par lequel une population se divise en deux ou plusieurs espèces
            reproductiquement isolées. L&apos;espèce est définie par le critère biologique de Mayr (1942) :
            ensemble d&apos;individus qui peuvent se reproduire entre eux et produire une descendance fertile.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="flex justify-center items-start">
              <SpeciationSVG />
            </div>
            <div className="grid gap-3">
              {SPECIATION_TYPES.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl border p-4"
                  style={{ borderColor: `${s.color}30`, background: `${s.color}07` }}
                >
                  <h3 className="font-bold text-sm mb-1" style={{ color: s.color }}>{s.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-1">{s.desc}</p>
                  <p className="text-xs text-gray-600"><span className="text-gray-500 font-medium">Ex. </span>{s.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Key fossils ───────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Fossiles clés
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Les fossiles sont des instantanés de l&apos;évolution. Ils permettent de reconstruire les arbres phylogénétiques
            et de dater les événements de divergence.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOSSILS.map((f) => (
              <div
                key={f.name}
                className="rounded-xl border p-4 hover:scale-[1.01] transition-all duration-200"
                style={{ borderColor: `${f.color}30`, background: `${f.color}07`, borderTopColor: `${f.color}60`, borderTopWidth: 2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                  <span className="text-xs font-bold font-mono" style={{ color: f.color }}>{f.age}</span>
                </div>
                <h3 className="font-bold text-sm text-white mb-2 leading-tight">{f.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Modern synthesis ──────────────────────────── */}
        <section className="rounded-2xl border border-white/8 p-8" style={{ background: 'rgba(255,255,255,0.02)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-6">La Synthèse Évolutive Moderne</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Darwin + Mendel', value: 'Années 1940', desc: 'Intégration de la génétique mendélienne dans la théorie darwinienne — base de la biologie évolutive moderne.' },
              { label: 'Gènes + fossiles', value: 'ADN (1953)',  desc: 'L\'ADN offre un support moléculaire à l\'hérédité et permet la phylogénétique moléculaire.' },
              { label: 'Evo-Devo',         value: 'Années 1990', desc: 'Evolutionary developmental biology — les mêmes gènes HOX guident le développement de l\'insecte à l\'humain.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-bold mb-1" style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}>
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/6 pt-6">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Explorer aussi</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: '/biologie/genetique', color: '#F472B6', label: 'Génétique',  desc: 'Mutations, Mendel et CRISPR' },
                { href: '/biologie/vivant',    color: '#10B981', label: 'Le Vivant',  desc: 'Arbre phylogénétique et règnes' },
                { href: '/biologie/cellules',  color: '#06B6D4', label: 'Cellules',   desc: 'ADN, réplication et division' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group rounded-xl border border-white/8 p-4 hover:border-white/20 transition-all duration-200 block" style={{ background: 'rgba(255,255,255,0.015)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm" style={{ color: l.color }}>{l.label}</span>
                    <span className="text-gray-600 text-sm group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">{l.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </BiologieLayout>
  );
}
