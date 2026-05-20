'use client';

import { useState } from 'react';
import Link from 'next/link';

type System = {
  id: string;
  name: string;
  color: string;
  description: string;
  organs: string[];
  facts: string[];
  zone: { cx: number; cy: number; r: number };
};

const SYSTEMS: System[] = [
  {
    id: 'nerveux',
    name: 'Nerveux',
    color: '#FBBF24',
    description: 'Le système nerveux central et périphérique coordonne toutes les fonctions corporelles. Le cerveau contient 86 milliards de neurones.',
    organs: ['Cerveau', 'Moelle épinière', 'Nerfs', 'Neurones', 'Synapses'],
    facts: ['86 milliards de neurones dans le cerveau', 'Influx nerveux : jusqu\'à 120 m/s', '100 000 km de fibres nerveuses'],
    zone: { cx: 130, cy: 56, r: 13 },
  },
  {
    id: 'respiratoire',
    name: 'Respiratoire',
    color: '#60A5FA',
    description: 'Le système respiratoire assure les échanges gazeux : absorption de l\'O₂ et rejet du CO₂ via les poumons et les bronches.',
    organs: ['Poumons', 'Trachée', 'Bronches', 'Alvéoles', 'Diaphragme'],
    facts: ['Surface alvéolaire : ~70 m²', '~15 000 L d\'air respiré par jour', '700 millions d\'alvéoles pulmonaires'],
    zone: { cx: 113, cy: 118, r: 11 },
  },
  {
    id: 'circulatoire',
    name: 'Circulatoire',
    color: '#EF4444',
    description: 'Le système circulatoire transporte le sang, l\'oxygène et les nutriments dans tout l\'organisme via un réseau de 100 000 km de vaisseaux.',
    organs: ['Cœur', 'Artères', 'Veines', 'Capillaires', 'Aorte'],
    facts: ['Le cœur bat ~100 000 fois par jour', 'Le sang effectue un circuit complet en ~1 minute', 'Les capillaires mesurent 5–10 µm de diamètre'],
    zone: { cx: 143, cy: 129, r: 10 },
  },
  {
    id: 'immunitaire',
    name: 'Immunitaire',
    color: '#34D399',
    description: 'Le système immunitaire défend l\'organisme contre les agents pathogènes grâce aux globules blancs, anticorps et organes lymphoïdes.',
    organs: ['Ganglions lymphatiques', 'Rate', 'Thymus', 'Moelle osseuse', 'Lymphocytes'],
    facts: ['~2 × 10¹² lymphocytes dans le corps', 'La rate filtre ~200 mL de sang par minute', 'Un anticorps reconnaît 1 antigène spécifique'],
    zone: { cx: 108, cy: 156, r: 10 },
  },
  {
    id: 'endocrinien',
    name: 'Endocrinien',
    color: '#F472B6',
    description: 'Le système endocrinien régule les fonctions vitales (croissance, métabolisme, reproduction) via la sécrétion d\'hormones dans le sang.',
    organs: ['Hypophyse', 'Thyroïde', 'Surrénales', 'Pancréas', 'Gonades', 'Hypothalamus'],
    facts: ['L\'hypophyse sécrète 9 hormones différentes', 'Le pancréas produit insuline et glucagon', 'Les hormones voyagent via le sang'],
    zone: { cx: 152, cy: 162, r: 10 },
  },
  {
    id: 'digestif',
    name: 'Digestif',
    color: '#F97316',
    description: 'Le système digestif transforme les aliments en nutriments absorbables. Le tube digestif mesure environ 9 mètres de long.',
    organs: ['Bouche', 'Œsophage', 'Estomac', 'Intestin grêle', 'Côlon', 'Foie', 'Pancréas'],
    facts: ['9 m de longueur totale du tube digestif', 'L\'estomac produit 2 L de suc gastrique/jour', '7 à 8 heures pour digérer un repas'],
    zone: { cx: 130, cy: 183, r: 12 },
  },
  {
    id: 'musculaire',
    name: 'Musculaire',
    color: '#A78BFA',
    description: 'Le corps humain possède plus de 600 muscles représentant 40 % de la masse corporelle. Ils permettent le mouvement et maintiennent la posture.',
    organs: ['Muscles squelettiques', 'Muscles lisses', 'Myocarde', 'Tendons', 'Fascias'],
    facts: ['Plus de 600 muscles dans le corps', '40 % de la masse corporelle', 'Le muscle le plus puissant : les masséters (mâchoire)'],
    zone: { cx: 97, cy: 240, r: 11 },
  },
  {
    id: 'squelettique',
    name: 'Squelettique',
    color: '#E2E8F0',
    description: 'Le squelette adulte comprend 206 os qui soutiennent le corps, protègent les organes vitaux et permettent les mouvements via les articulations.',
    organs: ['Crâne', 'Colonne vertébrale', 'Sternum', 'Fémur', 'Tibia', 'Cartilages'],
    facts: ['206 os chez l\'adulte (270 à la naissance)', 'L\'os est 5 fois plus solide que l\'acier à poids égal', 'Les os se renouvellent tous les 10 ans'],
    zone: { cx: 163, cy: 240, r: 11 },
  },
];

