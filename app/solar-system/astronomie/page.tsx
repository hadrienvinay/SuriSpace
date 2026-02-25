// app/solar-system/astronomie/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Astronomie',
  description: "Histoire de l'astronomie de l'Antiquité à l'ère spatiale, instruments à travers le temps, catalogue Messier et grands observatoires.",
  keywords: ['astronomie', 'histoire de l\'astronomie', 'catalogue Messier', 'observatoires', 'JWST', 'Hubble', 'télescopes'],
  openGraph: {
    title: 'Astronomie | Suri Space',
    description: "De Galilée au JWST — histoire, instruments et découvertes de l'astronomie.",
    url: 'https://surispace.fr/solar-system/astronomie',
  },
};
import SolarLayout from '@/components/SolarLayout';

const TIMELINE = [
  {
    era: 'Antiquité',
    period: '~3000 – 200 av. J.C.',
    color: '#F59E0B',
    events: [
      { year: '~3000 av. J.C.', text: 'Les Babyloniens cataloguent les étoiles, prédisent les éclipses et inventent le zodiaque.' },
      { year: '~585 av. J.C.', text: 'Thalès de Milet prédit la première éclipse solaire documentée en Occident.' },
      { year: '~270 av. J.C.', text: 'Aristarque de Samos propose le premier modèle héliocentrique — 1 800 ans avant Copernic.' },
      { year: '~240 av. J.C.', text: 'Ératosthène mesure la circonférence de la Terre avec une précision de 2% grâce à des ombres.' },
      { year: '~127 ap. J.C.', text: 'Ptolémée publie l\'Almageste, modèle géocentrique qui domine l\'astronomie pendant 14 siècles.' },
    ],
  },
  {
    era: 'Renaissance scientifique',
    period: '1543 – 1700',
    color: '#34D399',
    events: [
      { year: '1543', text: 'Copernic publie son modèle héliocentrique dans "De revolutionibus" — révolution scientifique.' },
      { year: '1609', text: 'Galilée oriente sa lunette vers le ciel : lunes de Jupiter, phases de Vénus, montagnes lunaires.' },
      { year: '1609–1619', text: 'Kepler formule ses trois lois des orbites planétaires à partir des observations de Tycho Brahe.' },
      { year: '1687', text: 'Newton publie les Principia : gravitation universelle et mécanique céleste.' },
    ],
  },
  {
    era: 'Ère Classique',
    period: '1781 – 1929',
    color: '#60A5FA',
    events: [
      { year: '1781', text: 'Herschel découvre Uranus — première planète découverte à l\'instrument optique.' },
      { year: '1781', text: 'Charles Messier publie son catalogue de 110 nébuleuses et amas pour éviter les confusions.' },
      { year: '1846', text: 'Neptune prédit par calcul (Le Verrier) et observé par Galle — triomphe de la mécanique céleste.' },
      { year: '1916', text: 'Einstein publie la relativité générale, base théorique de la cosmologie moderne.' },
      { year: '1924', text: 'Hubble prouve qu\'Andromède est une galaxie distincte, révélant l\'immensité de l\'Univers.' },
      { year: '1929', text: 'Hubble découvre la relation vitesse–distance : l\'Univers est en expansion.' },
    ],
  },
  {
    era: 'Ère Spatiale',
    period: '1957 – aujourd\'hui',
    color: '#A78BFA',
    events: [
      { year: '1957', text: 'Spoutnik 1, premier satellite artificiel, ouvre l\'astronomie spatiale.' },
      { year: '1965', text: 'Penzias & Wilson détectent le fond diffus cosmologique — preuve du Big Bang.' },
      { year: '1990', text: 'Lancement du télescope spatial Hubble — début d\'une révolution visuelle.' },
      { year: '1998', text: 'Deux équipes découvrent l\'accélération de l\'expansion cosmique — l\'énergie noire.' },
      { year: '2015', text: 'LIGO détecte les premières ondes gravitationnelles (fusion de trous noirs) — nouveau sens de l\'Univers.' },
      { year: '2019', text: 'Première image d\'un trou noir (M87*) par l\'Event Horizon Telescope — 230 chercheurs, 8 radiotélescopes.' },
      { year: '2021', text: 'Lancement du James Webb Space Telescope : miroir de 6,5 m, vision infrarouge.' },
      { year: '2022', text: 'JWST révèle les premières images de galaxies formées 300 millions d\'années après le Big Bang.' },
    ],
  },
];

