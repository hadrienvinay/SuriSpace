'use client';

import { useState } from 'react';
import Link from 'next/link';

type Kingdom = {
  id: string;
  name: string;
  color: string;
  domain: string;
  description: string;
  traits: string[];
  examples: { name: string; fact: string }[];
};

const KINGDOMS: Kingdom[] = [
  {
    id: 'animaux',
    name: 'Animaux',
    color: '#F97316',
    domain: 'Eukarya',
    description: 'Organismes eucaryotes multicellulaires, hétérotrophes (se nourrissent d\'autres organismes). La majorité peut se déplacer. Plus d\'1,3 million d\'espèces décrites.',
    traits: ['Eucaryotes multicellulaires', 'Hétérotrophes', 'Mobiles (en général)', 'Cellules sans paroi rigide', 'Reproduction sexuée fréquente'],
    examples: [
      { name: 'Baleine bleue', fact: 'Le plus grand animal ayant jamais existé (~30 m, 180 t)' },
      { name: 'Pieuvre', fact: 'Intelligence remarquable, 3 cœurs, sang bleu' },
      { name: 'Abeille', fact: 'Communication par la danse, pollinisation indispensable' },
      { name: 'Tardigrade', fact: 'Survit dans le vide spatial et à -272°C' },
      { name: 'Requin blanc', fact: 'Prédateur apex, 5 rangées de dents renouvelables' },
      { name: 'Colibri', fact: 'Battement d\'ailes : 80×/s, seul oiseau à voler en marche arrière' },
    ],
  },
  {
    id: 'plantes',
    name: 'Plantes',
    color: '#10B981',
    domain: 'Eukarya',
    description: 'Organismes eucaryotes multicellulaires, autotrophes (photosynthèse). Paroi cellulaire en cellulose. ~390 000 espèces végétales connues.',
    traits: ['Eucaryotes multicellulaires', 'Autotrophes (photosynthèse)', 'Chloroplastes', 'Paroi en cellulose', 'Croissance indéterminée'],
    examples: [
      { name: 'Séquoia géant', fact: 'Arbre le plus volumineux (~1 500 m³), vit +3 000 ans' },
      { name: 'Fougère', fact: 'Parmi les premières plantes terrestres (~360 Ma)' },
      { name: 'Rafflesia arnoldii', fact: 'Plus grande fleur du monde (~1 m de diamètre)' },
      { name: 'Posidonie', fact: 'Herbier marin, produit 70 % de l\'O₂ méditerranéen' },
      { name: 'Baobab', fact: 'Stocke jusqu\'à 120 000 L d\'eau dans son tronc' },
      { name: 'Orchidée', fact: 'Famille la plus diversifiée : +25 000 espèces' },
    ],
  },
  {
    id: 'champignons',
    name: 'Champignons',
    color: '#A78BFA',
    domain: 'Eukarya',
    description: 'Ni plantes ni animaux. Hétérotrophes par absorption (sécrètent des enzymes digestives). Paroi en chitine. ~144 000 espèces décrites, mais estimées à 2–3 millions.',
    traits: ['Eucaryotes', 'Hétérotrophes par absorption', 'Paroi en chitine', 'Corps en filaments (hyphes)', 'Reproduction par spores'],
    examples: [
      { name: 'Pénicillium', fact: 'Produit la pénicilline, première antibiotique de masse' },
      { name: 'Amanite phalloïde', fact: 'Champignon le plus mortel : 30 mg/kg suffisent' },
      { name: 'Armillaire ostoyae', fact: 'Plus grand organisme vivant connu (~10 km²)' },
      { name: 'Truffe noire', fact: 'Champignon mycorhizien des racines de chêne' },
      { name: 'Levure (Saccharomyces)', fact: 'Fermentation alcoolique — pain, bière, vin' },
      { name: 'Cordyceps', fact: 'Champignon parasite qui contrôle le comportement d\'insectes' },
    ],
  },
  {
    id: 'bacteries',
    name: 'Bactéries',
    color: '#34D399',
    domain: 'Bacteria',
    description: 'Organismes procaryotes, unicellulaires. Premières formes de vie (~3,5 milliards d\'années). Présentes partout sur Terre. Le microbiome humain en contient ~38 000 milliards.',
    traits: ['Procaryotes (sans noyau)', 'Unicellulaires', 'Paroi peptidoglycane', 'Reproduction par scissiparité', 'Extrêmement diversifiées'],
    examples: [
      { name: 'E. coli', fact: 'Bactérie modèle en biologie ; essentielle à la synthèse de vitamine K' },
      { name: 'Mycobacterium tuberculosis', fact: 'Cause de la tuberculose — 1 Md de personnes infectées' },
      { name: 'Cyanobactéries', fact: 'Ont oxygéné l\'atmosphère terrestre il y a 2,4 Md d\'années' },
      { name: 'Lactobacillus', fact: 'Fermentation lactique, yaourt, fromage, kéfir' },
      { name: 'Deinococcus radiodurans', fact: 'Résiste à 1,5 million de rads de radiation ionisante' },
      { name: 'Wolbachia', fact: 'Bactérie intracellulaire infectant 66 % des espèces d\'insectes' },
    ],
  },
  {
    id: 'virus',
    name: 'Virus',
    color: '#F472B6',
    domain: '— (non vivant ?)',
    description: 'Les virus sont à la frontière du vivant : ils ne sont pas des cellules, n\'ont pas de métabolisme propre, et ne se reproduisent qu\'en parasitant une cellule hôte.',
    traits: ['Non cellulaires', 'ADN ou ARN + capside protéique', 'Parasites intracellulaires obligatoires', 'Ne peuvent se reproduire sans hôte', '10³¹ virus estimés sur Terre'],
    examples: [
      { name: 'SARS-CoV-2', fact: 'ARN virus à couronne, pandémie COVID-19 (2020)' },
      { name: 'VIH', fact: 'Rétrovirus — intègre son ARN dans l\'ADN de l\'hôte' },
      { name: 'Bactériophage T4', fact: 'Virus qui infecte les bactéries, structure complexe en seringue' },
      { name: 'Virus de la grippe', fact: 'Mute rapidement — nouveau vaccin chaque année' },
      { name: 'Poxvirus (variole)', fact: 'Seule maladie humaine officiellement éradiquée (1980)' },
      { name: 'Mimivirus', fact: 'Plus grand virus connu (~750 nm) — découvert en 2003' },
    ],
  },
];

