'use client';
// app/sciences/timeline/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import ScienceLayout from '@/components/layout/ScienceLayout';
import { MicroscopeIcon } from '@/components/icons/SciencesIcons';
import { ScientistIcon } from '@/components/icons/ScientistIcons';
import { scientists, revolutions, DOMAIN_COLORS, type Scientist, type Revolution } from '@/data/scientists';

/* ── Palette dédiée à la section "Histoire des sciences" (indigo/violet) ── */
const HIST_ACCENT = '#818CF8';
const HIST_ACCENT_SOFT = '#A5B4FC';

/* ── Log-scale era timeline ───────────────────────────────── */
function EraSVG() {
  // Logarithmic scale based on "years before 2030"
  // RIGHT = present (small yearsAgo), LEFT = past (large yearsAgo)
  const REF = 2030;
  const tMin = 2;    // rightmost point = year 2028 (2 years ago)
  const tMax = 3000; // leftmost point  = year ~1030 BC
  const W = 440, x0 = 10;
  const logRange = Math.log10(tMax) - Math.log10(tMin);

  const toX = (year: number) => {
    const ago = Math.max(REF - year, tMin);
    return x0 + W * (1 - (Math.log10(ago) - Math.log10(tMin)) / logRange);
  };

  const yBar = 30, h = 16, axisY = yBar + h + 5;

  const eras = [
    { label: 'Antiquité',   abbr: 'Ant.',   start: -600, end: 500 },
    { label: 'Moyen Âge',   abbr: 'M.Â.',   start: 500,  end: 1400 },
    { label: 'Renaissance', abbr: 'Ren.',   start: 1400, end: 1700 },
    { label: 'Lumières',    abbr: 'Lum.',   start: 1700, end: 1850 },
    { label: '20ème s.',    abbr: '20è',    start: 1850, end: 1980 },
    { label: 'Numérique',   abbr: 'Num.',   start: 1980, end: 2028 },
  ];

  // Key events: alternating label rows (yLabel=8 or 18) to avoid overlap
  const keyEvents = [
    { t: -300,  label: 'Aristote',  yLabel: 8  },
    { t: 1543,  label: 'Copernic',  yLabel: 18 },
    { t: 1687,  label: 'Newton',    yLabel: 8  },
    { t: 1859,  label: 'Darwin',    yLabel: 18 },
    { t: 1905,  label: 'Einstein',  yLabel: 8  },
    { t: 1953,  label: 'ADN',       yLabel: 18 },
    { t: 2012,  label: 'CRISPR',    yLabel: 8  },
  ];

  const ticks = [-400, 1, 1000, 1500, 1700, 1800, 1900, 1950, 2000, 2015];

  return (
    <svg viewBox={`0 0 ${W + 20} 88`} width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 660 }}>
      {/* Era bars */}
      {eras.map((era) => {
        const x1 = toX(era.start), x2 = toX(era.end);
        const bw = x2 - x1 - 1;
        return (
          <g key={era.label}>
            <rect x={x1} y={yBar} width={bw} height={h} rx="2"
              fill={`${HIST_ACCENT}20`} stroke={HIST_ACCENT} strokeWidth="1" strokeOpacity="0.6" />
            {bw > 20 && (
              <text x={(x1 + x2) / 2} y={yBar + h / 2 + 0.5} textAnchor="middle"
                fontSize="5.5" fill={HIST_ACCENT_SOFT} fontFamily="'Exo 2',sans-serif" fontWeight="700"
                dominantBaseline="middle">
                {bw > 55 ? era.label : era.abbr}
              </text>
            )}
          </g>
        );
      })}

      {/* Axis */}
      <line x1={x0} y1={axisY} x2={x0 + W} y2={axisY} stroke="#374151" strokeWidth="1.2" />
      {/* Arrow at right end */}
      <polygon points={`${x0+W+4},${axisY} ${x0+W},${axisY-3} ${x0+W},${axisY+3}`} fill="#374151" />

      {/* Year ticks */}
      {ticks.map(y => {
        const x = toX(y);
        if (x < x0 - 2 || x > x0 + W + 2) return null;
        const lbl = y <= 0 ? `${Math.abs(y)} BC` : (y === 1 ? '1 AD' : String(y));
        return (
          <g key={y}>
            <line x1={x} y1={axisY} x2={x} y2={axisY + 5} stroke="#4B5563" strokeWidth="0.8" />
            <text x={x} y={axisY + 13} textAnchor="middle" fontSize="4.5" fill="#6B7280"
              fontFamily="'Exo 2',sans-serif">{lbl}</text>
          </g>
        );
      })}

      {/* Key event ticks: above the bar, alternating rows */}
      {keyEvents.map((e) => {
        const x = toX(e.t);
        return (
          <g key={e.label}>
            {/* Dashed line from label to bar top */}
            <line x1={x} y1={e.yLabel + 6} x2={x} y2={yBar}
              stroke={HIST_ACCENT_SOFT} strokeWidth="0.8" opacity="0.55" strokeDasharray="2 1.5" />
            {/* Dot */}
            <circle cx={x} cy={e.yLabel + 6} r="2.5" fill={HIST_ACCENT_SOFT} opacity="0.85" />
            {/* Label */}
            <text x={x} y={e.yLabel} textAnchor="middle" fontSize="5" fill={HIST_ACCENT_SOFT}
              fontFamily="'Exo 2',sans-serif" fontWeight="700">
              {e.label}
            </text>
          </g>
        );
      })}

      {/* Direction labels */}
      <text x={x0} y={axisY + 26} fontSize="4.5" fill="#4B5563" fontFamily="'Exo 2',sans-serif">
        ← Passé
      </text>
      <text x={x0 + W + 6} y={axisY + 26} textAnchor="end" fontSize="4.5" fill="#4B5563"
        fontFamily="'Exo 2',sans-serif">
        Présent →
      </text>
    </svg>
  );
}