const INSTRUMENTS = [
  {
    name: 'Œil nu',
    period: 'Préhistoire – 1608',
    icon: '👁️',
    color: '#F59E0B',
    description: 'Les civilisations anciennes cartographiaient le ciel avec une précision surprenante. Stonehenge, les pyramides et les observatoires aztèques témoignent d\'une astronomie sophistiquée sans optique.',
  },
  {
    name: 'Lunette astronomique',
    period: '1608 – 1800',
    icon: '🔭',
    color: '#34D399',
    description: 'Inventée par Lipperhey en 1608, perfectionnée par Galilée. Elle révolutionne l\'astronomie : lunes de Jupiter, phases de Vénus, taches solaires. Les lunettes atteignent plusieurs mètres de longueur focale.',
  },
  {
    name: 'Télescope réflecteur',
    period: '1668 – aujourd\'hui',
    icon: '🪞',
    color: '#60A5FA',
    description: 'Inventé par Newton en 1668, il utilise des miroirs au lieu de lentilles. Permet des diamètres bien plus grands : les télescopes modernes atteignent 10 m (Keck) et bientôt 39 m (ELT).',
  },
  {
    name: 'Spectroscopie & photographie',
    period: '1840 – 1960',
    icon: '📷',
    color: '#F472B6',
    description: 'La spectroscopie analyse la composition chimique des étoiles à distance. La photographie remplace l\'observation visuelle et révèle des objets impossibles à voir à l\'œil nu lors de longues poses.',
  },
  {
    name: 'Radiotélescope',
    period: '1937 – aujourd\'hui',
    icon: '📡',
    color: '#A78BFA',
    description: 'Grote Reber construit le premier radiotélescope en 1937. L\'astronomie radio révèle pulsars, quasars, CMB, et permet d\'imager le centre galactique caché par la poussière optique.',
  },
  {
    name: 'Télescopes spatiaux',
    period: '1990 – aujourd\'hui',
    icon: '🛸',
    color: '#FB923C',
    description: 'Au-dessus de l\'atmosphère, les instruments observent en UV, X, infrarouge et gamma sans turbulence. Hubble (1990), Chandra (X), Spitzer (IR), Fermi (γ) et James Webb (IR, 2021) ont chacun redéfini l\'astronomie.',
  },
];