const DOMAINS = [
  { name: 'Bacteria', color: '#34D399', desc: 'Organismes procaryotes — bactéries' },
  { name: 'Archaea',  color: '#06B6D4', desc: 'Procaryotes extrêmophiles (sources hydrothermales, lacs salés…)' },
  { name: 'Eukarya',  color: '#A78BFA', desc: 'Cellule avec vrai noyau — animaux, plantes, champignons, protistes' },
];

function TreeOfLifeSVG() {
  return (
    <svg viewBox="0 0 300 210" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 400 }}>
      {/* Root trunk */}
      <line x1="150" y1="200" x2="150" y2="155" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
      {/* Main branches */}
      <path d="M 150 155 Q 100 145 60 115" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="150" y1="155" x2="150" y2="115" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
      <path d="M 150 155 Q 200 145 240 115" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Bacteria branch */}
      <line x1="60" y1="115" x2="40" y2="78" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="60" y1="115" x2="80" y2="78" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="40" cy="72" r="8" fill="rgba(52,211,153,0.25)" stroke="#34D399" strokeWidth="1.4" />
      <circle cx="80" cy="72" r="8" fill="rgba(52,211,153,0.25)" stroke="#34D399" strokeWidth="1.4" />
      <text x="60" y="44" textAnchor="middle" fontSize="9" fill="#34D399" fontFamily="'Exo 2',sans-serif" fontWeight="700">Bacteria</text>
      <text x="40" y="92" textAnchor="middle" fontSize="5.5" fill="#34D399" fontFamily="'Exo 2',sans-serif">Eubactéries</text>
      <text x="80" y="92" textAnchor="middle" fontSize="5.5" fill="#34D399" fontFamily="'Exo 2',sans-serif">Cyanobact.</text>

      {/* Archaea branch */}
      <line x1="150" y1="115" x2="135" y2="78" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="150" y1="115" x2="165" y2="78" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="135" cy="72" r="8" fill="rgba(6,182,212,0.25)" stroke="#06B6D4" strokeWidth="1.4" />
      <circle cx="165" cy="72" r="8" fill="rgba(6,182,212,0.25)" stroke="#06B6D4" strokeWidth="1.4" />
      <text x="150" y="44" textAnchor="middle" fontSize="9" fill="#06B6D4" fontFamily="'Exo 2',sans-serif" fontWeight="700">Archaea</text>
      <text x="135" y="92" textAnchor="middle" fontSize="5.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">Thermoac.</text>
      <text x="165" y="92" textAnchor="middle" fontSize="5.5" fill="#06B6D4" fontFamily="'Exo 2',sans-serif">Halophiles</text>

      {/* Eukarya branch */}
      <line x1="240" y1="115" x2="210" y2="78" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="240" y1="115" x2="240" y2="78" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="240" y1="115" x2="270" y2="78" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="210" cy="72" r="8" fill="rgba(167,139,250,0.25)" stroke="#A78BFA" strokeWidth="1.4" />
      <circle cx="240" cy="72" r="8" fill="rgba(167,139,250,0.25)" stroke="#A78BFA" strokeWidth="1.4" />
      <circle cx="270" cy="72" r="8" fill="rgba(167,139,250,0.25)" stroke="#A78BFA" strokeWidth="1.4" />
      <text x="240" y="44" textAnchor="middle" fontSize="9" fill="#A78BFA" fontFamily="'Exo 2',sans-serif" fontWeight="700">Eukarya</text>
      <text x="210" y="92" textAnchor="middle" fontSize="5.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">Animaux</text>
      <text x="240" y="92" textAnchor="middle" fontSize="5.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">Plantes</text>
      <text x="270" y="92" textAnchor="middle" fontSize="5.5" fill="#A78BFA" fontFamily="'Exo 2',sans-serif">Champignons</text>

      {/* LUCA */}
      <circle cx="150" cy="160" r="6" fill="rgba(107,114,128,0.3)" stroke="#6B7280" strokeWidth="1.2" />
      <text x="150" y="200" textAnchor="middle" fontSize="7.5" fill="#6B7280" fontFamily="'Exo 2',sans-serif">LUCA — Ancêtre commun universel (~4 Ga)</text>
    </svg>
  );
}