/* ── Scientist links (pour les pastilles "Figures" des révolutions) ── */
// Maps display name → scientist page id (from /sciences/scientists/[id])
const FIGURE_IDS: Record<string, string> = {
  // Existing scientists
  'Archimède':    'archimedes',
  'Copernic':     'copernicus',
  'Galilée':      'galileo',
  'Kepler':       'kepler',
  'Newton':       'newton',
  'Lavoisier':    'lavoisier',
  'Maxwell':      'maxwell',
  'Darwin':       'darwin',
  'Pasteur':      'pasteur',
  'Einstein':     'einstein',
  'Bohr':         'bohr',
  'Heisenberg':   'heisenberg',
  'Marie Curie':  'curie',
  'Watson':       'crick-watson',
  'Crick':        'crick-watson',
  'Turing':       'turing',
  // Newly added
  'Thalès':       'thales',
  'Pythagore':    'pythagoras',
  'Aristote':     'aristotle',
  'Euclide':      'euclid',
  'Hipparque':    'hipparchus',
  'Descartes':    'descartes',
  'Harvey':       'harvey',
  'Carnot':       'carnot',
  'Faraday':      'faraday',
  'Mendel':       'mendel',
  'Planck':       'planck',
  'Schrödinger':  'schrodinger',
  'Dirac':        'dirac',
  'Franklin':     'franklin',
  'Shannon':      'shannon',
  'Monod':        'monod',
  'Doudna':       'doudna',
  'Charpentier':  'charpentier',
  'LeCun':        'lecun',
  'Hinton':       'hinton',
};

function FigurePill({ name }: { name: string }) {
  const id = FIGURE_IDS[name];
  const base = 'text-xs px-2 py-0.5 rounded-full transition-all duration-150';
  const style = { background: `${HIST_ACCENT}15`, color: HIST_ACCENT_SOFT };
  if (id) {
    return (
      <Link
        href={`/sciences/scientists/${id}`}
        className={`${base} hover:brightness-125 hover:underline decoration-dotted flex items-center gap-0.5`}
        style={{ ...style, background: `${HIST_ACCENT}22` }}
      >
        {name}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.7 }}>
          <path d="M1.5 6.5 L6.5 1.5 M6.5 1.5 H3.5 M6.5 1.5 V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </Link>
    );
  }
  return <span className={base} style={style}>{name}</span>;
}

