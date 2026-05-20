import type { Metadata } from 'next';
import Link from 'next/link';
import ScienceLayout from '@/components/ScienceLayout';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Histoire des Sciences | Sciences',
  description: 'Les six grandes révolutions scientifiques — de la philosophie naturelle grecque à l\'intelligence artificielle — paradigmes, ruptures et héritages.',
  keywords: ['histoire des sciences', 'révolutions scientifiques', 'Galilée', 'Newton', 'Darwin', 'Einstein', 'ADN', 'IA'],
  openGraph: {
    title: 'Histoire des Sciences | Suri Space',
    description: 'Six révolutions scientifiques qui ont transformé notre vision du monde.',
    url: 'https://suri-space.vercel.app/sciences/histoire',
  },
};

/* ── Log-scale timeline ───────────────────────────────────── */

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
    { label: 'Antiquité',   abbr: 'Ant.',   start: -600, end: 500,  color: '#A78BFA' },
    { label: 'Moyen Âge',   abbr: 'M.Â.',   start: 500,  end: 1400, color: '#60A5FA' },
    { label: 'Renaissance', abbr: 'Ren.',   start: 1400, end: 1700, color: '#F97316' },
    { label: 'Lumières',    abbr: 'Lum.',   start: 1700, end: 1850, color: '#FBBF24' },
    { label: '20ème s.',    abbr: '20è',    start: 1850, end: 1980, color: '#EF4444' },
    { label: 'Numérique',   abbr: 'Num.',   start: 1980, end: 2028, color: '#10B981' },
  ];

  // Key events: alternating label rows (yLabel=8 or 18) to avoid overlap
  const keyEvents = [
    { t: -300,  label: 'Aristote',  color: '#A78BFA', yLabel: 8  },
    { t: 1543,  label: 'Copernic',  color: '#F97316', yLabel: 18 },
    { t: 1687,  label: 'Newton',    color: '#F97316', yLabel: 8  },
    { t: 1859,  label: 'Darwin',    color: '#FBBF24', yLabel: 18 },
    { t: 1905,  label: 'Einstein',  color: '#EF4444', yLabel: 8  },
    { t: 1953,  label: 'ADN',       color: '#EF4444', yLabel: 18 },
    { t: 2012,  label: 'CRISPR',    color: '#10B981', yLabel: 8  },
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
              fill={`${era.color}28`} stroke={era.color} strokeWidth="1" />
            {bw > 20 && (
              <text x={(x1 + x2) / 2} y={yBar + h / 2 + 0.5} textAnchor="middle"
                fontSize="5.5" fill={era.color} fontFamily="'Exo 2',sans-serif" fontWeight="700"
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

      {/* Key event ticks — above the bar, alternating rows */}
      {keyEvents.map((e) => {
        const x = toX(e.t);
        return (
          <g key={e.label}>
            {/* Dashed line from label to bar top */}
            <line x1={x} y1={e.yLabel + 6} x2={x} y2={yBar}
              stroke={e.color} strokeWidth="0.8" opacity="0.55" strokeDasharray="2 1.5" />
            {/* Dot */}
            <circle cx={x} cy={e.yLabel + 6} r="2.5" fill={e.color} opacity="0.85" />
            {/* Label */}
            <text x={x} y={e.yLabel} textAnchor="middle" fontSize="5" fill={e.color}
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

/* ── Scientist links ──────────────────────────────────────── */

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

function FigurePill({ name, color }: { name: string; color: string }) {
  const id = FIGURE_IDS[name];
  const base = 'text-xs px-2 py-0.5 rounded-full transition-all duration-150';
  const style = { background: `${color}15`, color };
  if (id) {
    return (
      <Link
        href={`/sciences/scientists/${id}`}
        className={`${base} hover:brightness-125 hover:underline decoration-dotted flex items-center gap-0.5`}
        style={{ ...style, background: `${color}22` }}
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

/* ── Data ─────────────────────────────────────────────────── */

const REVOLUTIONS = [
  {
    n: 1,
    era: 'VIe–IVe s. av. J.-C.',
    title: 'La philosophie naturelle grecque',
    color: '#A78BFA',
    paradigm: 'Du mythe au logos — chercher des causes naturelles aux phénomènes',
    desc: 'Les philosophes ioniens (Thalès, Anaximandre) remplacent les explications mythologiques par des causes matérielles. Aristote formalise la logique et la classification du vivant. Euclide axiomatise la géométrie.',
    figures: ['Thalès', 'Pythagore', 'Aristote', 'Euclide', 'Archimède', 'Hipparque'],
    legacy: 'La méthode déductive et le raisonnement logique — fondement de toute pensée scientifique.',
    rupture: 'De la cosmologie mythologique à la physique causale',
    discoveries: ['Géométrie euclidienne', 'Principe d\'Archimède', 'Modèle géocentrique', 'Atomisme (Démocrite)'],
  },
  {
    n: 2,
    era: 'XVIe–XVIIe siècle',
    title: 'La Révolution scientifique',
    color: '#F97316',
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
    color: '#FBBF24',
    paradigm: 'Thermodynamique, électromagnétisme et transformation des espèces',
    desc: 'Lavoisier fonde la chimie moderne. Fourier, Carnot et Clausius établissent la thermodynamique. Maxwell unifie électricité et magnétisme. Darwin propose la sélection naturelle — la révolution biologique la plus profonde.',
    figures: ['Lavoisier', 'Carnot', 'Faraday', 'Maxwell', 'Darwin', 'Mendel', 'Pasteur'],
    legacy: 'Conservation de l\'énergie, ondes électromagnétiques, théorie de l\'évolution — trois révolutions en un siècle.',
    rupture: 'De la physique mécanique à la physique des champs et du vivant',
    discoveries: ['Conservation de l\'énergie', 'Équations de Maxwell', 'Sélection naturelle', 'Lois de Mendel', 'Microbes (Pasteur)'],
  },
  {
    n: 4,
    era: '1895 – 1935',
    title: 'Quanta et Relativité',
    color: '#EF4444',
    paradigm: 'L\'espace-temps est relatif, l\'énergie est quantifiée, la matière est onde',
    desc: 'Planck quantifie l\'énergie (1900). Einstein révolutionne notre conception de l\'espace et du temps (relativité restreinte 1905, générale 1915). Bohr, Heisenberg et Schrödinger fondent la mécanique quantique — une physique radicalement non-intuitive.',
    figures: ['Planck', 'Einstein', 'Bohr', 'Heisenberg', 'Schrödinger', 'Dirac', 'Marie Curie'],
    legacy: 'Transistors, lasers, GPS, IRM, énergie nucléaire — toutes les technologies du 20ème siècle en découlent.',
    rupture: 'De la physique classique continue et déterministe à la physique discrète et probabiliste',
    discoveries: ['Quantification de l\'énergie', 'E=mc²', 'Dualité onde-corpuscule', 'Principe d\'incertitude', 'Radioactivité'],
  },
  {
    n: 5,
    era: '1940 – 1990',
    title: 'La révolution moléculaire',
    color: '#10B981',
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
    color: '#06B6D4',
    paradigm: 'L\'information comme substrat universel — calcul, données et intelligence artificielle',
    desc: 'Le Projet Génome Humain complète la séquence de 3,2 Md de bases (2003). CRISPR-Cas9 rend l\'édition génomique accessible (2012, Nobel 2020). Les réseaux neuronaux profonds surpassent l\'humain en vision, jeu et langage. Les LLMs transforment la recherche scientifique elle-même.',
    figures: ['Turing', 'Shannon', 'Venter', 'Doudna', 'Charpentier', 'Bengio', 'LeCun', 'Hinton'],
    legacy: 'Internet, séquençage haut-débit, IA générative — la science accélère exponentiellement.',
    rupture: 'De la science descriptive à la science prédictive et générative',
    discoveries: ['Génome humain', 'CRISPR-Cas9', 'AlphaFold (protéines)', 'Vaccins ARNm', 'Grands modèles de langage'],
  },
];

const KEY_MOMENTS = [
  { year: '~585 BC', event: 'Thalès prédit une éclipse solaire — premier succès de la pensée scientifique',       color: '#A78BFA' },
  { year: '1543',    event: 'De Revolutionibus de Copernic — la Terre n\'est plus au centre',                       color: '#F97316' },
  { year: '1687',    event: 'Principia de Newton — une seule loi gouverne Terre et ciel',                           color: '#F97316' },
  { year: '1859',    event: 'L\'Origine des Espèces de Darwin — la vie évolue par sélection',                       color: '#FBBF24' },
  { year: '1895',    event: 'Röntgen découvre les rayons X — naissance de la physique moderne',                     color: '#EF4444' },
  { year: '1905',    event: 'Année miraculeuse d\'Einstein : relativité, photon, mouvement brownien',                color: '#EF4444' },
  { year: '1953',    event: 'Watson & Crick publient la double hélice — le secret de la vie révélé',               color: '#10B981' },
  { year: '1969',    event: 'Apollo 11 — l\'humanité pose le pied sur la Lune',                                     color: '#60A5FA' },
  { year: '1989',    event: 'Tim Berners-Lee invente le World Wide Web — internet devient universel',               color: '#06B6D4' },
  { year: '2003',    event: 'Génome humain complété — 3,2 Md de paires de bases séquencées',                       color: '#10B981' },
  { year: '2012',    event: 'CRISPR-Cas9 — le ciseau moléculaire universel pour éditer l\'ADN',                    color: '#10B981' },
  { year: '2023',    event: 'GPT-4 / LLMs — l\'IA générative atteint les capacités humaines en langage',           color: '#06B6D4' },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function HistoireSciencesPage() {
  return (
    <ScienceLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Sciences', item: 'https://suri-space.vercel.app/sciences' },
          { '@type': 'ListItem', position: 3, name: 'Histoire des Sciences', item: 'https://suri-space.vercel.app/sciences/histoire' },
        ]},
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-600 mb-8">
          <Link href="/sciences" className="hover:text-white transition-colors">Sciences</Link>
          <span className="text-gray-700">›</span>
          <span className="text-violet-400">Histoire</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
          style={{ background: 'linear-gradient(135deg, #A78BFA, #60A5FA, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
          Histoire des Sciences
        </h1>
        <p className="text-gray-400 mb-4 max-w-2xl">
          De la philosophie naturelle grecque à l&apos;intelligence artificielle — six révolutions qui ont transformé
          notre façon de comprendre le monde, chacune renversant les certitudes de la précédente.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {['6 révolutions scientifiques', '2 600 ans d\'histoire', '40+ figures clés'].map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>
          ))}
        </div>

        {/* ── 1. Era timeline ──────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #A78BFA, #10B981)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #A78BFA, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              2 600 ans en un coup d&apos;œil
            </h2>
          </div>
          <div className="rounded-2xl border border-white/8 p-6 overflow-x-auto"
            style={{ background: 'rgba(255,255,255,0.02)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
            <EraSVG />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Échelle logarithmique · chaque décade de l&apos;axe représente la même longueur — les événements récents sont étalés,
            les périodes antiques compressées. Passé → Présent de gauche à droite.
          </p>
        </section>

        {/* ── 2. Six revolutions ───────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #F97316, #A78BFA)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #F97316, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Les six grandes révolutions
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Chaque révolution scientifique (au sens de Kuhn, 1962) brise un paradigme dominant et en installe un nouveau,
            incompatible avec le précédent.
          </p>
          <div className="space-y-5">
            {REVOLUTIONS.map((rev) => (
              <div key={rev.n} className="rounded-2xl border p-6"
                style={{ borderColor: `${rev.color}30`, background: `${rev.color}06`, borderTopColor: `${rev.color}60`, borderTopWidth: 2 }}>
                <div className="flex flex-wrap items-start gap-4 mb-4">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
                    style={{ background: `${rev.color}20`, color: rev.color, fontFamily: "'Exo 2', sans-serif" }}>
                    {rev.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold" style={{ color: rev.color, fontFamily: "'Exo 2', sans-serif" }}>{rev.title}</h3>
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
                        <FigurePill key={f} name={f} color={rev.color} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Découvertes clés</p>
                    <ul className="space-y-1">
                      {rev.discoveries.map(d => (
                        <li key={d} className="flex items-start gap-1.5 text-xs text-gray-400">
                          <span style={{ color: rev.color }} className="flex-shrink-0">·</span>{d}
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
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #FBBF24, #EF4444)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #FBBF24, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Moments charnières
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Quelques dates qui ont changé le cours de l&apos;histoire scientifique.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {KEY_MOMENTS.map((m) => (
              <div key={m.year} className="rounded-xl border p-4 hover:scale-[1.01] transition-all duration-200"
                style={{ borderColor: `${m.color}30`, background: `${m.color}07`, borderTopColor: `${m.color}50`, borderTopWidth: 2 }}>
                <div className="text-sm font-bold font-mono mb-2" style={{ color: m.color }}>{m.year}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <div className="pt-10 border-t border-white/6">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Explorer aussi</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { href: '/sciences/timeline',   color: '#818CF8', label: 'Timeline',       desc: 'Frise chronologique interactive' },
              { href: '/sciences/scientists', color: '#A78BFA', label: 'Scientifiques',  desc: 'Portraits des grandes figures' },
              { href: '/sciences/formules',   color: '#06B6D4', label: 'Formules',       desc: 'Équations fondamentales' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="group rounded-xl border border-white/8 p-4 hover:border-white/20 transition-all duration-200 block"
                style={{ background: 'rgba(255,255,255,0.015)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm" style={{ color: l.color }}>{l.label}</span>
                  <span className="text-gray-600 text-sm group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                </div>
                <p className="text-xs text-gray-600 leading-tight">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </ScienceLayout>
  );
}
