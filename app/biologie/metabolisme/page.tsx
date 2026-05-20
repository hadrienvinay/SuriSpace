import type { Metadata } from 'next';
import Link from 'next/link';
import BiologieLayout from '@/components/BiologieLayout';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Métabolisme | Biologie',
  description: 'L\'ATP, la respiration cellulaire (glycolyse, cycle de Krebs, chaîne respiratoire) et la photosynthèse — les moteurs énergétiques du vivant.',
  keywords: ['métabolisme', 'ATP', 'respiration cellulaire', 'photosynthèse', 'glycolyse', 'cycle de Krebs', 'biologie'],
  openGraph: {
    title: 'Métabolisme | Suri Space',
    description: 'ATP, respiration cellulaire et photosynthèse — les mécanismes énergétiques du vivant.',
    url: 'https://suri-space.vercel.app/biologie/metabolisme',
  },
};

/* ── SVG Diagrams ─────────────────────────────────────────── */

function AtpSVG() {
  return (
    <svg viewBox="0 0 280 100" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 360 }}>
      {/* Adenosine (Adenine + Ribose) */}
      <rect x="8" y="28" width="70" height="44" rx="10" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.5" />
      <text x="43" y="47" textAnchor="middle" fontSize="7.5" fill="#10B981" fontFamily="'Exo 2',sans-serif" fontWeight="700">Adénine</text>
      <text x="43" y="59" textAnchor="middle" fontSize="7" fill="#10B981" fontFamily="'Exo 2',sans-serif">+ Ribose</text>
      <text x="43" y="82" textAnchor="middle" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif" opacity="0.7">Adénosine</text>

      {/* Bond */}
      <line x1="78" y1="50" x2="92" y2="50" stroke="#6B7280" strokeWidth="1.5" />

      {/* P1 */}
      <circle cx="104" cy="50" r="12" fill="rgba(96,165,250,0.15)" stroke="#60A5FA" strokeWidth="1.5" />
      <text x="104" y="54" textAnchor="middle" fontSize="9" fill="#60A5FA" fontFamily="'Exo 2',sans-serif" fontWeight="700">P</text>

      {/* High-energy bond ~*/}
      <text x="124" y="46" textAnchor="middle" fontSize="13" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">~</text>
      <line x1="116" y1="50" x2="132" y2="50" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* P2 */}
      <circle cx="144" cy="50" r="12" fill="rgba(251,191,36,0.15)" stroke="#FBBF24" strokeWidth="1.5" />
      <text x="144" y="54" textAnchor="middle" fontSize="9" fill="#FBBF24" fontFamily="'Exo 2',sans-serif" fontWeight="700">P</text>

      {/* High-energy bond ~ */}
      <text x="164" y="46" textAnchor="middle" fontSize="13" fill="#EF4444" fontFamily="'Exo 2',sans-serif">~</text>
      <line x1="156" y1="50" x2="172" y2="50" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />

      {/* P3 — terminal, high energy */}
      <circle cx="184" cy="50" r="12" fill="rgba(239,68,68,0.2)" stroke="#EF4444" strokeWidth="2" />
      <text x="184" y="54" textAnchor="middle" fontSize="9" fill="#EF4444" fontFamily="'Exo 2',sans-serif" fontWeight="700">P</text>

      {/* Hydrolysis arrow */}
      <path d="M 196 50 Q 220 50 230 42" stroke="#EF4444" strokeWidth="1.5" fill="none" markerEnd="url(#arrAtp)" strokeLinecap="round" />
      <text x="232" y="35" fontSize="7" fill="#EF4444" fontFamily="'Exo 2',sans-serif">~30 kJ/mol</text>
      <text x="232" y="45" fontSize="6.5" fill="#EF4444" fontFamily="'Exo 2',sans-serif">libérés</text>

      {/* Labels below */}
      <text x="43"  y="95" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Adénosine</text>
      <text x="144" y="95" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">AMP→ADP</text>
      <text x="184" y="95" textAnchor="middle" fontSize="6" fill="#EF4444" fontFamily="'Exo 2',sans-serif">γ-phosphate</text>

      <text x="8" y="15" fontSize="8" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">STRUCTURE DE L&apos;ATP</text>
      <text x="236" y="55" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">→ ADP + Pᵢ</text>

      <defs>
        <marker id="arrAtp" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 Z" fill="#EF4444" />
        </marker>
      </defs>
    </svg>
  );
}