const ATOMIC_COMPOSITION = [
  { label: 'Oxygène',   symbol: 'O',  pct: 65,  color: '#60A5FA', role: 'Constituant principal de l\'eau et de toutes les molécules organiques' },
  { label: 'Carbone',   symbol: 'C',  pct: 18,  color: '#F97316', role: 'Squelette carboné de chaque protéine, lipide, glucide et acide nucléique' },
  { label: 'Hydrogène', symbol: 'H',  pct: 10,  color: '#34D399', role: 'Eau, liaisons hydrogène, réactions d\'oxydo-réduction (NADH, FADH₂)' },
  { label: 'Azote',     symbol: 'N',  pct: 3,   color: '#A78BFA', role: 'Acides aminés (protéines), bases azotées (ADN/ARN)' },
  { label: 'Calcium',   symbol: 'Ca', pct: 1.5, color: '#FBBF24', role: 'Minéralisation os et dents, contraction musculaire, signalisation' },
  { label: 'Phosphore', symbol: 'P',  pct: 1,   color: '#F472B6', role: 'ATP (énergie), phospholipides (membranes), hydroxyapatite (os)' },
  { label: 'Autres',    symbol: 'K, S, Na, Cl…', pct: 1.5, color: '#6B7280', role: 'Potassium, soufre, sodium, chlore, magnésium, fer (hémoglobine)…' },
];

const MATTER_COMPOSITION = [
  { label: 'Eau',         pct: 60, color: '#60A5FA', sub: '60 % en moyenne — varie de 45 % (obèse) à 75 % (nourrisson). Milieu de toutes les réactions biochimiques' },
  { label: 'Protéines',   pct: 17, color: '#10B981', sub: 'Muscles, enzymes, anticorps, collagène, kératine. ~100 000 types de protéines différentes' },
  { label: 'Lipides',     pct: 14, color: '#F97316', sub: 'Membranes cellulaires (phospholipides), réserves (triglycérides), hormones stéroïdes, myéline' },
  { label: 'Os & minéraux', pct: 7, color: '#E2E8F0', sub: 'Hydroxyapatite Ca₅(PO₄)₃(OH) — os les plus durs que les dents. 206 os adultes' },
  { label: 'Glucides',    pct: 1,  color: '#FBBF24', sub: 'Glycogène (foie ~100 g + muscles ~400 g), glucose sanguin (~5 g), glycoprotéines' },
  { label: 'Microbiome',  pct: 1,  color: '#34D399', sub: '~38 000 milliards de bactéries — autant que de cellules humaines. Majoritairement dans le côlon' },
];

