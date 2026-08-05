import type { Metadata } from 'next';
import NatureLayout from '@/components/layout/NatureLayout';
import { AppleIcon } from '@/components/icons/NatureIcons';
import WeekPlan from './WeekPlan';

export const metadata: Metadata = {
  title: 'Nutrition — Nature',
  description: "Besoins nutritionnels du corps humain — calories, protéines, glucides, lipides, vitamines, minéraux et hydratation.",
};

// ── Data ────────────────────────────────────────────────────────────────────

const CALORIES = [
  { group: 'Femme sédentaire',      min: 1800, max: 2000 },
  { group: 'Femme active',          min: 2000, max: 2400 },
  { group: 'Homme sédentaire',      min: 2200, max: 2500 },
  { group: 'Homme actif',           min: 2500, max: 3000 },
  { group: 'Adolescent (12–17 ans)',min: 2200, max: 2800 },
  { group: 'Enfant (6–11 ans)',     min: 1600, max: 2000 },
];

const MACROS = [
  {
    name: 'Protéines',
    rda: '0,8 g / kg de poids',
    typical: '50–65 g / j (sedentaire)',
    color: '#F87171',
    border: 'border-red-500/30',
    gradient: 'from-red-600/15 to-rose-600/15',
    desc: 'Construction et réparation musculaire, enzymes, hormones, anticorps.',
    sources: ['Viande, poisson, œufs', 'Légumineuses (lentilles, pois chiches)', 'Produits laitiers', 'Tofu, tempeh, edamame'],
    note: 'Sportifs : 1,2–2,0 g/kg. Grossesse : +25 g/j.',
  },
  {
    name: 'Glucides',
    rda: '45–65 % des calories',
    typical: '225–325 g / j',
    color: '#FBBF24',
    border: 'border-yellow-500/30',
    gradient: 'from-yellow-600/15 to-amber-600/15',
    desc: 'Source d\'énergie principale du cerveau et des muscles. Favoriser les glucides complexes.',
    sources: ['Céréales complètes (riz, avoine, quinoa)', 'Légumes racines, patate douce', 'Légumineuses', 'Fruits frais'],
    note: 'Sucres ajoutés : < 10 % des calories (OMS). Fibres : 25–38 g/j.',
  },
  {
    name: 'Lipides',
    rda: '20–35 % des calories',
    typical: '44–78 g / j',
    color: '#60A5FA',
    border: 'border-blue-500/30',
    gradient: 'from-blue-600/15 to-cyan-600/15',
    desc: 'Énergie de réserve, absorption des vitamines A/D/E/K, hormones, membranes cellulaires.',
    sources: ['Huile d\'olive, colza, lin', 'Avocats, oléagineux (noix, amandes)', 'Poissons gras (saumon, sardine, maquereau)', 'Graines de chia, lin'],
    note: 'Favoriser les acides gras insaturés. Limiter les graisses saturées (< 10 %) et trans.',
  },
];

const WATER = [
  { label: 'Femme adulte',  qty: '2,0 L', note: 'dont ~1,5 L de boissons' },
  { label: 'Homme adulte',  qty: '2,5 L', note: 'dont ~2,0 L de boissons' },
  { label: 'Sport intense', qty: '+0,5–1 L', note: 'par heure d\'effort' },
  { label: 'Grossesse',     qty: '+0,3 L', note: 'supplémentaire / jour' },
  { label: 'Allaitement',   qty: '+0,7 L', note: 'supplémentaire / jour' },
  { label: 'Canicule',      qty: '+0,5–1 L', note: 'selon la chaleur' },
];

