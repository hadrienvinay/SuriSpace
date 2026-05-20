import type { Metadata } from 'next';
import Link from 'next/link';
import BiologieLayout from '@/components/BiologieLayout';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Cellules & Génétique | Biologie',
  description: 'La cellule vivante, procaryotes et eucaryotes, ADN, ARN, codons, mitose, méiose et les organites cellulaires.',
  openGraph: {
    title: 'Cellules & Génétique | Suri Space',
    url: 'https://suri-space.vercel.app/biologie/cellules',
  },
};

/* ── SVG Diagrams ─────────────────────────────────────────── */

function ProkaryoteSVG() {
  return (
    <svg viewBox="0 0 200 190" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 220 }}>
      <text x="100" y="14" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">PROCARYOTE</text>
      {/* Cell wall */}
      <ellipse cx="100" cy="98" rx="70" ry="58" fill="rgba(16,185,129,0.06)" stroke="#10B981" strokeWidth="1.8" strokeDasharray="5 3" />
      {/* Inner membrane */}
      <ellipse cx="100" cy="98" rx="60" ry="50" fill="rgba(16,185,129,0.04)" stroke="#10B981" strokeWidth="1" />
      {/* Nucleoid (no membrane → dashed) */}
      <ellipse cx="100" cy="93" rx="22" ry="15" fill="rgba(6,182,212,0.18)" stroke="#06B6D4" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="100" y="96" textAnchor="middle" dominantBaseline="middle" fontSize="6.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" fontWeight="600">Nucléoïde</text>
      {/* Plasmid ring */}
      <ellipse cx="132" cy="115" rx="11" ry="8" fill="none" stroke="#F97316" strokeWidth="1.2" strokeDasharray="2 1.5" />
      {/* Ribosomes */}
      {[[72,80],[67,108],[118,80],[125,105],[88,70],[112,70],[82,120],[116,125]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#10B981" opacity="0.55" />
      ))}
      {/* Flagellum */}
      <path d="M 100 156 Q 112 166 100 175 Q 88 184 100 188" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Callout leaders */}
      <line x1="73" y1="80" x2="24" y2="62" stroke="#10B981" strokeWidth="0.7" opacity="0.5" />
      <text x="20" y="59" textAnchor="end" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif">Ribosomes</text>
      <line x1="100" y1="50" x2="100" y2="32" stroke="#06B6D4" strokeWidth="0.7" opacity="0.5" />
      <text x="100" y="29" textAnchor="middle" fontSize="6" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">ADN libre</text>
      <line x1="139" y1="112" x2="170" y2="105" stroke="#F97316" strokeWidth="0.7" opacity="0.5" />
      <text x="172" y="103" fontSize="6" fill="#F97316" fontFamily="'Exo 2',sans-serif">Plasmide</text>
      <line x1="165" y1="75" x2="178" y2="60" stroke="#10B981" strokeWidth="0.7" opacity="0.5" />
      <text x="158" y="56" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif" textAnchor="middle">Paroi</text>
      <line x1="100" y1="175" x2="150" y2="180" stroke="#10B981" strokeWidth="0.7" opacity="0.5" />
      <text x="152" y="183" fontSize="6" fill="#10B981" fontFamily="'Exo 2',sans-serif">Flagelle</text>
    </svg>
  );
}

