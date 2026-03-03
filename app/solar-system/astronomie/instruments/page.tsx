'use client';
// app/solar-system/astronomie/instruments/page.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';

type InstrumentCategory = 'spatial' | 'terrestre';

interface Instrument {
  id: string;
  name: string;
  shortName?: string;
  category: InstrumentCategory;
  country: string;
  launched: string;
  location: string;
  aperture: string;
  wavelength: string;
  color: string;
  gradient: string;
  photoUrl?: string;
  status: 'actif' | 'inactif' | 'construction';
  headline: string;
  description: string;
  discoveries: string[];
}

const INSTRUMENTS: Instrument[] = [
  /* ── Spatiaux ─────────────────────────────────────────── */
  {
    id: 'hubble',
    name: 'Télescope Spatial Hubble',
    shortName: 'HST',
    category: 'spatial',
    country: 'USA / ESA',
    launched: '1990',
    location: 'Orbite basse (~540 km)',
    aperture: '2,4 m',
    wavelength: 'Visible · UV · IR proche',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, #1e40af, #0e7490)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HST-SM4.jpeg/800px-HST-SM4.jpeg',
    status: 'actif',
    headline: 'Plus de 30 ans de révolutions visuelles',
    description: 'Lancé en 1990 par la navette Discovery, Hubble a révolutionné l\'astronomie malgré un miroir initialement défectueux (corrigé en 1993). Ses images ont mesuré la constante de Hubble, confirmé l\'énergie noire et révélé des galaxies à des milliards d\'années-lumière.',
    discoveries: [
      'Mesure précise du taux d\'expansion de l\'Univers (constante de Hubble)',
      'Confirmation de l\'accélération de l\'expansion cosmique (Prix Nobel 2011)',
      'Hubble Deep Field : des milliers de galaxies dans une zone vide apparente',
      'Atmosphères d\'exoplanètes analysées en spectroscopie de transit',
      'Trou noir supermassif détecté dans presque toutes les grandes galaxies',
    ],
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    shortName: 'JWST',
    category: 'spatial',
    country: 'NASA / ESA / CSA',
    launched: '2021',
    location: 'Point de Lagrange L2 (1,5 M km)',
    aperture: '6,5 m',
    wavelength: 'Infrarouge moyen et lointain',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #78350f, #b45309)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/NASA_Webb_Telescope_in_Space.jpg/800px-NASA_Webb_Telescope_in_Space.jpg',
    status: 'actif',
    headline: 'Voir les premières lumières de l\'Univers',
    description: 'Successeur infrarouge de Hubble, JWST observe l\'Univers en infrarouge grâce à ses 18 segments hexagonaux en béryllium dorés. Placé au point L2, il est protégé par un écran solaire de la taille d\'un court de tennis. Il observe des galaxies formées 300 millions d\'années après le Big Bang.',
    discoveries: [
      'Galaxies à z>10 : Univers vieux de seulement 300 Ma après le Big Bang',
      'Atmosphères d\'exoplanètes avec vapeur d\'eau, CO₂ et méthane détectés',
      'Images détaillées des Piliers de la Création (Eagle Nebula, M16)',
      'Première image directe d\'une exoplanète en infrarouge (HIP 65426 b)',
      'Structure interne de galaxies spirales résolue à des milliards d\'al',
    ],
  },
  {
    id: 'chandra',
    name: 'Observatoire Chandra X',
    shortName: 'CXO',
    category: 'spatial',
    country: 'NASA',
    launched: '1999',
    location: 'Orbite elliptique (~140 000 km)',
    aperture: '1,2 m',
    wavelength: 'Rayons X',
    color: '#F472B6',
    gradient: 'linear-gradient(135deg, #831843, #9d174d)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Chandra_x-ray_telescope.jpg/800px-Chandra_x-ray_telescope.jpg',
    status: 'actif',
    headline: 'Explorer l\'Univers violent des rayons X',
    description: 'Chandra observe le cosmos dans les rayons X émis par les gaz ultra-chauds (millions de degrés). Il cartographie les trous noirs, restes de supernovae et plasma des amas de galaxies. Sa résolution angulaire est 8 fois supérieure à celle de ses prédécesseurs.',
    discoveries: [
      'Mesure de la température des gaz autour des trous noirs actifs',
      'Détection de la matière noire via la collision d\'amas de galaxies (Bullet Cluster)',
      'Restes de supernovae cartographiés avec une précision milliarcseconde',
      'Sagittarius A* observé en éruptions X : le trou noir du centre galactique',
    ],
  },
  {
    id: 'fermi',
    name: 'Télescope Fermi Gamma-ray',
    shortName: 'Fermi',
    category: 'spatial',
    country: 'NASA / ESA / JAXA',
    launched: '2008',
    location: 'Orbite basse (~550 km)',
    aperture: 'Détecteur 1,8 m²',
    wavelength: 'Rayons gamma',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
    status: 'actif',
    headline: 'Cartographier les sources d\'énergie extrême',
    description: 'Fermi cartographie le ciel en rayons gamma, les photons les plus énergétiques du spectre électromagnétique. Il détecte sursauts gamma (GRB), pulsars, noyaux actifs de galaxies (AGN) et cherche des signatures de matière noire.',
    discoveries: [
      'Catalogue de plus de 5 000 sources gamma dont pulsars et blazars',
      'Sursauts gamma détectés à des milliards d\'années-lumière',
      'Bulles de Fermi : deux structures géantes au-dessus/dessous du centre galactique',
      'Contraintes sur la nature des particules de matière noire',
    ],
  },
  {
    id: 'tess',
    name: 'TESS',
    shortName: 'TESS',
    category: 'spatial',
    country: 'NASA',
    launched: '2018',
    location: 'Orbite P/2',
    aperture: '4 × 10 cm',
    wavelength: 'Visible · IR proche',
    color: '#34D399',
    gradient: 'linear-gradient(135deg, #064e3b, #065f46)',
    status: 'actif',
    headline: 'Chasseur d\'exoplanètes du voisinage solaire',
    description: 'Transiting Exoplanet Survey Satellite surveille 85% du ciel en détectant des transits planétaires. Son champ est 400 fois supérieur à Kepler, ciblant les étoiles brillantes proches pour faciliter le suivi spectroscopique.',
    discoveries: [
      'Plus de 7 000 candidats exoplanètes et 400 confirmées',
      'TOI-700d : exoplanète de taille terrestre en zone habitable',
      'Systèmes multi-planétaires autour d\'étoiles brillantes proches',
      'Sursauts stellaires et variations de luminosité de milliers d\'étoiles',
    ],
  },
  /* ── Terrestres ───────────────────────────────────────── */
  {
    id: 'vlt',
    name: 'Very Large Telescope',
    shortName: 'VLT',
    category: 'terrestre',
    country: 'ESO (Europe)',
    launched: '1998–2001',
    location: 'Paranal, Chili (2 635 m)',
    aperture: '4 × 8,2 m (+ 4 × 1,8 m)',
    wavelength: 'Visible · UV · IR',
    color: '#34D399',
    gradient: 'linear-gradient(135deg, #064e3b, #065f46)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/ESO-VLT-Laser-phot-0a-99.jpg/800px-ESO-VLT-Laser-phot-0a-99.jpg',
    status: 'actif',
    headline: 'Quatre miroirs géants sur le désert d\'Atacama',
    description: 'Le VLT de l\'ESO sur le Cerro Paranal est l\'observatoire optique le plus productif du monde en publications scientifiques. Ses quatre télescopes de 8,2 m peuvent être utilisés séparément ou combinés en interférométrie (VLTI) pour atteindre une résolution équivalente à un miroir de 130 m.',
    discoveries: [
      'Première image directe d\'une exoplanète (2M1207b, 2004)',
      'Orbites des étoiles autour de Sgr A* au centre galactique (Prix Nobel 2020)',
      'Composition des atmosphères d\'exoplanètes en spectroscopie',
      'Explosion de la supernova SN 1987A suivie depuis 30 ans',
    ],
  },
  {
    id: 'alma',
    name: 'ALMA',
    shortName: 'ALMA',
    category: 'terrestre',
    country: 'ESO / NRAO / NAOJ',
    launched: '2011',
    location: 'Llano de Chajnantor, Chili (5 058 m)',
    aperture: '66 antennes (12 m et 7 m)',
    wavelength: 'Millimétrique · Submillimétrique',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #4c1d95, #5b21b6)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/ALMA_-_a_view_from_a_distance_to_the_antennas.jpg/800px-ALMA_-_a_view_from_a_distance_to_the_antennas.jpg',
    status: 'actif',
    headline: 'Voir la naissance des étoiles et planètes',
    description: 'L\'Atacama Large Millimeter/submillimeter Array est le plus grand radiotélescope millimétrique du monde. Situé sur le plus haut plateau sec de la Terre, il observe la poussière froide, les molécules organiques et les disques protoplanétaires avec une résolution sans précédent.',
    discoveries: [
      'Disques protoplanétaires détaillés autour d\'étoiles jeunes (HL Tau)',
      'Molécules organiques complexes dans des nuages moléculaires',
      'Image de Sgr A* et M87* en collaboration avec l\'EHT',
      'Galaxies à très grand décalage spectral et formation stellaire primordiale',
      'Première détection de phosphore dans une région de formation stellaire',
    ],
  },
  {
    id: 'eso-lasilla',
    name: 'Observatoire La Silla',
    shortName: 'La Silla',
    category: 'terrestre',
    country: 'ESO (Europe)',
    launched: '1969',
    location: 'La Silla, Chili (2 400 m)',
    aperture: 'Plusieurs télescopes (3,6 m principal)',
    wavelength: 'Visible · IR · UV',
    color: '#FB923C',
    gradient: 'linear-gradient(135deg, #7c2d12, #92400e)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/The_Danish_1.54-metre_telescope_at_La_Silla.jpg/800px-The_Danish_1.54-metre_telescope_at_La_Silla.jpg',
    status: 'actif',
    headline: 'Le pionnier des observatoires chiliens de l\'ESO',
    description: 'Premier observatoire de l\'ESO au Chili, La Silla abrite une douzaine de télescopes dont le NTT (New Technology Telescope, 3,5 m), pionnier en optique active. L\'instrument HARPS y a découvert des centaines d\'exoplanètes.',
    discoveries: [
      'HARPS : l\'instrument le plus précis pour la mesure de vitesses radiales stellaires',
      'Plus de 1 000 exoplanètes découvertes ou caractérisées',
      'Découverte de Proxima b, planète en zone habitable de l\'étoile la plus proche',
      'NTT : premier télescope à utiliser l\'optique active (miroir à contrôle actif)',
    ],
  },
  {
    id: 'keck',
    name: 'Observatoire W. M. Keck',
    shortName: 'Keck',
    category: 'terrestre',
    country: 'USA',
    launched: '1993 / 1996',
    location: 'Mauna Kea, Hawaï (4 145 m)',
    aperture: '2 × 10 m (36 segments)',
    wavelength: 'Visible · IR',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Keck_Observatory.jpg/800px-Keck_Observatory.jpg',
    status: 'actif',
    headline: 'Les miroirs segmentés pionniers du Mauna Kea',
    description: 'Les deux télescopes Keck avec leurs miroirs hexagonaux segmentés de 10 m ont été pendant deux décennies les plus grands télescopes optiques du monde. Ils utilisent l\'optique adaptative pour corriger la turbulence atmosphérique en temps réel.',
    discoveries: [
      'Confirmation de l\'orbite de S2 autour de Sgr A* (trou noir galactique)',
      'Spectroscopie de quasars les plus distants connus',
      'Composition d\'atmosphères de lunes du système solaire (Titan, Io)',
      'Atmosphères d\'exoplanètes parmi les premières caractérisées',
    ],
  },
  {
    id: 'elt',
    name: 'Extremely Large Telescope',
    shortName: 'ELT',
    category: 'terrestre',
    country: 'ESO (Europe)',
    launched: 'En construction (2028)',
    location: 'Cerro Armazones, Chili (3 046 m)',
    aperture: '39 m (798 segments)',
    wavelength: 'Visible · IR',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
    status: 'construction',
    headline: 'Le plus grand œil jamais braqué vers le ciel',
    description: 'L\'ELT sera le plus grand télescope optique/IR terrestre jamais construit. Son miroir de 39 m composé de 798 segments hexagonaux lui donnera une puissance de collecte 13 fois supérieure au VLT. L\'optique adaptative à 5 miroirs permettra de dépasser la résolution du JWST.',
    discoveries: [
      'Objectif : imager directement des exoplanètes de type terrestre en zone habitable',
      'Atmosphères d\'exoplanètes analysées à haute résolution spectrale',
      'Premières étoiles de l\'Univers et réionisation cosmique',
      'Matière noire et énergie noire via les vitesses de récession cosmiques',
    ],
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon Telescope',
    shortName: 'EHT',
    category: 'terrestre',
    country: 'International (230 chercheurs)',
    launched: '2006',
    location: 'Réseau mondial (8 observatoires)',
    aperture: 'Diamètre de la Terre (~12 700 km)',
    wavelength: 'Millimétrique (1,3 mm)',
    color: '#FB923C',
    gradient: 'linear-gradient(135deg, #7c2d12, #c2410c)',
    status: 'actif',
    headline: 'Photographier l\'ombre d\'un trou noir',
    description: 'L\'EHT est un réseau mondial de radiotélescopes fonctionnant en interférométrie très longue base (VLBI). En combinant les signaux de 8 observatoires du Pôle Sud au Groenland, il crée effectivement un radiotélescope de la taille de la Terre.',
    discoveries: [
      '2019 : Première image d\'un trou noir — M87*, 6,5 milliards de masses solaires',
      '2022 : Première image de Sgr A*, le trou noir central de la Voie Lactée (4 M M☉)',
      'Confirmation de la relativité générale d\'Einstein à l\'échelle d\'un trou noir',
      'Structure de l\'ombre et du disque d\'accrétion observable directement',
    ],
  },
];

