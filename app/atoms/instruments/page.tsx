'use client';
// app/atoms/instruments/page.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AtomicLayout from '@/components/layout/AtomicLayout';
import { RadiationIcon } from '@/components/icons/AtomsIcons';

/* ── Small inline icons (style cohérent avec SolarIcons) ─────── */
function IcoPin({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M 7 1 A 4 4 0 0 1 11 5 C 11 8 7 13 7 13 C 7 13 3 8 3 5 A 4 4 0 0 1 7 1 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="7" cy="5" r="1.5" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

function IcoRing({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeDasharray="2.5 1.8"/>
      <circle cx="8" cy="8" r="1.6" fill="currentColor" opacity="0.85"/>
    </svg>
  );
}

function IcoDetector({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
}

function IcoReactor({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="8" rx="6.4" ry="2.6" stroke="currentColor" strokeWidth="1.1" fill="none"/>
      <ellipse cx="8" cy="8" rx="6.4" ry="2.6" stroke="currentColor" strokeWidth="1.1" fill="none" transform="rotate(60 8 8)"/>
      <ellipse cx="8" cy="8" rx="6.4" ry="2.6" stroke="currentColor" strokeWidth="1.1" fill="none" transform="rotate(120 8 8)"/>
      <circle cx="8" cy="8" r="1.4" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────────── */
type FacilityCategory = 'collisionneur' | 'detecteur' | 'reacteur';

interface Facility {
  id: string;
  name: string;
  shortName?: string;
  category: FacilityCategory;
  country: string;
  launched: string;
  location: string;
  scale: string;
  energy: string;
  color: string;
  gradient: string;
  photoUrl?: string;
  status: 'actif' | 'inactif' | 'construction';
  headline: string;
  description: string;
  discoveries: string[];
}

const FACILITIES: Facility[] = [
  /* ── Collisionneurs / accélérateurs ──────────────────────── */
  {
    id: 'lhc',
    name: 'Grand collisionneur de hadrons',
    shortName: 'LHC',
    category: 'collisionneur',
    country: 'CERN (Europe, 23 États membres)',
    launched: '2008',
    location: 'Genève, Suisse / France (100 m sous terre)',
    scale: 'Anneau de 26,7 km',
    energy: '13,6 TeV (collision proton-proton)',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, #1e3a8a, #1e40af)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/CERN_LHC_Tunnel1.jpg',
    status: 'actif',
    headline: 'La machine la plus puissante jamais construite',
    description: 'Le plus grand et plus puissant accélérateur de particules au monde fait circuler des protons à 99,9999991% de la vitesse de la lumière dans un anneau de 27 km, avant de les faire entrer en collision dans quatre détecteurs géants. Ses aimants supraconducteurs sont refroidis à -271°C, plus froid que l\'espace intersidéral.',
    discoveries: [
      'Découverte du boson de Higgs en 2012 (Prix Nobel de physique 2013)',
      'Confirmation du Modèle Standard de la physique des particules avec une précision extrême',
      'Étude du plasma quark-gluon via les collisions d\'ions lourds (plomb-plomb)',
      'Recherche de la supersymétrie et de la matière noire (résultats négatifs à ce jour)',
      'Mesures de la violation CP dans les mésons B, expliquant l\'asymétrie matière-antimatière',
    ],
  },
  {
    id: 'fermilab',
    name: 'Fermilab — Tevatron & Main Injector',
    shortName: 'Fermilab',
    category: 'collisionneur',
    country: 'USA',
    launched: '1983',
    location: 'Batavia, Illinois (65 km de Chicago)',
    scale: 'Anneau de 6,3 km (Tevatron, arrêté 2011)',
    energy: '1,96 TeV (Tevatron, historique)',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #78350f, #b45309)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fermilab-Aerial.jpg',
    status: 'actif',
    headline: 'Le laboratoire américain de la frontière des particules',
    description: 'Fermilab a exploité le Tevatron, deuxième accélérateur le plus puissant du monde jusqu\'à l\'arrivée du LHC. Aujourd\'hui, le laboratoire se concentre sur la physique des neutrinos avec le programme DUNE et l\'accélérateur PIP-II, ainsi que sur la mesure de précision du moment magnétique du muon (expérience Muon g-2).',
    discoveries: [
      'Découverte du quark top en 1995, dernier quark manquant du Modèle Standard',
      'Découverte du neutrino tau en 2000 (expérience DONUT)',
      'Anomalie du moment magnétique du muon (g-2), possible signe de nouvelle physique',
      'Programme DUNE en construction : étude des oscillations de neutrinos sur 1300 km',
    ],
  },
  {
    id: 'slac',
    name: 'SLAC National Accelerator Laboratory',
    shortName: 'SLAC',
    category: 'collisionneur',
    country: 'USA',
    launched: '1962',
    location: 'Menlo Park, Californie',
    scale: 'Accélérateur linéaire de 3,2 km',
    energy: '50 GeV (historique, SLC)',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Slac-aerial.jpg',
    status: 'actif',
    headline: 'Le plus long accélérateur linéaire du monde',
    description: 'SLAC exploite le plus long accélérateur linéaire de particules jamais construit. Après des décennies de physique des hautes énergies, le laboratoire s\'est réorienté vers la source de lumière synchrotron LCLS (laser à électrons libres à rayons X), utilisée pour imager des réactions chimiques et biologiques en temps réel.',
    discoveries: [
      'Preuve expérimentale de l\'existence des quarks (diffusion profondément inélastique, 1968)',
      'Découverte du quark charm (avec Brookhaven) et du lepton tau, 1974-1975',
      'LCLS : premier laser à électrons libres à rayons X durs au monde (2009)',
      'Imagerie femtoseconde de réactions chimiques et de protéines en action',
    ],
  },
  {
    id: 'brookhaven-rhic',
    name: 'Relativistic Heavy Ion Collider',
    shortName: 'RHIC',
    category: 'collisionneur',
    country: 'USA (Brookhaven National Laboratory)',
    launched: '2000',
    location: 'Upton, New York',
    scale: 'Anneau de 3,8 km',
    energy: '200 GeV par paire de nucléons',
    color: '#F472B6',
    gradient: 'linear-gradient(135deg, #831843, #9d174d)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/BNL_RHIC_Aerial.jpg',
    status: 'actif',
    headline: 'Recréer la soupe primordiale de l\'Univers',
    description: 'Le RHIC fait entrer en collision des noyaux lourds (or, uranium) à des vitesses proches de celle de la lumière, recréant brièvement les conditions extrêmes de température et densité qui régnaient quelques microsecondes après le Big Bang : un plasma de quarks et de gluons déconfinés.',
    discoveries: [
      'Première création en laboratoire du plasma quark-gluon (2005)',
      'Le plasma quark-gluon se comporte comme un fluide parfait quasi sans viscosité',
      'Mesures de polarisation du spin dans les collisions d\'ions lourds',
      'Programme sPHENIX : successeur haute précision pour l\'étude du plasma primordial',
    ],
  },
  /* ── Détecteurs / observatoires de physique fondamentale ────── */
  {
    id: 'atlas-cms',
    name: 'Détecteurs ATLAS & CMS',
    shortName: 'ATLAS / CMS',
    category: 'detecteur',
    country: 'CERN (collaboration internationale)',
    launched: '2008',
    location: 'Genève, Suisse (sur l\'anneau du LHC)',
    scale: 'ATLAS : 46 × 25 m, 7000 t',
    energy: 'Résolution au GeV près',
    color: '#34D399',
    gradient: 'linear-gradient(135deg, #064e3b, #065f46)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/CERN_ATLAS_detector.jpg',
    status: 'actif',
    headline: 'Les yeux géants qui ont vu le boson de Higgs',
    description: 'ATLAS et CMS sont deux détecteurs généralistes situés à des points de collision opposés du LHC, conçus indépendamment pour permettre une validation croisée des résultats. Chacun combine calorimètres, trajectographes et aimants supraconducteurs pour reconstruire la trajectoire et l\'énergie de milliards de particules par seconde.',
    discoveries: [
      'Co-découverte indépendante du boson de Higgs, annoncée simultanément en juillet 2012',
      'Mesure précise de la masse du boson de Higgs (~125 GeV)',
      'Recherche de particules supersymétriques et de dimensions supplémentaires',
      'Étude des propriétés du quark top avec une précision inégalée',
    ],
  },
  {
    id: 'ligo',
    name: 'Laser Interferometer Gravitational-Wave Observatory',
    shortName: 'LIGO',
    category: 'detecteur',
    country: 'USA (Caltech / MIT / NSF)',
    launched: '2002 (Advanced LIGO : 2015)',
    location: 'Hanford (WA) & Livingston (LA), USA',
    scale: 'Bras interférométriques de 4 km',
    energy: 'Sensibilité 10⁻¹⁹ m (1/10 000 diamètre proton)',
    color: '#818CF8',
    gradient: 'linear-gradient(135deg, #312e81, #4338ca)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ligo_hanford_aerial.jpg',
    status: 'actif',
    headline: 'Entendre les ondulations de l\'espace-temps',
    description: 'LIGO détecte les infimes déformations de l\'espace-temps causées par les ondes gravitationnelles, prédites par Einstein en 1916. Deux interféromètres laser identiques, séparés de 3000 km, mesurent des variations de longueur mille fois plus petites qu\'un proton, provoquées par la fusion de trous noirs ou d\'étoiles à neutrons à des millions d\'années-lumière.',
    discoveries: [
      'Première détection directe d\'ondes gravitationnelles en 2015, fusion de deux trous noirs (Prix Nobel 2017)',
      'GW170817 : première détection conjointe onde gravitationnelle + lumière (fusion d\'étoiles à neutrons)',
      'Plus de 200 événements de fusion détectés depuis 2015 (avec Virgo et KAGRA)',
      'Confirmation directe de la relativité générale dans le régime des champs forts',
    ],
  },
  {
    id: 'super-kamiokande',
    name: 'Super-Kamiokande',
    shortName: 'Super-K',
    category: 'detecteur',
    country: 'Japon',
    launched: '1996',
    location: 'Mine de Kamioka, Japon (1000 m sous terre)',
    scale: 'Cuve de 50 000 t d\'eau ultra-pure',
    energy: 'Détection de neutrinos MeV–GeV',
    color: '#22D3EE',
    gradient: 'linear-gradient(135deg, #164e63, #0891b2)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Super-Kamiokande.jpg',
    status: 'actif',
    headline: 'Une cathédrale souterraine pour capturer les fantômes de la matière',
    description: 'Enfoui sous une montagne pour se protéger des rayons cosmiques, ce détecteur observe les infimes flashs de lumière Tcherenkov produits quand un neutrino interagit très rarement avec l\'eau ultra-pure. Plus de 11 000 photomultiplicateurs tapissent les parois de la cuve géante.',
    discoveries: [
      'Découverte de l\'oscillation des neutrinos, preuve qu\'ils possèdent une masse (Prix Nobel 2015)',
      'Détection de neutrinos solaires confirmant les modèles de fusion nucléaire stellaire',
      'Observation de neutrinos de la supernova SN 1987A',
      'Recherches en cours sur la désintégration du proton, prédite par les théories de grande unification',
    ],
  },
  {
    id: 'lz',
    name: 'LUX-ZEPLIN',
    shortName: 'LZ',
    category: 'detecteur',
    country: 'USA (collaboration internationale)',
    launched: '2021',
    location: 'Sanford Underground Lab, Dakota du Sud (1478 m)',
    scale: 'Cuve de 7 t de xénon liquide',
    energy: 'Sensibilité record aux WIMPs',
    color: '#FB923C',
    gradient: 'linear-gradient(135deg, #7c2d12, #c2410c)',
    status: 'actif',
    headline: 'La chasse la plus sensible à la matière noire',
    description: 'Installé au fond d\'une ancienne mine d\'or pour se protéger du bruit cosmique, LZ recherche les collisions extrêmement rares entre des particules de matière noire (WIMPs) hypothétiques et des noyaux de xénon liquide ultra-pur. Aucune détection confirmée à ce jour, mais les limites posées contraignent fortement les modèles théoriques.',
    discoveries: [
      'Limites les plus strictes au monde sur la section efficace d\'interaction des WIMPs (2022-2024)',
      'Élimination de larges pans de l\'espace des paramètres des modèles supersymétriques',
      'Techniques de purification du xénon désormais reprises par d\'autres expériences',
    ],
  },
  /* ── Réacteurs / installations de fusion et fission ─────────── */
  {
    id: 'iter',
    name: 'International Thermonuclear Experimental Reactor',
    shortName: 'ITER',
    category: 'reacteur',
    country: 'International (35 pays)',
    launched: 'Construction (premier plasma prévu 2034)',
    location: 'Saint-Paul-lès-Durance, France',
    scale: 'Tokamak de 830 m³ de plasma',
    energy: 'Objectif : Q ≥ 10 (500 MW pour 50 MW injectés)',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #7f1d1d, #b91c1c)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/ITER_construction_2018.jpg',
    status: 'construction',
    headline: 'Recréer artificiellement l\'énergie des étoiles',
    description: 'ITER est le plus grand projet scientifique collaboratif de l\'histoire après la Station spatiale internationale. Ce tokamak géant vise à démontrer la faisabilité de la fusion nucléaire contrôlée à l\'échelle industrielle, en confinant un plasma d\'hydrogène à 150 millions de degrés grâce à des champs magnétiques supraconducteurs.',
    discoveries: [
      'Objectif : premier réacteur à produire plus d\'énergie de fusion qu\'il n\'en consomme (Q≥10)',
      'Développement des plus grands aimants supraconducteurs jamais construits (niobium-étain)',
      'Validation à grande échelle des matériaux résistants au flux de neutrons de fusion',
      'Étape clé avant DEMO, le futur prototype de centrale à fusion commerciale',
    ],
  },
  {
    id: 'nif',
    name: 'National Ignition Facility',
    shortName: 'NIF',
    category: 'reacteur',
    country: 'USA (Lawrence Livermore National Laboratory)',
    launched: '2009',
    location: 'Livermore, Californie',
    scale: '192 faisceaux laser, bâtiment de 10 étages',
    energy: '2,05 MJ délivrés par tir laser',
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nif-target-chamber.jpg',
    status: 'actif',
    headline: 'Le plus grand laser du monde déclenche une fusion',
    description: 'Le NIF concentre 192 faisceaux laser de haute puissance sur une capsule millimétrique de combustible deutérium-tritium, provoquant sa compression et son échauffement jusqu\'à l\'ignition par confinement inertiel — une approche radicalement différente du confinement magnétique d\'ITER.',
    discoveries: [
      'Première ignition par fusion avec gain net d\'énergie en décembre 2022 (3,15 MJ produits pour 2,05 MJ injectés)',
      'Records successifs de gain de fusion en 2023-2024',
      'Données essentielles pour la certification des armes nucléaires sans essais réels',
      'Avancées en physique des plasmas denses et de la matière dans des conditions extrêmes',
    ],
  },
  {
    id: 'jet',
    name: 'Joint European Torus',
    shortName: 'JET',
    category: 'reacteur',
    country: 'Royaume-Uni (consortium européen)',
    launched: '1983 (arrêté 2023)',
    location: 'Culham, Angleterre',
    scale: 'Tokamak de 100 m³ de plasma',
    energy: '69 MJ (record mondial, 2023)',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/JET_interior.jpg',
    status: 'inactif',
    headline: 'Quarante ans de records de fusion par confinement magnétique',
    description: 'Pendant quatre décennies, JET a été le plus grand tokamak opérationnel au monde et le principal précurseur d\'ITER, dont il a validé nombre de choix techniques. Il a détenu le record mondial d\'énergie de fusion produite jusqu\'à sa mise à l\'arrêt définitive en décembre 2023.',
    discoveries: [
      'Record mondial d\'énergie de fusion en régime stable : 69 MJ sur 5 secondes (2023)',
      'Premières expériences de fusion deutérium-tritium à grande échelle (1997, 2021)',
      'Validation des matériaux et scénarios de plasma repris directement par ITER',
      'Trois décennies de données de référence pour la physique des tokamaks',
    ],
  },
  {
    id: 'wendelstein',
    name: 'Wendelstein 7-X',
    shortName: 'W7-X',
    category: 'reacteur',
    country: 'Allemagne (Max Planck Institute)',
    launched: '2015',
    location: 'Greifswald, Allemagne',
    scale: 'Stellarator, plasma de 30 m³',
    energy: 'Plasma maintenu > 8 minutes (record stellarator)',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #4c1d95, #5b21b6)',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wendelstein_7-X_Spulen.jpg',
    status: 'actif',
    headline: 'La voie alternative du stellarator vers la fusion',
    description: 'Contrairement au tokamak, le stellarator confine le plasma grâce à des bobines magnétiques torsadées de géométrie extrêmement complexe, calculées par supercalculateur, sans nécessiter de courant électrique circulant dans le plasma — ce qui promet une stabilité intrinsèquement meilleure pour un fonctionnement continu.',
    discoveries: [
      'Record de durée de plasma pour un stellarator : plus de 8 minutes en 2023',
      'Démonstration que la géométrie optimisée réduit fortement les pertes d\'énergie',
      'Validation du concept stellarator comme alternative crédible au tokamak',
    ],
  },
];

/* ── Card ──────────────────────────────────────────────────── */
function FacilityCard({ f, onClick }: { f: Facility; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const Icon = f.category === 'collisionneur' ? IcoRing : f.category === 'detecteur' ? IcoDetector : IcoReactor;

  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-2xl border transition-all duration-300 hover:scale-[1.02] focus:outline-none overflow-hidden cursor-pointer"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${f.color}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${f.color}14`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        {f.photoUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={f.photoUrl}
            alt={f.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20" style={{ background: f.gradient }}>
            <Icon size={56} />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#020817] via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              f.status === 'actif'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : f.status === 'construction'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            {f.status === 'construction' ? 'En construction' : f.status}
          </span>
        </div>

        {/* Short name */}
        <div className="absolute bottom-2 left-3">
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded"
            style={{ background: 'rgba(2,8,23,0.8)', color: f.color }}
          >
            {f.shortName ?? f.name}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3
          className="text-sm font-bold text-white leading-tight mb-1"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {f.name}
        </h3>
        <p className="text-[11px] text-gray-600 mb-2">{f.headline}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-[10px] text-gray-600 flex items-center gap-1">
            <IcoPin size={10} /> <span className="text-gray-500">{f.location}</span>
          </span>
          <span className="text-[10px] text-gray-600">
            <span className="text-gray-500">{f.scale}</span>
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Modal ─────────────────────────────────────────────────── */
function FacilityModal({ f, onClose }: { f: Facility; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const Icon = f.category === 'collisionneur' ? IcoRing : f.category === 'detecteur' ? IcoDetector : IcoReactor;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const categoryLabel = f.category === 'collisionneur' ? 'Collisionneur / accélérateur' : f.category === 'detecteur' ? 'Détecteur' : 'Réacteur expérimental';

  return (
    <div
      className="fixed mt-16 inset-0 z-50 flex items-center justify-center p-4 mt-10"
      style={{ background: 'rgba(2,8,23,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border"
        style={{
          background: '#0a0f1e',
          borderColor: `${f.color}40`,
          boxShadow: `0 0 80px ${f.color}18`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl">
          {f.photoUrl && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={f.photoUrl}
              alt={f.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20" style={{ background: f.gradient }}>
              <Icon size={80} />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(2,8,23,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            ✕
          </button>

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  f.status === 'actif'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : f.status === 'construction'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}
              >
                {f.status === 'construction' ? 'En construction' : f.status}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${f.color}15`, color: f.color }}
              >
                {categoryLabel}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "'Exo 2', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
            >
              {f.name}
            </h2>
            {f.shortName && (
              <p className="text-sm font-mono mt-0.5" style={{ color: f.color }}>{f.shortName}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Pays / Agences', value: f.country },
              { label: 'Lancé / Inauguré', value: f.launched },
              { label: 'Localisation', value: f.location },
              { label: 'Échelle', value: f.scale },
              { label: 'Énergie / Sensibilité', value: f.energy },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-xl px-3 py-2.5"
                style={{ background: `${f.color}0A`, border: `1px solid ${f.color}20` }}
              >
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: `${f.color}90` }}>
                  {s.label}
                </div>
                <div className="text-sm font-semibold text-white leading-snug">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{f.description}</p>
          </div>

          {/* Discoveries */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              {f.status === 'construction' ? 'Objectifs scientifiques' : 'Découvertes majeures'}
            </h3>
            <div className="space-y-2">
              {f.discoveries.map((d, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: f.color }}
                  />
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
const CATEGORY_FILTERS: { id: FacilityCategory | 'all'; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'all', label: 'Tous', Icon: RadiationIcon },
  { id: 'collisionneur', label: 'Collisionneurs', Icon: IcoRing },
  { id: 'detecteur', label: 'Détecteurs', Icon: IcoDetector },
  { id: 'reacteur', label: 'Réacteurs', Icon: IcoReactor },
];

const CATEGORY_SECTIONS: { id: FacilityCategory; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'collisionneur', label: 'Collisionneurs & Accélérateurs', Icon: IcoRing },
  { id: 'detecteur', label: 'Détecteurs & Observatoires', Icon: IcoDetector },
  { id: 'reacteur', label: 'Réacteurs Expérimentaux', Icon: IcoReactor },
];

export default function AtomInstrumentsPage() {
  const [filter, setFilter] = useState<FacilityCategory | 'all'>('all');
  const [selected, setSelected] = useState<Facility | null>(null);

  return (
    <AtomicLayout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/atoms" className="hover:text-white transition-colors">Atomes</Link>
          <span>›</span>
          <span className="text-gray-400">Accélérateurs</span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Accélérateurs de particules
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Du tunnel de 27 km du LHC aux détecteurs enfouis sous des montagnes — les grands instruments
            qui explorent la structure de la matière, du boson de Higgs à la fusion nucléaire.
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as FacilityCategory | 'all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filter === f.id
                  ? 'bg-white/8 text-white border-white/20 scale-105'
                  : 'border-white/8 text-gray-500 hover:text-white hover:border-white/15'
              }`}
            >
              <f.Icon size={14} />
              {f.label}
              <span className="text-xs opacity-60 font-mono">
                {f.id === 'all' ? FACILITIES.length : FACILITIES.filter(x => x.category === f.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Sections by category */}
        {CATEGORY_SECTIONS.filter(s => filter === 'all' || filter === s.id).map(section => (
          <div key={section.id} className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-bold flex items-center gap-1.5">
              <section.Icon size={12} /> {section.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FACILITIES.filter(f => f.category === section.id).map(f => (
                <FacilityCard key={f.id} f={f} onClick={() => setSelected(f)} />
              ))}
            </div>
          </div>
        ))}

        {/* Comparison stats — energy scale */}
        <div
          className="rounded-2xl border border-white/8 p-6"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-5">La Course aux Hautes Énergies</h3>
          <div className="space-y-3">
            {[
              { name: 'LHC', energy: 13.6, color: '#60A5FA', unit: 'TeV' },
              { name: 'Tevatron', energy: 1.96, color: '#F59E0B', unit: 'TeV' },
              { name: 'RHIC', energy: 0.2, color: '#F472B6', unit: 'TeV' },
              { name: 'SLC (SLAC)', energy: 0.05, color: '#A78BFA', unit: 'TeV' },
            ].map(t => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-28 shrink-0 text-right font-mono">{t.name}</span>
                <div className="flex-1 h-4 bg-white/4 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(t.energy / 13.6) * 100}%`,
                      background: `linear-gradient(to right, ${t.color}88, ${t.color})`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-500 w-16 shrink-0" style={{ color: t.color }}>
                  {t.energy} {t.unit}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-600 mt-4">
            Énergie de collision au centre de masse. Le LHC reste la machine la plus puissante jamais construite,
            près de 7 fois plus énergétique que le Tevatron, son plus proche rival historique.
          </p>
        </div>

      </div>

      {selected && <FacilityModal f={selected} onClose={() => setSelected(null)} />}
    </AtomicLayout>
  );
}