export default function AstronomieHub() {
  return (
    <SolarLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <span className="text-gray-400">Astronomie</span>
        </div>

        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="text-7xl mb-5" style={{ filter: 'drop-shadow(0 0 30px #A78BFA)' }}>🔭</div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Astronomie
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            La plus ancienne des sciences — l&apos;étude des corps célestes, de leurs mouvements, compositions et origines.
            De l&apos;œil nu de Galilée aux miroirs de 39 mètres de l&apos;ELT, l&apos;humanité n&apos;a cessé d&apos;agrandir sa fenêtre sur l&apos;univers.
          </p>
        </div>

        {/* What is astronomy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {[
            {
              icon: '🌌',
              title: 'Science des distances',
              text: 'L\'astronomie mesure des distances allant de quelques milliers à des milliards d\'années-lumière, en utilisant parallaxe, céphéides et supernovae comme échelle cosmique.',
              color: '#60A5FA',
            },
            {
              icon: '⚗️',
              title: 'Astrophysique',
              text: 'En combinant physique, chimie et mathématiques, l\'astrophysique explique la naissance des étoiles, la fusion nucléaire solaire et la formation des systèmes planétaires.',
              color: '#34D399',
            },
            {
              icon: '🕰️',
              title: 'Machine à remonter le temps',
              text: 'Regarder loin dans l\'espace, c\'est regarder loin dans le passé. Le JWST observe des galaxies telles qu\'elles étaient 13,6 milliards d\'années en arrière.',
              color: '#A78BFA',
            },
          ].map(item => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/8 p-5"
              style={{ background: `${item.color}08` }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-xl mb-2" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-md text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-14">
          <h2 className="text-md font-bold tracking-widest uppercase text-gray-500 mb-8">
            Histoire de l&apos;Astronomie
          </h2>
          <div className="space-y-8">
            {TIMELINE.map(era => (
              <div key={era.era}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: era.color }} />
                  <h3
                    className="font-bold text-base"
                    style={{ color: era.color, fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {era.era}
                  </h3>
                  <span className="text-sm text-gray-600 font-mono">{era.period}</span>
                </div>
                <div className="ml-5 border-l border-white/8 pl-5 space-y-3">
                  {era.events.map(ev => (
                    <div key={ev.text} className="flex gap-3 items-start">
                      <span
                        className="text-sm font-mono shrink-0 mt-0.5"
                        style={{ color: `${era.color}80`, minWidth: '7rem' }}
                      >
                        {ev.year}
                      </span>
                      <p className="text-md text-gray-400 leading-relaxed">{ev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instruments through time */}
        <div className="mb-14">
          <h2 className="text-md font-bold tracking-widest uppercase text-gray-500 mb-8">
            Les Instruments à Travers le Temps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INSTRUMENTS.map(inst => (
              <div
                key={inst.name}
                className="rounded-2xl border border-white/8 p-5 transition-all hover:border-white/15"
                style={{ background: `${inst.color}06` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{inst.icon}</span>
                  <div>
                    <div className="font-bold text-md text-white">{inst.name}</div>
                    <div className="text-sm font-mono" style={{ color: `${inst.color}90` }}>{inst.period}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{inst.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-section cards */}
        <div className="mb-10">
          <h2 className="text-md font-bold tracking-widest uppercase text-gray-500 mb-6">Explorer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Messier catalog */}
            <Link
              href="/solar-system/astronomie/messier"
              className="group relative block rounded-2xl border border-indigo-500/30 p-8 transition-all hover:scale-[1.02] hover:brightness-110 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 65% 40%, #818CF8 0%, transparent 65%)' }}
              />
              <div className="text-5xl mb-4">🌠</div>
              <h2
                className="text-2xl font-bold text-indigo-300 mb-2"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Catalogue Messier
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                110 objets du ciel profond sélectionnés par Charles Messier en 1774 —
                nébuleuses, amas d&apos;étoiles et galaxies observables aux jumelles ou au télescope amateur.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Galaxies', 'Amas globulaires', 'Nébuleuses', 'Amas ouverts'].map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-sm border"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC', borderColor: 'rgba(99,102,241,0.3)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-indigo-400">
                Explorer 110 objets →
              </div>
            </Link>

            {/* Instruments / observatories */}
            <Link
              href="/solar-system/astronomie/instruments"
              className="group relative block rounded-2xl border border-cyan-500/30 p-8 transition-all hover:scale-[1.02] hover:brightness-110 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(37,99,235,0.12))' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 35% 50%, #22D3EE 0%, transparent 65%)' }}
              />
              <div className="text-5xl mb-4">🛸</div>
              <h2
                className="text-2xl font-bold text-cyan-300 mb-2"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Observatoires
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                Du miroir de 10 m du télescope Keck au miroir d&apos;or de 6,5 m du JWST —
                les observatoires terrestres et spatiaux qui repoussent les frontières de notre connaissance.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Hubble', 'JWST', 'VLT · Chile', 'ALMA', 'ELT'].map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-sm border"
                    style={{ background: 'rgba(6,182,212,0.12)', color: '#67E8F9', borderColor: 'rgba(6,182,212,0.3)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-cyan-400">
                Voir les observatoires →
              </div>
            </Link>
          </div>
        </div>

        {/* Fun facts */}
        <div
          className="rounded-2xl border border-white/8 p-6"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-5">L&apos;Astronomie en chiffres</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '13,8 Ga', label: 'âge de l\'Univers' },
              { value: '400 Mds', label: 'd\'étoiles dans la Voie Lactée' },
              { value: '~2 000 Mds', label: 'de galaxies observables' },
              { value: '110', label: 'objets dans le Catalogue Messier' },
            ].map(f => (
              <div key={f.label} className="text-center">
                <div
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{
                    fontFamily: "'Exo 2', monospace",
                    background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {f.value}
                </div>
                <div className="text-sm text-gray-600 leading-tight">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SolarLayout>
  );
}