const METABOLISM_STATS = [
  { value: '1 700–2 500', label: 'kcal/jour', sub: 'Métabolisme de base au repos (BMR) — adulte moyen', color: '#FBBF24' },
  { value: '~7 000',      label: 'kcal/jour max', sub: 'Dépense d\'un cycliste professionnel (Tour de France)', color: '#F97316' },
  { value: '25 000 Md',   label: 'globules rouges', sub: '4,5–5,5 M/µL ; durée de vie 120 jours ; 2 M créés/seconde', color: '#EF4444' },
  { value: '4–11 k/µL',   label: 'globules blancs', sub: 'Leucocytes : neutrophiles (60%), lymphocytes (30%), monocytes, éosinophiles', color: '#34D399' },
  { value: '1 500–4 000', label: 'lymphocytes/µL', sub: 'Lymphocytes T (immunité cellulaire), B (anticorps), NK (cellules tueuses)', color: '#10B981' },
  { value: '150–400 k',   label: 'plaquettes/µL', sub: 'Thrombocytes — déclenchent la coagulation ; durée de vie 7–10 jours', color: '#60A5FA' },
  { value: '4,5–6 L',     label: 'volume sanguin', sub: '~7–8 % de la masse corporelle. Circulation complète en ~1 minute', color: '#A78BFA' },
  { value: '600+',        label: 'muscles', sub: 'Squelettiques, lisses, myocarde. Représentent 40 % de la masse corporelle', color: '#A78BFA' },
  { value: '~4 000',      label: 'tendons', sub: 'Cordons de collagène reliant muscle à os. Le tendon d\'Achille supporte 7× le poids du corps', color: '#F472B6' },
  { value: '~900',        label: 'ligaments', sub: 'Relient os à os. Collagène type I et élastine. Cicatrisation lente (mauvaise vascularisation)', color: '#F97316' },
  { value: '86 Md',       label: 'neurones', sub: 'Cerveau 86 Md + ~500 M dans le système entérique (intestin = "2ème cerveau")', color: '#FBBF24' },
  { value: '150 000 Md',  label: 'synapses', sub: '~1 700 connexions par neurone. La plasticité synaptique est la base de l\'apprentissage et de la mémoire', color: '#FBBF24' },
  { value: '~3 Md',       label: 'battements cardiaques / vie', sub: '100 000/j × 80 ans. Le cœur pompe ~5 L/min au repos, 25 L/min à l\'effort', color: '#EF4444' },
  { value: '3,8 M/s',     label: 'cellules remplacées', sub: '~330 Md/jour. La peau se renouvelle en 28 jours, les GR en 120 jours, les os en 10 ans', color: '#06B6D4' },
  { value: '~1,8 m²',     label: 'surface de peau', sub: '2 mm d\'épaisseur, 15 % de la masse corporelle. 70 000 cellules/cm² renouvelées chaque heure', color: '#34D399' },
  { value: '100 000 km',  label: 'vaisseaux sanguins', sub: 'Artères (élastiques), veines (valvules), capillaires (5–10 µm, paroi = 1 cellule)', color: '#EF4444' },
];