function EukaryoteSVG() {
  return (
    <svg viewBox="0 0 260 190" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 280 }}>
      <text x="130" y="14" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="'Exo 2',sans-serif" fontWeight="700">EUCARYOTE</text>
      {/* Cell membrane */}
      <ellipse cx="130" cy="105" rx="110" ry="76" fill="rgba(6,182,212,0.04)" stroke="#06B6D4" strokeWidth="1.5" />
      {/* Nucleus + double membrane */}
      <ellipse cx="130" cy="95" rx="33" ry="27" fill="rgba(6,182,212,0.12)" stroke="#06B6D4" strokeWidth="1.5" />
      <ellipse cx="130" cy="95" rx="29" ry="23" fill="rgba(6,182,212,0.05)" stroke="#06B6D4" strokeWidth="0.7" strokeDasharray="2 2" />
      <text x="130" y="94" textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" fontWeight="600">Noyau</text>
      <text x="130" y="103" textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">(ADN)</text>
      {/* Nucleolus */}
      <circle cx="122" cy="88" r="5" fill="rgba(6,182,212,0.45)" />
      {/* Mitochondria */}
      <ellipse cx="52" cy="85" rx="19" ry="11" fill="rgba(249,115,22,0.14)" stroke="#F97316" strokeWidth="1.2" />
      <path d="M 39 85 Q 44 79 49 85 Q 44 91 39 85 Z M 49 85 Q 54 79 59 85 Q 54 91 49 85 Z" fill="#F97316" opacity="0.4" />
      <text x="52" y="105" textAnchor="middle" fontSize="5.5" fill="#F97316" fontFamily="'Exo 2',sans-serif">Mito.</text>
      {/* Rough ER */}
      <path d="M 172 70 Q 196 78 192 105 Q 188 128 172 126" stroke="#A78BFA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 176 70 Q 200 78 196 105 Q 192 128 176 126" stroke="#A78BFA" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="2 1.5" />
      {[[174,76],[178,84],[176,92],[174,100],[176,108],[174,116]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="#10B981" opacity="0.6" />
      ))}
      <text x="210" y="100" textAnchor="middle" fontSize="5.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">RE rugu.</text>
      {/* Golgi */}
      {[128, 135, 142, 149].map((y, i) => (
        <path key={i} d={`M ${76 + i} ${y} Q 100 ${y - 5} ${124 - i} ${y}`} stroke="#F472B6" strokeWidth="1.5" fill="none" opacity={1 - i * 0.15} />
      ))}
      <text x="100" y="165" textAnchor="middle" fontSize="5.5" fill="#F472B6" fontFamily="'Exo 2',sans-serif">Golgi</text>
      {/* Lysosome */}
      <circle cx="58" cy="128" r="10" fill="rgba(234,179,8,0.15)" stroke="#EAB308" strokeWidth="1" />
      <text x="58" y="147" textAnchor="middle" fontSize="5.5" fill="#EAB308" fontFamily="'Exo 2',sans-serif">Lysosome</text>
      {/* Membrane label */}
      <line x1="235" y1="108" x2="242" y2="95" stroke="#06B6D4" strokeWidth="0.7" opacity="0.5" />
      <text x="244" y="93" fontSize="5.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">Membrane</text>
    </svg>
  );
}