/* ── Data : les six grandes révolutions (vue détaillée) ──────── */
const REVOLUTIONS_DETAIL = [
  {
    n: 1,
    era: 'VIe–IVe s. av. J.-C.',
    title: 'La philosophie naturelle grecque',
    paradigm: 'Du mythe au logos : chercher des causes naturelles aux phénomènes',
    desc: 'Les philosophes ioniens (Thalès, Anaximandre) remplacent les explications mythologiques par des causes matérielles. Aristote formalise la logique et la classification du vivant. Euclide axiomatise la géométrie.',
    figures: ['Thalès', 'Pythagore', 'Aristote', 'Euclide', 'Archimède', 'Hipparque'],
    legacy: 'La méthode déductive et le raisonnement logique, fondement de toute pensée scientifique.',
    rupture: 'De la cosmologie mythologique à la physique causale',
    discoveries: ['Géométrie euclidienne', 'Principe d\'Archimède', 'Modèle géocentrique', 'Atomisme (Démocrite)'],
  },
  {
    n: 2,
    era: 'XVIe–XVIIe siècle',
    title: 'La Révolution scientifique',
    paradigm: 'L\'expérience et les mathématiques comme langage de la nature',
    desc: 'Copernic déplace la Terre du centre de l\'univers. Galilée invente la méthode expérimentale. Newton unifie la physique terrestre et céleste avec la gravitation universelle et le calcul infinitésimal.',
    figures: ['Copernic', 'Galilée', 'Kepler', 'Descartes', 'Newton', 'Harvey'],
    legacy: 'La méthode hypothético-déductive et la mathématisation de la physique.',
    rupture: 'De l\'autorité d\'Aristote à l\'expérience reproductible',
    discoveries: ['Héliocentrisme', 'Lois de Kepler', 'Calcul différentiel', 'Gravitation universelle', 'Circulation sanguine'],
  },
  {
    n: 3,
    era: 'XVIIIe–XIXe siècle',
    title: 'Lumières, énergie et évolution',
    paradigm: 'Thermodynamique, électromagnétisme et transformation des espèces',
    desc: 'Lavoisier fonde la chimie moderne. Fourier, Carnot et Clausius établissent la thermodynamique. Maxwell unifie électricité et magnétisme. Darwin propose la sélection naturelle, la révolution biologique la plus profonde.',
    figures: ['Lavoisier', 'Carnot', 'Faraday', 'Maxwell', 'Darwin', 'Mendel', 'Pasteur'],
    legacy: 'Conservation de l\'énergie, ondes électromagnétiques, théorie de l\'évolution : trois révolutions en un siècle.',
    rupture: 'De la physique mécanique à la physique des champs et du vivant',
    discoveries: ['Conservation de l\'énergie', 'Équations de Maxwell', 'Sélection naturelle', 'Lois de Mendel', 'Microbes (Pasteur)'],
  },
  {
    n: 4,
    era: '1895 – 1935',
    title: 'Quanta et Relativité',
    paradigm: 'L\'espace-temps est relatif, l\'énergie est quantifiée, la matière est onde',
    desc: 'Planck quantifie l\'énergie (1900). Einstein révolutionne notre conception de l\'espace et du temps (relativité restreinte 1905, générale 1915). Bohr, Heisenberg et Schrödinger fondent la mécanique quantique, une physique radicalement non-intuitive.',
    figures: ['Planck', 'Einstein', 'Bohr', 'Heisenberg', 'Schrödinger', 'Dirac', 'Marie Curie'],
    legacy: 'Transistors, lasers, GPS, IRM, énergie nucléaire : toutes les technologies du 20ème siècle en découlent.',
    rupture: 'De la physique classique continue et déterministe à la physique discrète et probabiliste',
    discoveries: ['Quantification de l\'énergie', 'E=mc²', 'Dualité onde-corpuscule', 'Principe d\'incertitude', 'Radioactivité'],
  },
  {
    n: 5,
    era: '1940 – 1990',
    title: 'La révolution moléculaire',
    paradigm: 'Le vivant se lit, se copie et se modifie à l\'échelle moléculaire',
    desc: 'Watson et Crick révèlent la structure de l\'ADN (1953). Le code génétique est déchiffré (Nirenberg, 1961-1966). La biologie moléculaire unit génétique, biochimie et évolution. La PCR (Mullis, 1983) révolutionne le diagnostic et la recherche.',
    figures: ['Watson', 'Crick', 'Franklin', 'Nirenberg', 'Jacob', 'Monod', 'Mullis'],
    legacy: 'Biotechnologies, médicaments recombinants (insuline, érythropoïétine), OGM, médecine légale.',
    rupture: 'De l\'organisme comme boîte noire à la biologie mécaniste à l\'échelle atomique',
    discoveries: ['Structure ADN', 'Code génétique', 'Régulation génique (opéron)', 'PCR', 'Premières thérapies géniques'],
  },
  {
    n: 6,
    era: '1990 – présent',
    title: 'Révolution numérique & IA',
    paradigm: 'L\'information comme substrat universel : calcul, données et intelligence artificielle',
    desc: 'Le Projet Génome Humain complète la séquence de 3,2 Md de bases (2003). CRISPR-Cas9 rend l\'édition génomique accessible (2012, Nobel 2020). Les réseaux neuronaux profonds surpassent l\'humain en vision, jeu et langage. Les LLMs transforment la recherche scientifique elle-même.',
    figures: ['Turing', 'Shannon', 'Venter', 'Doudna', 'Charpentier', 'Bengio', 'LeCun', 'Hinton'],
    legacy: 'Internet, séquençage haut-débit, IA générative : la science accélère exponentiellement.',
    rupture: 'De la science descriptive à la science prédictive et générative',
    discoveries: ['Génome humain', 'CRISPR-Cas9', 'AlphaFold (protéines)', 'Vaccins ARNm', 'Grands modèles de langage'],
  },
];

