import type { Metadata } from 'next';
import Link from 'next/link';
import BiologieLayout from '@/components/layout/BiologieLayout';
import { JsonLd } from '@/components/common/JsonLd';

export const metadata: Metadata = {
  title: 'Santé | Biologie',
  description: 'Maladies infectieuses, génétiques, cancers — vaccins, antibiotiques, immunité et grandes pandémies de l\'histoire.',
  keywords: ['santé', 'maladies', 'vaccins', 'immunité', 'antibiotiques', 'pandémies', 'cancer', 'biologie'],
  openGraph: {
    title: 'Santé | Suri Space',
    description: 'Catégories de maladies, vaccins, immunité et grandes pandémies.',
    url: 'https://suri-space.vercel.app/biologie/sante',
  },
};

/* ── SVG Diagrams ─────────────────────────────────────────── */

function ImmunityResponseSVG() {
  // Two-curve graph: primary (slow, low) vs secondary (fast, high) antibody response
  return (
    <svg viewBox="0 0 300 160" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 420 }}>
      <text x="150" y="12" textAnchor="middle" fontSize="7.5" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">RÉPONSE IMMUNITAIRE HUMORALE</text>

      {/* Axes */}
      <line x1="36" y1="130" x2="280" y2="130" stroke="#374151" strokeWidth="1.2" />
      <line x1="36" y1="18" x2="36" y2="130" stroke="#374151" strokeWidth="1.2" />
      <text x="158" y="148" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif">Temps (jours)</text>
      <text x="12" y="74" textAnchor="middle" fontSize="6" fill="#6B7280" fontFamily="'Exo 2',sans-serif" transform="rotate(-90 12 74)">Anticorps</text>

      {/* Primary exposure marker */}
      <line x1="80" y1="20" x2="80" y2="130" stroke="#6B7280" strokeWidth="0.8" strokeDasharray="3 2" />
      <text x="80" y="16" textAnchor="middle" fontSize="5.5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">1ʳᵉ exposition</text>

      {/* Secondary exposure marker */}
      <line x1="190" y1="20" x2="190" y2="130" stroke="#6B7280" strokeWidth="0.8" strokeDasharray="3 2" />
      <text x="190" y="16" textAnchor="middle" fontSize="5.5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">2ᵉ exposition</text>

      {/* Primary response curve — slow rise, low peak, gradual fall */}
      <path d="M 36 130 L 80 130 Q 90 128 100 110 Q 115 88 125 78 Q 140 68 155 75 Q 170 82 185 100 Q 190 110 195 120 L 280 125"
        stroke="#60A5FA" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="148" y="60" fontSize="6" fill="#60A5FA" fontFamily="'Exo 2',sans-serif">Réponse primaire</text>
      <text x="148" y="68" fontSize="5.5" fill="#60A5FA" fontFamily="'Exo 2',sans-serif" opacity="0.7">(IgM → IgG, lente)</text>

      {/* Secondary response curve — fast rise, very high peak, slower fall */}
      <path d="M 190 120 Q 196 85 205 38 Q 218 22 232 30 Q 248 38 255 55 Q 265 82 270 100 L 280 110"
        stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <text x="240" y="26" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif">Réponse 2aire</text>
      <text x="240" y="34" fontSize="5.5" fill="#10B981" fontFamily="'Exo 2',sans-serif" opacity="0.7">(mémoire, rapide)</text>

      {/* Y-axis ticks */}
      {[130, 100, 70, 40].map((y, i) => (
        <g key={i}>
          <line x1="32" y1={y} x2="36" y2={y} stroke="#4B5563" strokeWidth="0.8" />
          <text x="30" y={y + 2} textAnchor="end" fontSize="4.5" fill="#4B5563" fontFamily="'Exo 2',sans-serif">{['0','↑','↑↑','↑↑↑'][i]}</text>
        </g>
      ))}

      {/* Memory cell note */}
      <text x="158" y="142" textAnchor="middle" fontSize="5.5" fill="#FBBF24" fontFamily="'Exo 2',sans-serif">
        Cellules mémoire (B & T) persistent des années → vaccination
      </text>
    </svg>
  );
}