function RespirationSVG() {
  return (
    <svg viewBox="0 0 300 200" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 420 }}>
      <text x="150" y="14" textAnchor="middle" fontSize="8.5" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">RESPIRATION CELLULAIRE</text>

      {/* Cytoplasm zone */}
      <rect x="8" y="20" width="284" height="50" rx="8" fill="rgba(96,165,250,0.05)" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 3" />
      <text x="14" y="32" fontSize="6.5" fill="#60A5FA" fontFamily="'Exo 2',sans-serif">Cytoplasme</text>

      {/* Box 1 — Glycolyse */}
      <rect x="20" y="30" width="80" height="34" rx="6" fill="rgba(96,165,250,0.12)" stroke="#60A5FA" strokeWidth="1.4" />
      <text x="60" y="45" textAnchor="middle" fontSize="7.5" fill="#60A5FA" fontFamily="'Exo 2',sans-serif" fontWeight="700">Glycolyse</text>
      <text x="60" y="56" textAnchor="middle" fontSize="6.5" fill="#60A5FA" fontFamily="'Exo 2',sans-serif">Glucose → 2 Pyruvate</text>
      <text x="60" y="73" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">2 ATP + 2 NADH</text>

      {/* Arrow 1 */}
      <path d="M 100 47 L 118 47" stroke="#6B7280" strokeWidth="1.2" markerEnd="url(#arrResp)" />

      {/* Mitochondria zone */}
      <rect x="8" y="85" width="284" height="108" rx="8" fill="rgba(249,115,22,0.04)" stroke="#F97316" strokeWidth="1" strokeDasharray="4 3" />
      <text x="14" y="97" fontSize="6.5" fill="#F97316" fontFamily="'Exo 2',sans-serif">Mitochondrie</text>

      {/* Pyruvate → Acétyl-CoA (transition) */}
      <text x="150" y="66" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">→ 2 Acétyl-CoA + 2 NADH + 2 CO₂</text>
      <path d="M 150 70 L 150 90" stroke="#6B7280" strokeWidth="1" markerEnd="url(#arrResp)" strokeLinecap="round" />

      {/* Box 2 — Krebs */}
      <rect x="20" y="92" width="100" height="38" rx="6" fill="rgba(167,139,250,0.12)" stroke="#A78BFA" strokeWidth="1.4" />
      <text x="70" y="108" textAnchor="middle" fontSize="7.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif" fontWeight="700">Cycle de Krebs</text>
      <text x="70" y="120" textAnchor="middle" fontSize="6.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">Matrice mitochondriale</text>
      <text x="70" y="134" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">6 NADH + 2 FADH₂ + 2 ATP + CO₂</text>

      {/* Arrow 2 */}
      <path d="M 120 111 L 136 111" stroke="#6B7280" strokeWidth="1.2" markerEnd="url(#arrResp)" />

      {/* Box 3 — ETC */}
      <rect x="138" y="92" width="148" height="70" rx="6" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.4" />
      <text x="212" y="108" textAnchor="middle" fontSize="7.5" fill="#10B981" fontFamily="'Exo 2',sans-serif" fontWeight="700">Chaîne respiratoire</text>
      <text x="212" y="120" textAnchor="middle" fontSize="6.5" fill="#10B981" fontFamily="'Exo 2',sans-serif">Membrane interne</text>
      <text x="212" y="132" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">NADH + FADH₂ → ATP synthase</text>
      <text x="212" y="144" textAnchor="middle" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif">~34 ATP + H₂O</text>
      <text x="212" y="154" textAnchor="middle" fontSize="6" fill="#EF4444" fontFamily="'Exo 2',sans-serif">O₂ → H₂O (accepteur terminal)</text>

      {/* Total */}
      <rect x="20" y="170" width="260" height="20" rx="5" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1" />
      <text x="150" y="184" textAnchor="middle" fontSize="7.5" fill="#FBBF24" fontFamily="'Exo 2',sans-serif" fontWeight="700">
        Bilan : C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ~38 ATP
      </text>

      <defs>
        <marker id="arrResp" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 Z" fill="#6B7280" />
        </marker>
      </defs>
    </svg>
  );
}

