'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Allele = 'A' | 'a';

function getPhenotype(g: string): 'dominant' | 'recessive' {
  return g.includes('A') ? 'dominant' : 'recessive';
}

const PHENOTYPE_COLORS = {
  dominant:  { bg: 'rgba(16,185,129,0.18)',  border: '#10B981', text: '#10B981' },
  recessive: { bg: 'rgba(239,68,68,0.15)',   border: '#EF4444', text: '#EF4444' },
};

/* ── Mutation SVG ─────────────────────────────────────────── */
function MutationSVG({ before, after, color }: { before: string; after: string; color: string }) {
  const bBases = before.split('-');
  const aBases = after.split('-');
  const bx = (i: number) => 12 + i * 18;
  return (
    <svg viewBox={`0 0 ${12 + bBases.length * 18 + 10} 60`} width="100%" style={{ maxWidth: 240 }} xmlns="http://www.w3.org/2000/svg">
      {/* Before */}
      {bBases.map((b, i) => {
        const isDiff = b !== aBases[i];
        return (
          <g key={i}>
            <rect x={bx(i) - 7} y="4" width="14" height="14" rx="3"
              fill={isDiff ? `${color}30` : 'rgba(255,255,255,0.05)'}
              stroke={isDiff ? color : 'rgba(255,255,255,0.15)'} strokeWidth="1" />
            <text x={bx(i)} y="15" textAnchor="middle" fontSize="7" fill={isDiff ? color : '#9CA3AF'} fontFamily="'Exo 2',sans-serif" fontWeight="700">{b}</text>
          </g>
        );
      })}
      {/* Arrow */}
      <line x1="6" y1="29" x2={12 + bBases.length * 18 - 2} y2="29" stroke="#4B5563" strokeWidth="1" markerEnd="url(#mutArr)" />
      <defs><marker id="mutArr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L0,4 L4,2 Z" fill="#4B5563" /></marker></defs>
      {/* After */}
      {aBases.map((a, i) => {
        const isDiff = a !== bBases[i];
        return (
          <g key={i}>
            <rect x={bx(i) - 7} y="38" width="14" height="14" rx="3"
              fill={isDiff ? `${color}40` : 'rgba(255,255,255,0.05)'}
              stroke={isDiff ? color : 'rgba(255,255,255,0.15)'} strokeWidth={isDiff ? 1.5 : 1} />
            <text x={bx(i)} y="49" textAnchor="middle" fontSize="7" fill={isDiff ? color : '#9CA3AF'} fontFamily="'Exo 2',sans-serif" fontWeight="700">{a}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */
const MENDEL_LAWS = [
  {
    n: 1, name: 'Dominance',
    color: '#10B981',
    desc: 'Lors d\'un croisement entre deux lignées pures, tous les hybrides F1 ont le même phénotype — celui du caractère dominant.',
    cross: 'AA × aa → 100% Aa (phénotype dominant)',
    example: 'Pois à graines lisses (AA) × pois ridés (aa) → 100% lisses (Aa)',
  },
  {
    n: 2, name: 'Ségrégation',
    color: '#06B6D4',
    desc: 'En F2, les deux allèles se séparent lors de la méiose. Chaque gamète ne porte qu\'un allèle pour chaque gène.',
    cross: 'Aa × Aa → 1 AA : 2 Aa : 1 aa (ratio 3:1)',
    example: 'F2 : 75% lisses (AA ou Aa) + 25% ridés (aa)',
  },
  {
    n: 3, name: 'Assortiment indépendant',
    color: '#A78BFA',
    desc: 'Les allèles de gènes situés sur des chromosomes différents se transmettent indépendamment les uns des autres.',
    cross: 'AaBb × AaBb → ratio 9:3:3:1 (4 phénotypes)',
    example: 'Deux traits (forme + couleur) : 9 lisse-jaune : 3 lisse-vert : 3 ridé-jaune : 1 ridé-vert',
  },
];

const MUTATION_TYPES = [
  {
    name: 'Substitution',
    color: '#F97316',
    before: 'A-T-G-C-A',
    after:  'A-T-G-G-A',
    desc: 'Un nucléotide est remplacé par un autre. La plus fréquente. Peut être silencieuse (même acide aminé) ou faux-sens.',
    consequence: 'Drépanocytose : GAG → GTG, Glu → Val dans l\'hémoglobine',
  },
  {
    name: 'Délétion',
    color: '#EF4444',
    before: 'A-T-G-C-T',
    after:  'A-T-G-T',
    desc: 'Un ou plusieurs nucléotides sont supprimés. Provoque un décalage du cadre de lecture si non multiple de 3.',
    consequence: 'Mucoviscidose : délétion ΔF508 sur le gène CFTR (3 nucléotides)',
  },
  {
    name: 'Insertion',
    color: '#FBBF24',
    before: 'A-T-G-C',
    after:  'A-T-G-G-C',
    desc: 'Un ou plusieurs nucléotides sont insérés. Décalage du cadre de lecture — souvent très délétère.',
    consequence: 'Maladie de Huntington : expansion de triplets CAG dans le gène HTT',
  },
  {
    name: 'Inversion',
    color: '#60A5FA',
    before: 'A-T-C-G-A',
    after:  'A-G-C-T-A',
    desc: 'Un segment d\'ADN est retourné. Peut affecter l\'expression de plusieurs gènes selon la taille.',
    consequence: 'Hémophilie A : inversion intronique du gène F8 (chromosome X)',
  },
];

const GENETIC_DISEASES = [
  {
    name: 'Trisomie 21',
    color: '#F97316',
    chromosome: 'Chr. 21 (3 exemplaires)',
    inheritance: 'Accident méiotique (non-disjonction)',
    prevalence: '1/700 naissances',
    mechanism: 'Chromosome surnuméraire → surexpression de gènes du chr. 21 → retard développemental.',
    gene: 'Chromosome 21 entier',
  },
  {
    name: 'Mucoviscidose',
    color: '#06B6D4',
    chromosome: 'Chr. 7 (7q31)',
    inheritance: 'Autosomique récessif',
    prevalence: '1/3 300 naissances',
    mechanism: 'Mutation du gène CFTR → canal Cl⁻ défectueux → mucus épais dans poumons et pancréas.',
    gene: 'CFTR (ΔF508)',
  },
  {
    name: 'Drépanocytose',
    color: '#EF4444',
    chromosome: 'Chr. 11 (11p15)',
    inheritance: 'Autosomique récessif',
    prevalence: '1/400 afro-américains',
    mechanism: 'Substitution Glu→Val dans β-globine → hémoglobine S qui se polymèrise → GR en faucille.',
    gene: 'HBB (β-globine)',
  },
  {
    name: 'Daltonisme',
    color: '#A78BFA',
    chromosome: 'Chr. X (Xq28)',
    inheritance: 'Récessif lié à l\'X',
    prevalence: '8% hommes / 0,5% femmes',
    mechanism: 'Mutation ou délétion des gènes de l\'opsine (rouge ou verte) → confusion rouge-vert.',
    gene: 'OPN1LW / OPN1MW',
  },
];

const GENOMICS = [
  {
    name: 'Projet Génome Humain',
    year: '1990–2003',
    color: '#10B981',
    desc: 'Séquençage complet des 3,2 milliards de paires de bases du génome humain. Révèle ~20 000 gènes codants (seulement ~1,5% du génome).',
    authors: 'Consortium international (Collins, Venter)',
  },
  {
    name: 'CRISPR-Cas9',
    year: '2012',
    color: '#06B6D4',
    desc: 'Outil de chirurgie génomique précise. Le guide ARN conduit Cas9 vers une séquence cible, puis coupe l\'ADN double brin. Prix Nobel 2020.',
    authors: 'Jennifer Doudna & Emmanuelle Charpentier',
  },
  {
    name: 'Thérapie génique',
    year: '1990–présent',
    color: '#A78BFA',
    desc: 'Correction de gènes défectueux in vivo (vecteurs viraux, ex vivo) ou in vitro. Traitements approuvés pour LCA, SMA (Zolgensma), β-thalassémie.',
    authors: 'FDA/EMA approvals 2017–present',
  },
];

/* ── Component ────────────────────────────────────────────── */
export default function GenetiqueClient() {
  const [p1, setP1] = useState<[Allele, Allele]>(['A', 'a']);
  const [p2, setP2] = useState<[Allele, Allele]>(['A', 'a']);

  const grid = [
    [p1[0] + p2[0], p1[0] + p2[1]],
    [p1[1] + p2[0], p1[1] + p2[1]],
  ] as const;

  const allCells = grid.flat();
  const domCount = allCells.filter(g => g.includes('A')).length;
  const recCount = allCells.filter(g => !g.includes('A')).length;

  const cycleAllele = (val: Allele): Allele => val === 'A' ? 'a' : 'A';

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <style>{`@keyframes genFadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/biologie" className="hover:text-pink-400 transition-colors">Biologie</Link>
        <span>/</span>
        <span className="text-pink-400 font-medium">Génétique</span>
      </nav>

      <h1
        className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
        style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
      >
        Génétique
      </h1>
      <p className="text-gray-400 mb-12 max-w-2xl">
        Comment les caractères héréditaires se transmettent, se combinent et se modifient —
        des lois de Mendel au ciseau moléculaire CRISPR.
      </p>

      {/* ── 1. Mendel's laws ─────────────────────────────── */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Lois de Mendel
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xl">
          Gregor Mendel (1866) déduit les règles de l&apos;hérédité à partir de croisements de pois.
          Ses trois lois restent le fondement de la génétique classique.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {MENDEL_LAWS.map((law) => (
            <div key={law.n} className="rounded-xl border p-5" style={{ borderColor: `${law.color}35`, background: `${law.color}07` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${law.color}25`, color: law.color }}>
                  {law.n}
                </span>
                <h3 className="font-bold text-base" style={{ color: law.color, fontFamily: "'Exo 2', sans-serif" }}>{law.name}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">{law.desc}</p>
              <div className="rounded-lg px-3 py-2 mb-2" style={{ background: `${law.color}12` }}>
                <p className="text-xs font-mono" style={{ color: law.color }}>{law.cross}</p>
              </div>
              <p className="text-xs text-gray-600 leading-snug">{law.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Interactive Punnett square ────────────────── */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Carré de Punnett
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xl">
          Cliquez sur les allèles parents pour les changer (A = dominant, a = récessif) et voir les probabilités génotypiques et phénotypiques de la descendance.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Square */}
          <div className="flex-shrink-0">
            <div className="inline-grid gap-2" style={{ gridTemplateColumns: '56px 1fr 1fr' }}>
              {/* Top-left empty */}
              <div />
              {/* Parent 2 alleles (columns) */}
              {p2.map((a, ci) => (
                <button
                  key={ci}
                  onClick={() => setP2(prev => {
                    const n: [Allele, Allele] = [...prev];
                    n[ci] = cycleAllele(prev[ci]);
                    return n;
                  })}
                  className="w-16 h-12 rounded-xl font-bold text-lg transition-all hover:scale-105 border"
                  style={{
                    background: a === 'A' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)',
                    borderColor: a === 'A' ? '#10B981' : '#EF4444',
                    color: a === 'A' ? '#10B981' : '#EF4444',
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >
                  {a}
                </button>
              ))}

              {p1.map((rowAllele, ri) => (
                <React.Fragment key={ri}>
                  {/* Parent 1 allele (row) */}
                  <button
                    key={`r${ri}`}
                    onClick={() => setP1(prev => {
                      const n: [Allele, Allele] = [...prev];
                      n[ri] = cycleAllele(prev[ri]);
                      return n;
                    })}
                    className="w-14 h-16 rounded-xl font-bold text-lg transition-all hover:scale-105 border"
                    style={{
                      background: rowAllele === 'A' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)',
                      borderColor: rowAllele === 'A' ? '#10B981' : '#EF4444',
                      color: rowAllele === 'A' ? '#10B981' : '#EF4444',
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {rowAllele}
                  </button>

                  {/* Offspring cells */}
                  {grid[ri].map((genotype, ci) => {
                    const pheno = getPhenotype(genotype);
                    const col = PHENOTYPE_COLORS[pheno];
                    const sorted = genotype.split('').sort((a) => a === 'A' ? -1 : 1).join('');
                    return (
                      <div
                        key={`${ri}-${ci}`}
                        className="w-16 h-16 rounded-xl flex flex-col items-center justify-center border"
                        style={{ background: col.bg, borderColor: col.border, animation: 'genFadeIn 0.2s ease' }}
                      >
                        <span className="font-bold text-base" style={{ color: col.text, fontFamily: "'Exo 2', sans-serif" }}>
                          {sorted}
                        </span>
                        <span className="text-xs mt-0.5" style={{ color: col.text, opacity: 0.7 }}>
                          {pheno === 'dominant' ? 'Dom.' : 'Réc.'}
                        </span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded" style={{ background: 'rgba(16,185,129,0.3)', border: '1px solid #10B981' }} />
                <span className="text-gray-400">Phénotype dominant</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded" style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #EF4444' }} />
                <span className="text-gray-400">Phénotype récessif</span>
              </span>
            </div>
          </div>

          {/* Results panel */}
          <div
            key={`${p1.join('')}-${p2.join('')}`}
            className="flex-1 rounded-2xl border border-white/8 p-5"
            style={{ background: 'rgba(255,255,255,0.02)', animation: 'genFadeIn 0.25s ease' }}
          >
            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">Résultats</h3>

            <div className="space-y-3 mb-5">
              {['AA', 'Aa', 'aA', 'aa'].reduce<{ geno: string; count: number; pheno: string }[]>((acc, pattern) => {
                const count = allCells.filter(g => {
                  const s = g.split('').sort((a) => a === 'A' ? -1 : 1).join('');
                  const sp = pattern.split('').sort((a) => a === 'A' ? -1 : 1).join('');
                  return s === sp;
                }).length;
                const sorted = pattern.split('').sort((a) => a === 'A' ? -1 : 1).join('');
                if (!acc.find(x => x.geno === sorted) && count > 0) {
                  acc.push({ geno: sorted, count, pheno: getPhenotype(pattern) });
                }
                return acc;
              }, []).map(({ geno, count, pheno }) => (
                <div key={geno} className="flex items-center gap-3">
                  <span
                    className="w-12 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono flex-shrink-0"
                    style={{
                      background: pheno === 'dominant' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.15)',
                      color: pheno === 'dominant' ? '#10B981' : '#EF4444',
                    }}
                  >
                    {geno}
                  </span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full" style={{
                      background: pheno === 'dominant' ? '#10B981' : '#EF4444',
                      width: `${(count / 4) * 100}%`,
                      opacity: 0.5,
                    }} />
                  </div>
                  <span className="text-sm font-bold w-6 text-right" style={{ color: pheno === 'dominant' ? '#10B981' : '#EF4444' }}>
                    {count}/4
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/6 pt-4 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phénotype dominant</span>
                <span className="font-bold text-emerald-400">{domCount}/4 ({Math.round(domCount / 4 * 100)}%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phénotype récessif</span>
                <span className="font-bold text-red-400">{recCount}/4 ({Math.round(recCount / 4 * 100)}%)</span>
              </div>
              {domCount > 0 && recCount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ratio phénotypique</span>
                  <span className="font-bold text-gray-300">{domCount}:{recCount}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-600 mt-3">
              Cliquez sur A ou a (en haut et à gauche) pour changer les allèles parentaux.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Mutations ─────────────────────────────────── */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Types de mutations
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xl">
          Une mutation est toute modification permanente de la séquence d&apos;ADN.
          Les mutations sont la source première de toute variation génétique et donc de l&apos;évolution.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MUTATION_TYPES.map((m) => (
            <div key={m.name} className="rounded-xl border p-4" style={{ borderColor: `${m.color}35`, background: `${m.color}07` }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: m.color }}>{m.name}</h3>
              <div className="mb-3">
                <MutationSVG before={m.before} after={m.after} color={m.color} />
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">{m.desc}</p>
              <p className="text-xs text-gray-600 leading-snug">
                <span className="font-semibold" style={{ color: m.color }}>Ex. </span>{m.consequence}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Genetic diseases ──────────────────────────── */}
      <section className="mb-16">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Maladies génétiques
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xl">
          Les maladies génétiques résultent d&apos;une anomalie de la séquence d&apos;ADN — qu&apos;elle soit héritée ou survenue de novo.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {GENETIC_DISEASES.map((d) => (
            <div key={d.name} className="rounded-xl border p-5" style={{ borderColor: `${d.color}30`, background: `${d.color}06` }}>
              <h3 className="font-bold text-base mb-3" style={{ color: d.color, fontFamily: "'Exo 2', sans-serif" }}>{d.name}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mb-3">
                {[
                  { label: 'Gène',        value: d.gene },
                  { label: 'Chromosome',  value: d.chromosome },
                  { label: 'Hérédité',    value: d.inheritance },
                  { label: 'Prévalence',  value: d.prevalence },
                ].map((row) => (
                  <div key={row.label}>
                    <span className="text-gray-600">{row.label} : </span>
                    <span className="text-gray-300 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{d.mechanism}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Genomics ──────────────────────────────────── */}
      <section className="mb-10">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: '#10B981', fontFamily: "'Exo 2', sans-serif" }}
        >
          Génomique moderne
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xl">
          Lire, écrire et corriger le génome — les grandes avancées des 30 dernières années.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {GENOMICS.map((g) => (
            <div key={g.name} className="rounded-xl border p-5" style={{ borderColor: `${g.color}30`, background: `${g.color}07` }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${g.color}20`, color: g.color }}>{g.year}</span>
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: g.color, fontFamily: "'Exo 2', sans-serif" }}>{g.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">{g.desc}</p>
              <p className="text-xs text-gray-600">{g.authors}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-link */}
      <div className="rounded-xl border border-cyan-500/20 p-4" style={{ background: 'rgba(6,182,212,0.04)' }}>
        <p className="text-xs text-gray-500 mb-1">Aller plus loin</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/biologie/cellules" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">ADN, codons & table génétique →</Link>
          <Link href="/biologie/evolution" className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">Mutations et évolution →</Link>
          <Link href="/biologie/sante" className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">Maladies génétiques & santé →</Link>
        </div>
      </div>

    </div>
  );
}