function AntibioticSVG() {
  return (
    <svg viewBox="0 0 280 140" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 360 }}>
      <text x="140" y="12" textAnchor="middle" fontSize="7.5" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">CIBLES DES ANTIBIOTIQUES</text>

      {/* Bacterium body */}
      <ellipse cx="140" cy="80" rx="100" ry="50" fill="rgba(52,211,153,0.06)" stroke="#34D399" strokeWidth="1.5" />

      {/* Cell wall */}
      <ellipse cx="140" cy="80" rx="88" ry="42" fill="none" stroke="#34D399" strokeWidth="3" opacity="0.4" />

      {/* Ribosome markers */}
      {[[110,70],[130,90],[155,65],[165,88],[100,85]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="rgba(167,139,250,0.3)" stroke="#A78BFA" strokeWidth="1" />
      ))}

      {/* DNA */}
      <path d="M 125 75 Q 140 68 155 75 Q 140 82 125 75 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" strokeWidth="1" />

      {/* Attack point labels */}
      {/* Cell wall */}
      <line x1="50" y1="38" x2="80" y2="55" stroke="#34D399" strokeWidth="0.8" opacity="0.6" />
      <text x="38" y="35" fontSize="6" fill="#34D399" fontFamily="'Exo 2',sans-serif" fontWeight="600">Paroi cellulaire</text>
      <text x="38" y="43" fontSize="5.5" fill="#34D399" fontFamily="'Exo 2',sans-serif" opacity="0.8">β-lactamines, vancomycine</text>

      {/* Ribosome */}
      <line x1="200" y1="38" x2="165" y2="68" stroke="#A78BFA" strokeWidth="0.8" opacity="0.6" />
      <text x="202" y="35" fontSize="6" fill="#A78BFA" fontFamily="'Exo 2',sans-serif" fontWeight="600">Ribosomes (30S/50S)</text>
      <text x="202" y="43" fontSize="5.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif" opacity="0.8">Tétracyclines, macrolides</text>

      {/* DNA */}
      <line x1="200" y1="100" x2="165" y2="82" stroke="#06B6D4" strokeWidth="0.8" opacity="0.6" />
      <text x="202" y="97" fontSize="6" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" fontWeight="600">ADN / Gyrase</text>
      <text x="202" y="105" fontSize="5.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" opacity="0.8">Fluoroquinolones</text>

      {/* Membrane */}
      <line x1="50" y1="118" x2="90" y2="105" stroke="#F97316" strokeWidth="0.8" opacity="0.6" />
      <text x="38" y="118" fontSize="6" fill="#F97316" fontFamily="'Exo 2',sans-serif" fontWeight="600">Membrane</text>
      <text x="38" y="126" fontSize="5.5" fill="#F97316" fontFamily="'Exo 2',sans-serif" opacity="0.8">Polymyxines</text>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */

const DISEASE_CATEGORIES = [
  {
    name: 'Infectieuses',
    color: '#F97316',
    mechanism: 'Invasion par un agent pathogène extérieur (virus, bactérie, parasite, champignon). Le système immunitaire réagit via une réponse inflammatoire et l\'activation des lymphocytes.',
    examples: ['Grippe (influenza)', 'Tuberculose (M. tuberculosis)', 'COVID-19 (SARS-CoV-2)', 'Paludisme (Plasmodium)', 'HIV/SIDA'],
    treatment: 'Antibiotiques, antiviraux, antiparasitaires, vaccins préventifs',
  },
  {
    name: 'Génétiques',
    color: '#A78BFA',
    mechanism: 'Anomalie dans la séquence d\'ADN, héritée ou survenue de novo. Peut affecter une protéine clé (enzyme, canal ionique, récepteur).',
    examples: ['Mucoviscidose', 'Trisomie 21', 'Drépanocytose', 'Phénylcétonurie', 'Huntington'],
    treatment: 'Symptomatique, thérapie génique (CRISPR), greffe, enzymothérapie',
  },
  {
    name: 'Cancers',
    color: '#EF4444',
    mechanism: 'Prolifération incontrôlée de cellules suite à des mutations somatiques des gènes oncogènes et suppresseurs de tumeur (TP53, BRCA…). Capacité d\'invasion et de métastase.',
    examples: ['Cancer du poumon', 'Cancer du sein (BRCA1/2)', 'Leucémie', 'Mélanome', 'Glioblastome'],
    treatment: 'Chirurgie, radiothérapie, chimiothérapie, immunothérapie (anti-PD1), thérapies ciblées',
  },
  {
    name: 'Cardiovasculaires',
    color: '#60A5FA',
    mechanism: 'Altération de la structure ou de la fonction du cœur et des vaisseaux. Souvent liées à l\'athérosclérose (plaques lipidiques), l\'hypertension ou des troubles du rythme.',
    examples: ['Infarctus du myocarde', 'AVC', 'Insuffisance cardiaque', 'Fibrillation atriale', 'Anévrisme aortique'],
    treatment: 'Statines, bêtabloquants, antiagrégants, stents coronaires, chirurgie',
  },
  {
    name: 'Auto-immunes',
    color: '#34D399',
    mechanism: 'Le système immunitaire attaque les propres tissus du corps par défaut de tolérance. Les lymphocytes T et B reconnaissent les antigènes du soi comme étrangers.',
    examples: ['Sclérose en plaques', 'Polyarthrite rhumatoïde', 'Diabète type 1', 'Lupus érythémateux', 'Maladie de Crohn'],
    treatment: 'Immunosuppresseurs, corticoïdes, biothérapies (anti-TNF, anti-IL), plasmaphérèse',
  },
];

const NOTABLE_VACCINES = [
  { name: 'Variole',       year: 1796, type: 'Virus vivant atténué', scientist: 'Edward Jenner',          color: '#10B981' },
  { name: 'Rage',          year: 1885, type: 'Virus inactivé',       scientist: 'Louis Pasteur',          color: '#06B6D4' },
  { name: 'Poliomyélite',  year: 1955, type: 'Virus inactivé (IPV)', scientist: 'Jonas Salk',             color: '#60A5FA' },
  { name: 'Rougeole (ROR)',year: 1963, type: 'Virus vivant atténué', scientist: 'John Enders',            color: '#A78BFA' },
  { name: 'Hépatite B',    year: 1982, type: 'Sous-unitaire (HBsAg)','scientist': 'Blumberg/Merck',       color: '#F97316' },
  { name: 'COVID-19',      year: 2020, type: 'ARNm (Pfizer, Moderna)','scientist': 'Karikó & Weissman',  color: '#FBBF24' },
];

const PANDEMICS = [
  {
    name: 'Peste noire',
    years: '1347–1353',
    deaths: '~50 M',
    pathogen: 'Yersinia pestis (bactérie)',
    color: '#4B5563',
    note: '1/3 de la population européenne. Propagation via puces sur rats noirs.',
  },
  {
    name: 'Grippe espagnole',
    years: '1918–1920',
    deaths: '~50–100 M',
    pathogen: 'Influenza A H1N1 (virus)',
    color: '#6B7280',
    note: 'Touche surtout les 20–40 ans. Surinfection bactérienne majeure (pneumonie).',
  },
  {
    name: 'HIV/SIDA',
    years: '1981–présent',
    deaths: '~40 M',
    pathogen: 'VIH — rétrovirus (ARN)',
    color: '#EF4444',
    note: 'Zoonose (chimpanzé → humain). Trithérapie ARV depuis 1996 = maladie chronique.',
  },
  {
    name: 'COVID-19',
    years: '2019–2023',
    deaths: '7 M officiels ',
    pathogen: 'SARS-CoV-2 (coronavirus ARN)',
    color: '#60A5FA',
    note: 'Premier vaccin ARNm déployé à grande échelle. Variants Alpha, Delta, Omicron…',
  },
];