function PhotosynthesisSVG() {
  return (
    <svg viewBox="0 0 300 190" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 420 }}>
      <text x="150" y="14" textAnchor="middle" fontSize="8.5" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">PHOTOSYNTHÈSE</text>

      {/* Chloroplast outline */}
      <ellipse cx="150" cy="105" rx="138" ry="78" fill="rgba(16,185,129,0.04)" stroke="#10B981" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="14" y="48" fontSize="6.5" fill="#10B981" fontFamily="'Exo 2',sans-serif">Chloroplaste</text>

      {/* Thylakoid stack (left) */}
      <rect x="22" y="55" width="110" height="105" rx="8" fill="rgba(6,182,212,0.07)" stroke="#06B6D4" strokeWidth="1.3" />
      <text x="77" y="72" textAnchor="middle" fontSize="7.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" fontWeight="700">Phase lumineuse</text>
      <text x="77" y="83" textAnchor="middle" fontSize="6.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">Thylakoïdes</text>

      {/* Light arrow */}
      <path d="M 30 95 L 48 95" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrPhoto)" strokeLinecap="round" />
      <text x="20" y="93" fontSize="7" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">☀</text>

      <text x="77" y="104" textAnchor="middle" fontSize="6" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">H₂O → O₂ + H⁺ + e⁻</text>
      <text x="77" y="115" textAnchor="middle" fontSize="6" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">(photolyse de l&apos;eau)</text>
      <text x="77" y="128" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">→ ATP + NADPH</text>
      <text x="77" y="140" textAnchor="middle" fontSize="6" fill="#34D399" fontFamily="'Exo 2',sans-serif">+ libération O₂</text>

      {/* Stroma (right) */}
      <rect x="165" y="55" width="122" height="105" rx="8" fill="rgba(16,185,129,0.07)" stroke="#10B981" strokeWidth="1.3" />
      <text x="226" y="72" textAnchor="middle" fontSize="7.5" fill="#10B981" fontFamily="'Exo 2',sans-serif" fontWeight="700">Cycle de Calvin</text>
      <text x="226" y="83" textAnchor="middle" fontSize="6.5" fill="#10B981" fontFamily="'Exo 2',sans-serif">Stroma</text>

      {/* CO2 arrow */}
      <path d="M 280 95 L 262 95" stroke="#A78BFA" strokeWidth="1.5" markerEnd="url(#arrPhotoR)" strokeLinecap="round" />
      <text x="283" y="93" fontSize="6.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">CO₂</text>

      <text x="226" y="104" textAnchor="middle" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif">CO₂ + RuBP → 2 PGA</text>
      <text x="226" y="115" textAnchor="middle" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif">(fixation du carbone)</text>
      <text x="226" y="128" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">ATP + NADPH → G3P</text>
      <text x="226" y="140" textAnchor="middle" fontSize="6" fill="#34D399" fontFamily="'Exo 2',sans-serif">→ Glucose (6 tours)</text>

      {/* Arrow between phases */}
      <path d="M 132 100 L 165 100" stroke="#FBBF24" strokeWidth="1.5" markerEnd="url(#arrPhoto)" />
      <text x="148" y="96" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">ATP</text>
      <text x="148" y="108" textAnchor="middle" fontSize="6" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">NADPH</text>

      {/* Bilan */}
      <rect x="22" y="170" width="256" height="16" rx="4" fill="rgba(251,191,36,0.07)" stroke="#FBBF24" strokeWidth="1" />
      <text x="150" y="181" textAnchor="middle" fontSize="7" fill="#FBBF24" fontFamily="'Exo 2',sans-serif" fontWeight="700">
        6 CO₂ + 6 H₂O + lumière → C₆H₁₂O₆ + 6 O₂
      </text>

      <defs>
        <marker id="arrPhoto" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 Z" fill="#FBBF24" />
        </marker>
        <marker id="arrPhotoR" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 Z" fill="#A78BFA" />
        </marker>
      </defs>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */

const RESPIRATION_STEPS = [
  {
    n: '1',
    name: 'Glycolyse',
    color: '#60A5FA',
    location: 'Cytoplasme',
    input: 'Glucose (6C)',
    output: '2 Pyruvate (3C)',
    atp: '2 ATP net',
    detail: 'Le glucose est coupé en deux molécules de pyruvate. Pas besoin d\'O₂ (anaérobie). 10 réactions enzymatiques.',
  },
  {
    n: '2',
    name: 'Cycle de Krebs',
    color: '#A78BFA',
    location: 'Matrice mitochondriale',
    input: '2 Acétyl-CoA',
    output: 'CO₂ + coenzymes réduits',
    atp: '2 ATP + 6 NADH + 2 FADH₂',
    detail: 'Aussi appelé cycle de l\'acide citrique. Les carbones sont libérés sous forme de CO₂. Les coenzymes (NADH, FADH₂) emmagasinent l\'énergie.',
  },
  {
    n: '3',
    name: 'Chaîne respiratoire',
    color: '#10B981',
    location: 'Membrane interne mitochondriale',
    input: 'NADH + FADH₂ + O₂',
    output: 'H₂O + ATP',
    atp: '~34 ATP',
    detail: 'Les électrons des coenzymes transitent par des complexes protéiques (NADH-DH, bc₁, CO). L\'ATP synthase produit l\'ATP par chimiosmose (gradient de H⁺).',
  },
];

const FERMENTATION = [
  {
    name: 'Lactique',
    color: '#EF4444',
    equation: 'Glucose → 2 Acide lactique + 2 ATP',
    desc: 'Réalisée par les bactéries lactiques et les cellules musculaires (manque d\'O₂ lors d\'effort intense). Produit yaourt, fromage, charcuterie.',
    organisms: ['Lactobacillus', 'Cellules musculaires (anaérobie)', 'Streptococcus thermophilus'],
  },
  {
    name: 'Alcoolique',
    color: '#F97316',
    equation: 'Glucose → 2 Éthanol + 2 CO₂ + 2 ATP',
    desc: 'Réalisée par les levures (Saccharomyces cerevisiae). Base de la boulangerie (CO₂ fait lever la pâte) et de la fabrication de boissons fermentées.',
    organisms: ['Saccharomyces cerevisiae', 'Zymomonas mobilis', 'Levures sauvages'],
  },
];