function DnaHelixSVG() {
  return (
    <svg viewBox="0 0 180 270" width="150" xmlns="http://www.w3.org/2000/svg">
      <path d="M 45 12 C 90 32 45 72 90 92 C 45 112 90 152 45 172 C 90 192 45 232 90 252"
        stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 135 12 C 90 32 135 72 90 92 C 135 112 90 152 135 172 C 90 192 135 232 90 252"
        stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
      {[32, 72, 112, 152, 192, 232].map((y, i) => {
        const pairs = [['A','T'],['G','C'],['T','A'],['C','G'],['G','C'],['A','T']] as const;
        const clrs  = [['#EF4444','#60A5FA'],['#F97316','#A78BFA'],['#60A5FA','#EF4444'],['#A78BFA','#F97316'],['#F97316','#A78BFA'],['#EF4444','#60A5FA']] as const;
        const xL = i % 2 === 0 ? 55 : 72;
        const xR = i % 2 === 0 ? 125 : 108;
        const [l, r] = pairs[i];
        const [lc, rc] = clrs[i];
        return (
          <g key={i}>
            <line x1={xL} y1={y} x2={xR} y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx={xL} cy={y} r="8.5" fill={`${lc}28`} stroke={lc} strokeWidth="1.1" />
            <circle cx={xR} cy={y} r="8.5" fill={`${rc}28`} stroke={rc} strokeWidth="1.1" />
            <text x={xL} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill={lc} fontFamily="'Exo 2',sans-serif" fontWeight="700">{l}</text>
            <text x={xR} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill={rc} fontFamily="'Exo 2',sans-serif" fontWeight="700">{r}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MitosisDiagram({ phase }: { phase: number }) {
  const color = MITOSIS_PHASES[phase].color;
  const c = color;
  if (phase === 0) return (
    <svg viewBox="0 0 54 54" width="54" height="54">
      <circle cx="27" cy="27" r="23" fill={`${c}12`} stroke={c} strokeWidth="1.5" />
      <circle cx="27" cy="27" r="13" fill={`${c}20`} stroke={c} strokeWidth="1" />
      {[[24,24],[30,24],[27,28],[24,30],[30,30],[27,22],[22,27],[32,27]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill={c} opacity="0.45" />
      ))}
    </svg>
  );
  if (phase === 1) return (
    <svg viewBox="0 0 54 54" width="54" height="54">
      <circle cx="27" cy="27" r="23" fill={`${c}12`} stroke={c} strokeWidth="1.5" />
      <circle cx="27" cy="27" r="13" fill="none" stroke={c} strokeWidth="0.9" strokeDasharray="2.5 2" />
      {[[19,20],[29,20],[19,34],[29,34]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx-3.5} y1={cy-3.5} x2={cx+3.5} y2={cy+3.5} stroke={c} strokeWidth="2.5" strokeLinecap="round" />
          <line x1={cx+3.5} y1={cy-3.5} x2={cx-3.5} y2={cy+3.5} stroke={c} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
  if (phase === 2) return (
    <svg viewBox="0 0 54 54" width="54" height="54">
      <circle cx="27" cy="27" r="23" fill={`${c}12`} stroke={c} strokeWidth="1.5" />
      {[20,27,34].map((x, i) => (
        <line key={i} x1={x} y1="5" x2={x} y2="49" stroke={c} strokeWidth="0.6" opacity="0.3" strokeLinecap="round" />
      ))}
      <line x1="5" y1="27" x2="49" y2="27" stroke={c} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.45" />
      {[[20,27],[27,27],[34,27]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx-3} y1={cy-3} x2={cx+3} y2={cy+3} stroke={c} strokeWidth="2.5" strokeLinecap="round" />
          <line x1={cx+3} y1={cy-3} x2={cx-3} y2={cy+3} stroke={c} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
  if (phase === 3) return (
    <svg viewBox="0 0 54 54" width="54" height="54">
      <ellipse cx="27" cy="27" rx="23" ry="17" fill={`${c}12`} stroke={c} strokeWidth="1.5" />
      {[[20,13],[27,13],[34,13]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx-2.5} y1={cy-2.5} x2={cx+2.5} y2={cy+2.5} stroke={c} strokeWidth="2" strokeLinecap="round" />
          <line x1={cx+2.5} y1={cy-2.5} x2={cx-2.5} y2={cy+2.5} stroke={c} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      {[[20,41],[27,41],[34,41]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx-2.5} y1={cy-2.5} x2={cx+2.5} y2={cy+2.5} stroke={c} strokeWidth="2" strokeLinecap="round" />
          <line x1={cx+2.5} y1={cy-2.5} x2={cx-2.5} y2={cy+2.5} stroke={c} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <path d="M 5 27 Q 14 24 27 27 Q 40 30 49 27" stroke={c} strokeWidth="0.9" fill="none" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
  return (
    <svg viewBox="0 0 54 54" width="54" height="54">
      <ellipse cx="27" cy="16" rx="17" ry="13" fill={`${c}12`} stroke={c} strokeWidth="1.3" />
      <ellipse cx="27" cy="38" rx="17" ry="13" fill={`${c}12`} stroke={c} strokeWidth="1.3" />
      <line x1="10" y1="27" x2="44" y2="27" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="27" cy="16" r="5.5" fill={`${c}28`} stroke={c} strokeWidth="0.9" />
      <circle cx="27" cy="38" r="5.5" fill={`${c}28`} stroke={c} strokeWidth="0.9" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */

const MITOSIS_PHASES = [
  { name: 'Interphase', color: '#6B7280', desc: 'Réplication de l\'ADN (2n → 4n). Noyau intact, chromatine diffuse, cellule croît.' },
  { name: 'Prophase',   color: '#A78BFA', desc: 'Chromosomes se condensent et deviennent visibles. Fuseau mitotique en formation.' },
  { name: 'Métaphase',  color: '#60A5FA', desc: 'Chromosomes alignés au centre (plaque équatoriale). Stade idéal pour leur observation.' },
  { name: 'Anaphase',   color: '#F97316', desc: 'Chromatides sœurs séparées, tirées vers les pôles opposés par le fuseau.' },
  { name: 'Télophase',  color: '#10B981', desc: 'Deux noyaux fils se reforment. Chromatine se décondense. Cytocinèse (division du cytoplasme).' },
];

const ORGANITES = [
  { name: 'Noyau',              color: '#06B6D4', desc: 'Centre de contrôle. ADN organisé en chromosomes, entouré d\'une double membrane poreuse.' },
  { name: 'Mitochondrie',       color: '#F97316', desc: 'Centrale énergétique. Produit l\'ATP par respiration cellulaire. Possède son propre ADN.' },
  { name: 'RE (rugueux/lisse)', color: '#A78BFA', desc: 'RE rugueux : synthèse des protéines (ribosomes). RE lisse : lipides, détoxification.' },
  { name: 'Appareil de Golgi',  color: '#F472B6', desc: 'Centre de tri. Modifie, emballe et expédie les protéines vers leur destination finale.' },
  { name: 'Lysosome',           color: '#EAB308', desc: 'Contient des enzymes digestives. Dégrade les déchets et agents pathogènes ingérés.' },
  { name: 'Ribosome',           color: '#10B981', desc: 'Usines à protéines. Traduisent l\'ARNm en chaînes d\'acides aminés (libres ou sur RE).' },
  { name: 'Cytosquelette',      color: '#34D399', desc: 'Réseau de filaments (actine, tubuline). Maintient la forme et permet les mouvements.' },
  { name: 'Membrane plasmique', color: '#E2E8F0', desc: 'Bicouche lipidique + protéines. Contrôle les échanges entre la cellule et son milieu.' },
];

const AMINO_ACIDS = [
  { abbr: 'Met',  name: 'Méthionine',       codons: ['AUG'],                               color: '#10B981', note: 'Start ▶' },
  { abbr: 'Phe',  name: 'Phénylalanine',    codons: ['UUU','UUC'],                          color: '#EF4444' },
  { abbr: 'Leu',  name: 'Leucine',          codons: ['UUA','UUG','CUU','CUC','CUA','CUG'],  color: '#F97316' },
  { abbr: 'Ile',  name: 'Isoleucine',       codons: ['AUU','AUC','AUA'],                   color: '#FBBF24' },
  { abbr: 'Val',  name: 'Valine',           codons: ['GUU','GUC','GUA','GUG'],             color: '#34D399' },
  { abbr: 'Ser',  name: 'Sérine',           codons: ['UCU','UCC','UCA','UCG','AGU','AGC'], color: '#06B6D4' },
  { abbr: 'Pro',  name: 'Proline',          codons: ['CCU','CCC','CCA','CCG'],             color: '#60A5FA' },
  { abbr: 'Thr',  name: 'Thréonine',        codons: ['ACU','ACC','ACA','ACG'],             color: '#A78BFA' },
  { abbr: 'Ala',  name: 'Alanine',          codons: ['GCU','GCC','GCA','GCG'],             color: '#F472B6' },
  { abbr: 'Tyr',  name: 'Tyrosine',         codons: ['UAU','UAC'],                         color: '#EF4444' },
  { abbr: 'His',  name: 'Histidine',        codons: ['CAU','CAC'],                         color: '#F97316' },
  { abbr: 'Gln',  name: 'Glutamine',        codons: ['CAA','CAG'],                         color: '#FBBF24' },
  { abbr: 'Asn',  name: 'Asparagine',       codons: ['AAU','AAC'],                         color: '#34D399' },
  { abbr: 'Lys',  name: 'Lysine',           codons: ['AAA','AAG'],                         color: '#06B6D4' },
  { abbr: 'Asp',  name: 'Ac. Aspartique',   codons: ['GAU','GAC'],                         color: '#60A5FA' },
  { abbr: 'Glu',  name: 'Ac. Glutamique',   codons: ['GAA','GAG'],                         color: '#A78BFA' },
  { abbr: 'Cys',  name: 'Cystéine',         codons: ['UGU','UGC'],                         color: '#F472B6' },
  { abbr: 'Trp',  name: 'Tryptophane',      codons: ['UGG'],                               color: '#EF4444' },
  { abbr: 'Arg',  name: 'Arginine',         codons: ['CGU','CGC','CGA','CGG','AGA','AGG'], color: '#F97316' },
  { abbr: 'Gly',  name: 'Glycine',          codons: ['GGU','GGC','GGA','GGG'],             color: '#FBBF24' },
  { abbr: 'Stop', name: 'Codon stop',       codons: ['UAA','UAG','UGA'],                   color: '#4B5563', note: 'Stop ■' },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function CellulesPage() {
  return (
    <BiologieLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Biologie', item: 'https://suri-space.vercel.app/biologie' },
          { '@type': 'ListItem', position: 3, name: 'Cellules & Génétique', item: 'https://suri-space.vercel.app/biologie/cellules' },
        ]},
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-mono text-gray-600 mb-8">
          <Link href="/biologie" className="hover:text-white transition-colors">Biologie</Link>
          <span className="text-gray-700">›</span>
          <span className="text-cyan-400">Cellules & Génétique</span>
        </nav>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #06B6D4, #10B981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Cellules & Génétique
        </h1>
        <p className="text-gray-400 mb-4 max-w-2xl">
          La cellule est l&apos;unité fondamentale du vivant. Explorez ses types, ses composants
          et les mécanismes moléculaires qui permettent l&apos;hérédité et la division cellulaire.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {['2 types cellulaires', '4 bases azotées', '21 acides aminés', '64 codons', '5 phases de mitose', '8 organites'].map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500" style={{ background: 'rgba(255,255,255,0.03)' }}>{s}</span>
          ))}
        </div>

        {/* ── 1. Prokaryote vs Eukaryote ───────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Procaryotes vs Eucaryotes
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Les procaryotes n&apos;ont pas de noyau membranaire. Les eucaryotes possèdent un vrai noyau et des organites compartimentés.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-500/25 p-5" style={{ background: 'rgba(16,185,129,0.05)', boxShadow: '0 0 40px rgba(16,185,129,0.07), inset 0 1px 0 rgba(255,255,255,0.04)' }}>
              <h3 className="text-emerald-400 font-bold text-sm mb-4 uppercase tracking-widest">Procaryote</h3>
              <div className="flex justify-center mb-4"><ProkaryoteSVG /></div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Pas de noyau membranaire — ADN libre (nucléoïde)</li>
                <li>• Taille : 1–10 µm</li>
                <li>• Pas d&apos;organites membranaires</li>
                <li>• Exemples : bactéries, archées</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-500/25 p-5" style={{ background: 'rgba(6,182,212,0.05)', boxShadow: '0 0 40px rgba(6,182,212,0.07), inset 0 1px 0 rgba(255,255,255,0.04)' }}>
              <h3 className="text-cyan-400 font-bold text-sm mb-4 uppercase tracking-widest">Eucaryote</h3>
              <div className="flex justify-center mb-4"><EukaryoteSVG /></div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Noyau délimité par une double membrane</li>
                <li>• Taille : 10–100 µm</li>
                <li>• Organites compartimentés (mitochondries, Golgi…)</li>
                <li>• Exemples : cellules animales, végétales, champignons</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 2. ADN ───────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #06B6D4, #A78BFA)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #06B6D4, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              L&apos;ADN — double hélice
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            L&apos;acide désoxyribonucléique porte l&apos;information génétique. Sa structure en double hélice a été décrite par Watson et Crick en 1953.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 items-start">
            <div className="flex justify-center rounded-2xl border border-cyan-500/15 p-4" style={{ background: 'rgba(6,182,212,0.04)', boxShadow: '0 0 40px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <DnaHelixSVG />
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: 'Bases azotées', color: '#EF4444', desc: '4 bases : Adénine (A) — Thymine (T) — Guanine (G) — Cytosine (C). A s\'apparie avec T, G avec C (liaisons hydrogène).' },
                { label: 'Double hélice', color: '#06B6D4', desc: 'Deux brins antiparallèles enroulés autour d\'un axe. Chaque brin sert de matrice lors de la réplication semi-conservative.' },
                { label: 'Codon (ARNm)', color: '#10B981', desc: 'Triplet de nucléotides lu par les ribosomes. AUG = méthionine et signal Start. 64 codons pour 20 acides aminés + 3 codons Stop.' },
                { label: 'Gène', color: '#A78BFA', desc: 'Séquence d\'ADN codant une protéine. Le génome humain : ~3 milliards de paires de bases, ~20 000–25 000 gènes.' },
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
        </section>

        {/* ── 3. Codon table ───────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #06B6D4)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Code génétique — les 20 acides aminés
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            64 codons (triplets ARNm) encodent 20 acides aminés + 3 codons stop. Le code est dégénéré : plusieurs codons peuvent coder le même acide aminé.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {AMINO_ACIDS.map((aa) => (
              <div
                key={aa.abbr}
                className="rounded-xl border p-3"
                style={{
                  borderColor: `${aa.color}35`,
                  background: `${aa.color}08`,
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: aa.color }} />
                  <span className="font-bold text-sm" style={{ color: aa.color }}>{aa.abbr}</span>
                  {aa.note && (
                    <span className="text-xs font-semibold ml-auto" style={{ color: aa.color }}>{aa.note}</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mb-2 leading-tight">{aa.name}</p>
                <div className="flex flex-wrap gap-1">
                  {aa.codons.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{ background: `${aa.color}15`, color: aa.color }}
                    >
                      {c}
                    </span>
                  ))}
                  {aa.codons.length > 4 && (
                    <span className="text-xs text-gray-600 font-mono px-1 py-0.5">+{aa.codons.length - 4}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-3">
            Notation ARNm (U remplace T de l&apos;ADN). <span className="text-emerald-400 font-medium">AUG</span> = codon initiateur (méthionine).{' '}
            <span className="text-gray-500 font-medium">UAA, UAG, UGA</span> = codons stop (aucun acide aminé, fin de traduction).
          </p>
        </section>

        {/* ── 4. Mitose ────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #A78BFA, #10B981)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #A78BFA, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              La Mitose
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Division cellulaire qui produit deux cellules filles génétiquement <strong className="text-white">identiques</strong> à la cellule mère (2n → 2n). Se déroule en 5 phases : <strong className="text-white">I-P-M-A-T</strong>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {MITOSIS_PHASES.map((phase, i) => (
              <div
                key={phase.name}
                className="rounded-xl border p-4 text-center"
                style={{ borderColor: `${phase.color}40`, background: `${phase.color}08` }}
              >
                <div className="flex justify-center mb-3">
                  <MitosisDiagram phase={i} />
                </div>
                <div className="font-bold text-sm mb-2" style={{ color: phase.color }}>{phase.name}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Méiose vs Mitose ──────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #F97316, #A78BFA)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #F97316, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Méiose vs Mitose
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            La méiose est une division spécialisée qui produit les gamètes (spermatozoïdes, ovules) avec un nombre de chromosomes réduit de moitié.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: 'Mitose',
                color: '#60A5FA',
                result: '2 cellules filles',
                ploidy: '2n → 2 × 2n',
                identical: true,
                where: 'Cellules somatiques (tout le corps)',
                steps: 'Prophase → Métaphase → Anaphase → Télophase',
                purpose: 'Croissance, réparation, reproduction asexuée',
              },
              {
                name: 'Méiose',
                color: '#F97316',
                result: '4 cellules filles (gamètes)',
                ploidy: '2n → 4 × n',
                identical: false,
                where: 'Gonades (testicules, ovaires)',
                steps: 'Méiose I (réductionnelle) + Méiose II (équationnelle)',
                purpose: 'Reproduction sexuée, diversité génétique',
              },
            ].map((div) => (
              <div
                key={div.name}
                className="rounded-2xl border p-6"
                style={{ borderColor: `${div.color}35`, background: `${div.color}07` }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: div.color, fontFamily: "'Exo 2', sans-serif" }}>
                  {div.name}
                </h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: 'Résultat',         value: div.result },
                    { label: 'Ploïdie',           value: div.ploidy },
                    { label: 'Cellules filles',   value: div.identical ? 'Génétiquement identiques' : 'Génétiquement différentes (recombinaison)' },
                    { label: 'Lieu',              value: div.where },
                    { label: 'Phases',            value: div.steps },
                    { label: 'Rôle',              value: div.purpose },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-3">
                      <span className="text-gray-500 w-28 flex-shrink-0 text-xs leading-5">{row.label}</span>
                      <span className="text-gray-300 text-xs leading-5">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Organites ─────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #10B981, #F97316)' }} />
            <h2 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #10B981, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}>
              Les Organites Cellulaires
            </h2>
          </div>
          <p className="text-gray-500 text-sm mb-6 max-w-xl">
            Compartiments spécialisés des cellules eucaryotes, chacun avec une fonction précise.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORGANITES.map((org) => (
              <div
                key={org.name}
                className="rounded-xl border p-4 hover:scale-[1.01] transition-all duration-200"
                style={{ borderColor: `${org.color}30`, background: `${org.color}06`, borderTopColor: `${org.color}60`, borderTopWidth: 2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: org.color }} />
                  <h3 className="font-bold text-sm" style={{ color: org.color }}>{org.name}</h3>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{org.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-white/6">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-4">Explorer aussi</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: '/biologie/corps',     color: '#F97316', label: 'Corps Humain',  desc: 'Cellules spécialisées des 8 systèmes' },
                { href: '/biologie/genetique', color: '#F472B6', label: 'Génétique',     desc: 'Mendel, mutations et CRISPR' },
                { href: '/biologie/evolution', color: '#A78BFA', label: 'Évolution',     desc: 'Mutations et sélection naturelle' },
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