export default function VivantClient() {
  const [activeTab, setActiveTab] = useState<string>('animaux');
  const kingdom = KINGDOMS.find(k => k.id === activeTab)!;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <style>{`@keyframes vivantFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/biologie" className="hover:text-emerald-400 transition-colors">Biologie</Link>
        <span>/</span>
        <span className="text-emerald-400 font-medium">Le Vivant</span>
      </nav>

      <h1
        className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #10B981, #34D399, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: "'Exo 2', sans-serif",
        }}
      >
        Le Vivant
      </h1>
      <p className="text-gray-400 mb-12 max-w-2xl">
        Découvrez les 3 domaines et les grands règnes qui structurent la biodiversité sur Terre, des bactéries aux animaux complexes.
      </p>

      {/* Tree of Life */}
      <section className="mb-14">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}
        >
          L&apos;Arbre du Vivant
        </h2>
        <div className="grid sm:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <TreeOfLifeSVG />
          </div>
          <div className="space-y-4">
            {DOMAINS.map((d) => (
              <div key={d.name} className="flex gap-3 items-start">
                <span className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: d.color }} />
                <div>
                  <span className="font-bold text-sm" style={{ color: d.color }}>{d.name} </span>
                  <span className="text-gray-400 text-sm">— {d.desc}</span>
                </div>
              </div>
            ))}
            <p className="text-gray-500 text-xs leading-relaxed pt-2">
              La classification est basée sur la phylogénétique moléculaire (séquences d&apos;ARNr 16S).
              Le LUCA est l&apos;ancêtre commun à toute vie sur Terre, daté à ~4 milliards d&apos;années.
            </p>
            <Link href="/biologie/cellules" className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors pt-1">
              Comprendre la cellule procaryote vs eucaryote →
            </Link>
          </div>
        </div>
      </section>

      {/* Kingdoms tabs */}
      <section>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ background: 'linear-gradient(135deg, #10B981, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Exo 2', sans-serif" }}
        >
          Les Règnes du Vivant
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {KINGDOMS.map((k) => (
            <button
              key={k.id}
              onClick={() => setActiveTab(k.id)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200"
              style={{
                borderColor: activeTab === k.id ? k.color : 'rgba(255,255,255,0.1)',
                background: activeTab === k.id ? `${k.color}18` : 'rgba(255,255,255,0.02)',
                color: activeTab === k.id ? k.color : '#9CA3AF',
              }}
            >
              {k.name}
            </button>
          ))}
        </div>

        {/* Animated tab content */}
        <div
          key={activeTab}
          className="rounded-2xl border p-6"
          style={{
            borderColor: `${kingdom.color}30`,
            background: `${kingdom.color}06`,
            animation: 'vivantFadeIn 0.28s ease',
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold" style={{ color: kingdom.color, fontFamily: "'Exo 2', sans-serif" }}>
              {kingdom.name}
            </h3>
            <span
              className="text-xs px-2.5 py-1 rounded-full border font-medium"
              style={{ borderColor: `${kingdom.color}40`, color: kingdom.color, background: `${kingdom.color}15` }}
            >
              Domaine : {kingdom.domain}
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">{kingdom.description}</p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Caractéristiques</h4>
              <ul className="space-y-2">
                {kingdom.traits.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: kingdom.color }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Exemples notables</h4>
              <div className="space-y-2">
                {kingdom.examples.map((ex) => (
                  <div key={ex.name} className="rounded-lg border p-2.5" style={{ borderColor: `${kingdom.color}20`, background: `${kingdom.color}05` }}>
                    <div className="font-semibold text-sm" style={{ color: kingdom.color }}>{ex.name}</div>
                    <div className="text-gray-500 text-xs leading-snug mt-0.5">{ex.fact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mt-14 rounded-2xl border border-white/10 p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">Biodiversité en chiffres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '~8,7 M', label: 'espèces eucaryotes estimées' },
            { value: '1,3 M',  label: 'espèces animales décrites' },
            { value: '390 000', label: 'espèces végétales connues' },
            { value: '3,5 Ga', label: 'âge de la première vie sur Terre' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Exo 2', monospace",
                }}
              >
                {s.value}
              </div>
              <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