const ATP_FACTS = [
  { value: '~40 kg', label: 'ATP produit par le corps par jour' },
  { value: '30 kJ/mol', label: 'énergie libérée par l\'hydrolyse ATP → ADP' },
  { value: '38', label: 'ATP produits par molécule de glucose (max. théorique)' },
  { value: '3 700', label: 'tours de l\'ATP synthase par minute' },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function MetabolismePage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Métabolisme', item: 'https://suri-space.vercel.app/biologie/metabolisme' },
        ]},
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-600 mb-8">
          <Link href="/biologie" className="hover:text-white transition-colors">Biologie</Link>
          <span className="text-gray-700">›</span>
          <span className="text-yellow-400">Métabolisme</span>
        </nav>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #FBBF24, #F97316, #10B981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Métabolisme
        </h1>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Le métabolisme désigne l&apos;ensemble des réactions chimiques qui transforment l&apos;énergie dans les cellules vivantes —
          de la respiration cellulaire qui brûle le glucose à la photosynthèse qui capte la lumière du soleil.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {['Catabolisme & Anabolisme', 'ATP ~30 kJ/mol', '3 étapes respiration', '~38 ATP / glucose', '2 phases photosynthèse', '2 types fermentation'].map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>
          ))}
        </div>

        {/* ── 1. Catabolisme vs Anabolisme ─────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #FBBF24, #10B981)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #FBBF24, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Catabolisme et Anabolisme
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {[
              {
                name: 'Catabolisme',
                color: '#EF4444',
                icon: '↓',
                desc: 'Dégradation de molécules complexes en molécules simples avec libération d\'énergie (ATP).',
                examples: ['Respiration cellulaire (glucose → CO₂ + H₂O)', 'Lipolyse (graisses → acides gras)', 'Protéolyse (protéines → acides aminés)'],
              },
              {
                name: 'Anabolisme',
                color: '#10B981',
                icon: '↑',
                desc: 'Synthèse de molécules complexes à partir de précurseurs simples, en consommant de l\'énergie (ATP).',
                examples: ['Photosynthèse (CO₂ → glucose)', 'Synthèse protéique (acides aminés → protéines)', 'Réplication de l\'ADN'],
              },
            ].map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border p-6"
                style={{ borderColor: `${m.color}30`, background: `${m.color}07` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ background: `${m.color}20`, color: m.color }}
                  >
                    {m.icon}
                  </span>
                  <h3 className="text-xl font-bold" style={{ color: m.color, fontFamily: "'Exo 2', sans-serif" }}>{m.name}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{m.desc}</p>
                <ul className="space-y-1.5">
                  {m.examples.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: m.color }} />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. ATP ───────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #FBBF24, #EF4444)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #FBBF24, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              L&apos;ATP — monnaie énergétique universelle
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            L&apos;adénosine triphosphate (ATP) est la molécule qui transporte l&apos;énergie dans toutes les cellules vivantes,
            des bactéries aux humains. L&apos;hydrolyse du groupement γ-phosphate libère ~30 kJ/mol.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 items-center mb-6">
            <div className="flex justify-center rounded-2xl border border-yellow-500/20 p-4" style={{ background: 'rgba(251,191,36,0.05)', boxShadow: '0 0 48px rgba(251,191,36,0.08), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <AtpSVG />
            </div>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                L&apos;ATP est constamment recyclé : une cellule typique recycle son propre poids en ATP toutes les minutes.
                La liaison entre le 2ème et 3ème phosphate (~) est une liaison riche en énergie (liaison anhydride d&apos;acide).
              </p>
              <div className="grid grid-cols-2 gap-3">
                {ATP_FACTS.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-yellow-500/20 p-3 text-center"
                    style={{ background: 'rgba(251,191,36,0.06)' }}
                  >
                    <div
                      className="text-lg font-bold mb-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #FBBF24, #F97316)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Exo 2', monospace",
                      }}
                    >
                      {f.value}
                    </div>
                    <div className="text-xs text-gray-500 leading-tight">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Respiration ───────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #60A5FA, #10B981)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #60A5FA, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Respiration cellulaire
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Processus aérobie en 3 étapes qui dégrade le glucose pour produire de l&apos;ATP.
            Contrairement à la respiration pulmonaire, elle se passe au niveau des mitochondries.
          </p>

          {/* Flow diagram */}
          <div
            className="rounded-2xl border border-orange-500/20 p-6 mb-6 overflow-x-auto"
            style={{ background: 'rgba(249,115,22,0.05)', boxShadow: '0 0 48px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            <RespirationSVG />
          </div>

          {/* Step cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            {RESPIRATION_STEPS.map((step) => (
              <div
                key={step.name}
                className="rounded-xl border p-4"
                style={{ borderColor: `${step.color}35`, background: `${step.color}07` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${step.color}25`, color: step.color }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm leading-tight" style={{ color: step.color }}>{step.name}</h3>
                    <p className="text-xs text-gray-600">{step.location}</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-14 flex-shrink-0">Entrée</span>
                    <span className="text-gray-400">{step.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-14 flex-shrink-0">Sortie</span>
                    <span className="text-gray-400">{step.output}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-14 flex-shrink-0">Énergie</span>
                    <span className="font-semibold" style={{ color: step.color }}>{step.atp}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Photosynthesis ────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #FBBF24)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #10B981, #FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Photosynthèse
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Processus par lequel les plantes, algues et cyanobactéries convertissent l&apos;énergie lumineuse en énergie chimique
            (glucose). Inverse de la respiration cellulaire — base de toutes les chaînes alimentaires.
          </p>

          <div
            className="rounded-2xl border border-emerald-500/20 p-6 mb-6 overflow-x-auto"
            style={{ background: 'rgba(16,185,129,0.05)', boxShadow: '0 0 48px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            <PhotosynthesisSVG />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                name: 'Phase lumineuse',
                color: '#06B6D4',
                location: 'Membrane des thylakoïdes',
                desc: 'Capture des photons par la chlorophylle. L\'eau est oxydée (photolyse) → libération d\'O₂, production d\'ATP et de NADPH.',
                keys: ['Photosystème II → photolyse H₂O, libération O₂', 'Chaîne de transport d\'électrons → ATP (photophosphorylation)', 'Photosystème I → réduction NADP⁺ en NADPH'],
              },
              {
                name: 'Cycle de Calvin (C3)',
                color: '#10B981',
                location: 'Stroma du chloroplaste',
                desc: 'Fixation du CO₂ atmosphérique et synthèse du glucose grâce à l\'ATP et au NADPH produits en phase lumineuse.',
                keys: ['Carboxylation : CO₂ + RuBP → 2 × PGA (par Rubisco)', 'Réduction : PGA → G3P (consomme ATP + NADPH)', 'Régénération : G3P → RuBP (consomme ATP) ; 6 tours = 1 glucose'],
              },
            ].map((ph) => (
              <div
                key={ph.name}
                className="rounded-xl border p-5"
                style={{ borderColor: `${ph.color}30`, background: `${ph.color}07` }}
              >
                <h3 className="font-bold text-base mb-1" style={{ color: ph.color, fontFamily: "'Exo 2', sans-serif" }}>{ph.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{ph.location}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{ph.desc}</p>
                <ul className="space-y-1.5">
                  {ph.keys.map((k, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: ph.color }} />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Fermentation ──────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #EF4444, #F97316)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Fermentation (anaérobie)
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            En l&apos;absence d&apos;O₂, certains organismes (ou cellules) régénèrent le NAD⁺ nécessaire à la glycolyse
            via la fermentation — beaucoup moins efficace (2 ATP vs ~38).
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {FERMENTATION.map((f) => (
              <div
                key={f.name}
                className="rounded-xl border p-5"
                style={{ borderColor: `${f.color}30`, background: `${f.color}07` }}
              >
                <h3 className="font-bold text-base mb-1" style={{ color: f.color, fontFamily: "'Exo 2', sans-serif" }}>
                  Fermentation {f.name}
                </h3>
                <div
                  className="text-xs font-mono px-3 py-1.5 rounded-lg mb-3 inline-block"
                  style={{ background: `${f.color}15`, color: f.color }}
                >
                  {f.equation}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{f.desc}</p>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1.5">Organismes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.organisms.map((o) => (
                      <span
                        key={o}
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{ borderColor: `${f.color}30`, color: f.color, background: `${f.color}10` }}
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Comparison table ──────────────────────────── */}
        <section className="rounded-2xl border border-white/8 p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
            Comparaison des voies métaboliques
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left text-xs text-gray-500 font-semibold pb-3 pr-4">Voie</th>
                  <th className="text-left text-xs text-gray-500 font-semibold pb-3 pr-4">O₂ ?</th>
                  <th className="text-left text-xs text-gray-500 font-semibold pb-3 pr-4">ATP produit</th>
                  <th className="text-left text-xs text-gray-500 font-semibold pb-3 pr-4">Lieu</th>
                  <th className="text-left text-xs text-gray-500 font-semibold pb-3">Organismes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { voie: 'Respiration aérobie',  o2: '✓ Requis', atp: '~38', lieu: 'Cytoplasme + Mitochondrie', orga: 'Eucaryotes, bactéries aérobies', color: '#10B981' },
                  { voie: 'Glycolyse seule',       o2: '✗ Non',    atp: '2',   lieu: 'Cytoplasme',                orga: 'Universel (toutes cellules)',    color: '#60A5FA' },
                  { voie: 'Ferm. lactique',        o2: '✗ Non',    atp: '2',   lieu: 'Cytoplasme',                orga: 'Bactéries, cellules musculaires', color: '#EF4444' },
                  { voie: 'Ferm. alcoolique',      o2: '✗ Non',    atp: '2',   lieu: 'Cytoplasme',                orga: 'Levures, plantes (anaérobie)',   color: '#F97316' },
                  { voie: 'Photosynthèse',         o2: '✓ Produit', atp: 'Consomme', lieu: 'Chloroplaste',        orga: 'Plantes, algues, cyanobactéries', color: '#34D399' },
                ].map((row) => (
                  <tr key={row.voie}>
                    <td className="py-2.5 pr-4 font-semibold text-xs" style={{ color: row.color }}>{row.voie}</td>
                    <td className="py-2.5 pr-4 text-xs text-gray-400">{row.o2}</td>
                    <td className="py-2.5 pr-4 text-xs font-mono font-bold" style={{ color: row.color }}>{row.atp}</td>
                    <td className="py-2.5 pr-4 text-xs text-gray-400">{row.lieu}</td>
                    <td className="py-2.5 text-xs text-gray-500">{row.orga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-white/6">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Explorer aussi</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: '/biologie/cellules',  color: '#06B6D4', label: 'Cellules',   desc: 'Mitochondrie & organites' },
                { href: '/biologie/vivant',    color: '#10B981', label: 'Le Vivant',  desc: 'Plantes & photosynthèse' },
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