export default function CorpsClient() {
  const [selected, setSelected] = useState<System | null>(null);

  const toggle = (sys: System) => setSelected(prev => prev?.id === sys.id ? null : sys);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/biologie" className="hover:text-emerald-400 transition-colors">Biologie</Link>
        <span>/</span>
        <span className="text-emerald-400 font-medium">Corps Humain</span>
      </nav>

      <h1
        className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #F97316, #EF4444, #10B981)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: "'Exo 2', sans-serif",
        }}
      >
        Corps Humain
      </h1>
      <p className="text-gray-400 mb-10 max-w-2xl">
        Cliquez sur une zone du schéma ou sur un bouton pour explorer les 8 grands systèmes du corps humain.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* SVG Body Diagram */}
        <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center gap-3">
          <p className="text-xs text-gray-600 lg:hidden">
            Sélectionnez un système ci-dessous ou touchez le schéma
          </p>
          <svg viewBox="60 30 140 330" width="240" height="420" xmlns="http://www.w3.org/2000/svg">

            {/* ── Silhouette ──────────────────────────── */}
            {/* Head */}
            <ellipse cx="130" cy="57" rx="22" ry="25" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
            {/* Clavicles */}
            <path d="M 100 100 Q 114 96 128 100" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
            <path d="M 160 100 Q 146 96 132 100" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none" />
            {/* Neck */}
            <rect x="121" y="80" width="18" height="14" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Shoulder joints */}
            <circle cx="97" cy="103" r="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="163" cy="103" r="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Torso */}
            <path d="M 100 100 Q 89 135 92 200 L 168 200 Q 171 135 160 100 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
            {/* Rib cage */}
            <ellipse cx="130" cy="138" rx="26" ry="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            {/* Spine */}
            <line x1="130" y1="94" x2="130" y2="200" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Pelvis arc */}
            <path d="M 92 200 Q 106 212 130 210 Q 154 212 168 200" stroke="rgba(255,255,255,0.09)" strokeWidth="1.2" fill="none" />
            {/* Upper arms */}
            <path d="M 97 104 Q 78 140 76 185" stroke="rgba(255,255,255,0.1)" strokeWidth="13" strokeLinecap="round" fill="none" />
            <path d="M 163 104 Q 182 140 184 185" stroke="rgba(255,255,255,0.1)" strokeWidth="13" strokeLinecap="round" fill="none" />
            {/* Elbow joints */}
            <circle cx="76" cy="185" r="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="184" cy="185" r="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Forearms */}
            <path d="M 76 185 Q 72 218 70 240" stroke="rgba(255,255,255,0.09)" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M 184 185 Q 188 218 190 240" stroke="rgba(255,255,255,0.09)" strokeWidth="10" strokeLinecap="round" fill="none" />
            {/* Hands */}
            <ellipse cx="70" cy="245" rx="8" ry="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <ellipse cx="190" cy="245" rx="8" ry="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Thighs */}
            <path d="M 108 200 Q 104 248 104 285" stroke="rgba(255,255,255,0.1)" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M 152 200 Q 156 248 156 285" stroke="rgba(255,255,255,0.1)" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* Knee joints */}
            <circle cx="104" cy="287" r="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="156" cy="287" r="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Calves */}
            <path d="M 104 287 Q 103 315 104 338" stroke="rgba(255,255,255,0.09)" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M 156 287 Q 157 315 156 338" stroke="rgba(255,255,255,0.09)" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* Feet */}
            <ellipse cx="107" cy="344" rx="14" ry="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <ellipse cx="153" cy="344" rx="14" ry="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* ── Hotspots ─────────────────────────────── */}
            {SYSTEMS.map((sys) => {
              const active = selected?.id === sys.id;
              return (
                <g key={sys.id} onClick={() => toggle(sys)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={sys.zone.cx}
                    cy={sys.zone.cy}
                    r={sys.zone.r}
                    fill={active ? `${sys.color}55` : `${sys.color}22`}
                    stroke={sys.color}
                    strokeWidth={active ? 2 : 1.2}
                    strokeOpacity={active ? 1 : 0.65}
                  >
                    {active && (
                      <animate attributeName="r"
                        values={`${sys.zone.r};${sys.zone.r + 2.5};${sys.zone.r}`}
                        dur="1.4s" repeatCount="indefinite" />
                    )}
                  </circle>
                  <text
                    x={sys.zone.cx}
                    y={sys.zone.cy + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="5.5"
                    fill={active ? sys.color : `${sys.color}cc`}
                    fontFamily="'Exo 2', sans-serif"
                    fontWeight="700"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {sys.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right panel */}
        <div className="flex-1 w-full">
          {/* System buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 mb-5">
            {SYSTEMS.map((sys) => (
              <button
                key={sys.id}
                onClick={() => toggle(sys)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all duration-200"
                style={{
                  borderColor: selected?.id === sys.id ? sys.color : 'rgba(255,255,255,0.1)',
                  background: selected?.id === sys.id ? `${sys.color}18` : 'rgba(255,255,255,0.02)',
                  color: selected?.id === sys.id ? sys.color : '#9CA3AF',
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: sys.color }} />
                {sys.name}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {selected ? (
            <div
              key={selected.id}
              className="rounded-2xl border p-6"
              style={{
                borderColor: `${selected.color}40`,
                background: `${selected.color}08`,
                animation: 'bioFadeIn 0.25s ease',
              }}
            >
              <style>{`@keyframes bioFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
              <h2 className="text-2xl font-bold mb-3" style={{ color: selected.color, fontFamily: "'Exo 2', sans-serif" }}>
                Système {selected.name}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{selected.description}</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Organes principaux</h3>
                  <ul className="space-y-1.5">
                    {selected.organs.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: selected.color }} />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Chiffres clés</h3>
                  <ul className="space-y-2">
                    {selected.facts.map((f, i) => (
                      <li key={i} className="text-sm text-gray-400 leading-snug flex gap-2">
                        <span style={{ color: selected.color }} className="flex-shrink-0 font-bold">→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border border-white/6 p-8 flex flex-col items-center justify-center text-center"
              style={{ background: 'rgba(255,255,255,0.02)', minHeight: 200 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-3 opacity-30">
                <path d="M20 34 C20 34 4 24 4 12 C4 7.5 7.5 4 12 4 C15 4 17.5 5.5 20 8 C22.5 5.5 25 4 28 4 C32.5 4 36 7.5 36 12 C36 24 20 34 20 34 Z" stroke="#EF4444" strokeWidth="1.5" />
              </svg>
              <p className="text-gray-500 text-sm">Sélectionnez un système pour voir les détails</p>
              <p className="text-gray-700 text-xs mt-1">Cliquez sur une zone du schéma ou un bouton ci-dessus</p>
            </div>
          )}

          {/* Cross-link */}
          <div className="mt-5 rounded-xl border border-cyan-500/20 p-4" style={{ background: 'rgba(6,182,212,0.04)' }}>
            <p className="text-xs text-gray-500 mb-1">Aller plus loin</p>
            <p className="text-sm text-gray-300 mb-2">
              Le corps humain est composé de{' '}
              <span className="text-cyan-400 font-semibold">37 000 milliards de cellules</span>.
              Explorez leur structure interne et leur fonctionnement.
            </p>
            <Link href="/biologie/cellules" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Cellules & Génétique →
            </Link>
          </div>
        </div>
      </div>

      {/* Systems overview grid */}
      <div className="mt-14">
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            background: 'linear-gradient(135deg, #10B981, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Les 8 systèmes du corps
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEMS.map((sys) => (
            <div
              key={sys.id}
              className="rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] cursor-pointer"
              style={{
                borderColor: selected?.id === sys.id ? sys.color : `${sys.color}30`,
                background: selected?.id === sys.id ? `${sys.color}12` : `${sys.color}06`,
              }}
              onClick={() => {
                toggle(sys);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ background: sys.color }} />
                <h3 className="font-bold text-sm" style={{ color: sys.color }}>{sys.name}</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{sys.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Composition ───────────────────────────────────── */}
      <div className="mt-16">
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #06B6D4, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Composition du corps humain
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-2xl">
          Le corps humain peut se lire à deux échelles : les atomes qui forment toutes ses molécules,
          et les grandes familles de matière qui le constituent.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">

          {/* Atomic composition */}
          <div className="rounded-2xl border border-white/8 p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
              Composition atomique
            </h3>
            <div className="space-y-4">
              {ATOMIC_COMPOSITION.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
                      <span className="text-xs text-gray-600 ml-2">{item.symbol}</span>
                    </div>
                    <span className="text-sm font-bold font-mono" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.pct}%`, background: item.color, opacity: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">{item.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Matter composition */}
          <div className="rounded-2xl border border-white/8 p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
              Composition en matière (masse)
            </h3>
            <div className="space-y-4">
              {MATTER_COMPOSITION.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
                    <span className="text-sm font-bold font-mono" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.pct}%`, background: item.color, opacity: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-tight">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Metabolism stats ──────────────────────────────── */}
      <div className="mt-16 mb-4">
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #F97316, #FBBF24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Chiffres du métabolisme
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-2xl">
          Le corps humain est une machine biologique extraordinaire — ses chiffres donnent le vertige.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {METABOLISM_STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border p-4"
              style={{ borderColor: `${s.color}30`, background: `${s.color}07` }}
            >
              <div
                className="text-xl font-bold mb-1 leading-tight"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Exo 2', monospace",
                }}
              >
                {s.value}
              </div>
              <div className="text-xs font-semibold text-white mb-0.5">{s.label}</div>
              <div className="text-xs text-gray-600 leading-tight">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