const VITAMINS = [
  { name: 'A',   rda: '700–900 µg',  role: 'Vision, immunité, peau',             sources: 'Foie, carotte, patate douce, épinards',   fat: true },
  { name: 'B1',  rda: '1,1–1,2 mg',  role: 'Métabolisme énergétique',            sources: 'Porc, céréales complètes, légumineuses',   fat: false },
  { name: 'B2',  rda: '1,1–1,3 mg',  role: 'Production d\'énergie, peau',        sources: 'Produits laitiers, œufs, amandes',          fat: false },
  { name: 'B3',  rda: '14–16 mg',    role: 'Métabolisme, ADN, antioxydant',       sources: 'Viande, poisson, arachides, champignons',  fat: false },
  { name: 'B5',  rda: '5 mg',        role: 'Synthèse hormonale, métabolisme',    sources: 'Foie, volaille, avocat, champignons',      fat: false },
  { name: 'B6',  rda: '1,3–1,7 mg',  role: 'Protéines, cerveau, immunité',       sources: 'Banane, poulet, pomme de terre, saumon',   fat: false },
  { name: 'B7',  rda: '30 µg',       role: 'Métabolisme des graisses & sucres',  sources: 'Œufs, foie, noix, soja',                   fat: false },
  { name: 'B9',  rda: '400 µg',      role: 'ADN, division cellulaire, grossesse',sources: 'Légumes verts, légumineuses, foie',         fat: false },
  { name: 'B12', rda: '2,4 µg',      role: 'Nerfs, globules rouges, ADN',        sources: 'Viande, poisson, produits laitiers, œufs', fat: false },
  { name: 'C',   rda: '75–90 mg',    role: 'Antioxydant, collagène, immunité',   sources: 'Agrumes, poivron, kiwi, fraise, brocoli',  fat: false },
  { name: 'D',   rda: '15–20 µg',    role: 'Os, immunité, humeur',               sources: 'Soleil, poissons gras, jaune d\'œuf',       fat: true },
  { name: 'E',   rda: '15 mg',       role: 'Antioxydant, peau, immunité',        sources: 'Huile de germe de blé, amandes, noisettes', fat: true },
  { name: 'K',   rda: '90–120 µg',   role: 'Coagulation, santé osseuse',         sources: 'Légumes verts, chou, épinards, brocoli',   fat: true },
];

const MINERALS = [
  { name: 'Calcium',   rda: '1 000–1 200 mg', role: 'Os, dents, muscles, nerfs',          sources: 'Produits laitiers, sardine, tofu, brocoli' },
  { name: 'Fer',       rda: '8–18 mg',         role: 'Transport de l\'oxygène, énergie',   sources: 'Viande rouge, lentilles, épinards, quinoa' },
  { name: 'Magnésium', rda: '310–420 mg',      role: 'Muscles, nerfs, énergie, stress',    sources: 'Noix, graines, légumes verts, chocolat noir' },
  { name: 'Potassium', rda: '2 600–3 400 mg',  role: 'Cœur, muscles, pression artérielle', sources: 'Banane, patate douce, haricots, avocat' },
  { name: 'Zinc',      rda: '8–11 mg',         role: 'Immunité, cicatrisation, goût',      sources: 'Huîtres, bœuf, potiron, noix de cajou' },
  { name: 'Iode',      rda: '150 µg',          role: 'Thyroïde, métabolisme',              sources: 'Algues, poissons, produits laitiers, sel iodé' },
  { name: 'Sélénium',  rda: '55 µg',           role: 'Antioxydant, thyroïde, immunité',    sources: 'Noix du Brésil, thon, sardine, œufs' },
  { name: 'Sodium',    rda: '< 2 300 mg',      role: 'Hydratation, nerfs, muscles',        sources: 'Sel de table — à limiter à 5 g/j (OMS)' },
];