const KEY_MOMENTS = [
  { year: '~585 BC', event: 'Thalès prédit une éclipse solaire : premier succès de la pensée scientifique' },
  { year: '1543',    event: 'De Revolutionibus de Copernic : la Terre n\'est plus au centre' },
  { year: '1687',    event: 'Principia de Newton : une seule loi gouverne Terre et ciel' },
  { year: '1859',    event: 'L\'Origine des Espèces de Darwin : la vie évolue par sélection' },
  { year: '1895',    event: 'Röntgen découvre les rayons X, naissance de la physique moderne' },
  { year: '1905',    event: 'Année miraculeuse d\'Einstein : relativité, photon, mouvement brownien' },
  { year: '1953',    event: 'Watson & Crick publient la double hélice, le secret de la vie révélé' },
  { year: '1969',    event: 'Apollo 11 : l\'humanité pose le pied sur la Lune' },
  { year: '1989',    event: 'Tim Berners-Lee invente le World Wide Web, internet devient universel' },
  { year: '2003',    event: 'Génome humain complété : 3,2 Md de paires de bases séquencées' },
  { year: '2012',    event: 'CRISPR-Cas9, le ciseau moléculaire universel pour éditer l\'ADN' },
  { year: '2023',    event: 'GPT-4 / LLMs : l\'IA générative atteint les capacités humaines en langage' },
];

// ── Timeline geometry ────────────────────────────────────────────────────────
const YEAR_MIN    = -650;
const YEAR_MAX    = 2030;
const SVG_W       = 3600;
const SVG_H       = 460;
const PAD_L       = 80;
const PAD_R       = 60;
const AXIS_Y      = 280;

// Piecewise scale: ancient era (-650→1400) gets 22% of width,
// modern era (1400→2030) gets 78% — la plupart des scientifiques et révolutions
// se concentrent après 1400, cette portion a donc bien plus d'espace pour respirer.
const BREAK_YEAR  = 1400;
const BREAK_RATIO = 0.22;

const mapX = (year: number) => {
  const totalW  = SVG_W - PAD_L - PAD_R;
  const ancientW = totalW * BREAK_RATIO;
  const modernW  = totalW * (1 - BREAK_RATIO);
  if (year <= BREAK_YEAR) {
    return PAD_L + ((year - YEAR_MIN) / (BREAK_YEAR - YEAR_MIN)) * ancientW;
  }
  return PAD_L + ancientW + ((year - BREAK_YEAR) / (YEAR_MAX - BREAK_YEAR)) * modernW;
};

// Century / key-year ticks — denser in the modern era (right half)
const YEAR_TICKS = [
  -600, -400, -200, 0, 400, 800, 1000, 1200, 1400,
  1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025,
];

// Era label positions
const ERA_LABELS = [
  { label: 'Antiquité',    year: -350 },
  { label: 'Moyen Âge',   year:  650  },
  { label: 'Renaissance', year: 1490  },
  { label: 'Lumières',    year: 1660  },
  { label: 'XIXe s.',     year: 1835  },
  { label: 'XXe s.',      year: 1960  },
];

// Revolution track layout (4 staggered rows)
const REV_TRACK_BASE_Y = 56;
const REV_TRACK_GAP    = 32;
const REV_H            = 24;

function revolutionTrack(idx: number) {
  return idx % 4;
}