/* ── Card ──────────────────────────────────────────────────── */
function InstrumentCard({ inst, onClick }: { inst: Instrument; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-2xl border transition-all duration-300 hover:scale-[1.02] focus:outline-none overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${inst.color}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${inst.color}14`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        {inst.photoUrl && !imgError ? (
          <Image
            src={inst.photoUrl}
            alt={inst.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: inst.gradient }}>
            <span className="text-6xl opacity-20">
              {inst.category === 'spatial' ? '🛸' : '🔭'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#020817] via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              inst.status === 'actif'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : inst.status === 'construction'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            {inst.status === 'construction' ? 'En construction' : inst.status}
          </span>
        </div>

        {/* Short name */}
        <div className="absolute bottom-2 left-3">
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded"
            style={{ background: 'rgba(2,8,23,0.8)', color: inst.color }}
          >
            {inst.shortName ?? inst.name}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3
          className="text-sm font-bold text-white leading-tight mb-1"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {inst.name}
        </h3>
        <p className="text-[11px] text-gray-600 mb-2">{inst.headline}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-[10px] text-gray-600">
            📍 <span className="text-gray-500">{inst.location}</span>
          </span>
          <span className="text-[10px] text-gray-600">
            🪞 <span className="text-gray-500">{inst.aperture}</span>
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Modal ─────────────────────────────────────────────────── */
function InstrumentModal({ inst, onClose }: { inst: Instrument; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,8,23,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border"
        style={{
          background: '#0a0f1e',
          borderColor: `${inst.color}40`,
          boxShadow: `0 0 80px ${inst.color}18`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl">
          {inst.photoUrl && !imgError ? (
            <Image
              src={inst.photoUrl}
              alt={inst.name}
              fill
              unoptimized
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="768px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: inst.gradient }}>
              <span className="text-[7rem] opacity-20">
                {inst.category === 'spatial' ? '🛸' : '🔭'}
              </span>
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
                  inst.status === 'actif'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : inst.status === 'construction'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}
              >
                {inst.status === 'construction' ? 'En construction' : inst.status}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${inst.color}15`, color: inst.color }}
              >
                {inst.category === 'spatial' ? 'Télescope spatial' : 'Observatoire terrestre'}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "'Exo 2', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
            >
              {inst.name}
            </h2>
            {inst.shortName && (
              <p className="text-sm font-mono mt-0.5" style={{ color: inst.color }}>{inst.shortName}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Pays / Agences', value: inst.country },
              { label: 'Lancé / Inauguré', value: inst.launched },
              { label: 'Localisation', value: inst.location },
              { label: 'Ouverture', value: inst.aperture },
              { label: 'Domaine spectral', value: inst.wavelength },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-xl px-3 py-2.5"
                style={{ background: `${inst.color}0A`, border: `1px solid ${inst.color}20` }}
              >
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: `${inst.color}90` }}>
                  {s.label}
                </div>
                <div className="text-sm font-semibold text-white leading-snug">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{inst.description}</p>
          </div>

          {/* Discoveries */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              {inst.status === 'construction' ? 'Objectifs scientifiques' : 'Découvertes majeures'}
            </h3>
            <div className="space-y-2">
              {inst.discoveries.map((d, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: inst.color }}
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
const CATEGORY_FILTERS: { id: InstrumentCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Tous', icon: '🔭' },
  { id: 'spatial', label: 'Spatiaux', icon: '🛸' },
  { id: 'terrestre', label: 'Terrestres', icon: '🏔️' },
];

export default function InstrumentsPage() {
  const [filter, setFilter] = useState<InstrumentCategory | 'all'>('all');
  const [selected, setSelected] = useState<Instrument | null>(null);

  const filtered = filter === 'all' ? INSTRUMENTS : INSTRUMENTS.filter(i => i.category === filter);

  return (
    <SolarLayout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/solar-system/astronomie" className="hover:text-white transition-colors">Astronomie</Link>
          <span>›</span>
          <span className="text-gray-400">Observatoires</span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Observatoires & Instruments
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Du miroir doré de 6,5 m du James Webb au réseau mondial de l&apos;Event Horizon Telescope —
            les instruments qui ont transformé notre compréhension de l&apos;Univers.
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as InstrumentCategory | 'all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filter === f.id
                  ? 'bg-white/8 text-white border-white/20 scale-105'
                  : 'border-white/8 text-gray-500 hover:text-white hover:border-white/15'
              }`}
            >
              <span>{f.icon}</span>
              {f.label}
              <span className="text-xs opacity-60 font-mono">
                {f.id === 'all' ? INSTRUMENTS.length : INSTRUMENTS.filter(i => i.category === f.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Space telescopes section */}
        {(filter === 'all' || filter === 'spatial') && (
          <div className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-bold">
              🛸 Télescopes Spatiaux
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(filter === 'all' ? INSTRUMENTS.filter(i => i.category === 'spatial') : filtered).map(inst => (
                <InstrumentCard key={inst.id} inst={inst} onClick={() => setSelected(inst)} />
              ))}
            </div>
          </div>
        )}

        {/* Ground observatories section */}
        {(filter === 'all' || filter === 'terrestre') && (
          <div className="mb-10">
            <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-bold">
              🏔️ Observatoires Terrestres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(filter === 'all' ? INSTRUMENTS.filter(i => i.category === 'terrestre') : filtered).map(inst => (
                <InstrumentCard key={inst.id} inst={inst} onClick={() => setSelected(inst)} />
              ))}
            </div>
          </div>
        )}

        {/* Comparison stats */}
        <div
          className="rounded-2xl border border-white/8 p-6"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-5">La Course aux Miroirs Géants</h3>
          <div className="space-y-3">
            {[
              { name: 'ELT (2028)', aperture: 39, color: '#F59E0B' },
              { name: 'GMT (2029)', aperture: 24.5, color: '#FB923C' },
              { name: 'TMT (futur)', aperture: 30, color: '#F472B6' },
              { name: 'Keck I & II', aperture: 10, color: '#60A5FA' },
              { name: 'VLT (×4)', aperture: 8.2, color: '#34D399' },
              { name: 'JWST', aperture: 6.5, color: '#F59E0B' },
              { name: 'Hubble', aperture: 2.4, color: '#60A5FA' },
            ].map(t => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-28 shrink-0 text-right font-mono">{t.name}</span>
                <div className="flex-1 h-4 bg-white/4 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(t.aperture / 39) * 100}%`,
                      background: `linear-gradient(to right, ${t.color}88, ${t.color})`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-500 w-12 shrink-0" style={{ color: t.color }}>
                  {t.aperture} m
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {selected && <InstrumentModal inst={selected} onClose={() => setSelected(null)} />}
    </SolarLayout>
  );
}