const ANTIBIOTICS = [
  { name: 'Pénicilline',       year: 1928, discoverer: 'Alexander Fleming', mechanism: 'Inhibe la synthèse de la paroi (blocage transpeptidases)', class: 'β-lactamine' },
  { name: 'Streptomycine',     year: 1943, discoverer: 'Waksman & Schatz',  mechanism: 'Bloque la sous-unité 30S du ribosome procaryote (erreurs traduction)', class: 'Aminoside' },
  { name: 'Tétracycline',      year: 1948, discoverer: 'Benjamin Duggar',   mechanism: 'Bloque la sous-unité 30S — empêche l\'entrée des ARNt', class: 'Tétracycline' },
  { name: 'Fluoroquinolones',  year: 1962, discoverer: 'George Lesher',     mechanism: 'Inhibent l\'ADN gyrase et la topoisomérase IV → cassures ADN', class: 'Quinolone' },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function SantePage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Santé', item: 'https://suri-space.vercel.app/biologie/sante' },
        ]},
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-600 mb-8">
          <Link href="/biologie" className="hover:text-white transition-colors">Biologie</Link>
          <span className="text-gray-700">›</span>
          <span className="text-red-400">Santé</span>
        </nav>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Santé & Médecine
        </h1>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Comment le corps tombe malade et comment il se défend — des grandes catégories de maladies
          aux vaccins, en passant par les antibiotiques et les pandémies qui ont marqué l&apos;histoire.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {['5 catégories de maladies', '6 vaccins notables', '4 antibiotiques', '4 grandes pandémies'].map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>
          ))}
        </div>

        {/* ── 1. Disease categories ────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Les 5 grandes catégories de maladies
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            La classification des maladies repose sur leur mécanisme d&apos;origine —
            agent externe, anomalie génétique, dérèglement cellulaire ou immunitaire.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DISEASE_CATEGORIES.map((d) => (
              <div key={d.name} className="rounded-xl border p-5 hover:scale-[1.01] transition-all duration-200" style={{ borderColor: `${d.color}30`, background: `${d.color}07`, borderTopColor: `${d.color}60`, borderTopWidth: 2 }}>
                <h3 className="font-bold text-base mb-2" style={{ color: d.color, fontFamily: "'Exo 2', sans-serif" }}>{d.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">{d.mechanism}</p>
                <div className="mb-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1.5">Exemples</p>
                  <div className="flex flex-wrap gap-1">
                    {d.examples.map((e) => (
                      <span key={e} className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: `${d.color}30`, color: d.color, background: `${d.color}10` }}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-snug">
                  <span className="text-gray-400 font-medium">Traitements : </span>{d.treatment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Immunity & vaccines ───────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Vaccins & Immunité
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            La vaccination exploite la mémoire immunitaire : une première exposition (réelle ou simulée)
            prépare le système immunitaire à réagir plus vite et plus fort lors d&apos;une exposition ultérieure.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 mb-8 items-start">
            <div className="rounded-2xl border border-emerald-500/20 p-5 overflow-x-auto" style={{ background: 'rgba(16,185,129,0.05)', boxShadow: '0 0 48px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <ImmunityResponseSVG />
            </div>
            <div className="space-y-3">
              {[
                { label: 'Lymphocytes B',  color: '#10B981', desc: 'Produisent des anticorps spécifiques (IgM puis IgG, IgA, IgE). Certains deviennent des cellules mémoire à longue durée de vie.' },
                { label: 'Lymphocytes T cytotoxiques', color: '#06B6D4', desc: 'Détruisent directement les cellules infectées via perforine/granzymes. Essentiels contre les virus et les cellules cancéreuses.' },
                { label: 'Lymphocytes T auxiliaires', color: '#60A5FA', desc: 'Coordonnent la réponse immunitaire en secrétant des cytokines. Cible principale du VIH (CD4+).' },
                { label: 'Anticorps neutralisants', color: '#FBBF24', desc: 'Se lient aux antigènes de surface du pathogène, l\'empêchant d\'entrer dans les cellules. Mécanisme principal des vaccins.' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: item.color }} />
                  <div>
                    <span className="font-semibold text-sm" style={{ color: item.color }}>{item.label} — </span>
                    <span className="text-gray-400 text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vaccine cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NOTABLE_VACCINES.map((v) => (
              <div key={v.name} className="rounded-xl border p-3 text-center" style={{ borderColor: `${v.color}30`, background: `${v.color}08` }}>
                <div className="text-xs font-bold font-mono mb-1" style={{ color: v.color }}>{v.year}</div>
                <div className="font-bold text-sm text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{v.name}</div>
                <div className="text-xs text-gray-500 leading-tight mb-1">{v.type}</div>
                <div className="text-xs text-gray-600 leading-tight">{v.scientist}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Antibiotics ───────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Antibiotiques
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Les antibiotiques ciblent des structures spécifiques aux procaryotes (paroi, ribosome 70S, ADN gyrase)
            — absentes ou différentes chez les eucaryotes — pour tuer ou inhiber les bactéries sans détruire les cellules humaines.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl border border-teal-500/20 p-5 overflow-x-auto" style={{ background: 'rgba(52,211,153,0.05)', boxShadow: '0 0 48px rgba(52,211,153,0.08), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <AntibioticSVG />
            </div>
            <div className="space-y-4">
              {ANTIBIOTICS.map((ab) => (
                <div key={ab.name} className="rounded-xl border border-white/6 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-400 font-mono">{ab.year}</span>
                    <span className="font-bold text-sm text-white">{ab.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-900/40 text-teal-400 border border-teal-700/40">{ab.class}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">{ab.discoverer}</p>
                  <p className="text-xs text-gray-400">{ab.mechanism}</p>
                </div>
              ))}
              <div className="rounded-xl border border-red-500/20 p-4" style={{ background: 'rgba(239,68,68,0.05)' }}>
                <h4 className="font-bold text-sm text-red-400 mb-1">Résistance aux antibiotiques</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  La résistance est l&apos;évolution en action : utilisation excessive → sélection de bactéries portant des mutations de résistance.
                  Les bactéries multirésistantes (SARM, BPC, E. coli BLSE) causent ~700 000 décès/an — projetés à 10 millions en 2050.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Pandemics ─────────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "\'Exo 2\', sans-serif" }}>
              Grandes pandémies
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Une pandémie est une épidémie qui s&apos;étend à l&apos;échelle mondiale. Chacune a profondément
            modifié la médecine, la démographie et les politiques de santé publique.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PANDEMICS.map((p) => (
              <div key={p.name} className="rounded-xl border p-5 flex gap-4" style={{ borderColor: `${p.color}30`, background: `${p.color}08` }}>
                <div className="flex-shrink-0">
                  <div className="text-xs font-bold font-mono mb-1" style={{ color: p.color }}>{p.years}</div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: p.color, fontFamily: "'Exo 2', monospace" }}
                  >
                    {p.deaths}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">décès</div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>{p.name}</h3>
                  <div className="text-xs text-gray-500 mb-2">{p.pathogen}</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <div className="mt-12 pt-10 border-t border-white/6">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Explorer aussi</p>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { href: '/biologie/evolution', color: '#A78BFA', label: 'Évolution',  desc: 'Résistance aux antibiotiques' },
              { href: '/biologie/cellules',  color: '#06B6D4', label: 'Cellules',   desc: 'Lymphocytes & organites' },
              { href: '/biologie/corps',     color: '#F97316', label: 'Corps',      desc: 'Système immunitaire' },
              { href: '/biologie/genetique', color: '#F472B6', label: 'Génétique',  desc: 'Maladies génétiques' },
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

      </div>
    </BiologieLayout>
  );
}