const PLATE = [
  { label: 'Légumes & fruits', pct: 50, color: '#4ADE80', desc: 'La moitié de l\'assiette' },
  { label: 'Céréales complètes', pct: 25, color: '#FBBF24', desc: 'Un quart de l\'assiette' },
  { label: 'Protéines', pct: 25, color: '#F87171', desc: 'Un quart de l\'assiette' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NutritionPage() {
  return (
    <NatureLayout>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

        {/* Hero */}
        <div className="text-center">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 36px #EF4444)' }}>
            <AppleIcon size={120} />
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #F87171, #FBBF24, #4ADE80)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            Nutrition
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Tout ce que le corps humain a besoin au quotidien — de l'eau aux vitamines,
            en passant par les macronutriments et les minéraux essentiels.
          </p>
        </div>

        {/* Calories */}
        <section>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            Besoins caloriques journaliers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CALORIES.map((c) => (
              <div key={c.group}
                className="rounded-2xl border border-white/8 p-5"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-xs text-gray-500 mb-2">{c.group}</div>
                <div className="text-2xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #FBBF24, #F87171)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Exo 2', monospace",
                  }}>
                  {c.min}–{c.max} kcal
                </div>
                {/* Bar */}
                <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                  <div className="h-full rounded-full"
                    style={{
                      width: `${((c.max - 1400) / 1800) * 100}%`,
                      background: 'linear-gradient(90deg, #FBBF24, #F87171)',
                    }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* L'assiette idéale */}
        <section>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            L'assiette équilibrée (Harvard Healthy Plate)
          </h2>
          <div className="rounded-2xl border border-white/8 p-6 grid sm:grid-cols-2 gap-6 items-center"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            {/* Visual plate */}
            <div className="flex justify-center">
              <svg viewBox="0 0 200 200" width="200" height="200">
                {/* Background circle */}
                <circle cx="100" cy="100" r="90" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {/* 50% green */}
                <path d="M 100 100 L 100 10 A 90 90 0 0 1 100 190 Z" fill="rgba(74,222,128,0.35)" stroke="#4ADE80" strokeWidth="1.5" />
                {/* 25% yellow */}
                <path d="M 100 100 L 100 190 A 90 90 0 0 1 10 100 Z" fill="rgba(251,191,36,0.35)" stroke="#FBBF24" strokeWidth="1.5" />
                {/* 25% red */}
                <path d="M 100 100 L 10 100 A 90 90 0 0 1 100 10 Z" fill="rgba(248,113,113,0.35)" stroke="#F87171" strokeWidth="1.5" />
                {/* Dividers */}
                <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="10" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                {/* Labels */}
                <text x="125" y="105" fontSize="9" fill="#4ADE80" textAnchor="middle" fontFamily="'Exo 2', sans-serif" fontWeight="bold">Légumes</text>
                <text x="125" y="116" fontSize="8" fill="#4ADE80" textAnchor="middle" fontFamily="'Exo 2', sans-serif">& fruits 50%</text>
                <text x="68" y="162" fontSize="9" fill="#FBBF24" textAnchor="middle" fontFamily="'Exo 2', sans-serif" fontWeight="bold">Céréales</text>
                <text x="68" y="173" fontSize="8" fill="#FBBF24" textAnchor="middle" fontFamily="'Exo 2', sans-serif">25%</text>
                <text x="58" y="62" fontSize="9" fill="#F87171" textAnchor="middle" fontFamily="'Exo 2', sans-serif" fontWeight="bold">Protéines</text>
                <text x="58" y="73" fontSize="8" fill="#F87171" textAnchor="middle" fontFamily="'Exo 2', sans-serif">25%</text>
                {/* Center */}
                <circle cx="100" cy="100" r="14" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <text x="100" y="104" fontSize="8" fill="#9CA3AF" textAnchor="middle" fontFamily="'Exo 2', sans-serif">≈ 700 kcal</text>
              </svg>
            </div>
            <div className="space-y-3">
              {PLATE.map((p) => (
                <div key={p.label} className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full shrink-0" style={{ background: p.color }} />
                  <div>
                    <div className="text-sm font-bold text-white">{p.label} <span className="font-normal text-gray-400">— {p.pct}%</span></div>
                    <div className="text-xs text-gray-500">{p.desc}</div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-white/6">
                Source : Harvard T.H. Chan School of Public Health. Accompagnez chaque repas d'un verre d'eau. Limitez les boissons sucrées.
              </p>
            </div>
          </div>
        </section>

        {/* Macronutriments */}
        <section>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            Macronutriments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MACROS.map((m) => (
              <div key={m.name}
                className={`rounded-2xl border ${m.border} bg-gradient-to-br ${m.gradient} p-6`}
                style={{ backdropFilter: 'blur(8px)' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: m.color, fontFamily: "'Exo 2', sans-serif" }}>
                  {m.name}
                </div>
                <div className="text-xs font-mono mb-1" style={{ color: m.color }}>{m.rda}</div>
                <div className="text-xs text-gray-400 mb-3">{m.typical}</div>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">{m.desc}</p>
                <div className="space-y-1">
                  {m.sources.map((s) => (
                    <div key={s} className="flex items-start gap-1.5 text-xs text-gray-400">
                      <span style={{ color: m.color }}>·</span> {s}
                    </div>
                  ))}
                </div>
                {m.note && (
                  <p className="text-xs text-gray-500 italic mt-3 pt-2 border-t border-white/6">{m.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hydratation */}
        <section>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            Hydratation
          </h2>
          <div className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-600/12 to-blue-600/12 p-6"
            style={{ backdropFilter: 'blur(8px)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {WATER.map((w) => (
                <div key={w.label} className="text-center p-3 rounded-xl border border-cyan-500/15"
                  style={{ background: 'rgba(6,182,212,0.06)' }}>
                  <div className="text-xl font-bold text-cyan-300 mb-1" style={{ fontFamily: "'Exo 2', monospace" }}>
                    {w.qty}
                  </div>
                  <div className="text-xs font-semibold text-white mb-0.5">{w.label}</div>
                  <div className="text-xs text-gray-500">{w.note}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic mt-4 pt-3 border-t border-cyan-500/15">
              Les besoins totaux incluent l'eau contenue dans les aliments (~20 % des apports). Urines claires = bonne hydratation.
            </p>
          </div>
        </section>

        {/* Vitamines */}
        <section>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            Vitamines essentielles
          </h2>
          <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase w-12">Vit.</th>
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase w-28">AJR</th>
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">Rôle</th>
                    <th className="text-left px-4 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase hidden sm:table-cell">Sources</th>
                    <th className="text-center px-3 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase w-16">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {VITAMINS.map((v, i) => (
                    <tr key={v.name}
                      className="border-b border-white/4 hover:bg-white/3 transition-colors"
                      style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td className="px-4 py-3 font-bold text-violet-300">{v.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-300">{v.rda}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{v.role}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{v.sources}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          v.fat
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                            : 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                        }`}>
                          {v.fat ? 'Lipo.' : 'Hydro.'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-4 px-4 py-3 border-t border-white/6">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/25 text-xs">Lipo.</span>
                Liposoluble — stockée dans les graisses
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25 text-xs">Hydro.</span>
                Hydrosoluble — non stockée, à apporter chaque jour
              </span>
            </div>
          </div>
        </section>

        {/* Minéraux */}
        <section>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
            Minéraux & Oligoéléments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MINERALS.map((m) => (
              <div key={m.name}
                className="rounded-xl border border-white/8 p-4 flex gap-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="shrink-0 w-20">
                  <div className="text-sm font-bold text-emerald-300">{m.name}</div>
                  <div className="text-xs font-mono text-gray-400 mt-0.5 leading-tight">{m.rda}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-1">{m.role}</div>
                  <div className="text-xs text-gray-500">{m.sources}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly meal plan */}
        <WeekPlan />

        {/* Footer note */}
        <div className="rounded-2xl border border-white/6 p-5 text-xs text-gray-500 leading-relaxed"
          style={{ background: 'rgba(255,255,255,0.01)' }}>
          <span className="text-gray-400 font-semibold">Sources & références : </span>
          ANSES (Agence nationale de sécurité sanitaire alimentaire nationale), OMS / WHO, Harvard T.H. Chan School of Public Health,
          National Institutes of Health (NIH) — Dietary Reference Intakes.
          Les valeurs indiquées sont des apports journaliers recommandés pour un adulte en bonne santé.
          Consultez un professionnel de santé pour des besoins spécifiques.
        </div>

      </div>
    </NatureLayout>
  );
}