export default function SciencesTimelinePage() {
  const [selectedScientist,  setSelectedScientist]  = useState<Scientist | null>(null);
  const [selectedRevolution, setSelectedRevolution] = useState<Revolution | null>(null);
  const [hoveredScientist,   setHoveredScientist]   = useState<string | null>(null);
  const [hoveredRevolution,  setHoveredRevolution]  = useState<string | null>(null);

  const handleScientistClick = (s: Scientist) => {
    setSelectedRevolution(null);
    setSelectedScientist(prev => prev?.id === s.id ? null : s);
  };
  const handleRevolutionClick = (r: Revolution) => {
    setSelectedScientist(null);
    setSelectedRevolution(prev => prev?.id === r.id ? null : r);
  };

  // Trié chronologiquement pour que l'échelonnement vertical (modulo) espace
  // vraiment les voisins temporels proches, plutôt que de suivre l'ordre du fichier.
  const scientistsChrono = [...scientists].sort((a, b) => a.born - b.born);
  const chronoIndex = new Map(scientistsChrono.map((s, i) => [s.id, i]));

  // Stagger scientist circles vertically to avoid overlap
  const scientistY = (id: string) => AXIS_Y + 28 + ((chronoIndex.get(id) ?? 0) % 5) * 28;

  return (
    <ScienceLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/sciences" className="hover:text-white transition-colors">Sciences</Link>
          <span>›</span>
          <span className="text-gray-400">Timeline</span>
        </div>

        {/* ── Header ── */}
        <div className="mb-6">
          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Histoire des Sciences
          </h1>
          <p className="text-base text-gray-500">
            Timeline interactive · Révolutions scientifiques · Cliquer sur un événement ou un scientifique
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">

          {/* ── Timeline column ── */}
          <div className="flex-1 min-w-0">

            {/* Scrollable SVG */}
            <style>{`
              .timeline-scroll::-webkit-scrollbar { height: 10px; }
              .timeline-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
              .timeline-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 6px; }
              .timeline-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
              .timeline-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) rgba(255,255,255,0.03); }
            `}</style>
            <div
              className="timeline-scroll relative rounded-2xl border border-white/8 overflow-x-auto overflow-y-hidden"
              style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.07) 0%, rgba(2,8,23,0.97) 70%)' }}
            >
              <svg width={SVG_W} height={SVG_H} style={{ display: 'block' }}>

                {/* ── Scale-break separator ── */}
                <line
                  x1={mapX(BREAK_YEAR)} y1={28} x2={mapX(BREAK_YEAR)} y2={SVG_H - 12}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />

                {/* ── Grid & year ticks ── */}
                {YEAR_TICKS.map(y => {
                  const x = mapX(y);
                  const isModern = y >= BREAK_YEAR;
                  const isMajor = y % 500 === 0 || y === 0 || y === 1000 || y === 1400 || y === 2000;
                  return (
                    <g key={y}>
                      <line
                        x1={x} y1={30} x2={x} y2={SVG_H - 14}
                        stroke={isMajor ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)'}
                        strokeWidth={isMajor ? 1 : 0.5}
                      />
                      <text
                        x={x} y={SVG_H - 4}
                        textAnchor="middle"
                        fontSize={isModern ? 10 : 8}
                        fill={isMajor ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.15)'}
                        fontFamily="monospace"
                      >
                        {y < 0 ? `${Math.abs(y)}av.` : y > 0 ? String(y) : '0'}
                      </text>
                    </g>
                  );
                })}

                {/* ── Era labels ── */}
                {ERA_LABELS.map(e => (
                  <text
                    key={e.label}
                    x={mapX(e.year)} y={22}
                    textAnchor="middle"
                    fontSize={e.year >= BREAK_YEAR ? 10 : 8.5}
                    fill="rgba(255,255,255,0.20)"
                    fontFamily="'Exo 2', sans-serif"
                    fontWeight="700"
                    letterSpacing="1.5"
                  >
                    {e.label.toUpperCase()}
                  </text>
                ))}

                {/* ── Revolution bands ── */}
                {revolutions.map((rev, idx) => {
                  const x1    = mapX(rev.year);
                  const x2    = rev.endYear ? mapX(rev.endYear) : x1 + 16;
                  const track = revolutionTrack(idx);
                  const ty    = REV_TRACK_BASE_Y + track * REV_TRACK_GAP;
                  const isHov = hoveredRevolution === rev.id;
                  const isSel = selectedRevolution?.id === rev.id;
                  const w     = Math.max(x2 - x1, 10);

                  return (
                    <g
                      key={rev.id}
                      onClick={() => handleRevolutionClick(rev)}
                      onMouseEnter={() => setHoveredRevolution(rev.id)}
                      onMouseLeave={() => setHoveredRevolution(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Band */}
                      <rect
                        x={x1} y={ty} width={w} height={REV_H}
                        rx={4} ry={4}
                        fill={rev.color}
                        fillOpacity={isSel ? 0.55 : isHov ? 0.42 : 0.22}
                        stroke={rev.color}
                        strokeWidth={isSel ? 1.5 : 0.8}
                        strokeOpacity={isSel ? 1 : 0.55}
                      />
                      {/* Inline label when wide enough */}
                      {w > 50 && (
                        <text
                          x={x1 + Math.min(w / 2, 90)} y={ty + 13}
                          textAnchor="middle"
                          fontSize={8}
                          fill={rev.color}
                          fontFamily="'Exo 2', sans-serif"
                          fontWeight="600"
                          fillOpacity={0.9}
                        >
                          {rev.title.split(' ').slice(0, 3).join(' ')}
                        </text>
                      )}
                      {/* Hover tooltip above band */}
                      {(isHov || isSel) && (
                        <g>
                          <rect
                            x={x1} y={ty - 22}
                            width={Math.min(rev.title.length * 6.5 + 14, 240)} height={18}
                            rx={4}
                            fill="rgba(2,8,23,0.92)"
                            stroke={rev.color}
                            strokeWidth={0.7}
                            strokeOpacity={0.7}
                          />
                          <text
                            x={x1 + 7} y={ty - 9}
                            fontSize={10}
                            fill={rev.color}
                            fontFamily="'Exo 2', sans-serif"
                            fontWeight="600"
                          >
                            {rev.title}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* ── Timeline axis ── */}
                <line
                  x1={PAD_L} y1={AXIS_Y} x2={SVG_W - PAD_R} y2={AXIS_Y}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth={1.5}
                />

                {/* ── Scientist circles ── */}
                {scientists.map((s) => {
                  const x     = mapX(s.born);
                  const sy    = scientistY(s.id);
                  const isHov = hoveredScientist === s.id;
                  const isSel = selectedScientist?.id === s.id;
                  const isModern = s.born >= BREAK_YEAR;
                  const baseR = isModern ? 8.5 : 7;
                  const r     = isSel ? baseR + 2 : isHov ? baseR + 1.5 : baseR;

                  return (
                    <g
                      key={s.id}
                      onClick={() => handleScientistClick(s)}
                      onMouseEnter={() => setHoveredScientist(s.id)}
                      onMouseLeave={() => setHoveredScientist(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Connector to axis */}
                      <line
                        x1={x} y1={AXIS_Y + 2} x2={x} y2={sy - r - 2}
                        stroke={s.color}
                        strokeWidth={0.8}
                        strokeOpacity={isHov || isSel ? 0.75 : 0.28}
                        strokeDasharray={isSel ? 'none' : '2 3'}
                      />
                      {/* Selection/hover halo */}
                      {(isSel || isHov) && (
                        <circle
                          cx={x} cy={sy} r={r + 5}
                          fill="none"
                          stroke={s.color}
                          strokeWidth={1.2}
                          strokeOpacity={0.45}
                          strokeDasharray={isSel ? 'none' : '3 3'}
                        />
                      )}
                      {/* Circle */}
                      <circle
                        cx={x} cy={sy} r={r}
                        fill={s.color}
                        fillOpacity={isSel ? 0.92 : isHov ? 0.75 : 0.55}
                        stroke={s.color}
                        strokeWidth={0.8}
                      />
                      {/* Axis tick */}
                      <circle cx={x} cy={AXIS_Y} r={2.5} fill={s.color} fillOpacity={0.75} />
                      {/* Name tooltip on hover/select */}
                      {(isHov || isSel) && (
                        <g>
                          <rect
                            x={x + 13} y={sy - 11}
                            width={s.name.length * 6.8 + 14} height={20}
                            rx={4}
                            fill="rgba(2,8,23,0.93)"
                            stroke={s.color}
                            strokeWidth={0.8}
                            strokeOpacity={0.65}
                          />
                          <text
                            x={x + 20} y={sy + 3}
                            fontSize={11}
                            fill={s.color}
                            fontFamily="'Exo 2', sans-serif"
                            fontWeight="600"
                          >
                            {s.name}
                          </text>
                        </g>
                      )}
                      {/* Small persistent label */}
                      {!isHov && !isSel && (
                        <text
                          x={x} y={sy - r - 5}
                          textAnchor="middle"
                          fontSize={isModern ? 9.5 : 7.5}
                          fill={s.color}
                          fontFamily="monospace"
                          fillOpacity={isModern ? 0.70 : 0.50}
                        >
                          {s.name.split(' ').pop()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Bottom legend */}
              <div className="absolute bottom-3 left-4 text-xs text-gray-700 font-mono pointer-events-none">
                Échelle non-linéaire · 650 av. J.-C. → 2030 · ← faire défiler →
              </div>

              {/* Edge fade hints (scroll affordance) */}
              <div className="absolute top-0 left-0 bottom-0 w-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(2,8,23,0.6), transparent)' }} />
              <div className="absolute top-0 right-0 bottom-0 w-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, rgba(2,8,23,0.6), transparent)' }} />
            </div>

            {/* ── Quick scientist picker ── */}
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
              {scientists.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleScientistClick(s)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    selectedScientist?.id === s.id
                      ? 'border-white/30 scale-105'
                      : 'border-white/6 hover:border-white/18'
                  }`}
                  style={{
                    background: selectedScientist?.id === s.id ? `${s.color}1A` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex justify-center" style={{ color: s.color }}><ScientistIcon id={s.id} size={22} /></div>
                  <span
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: selectedScientist?.id === s.id ? s.color : '#6B7280' }}
                  >
                    {s.name.split(' ').pop()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="xl:w-88" style={{ minWidth: 320, maxWidth: 420 }}>
            <div className="xl:sticky xl:top-20 space-y-4">

              {/* Scientist panel */}
              {selectedScientist && !selectedRevolution && (
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: `${selectedScientist.color}0C`, borderColor: `${selectedScientist.color}40` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl shrink-0"
                        style={{ borderColor: selectedScientist.color + '55', background: selectedScientist.color + '18' }}
                      >
                        <span style={{ color: selectedScientist.color }}><ScientistIcon id={selectedScientist.id} size={52} /></span>
                      </div>
                      <div>
                        <div
                          className="text-xs uppercase tracking-widest mb-0.5 font-semibold"
                          style={{ color: selectedScientist.color }}
                        >
                          {selectedScientist.domains[0]}
                        </div>
                        <h2 className="text-xl font-bold text-white leading-tight">{selectedScientist.name}</h2>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          {selectedScientist.born < 0
                            ? `${Math.abs(selectedScientist.born)} av. J.-C.`
                            : selectedScientist.born}
                          {selectedScientist.died ? ` — ${selectedScientist.died}` : ''}
                          {' · '}{selectedScientist.nationality}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedScientist(null)}
                      className="text-gray-600 hover:text-white text-xl leading-none ml-2 shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">
                    {selectedScientist.shortBio}
                  </p>

                  {/* Domains */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedScientist.domains.map(d => (
                      <span
                        key={d}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: (DOMAIN_COLORS[d] || '#888') + '22',
                          color: DOMAIN_COLORS[d] || '#888',
                          border: `1px solid ${(DOMAIN_COLORS[d] || '#888')}44`,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Key discoveries */}
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Découvertes clés</div>
                    <div className="space-y-1">
                      {selectedScientist.discoveries.slice(0, 4).map((d, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300">
                          <span className="mt-0.5 shrink-0" style={{ color: selectedScientist.color }}>◆</span>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/sciences/scientists/${selectedScientist.id}`}
                    className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110"
                    style={{
                      background: selectedScientist.color + '28',
                      border: `1px solid ${selectedScientist.color}50`,
                      color: selectedScientist.color,
                    }}
                  >
                    Page complète →
                  </Link>
                </div>
              )}

              {/* Revolution panel */}
              {selectedRevolution && !selectedScientist && (
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: `${selectedRevolution.color}0C`, borderColor: `${selectedRevolution.color}40` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-3">
                      <div
                        className="text-xs uppercase tracking-widest mb-1 font-semibold"
                        style={{ color: selectedRevolution.color }}
                      >
                        {selectedRevolution.domain} · {selectedRevolution.year}
                        {selectedRevolution.endYear ? ` — ${selectedRevolution.endYear}` : ''}
                      </div>
                      <h2 className="text-xl font-bold text-white leading-tight">{selectedRevolution.title}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedRevolution(null)}
                      className="text-gray-600 hover:text-white text-xl leading-none shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4">{selectedRevolution.description}</p>

                  {selectedRevolution.impact.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Impact</div>
                      <div className="space-y-1">
                        {selectedRevolution.impact.map((imp, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300">
                            <span className="mt-0.5 shrink-0" style={{ color: selectedRevolution.color }}>◆</span>
                            {imp}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related scientists */}
                  {selectedRevolution.scientistIds.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Scientifiques associés</div>
                      <div className="space-y-1">
                        {selectedRevolution.scientistIds.map(sid => {
                          const s = scientists.find(sc => sc.id === sid);
                          if (!s) return null;
                          return (
                            <button
                              key={sid}
                              onClick={() => { setSelectedRevolution(null); setSelectedScientist(s); }}
                              className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-white/6 transition-all text-left"
                            >
                              <span style={{ color: s.color }}><ScientistIcon id={s.id} size={20} /></span>
                              <div>
                                <div className="text-sm font-semibold text-white">{s.name}</div>
                                <div className="text-xs text-gray-500">{s.domains[0]}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Default panel */}
              {!selectedScientist && !selectedRevolution && (
                <div
                  className="rounded-2xl border border-white/8 p-5"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <h2 className="text-base font-bold text-gray-300 mb-4 uppercase tracking-wider">Explorer</h2>
                  <div className="space-y-1.5">
                    {revolutions.map(r => (
                      <button
                        key={r.id}
                        onClick={() => handleRevolutionClick(r)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all group"
                      >
                        <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: r.color }} />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex-1 text-left font-medium">
                          {r.title}
                        </span>
                        <span className="text-xs text-gray-700 font-mono shrink-0">{r.year}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/8">
                    <Link
                      href="/sciences/scientists"
                      className="block text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider border border-indigo-700/40 text-indigo-400 hover:bg-indigo-900/20 transition-all"
                    >
                      <span className="inline-flex items-center gap-1.5"><MicroscopeIcon size={13} /> Tous les scientifiques</span>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* ── Histoire des Sciences : vue détaillée ─────────── */}
        <div className="mt-16 pt-10 border-t border-white/8">

          {/* ── 1. Era log-scale timeline ──────────────────── */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: HIST_ACCENT }} />
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                2 600 ans en un coup d&apos;œil
              </h2>
            </div>
            <div className="rounded-2xl border border-white/8 p-6 overflow-x-auto"
              style={{ background: 'rgba(255,255,255,0.02)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <EraSVG />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Échelle logarithmique : chaque décade de l&apos;axe représente la même longueur, les événements récents sont étalés,
              les périodes antiques compressées. Passé → Présent de gauche à droite.
            </p>
          </section>

          {/* ── 2. Six revolutions (vue détaillée) ───────────── */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: HIST_ACCENT }} />
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Les six grandes révolutions
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-6 max-w-xl">
              Chaque révolution scientifique (au sens de Kuhn, 1962) brise un paradigme dominant et en installe un nouveau,
              incompatible avec le précédent.
            </p>
            <div className="space-y-5">
              {REVOLUTIONS_DETAIL.map((rev) => (
                <div key={rev.n} className="rounded-2xl border border-white/8 p-6"
                  style={{ background: 'rgba(255,255,255,0.02)', borderTopColor: `${HIST_ACCENT}50`, borderTopWidth: 2 }}>
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
                      style={{ background: `${HIST_ACCENT}20`, color: HIST_ACCENT_SOFT, fontFamily: "'Exo 2', sans-serif" }}>
                      {rev.n}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>{rev.title}</h3>
                        <span className="text-xs font-mono text-gray-600">{rev.era}</span>
                      </div>
                      <p className="text-xs italic text-gray-500">{rev.paradigm}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{rev.desc}</p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                        Figures <span className="normal-case font-normal text-gray-700">(↗ = fiche)</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {rev.figures.map(f => (
                          <FigurePill key={f} name={f} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Découvertes clés</p>
                      <ul className="space-y-1">
                        {rev.discoveries.map(d => (
                          <li key={d} className="flex items-start gap-1.5 text-xs text-gray-400">
                            <span style={{ color: HIST_ACCENT_SOFT }} className="flex-shrink-0">·</span>{d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Rupture</p>
                      <p className="text-xs text-gray-500 leading-relaxed italic mb-2">{rev.rupture}</p>
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-1">Héritage</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{rev.legacy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Key moments ───────────────────────────────── */}
          <section className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: HIST_ACCENT }} />
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                Moments charnières
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-6 max-w-xl">
              Quelques dates qui ont changé le cours de l&apos;histoire scientifique.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {KEY_MOMENTS.map((m) => (
                <div key={m.year} className="rounded-xl border border-white/8 p-4 hover:scale-[1.01] transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.02)', borderTopColor: `${HIST_ACCENT}50`, borderTopWidth: 2 }}>
                  <div className="text-sm font-bold font-mono mb-2" style={{ color: HIST_ACCENT_SOFT }}>{m.year}</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </ScienceLayout>
  );
}
