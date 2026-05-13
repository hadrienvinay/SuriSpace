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
    url: 'https://suri-space.vercel.app/solar-system/astronomie',
  },
};
import SolarLayout from '@/components/SolarLayout';
import { computeMoonPhases, computePlanets, computeEvents, getCurrentMonthInfo } from '@/lib/ephemerides';
import { TelescopeIcon, AtomIcon } from '@/components/UniverseIcons';
import { StarIcon, RocketIcon, MapIcon } from '@/components/SpaceIcons';
import { GalaxyIcon } from '@/components/AtomsIcons';
import { ClockIcon, SigmaIcon, LightbulbIcon } from '@/components/SciencesIcons';

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

/* ── Agenda 2026 ─────────────────────────────────────────── */
const AGENDA_2026: { month: string; color: string; highlight?: boolean; events: { icon: string; text: string }[] }[] = [
  {
    month: 'Janv.',
    color: '#60A5FA',
    events: [
      { icon: '🌠', text: 'Quadrantides : pic le 3–4 janvier (ZHR ~120) — pluie intense depuis le Bouvier' },
    ],
  },
  {
    month: 'Mars',
    color: '#34D399',
    events: [
      { icon: '🌸', text: 'Équinoxe de printemps — 20 mars' },
      { icon: '☿',  text: 'Élongation maximale de Mercure — 12 mars (18° est)' },
    ],
  },
  {
    month: 'Juin',
    color: '#FBBF24',
    events: [
      { icon: '🌞', text: 'Solstice d\'été — 21 juin, nuit la plus courte de l\'année' },
      { icon: '✨', text: 'Conjonction Vénus–Jupiter — spectaculaire dans le crépuscule (vers le 5 juin)' },
    ],
  },
  {
    month: 'Août',
    color: '#F87171',
    highlight: true,
    events: [
      { icon: '🌑', text: 'Éclipse solaire TOTALE — 12 août : tracé Russie · Islande · nord Espagne · Maroc' },
      { icon: '🌠', text: 'Perséides : pic le 11–12 août (ZHR ~100) — nuit sans Lune !' },
    ],
  },
  {
    month: 'Sept.',
    color: '#A78BFA',
    events: [
      { icon: '♄',  text: 'Opposition de Saturne (~21 sept.) — meilleure visibilité annuelle, anneaux inclinés' },
      { icon: '🍂', text: 'Équinoxe d\'automne — 23 septembre' },
    ],
  },
  {
    month: 'Nov.',
    color: '#FB923C',
    events: [
      { icon: '♃',  text: 'Opposition de Jupiter (~13 nov.) — visible toute la nuit dans les Gémeaux (mag. −2,9)' },
      { icon: '🌠', text: 'Léonides : pic le 17–18 novembre' },
    ],
  },
  {
    month: 'Déc.',
    color: '#F472B6',
    events: [
      { icon: '🌠', text: 'Géminides : pic le 13–14 déc. (ZHR ~150) — meilleure pluie annuelle !' },
      { icon: '❄️', text: 'Solstice d\'hiver — 21 décembre' },
    ],
  },
];

const INSTRUMENTS: { name: string; period: string; Icon: React.ComponentType<{size?: number}>; color: string; description: string }[] = [
  {
    name: 'Œil nu',
    period: 'Préhistoire – 1608',
    Icon: StarIcon,
    color: '#F59E0B',
    description: 'Les civilisations anciennes cartographiaient le ciel avec une précision surprenante. Stonehenge, les pyramides et les observatoires aztèques témoignent d\'une astronomie sophistiquée sans optique.',
  },
  {
    name: 'Lunette astronomique',
    period: '1608 – 1800',
    Icon: TelescopeIcon,
    color: '#34D399',
    description: 'Inventée par Lipperhey en 1608, perfectionnée par Galilée. Elle révolutionne l\'astronomie : lunes de Jupiter, phases de Vénus, taches solaires. Les lunettes atteignent plusieurs mètres de longueur focale.',
  },
  {
    name: 'Télescope réflecteur',
    period: '1668 – aujourd\'hui',
    Icon: TelescopeIcon,
    color: '#60A5FA',
    description: 'Inventé par Newton en 1668, il utilise des miroirs au lieu de lentilles. Permet des diamètres bien plus grands : les télescopes modernes atteignent 10 m (Keck) et bientôt 39 m (ELT).',
  },
  {
    name: 'Spectroscopie & photographie',
    period: '1840 – 1960',
    Icon: LightbulbIcon,
    color: '#F472B6',
    description: 'La spectroscopie analyse la composition chimique des étoiles à distance. La photographie remplace l\'observation visuelle et révèle des objets impossibles à voir à l\'œil nu lors de longues poses.',
  },
  {
    name: 'Radiotélescope',
    period: '1937 – aujourd\'hui',
    Icon: AtomIcon,
    color: '#A78BFA',
    description: 'Grote Reber construit le premier radiotélescope en 1937. L\'astronomie radio révèle pulsars, quasars, CMB, et permet d\'imager le centre galactique caché par la poussière optique.',
  },
  {
    name: 'Télescopes spatiaux',
    period: '1990 – aujourd\'hui',
    Icon: RocketIcon,
    color: '#FB923C',
    description: 'Au-dessus de l\'atmosphère, les instruments observent en UV, X, infrarouge et gamma sans turbulence. Hubble (1990), Chandra (X), Spitzer (IR), Fermi (γ) et James Webb (IR, 2021) ont chacun redéfini l\'astronomie.',
  },
];

export default function AstronomieHub() {
  const now = new Date();
  const { monthName, year } = getCurrentMonthInfo(now);
  const moonPhases = computeMoonPhases(now);
  const planets = computePlanets(now);
  const events = computeEvents(now);

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
          <div className="mb-5 flex justify-center" style={{ filter: 'drop-shadow(0 0 30px #A78BFA)' }}>
            <TelescopeIcon size={120} />
          </div>
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

        {/* ── Éphémérides du mois courant ─────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-md font-bold tracking-widest uppercase text-gray-500">
              Éphémérides · {monthName} {year}
            </h2>
            <span className="text-xs font-mono text-gray-600 border border-white/8 rounded-full px-3 py-1">
              Heure UTC · Latitude France
            </span>
            <a href="/solar-system/astronomie/ciel"className="text-md font-bold tracking-widest uppercase text-purple-500">
              Voir la carte du ciel du jour
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Phases lunaires */}
            <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(167,139,250,0.05)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Phases de la Lune</h3>
              <div className="space-y-3">
                {moonPhases.map(p => (
                  <div
                    key={p.date}
                    className="flex items-center gap-3 rounded-xl px-3 py-2"
                    style={{ background: p.highlight ? 'rgba(167,139,250,0.12)' : 'transparent', border: p.highlight ? '1px solid rgba(167,139,250,0.25)' : '1px solid transparent' }}
                  >
                    <span className="text-2xl w-8 text-center">{p.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">{p.phase}</div>
                      {'name' in p && <div className="text-xs text-purple-400">{p.name as string}</div>}
                    </div>
                    <span className="text-xs font-mono text-gray-500">{p.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibilité des planètes */}
            <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(251,146,60,0.04)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Planètes visibles</h3>
              <div className="space-y-3">
                {planets.map(p => (
                  <div key={p.name} className="flex gap-3 items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
                    >
                      {p.symbol}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-white">{p.name}</span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                          style={{ background: p.visibility === 'Matin' ? 'rgba(251,191,36,0.15)' : 'rgba(96,165,250,0.15)', color: p.visibility === 'Matin' ? '#FCD34D' : '#93C5FD' }}
                        >
                          {p.visibility}
                        </span>
                        <span className="text-[10px] font-mono text-gray-600">mag. {p.mag}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{p.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda du mois */}
            <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(52,211,153,0.04)' }}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Agenda du mois</h3>
              <div className="space-y-2.5">
                {events.map((ev, i) => (
                  <div key={`${ev.date}-${i}`} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center shrink-0 w-14">
                      <span className="text-base">{ev.icon}</span>
                      <span className="text-[10px] font-mono text-gray-600 text-center leading-tight">{ev.date}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pt-0.5">{ev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Agenda astronomique 2026 ─────────────────────────── */}
        <div className="mb-14">
          <h2 className="text-md font-bold tracking-widest uppercase text-gray-500 mb-6">
            Agenda Astronomique 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AGENDA_2026.map(month => (
              <div
                key={month.month}
                className="rounded-2xl border p-4"
                style={{
                  background: month.highlight ? `${month.color}10` : 'rgba(255,255,255,0.02)',
                  borderColor: month.highlight ? `${month.color}40` : 'rgba(255,255,255,0.07)',
                  boxShadow: month.highlight ? `0 0 30px ${month.color}12` : 'none',
                }}
              >
                <div
                  className="text-xs font-bold font-mono uppercase tracking-widest mb-3 pb-2 border-b"
                  style={{ color: month.color, borderColor: `${month.color}25` }}
                >
                  {month.highlight && '⭐ '}{month.month}
                </div>
                <div className="space-y-2.5">
                  {month.events.map((ev, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-sm shrink-0 mt-0.5">{ev.icon}</span>
                      <p className="text-xs text-gray-400 leading-relaxed">{ev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-700 mt-3 font-mono">
            * Dates et magnitudes approximatives · ZHR = Zenithal Hourly Rate en conditions idéales
          </p>
        </div>

        {/* What is astronomy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {([
            { Icon: GalaxyIcon, title: 'Science des distances',      color: '#60A5FA', text: 'L\'astronomie mesure des distances allant de quelques milliers à des milliards d\'années-lumière, en utilisant parallaxe, céphéides et supernovae comme échelle cosmique.' },
            { Icon: SigmaIcon,  title: 'Astrophysique',              color: '#34D399', text: 'En combinant physique, chimie et mathématiques, l\'astrophysique explique la naissance des étoiles, la fusion nucléaire solaire et la formation des systèmes planétaires.' },
            { Icon: ClockIcon,  title: 'Machine à remonter le temps',color: '#A78BFA', text: 'Regarder loin dans l\'espace, c\'est regarder loin dans le passé. Le JWST observe des galaxies telles qu\'elles étaient 13,6 milliards d\'années en arrière.' },
          ] as { Icon: React.ComponentType<{size?: number}>; title: string; color: string; text: string }[]).map(item => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/8 p-5"
              style={{ background: `${item.color}08` }}
            >
              <div className="mb-3 transition-transform duration-500 group-hover:scale-110">
                <item.Icon size={52} />
              </div>
              <h3 className="font-bold text-xl mb-2" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-md text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
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
              <div className="mb-4" style={{ filter: 'drop-shadow(0 0 12px #818CF8)' }}>
                <StarIcon size={64} />
              </div>
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
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-indigo-400">
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
              <div className="mb-4" style={{ filter: 'drop-shadow(0 0 12px #22D3EE)' }}>
                <TelescopeIcon size={64} />
              </div>
              <h2
                className="text-2xl font-bold text-cyan-300 mb-2"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Observatoires
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                Des champs d'antennes au sol au miroir d&apos;or de 6,5 m du JWST —
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
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-cyan-400">
                Voir les observatoires →
              </div>
            </Link>

            {/* Carte du ciel */}
            <Link
              href="/solar-system/astronomie/ciel"
              className="group relative block rounded-2xl border border-violet-500/30 p-8 transition-all hover:scale-[1.02] hover:brightness-110 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(30,10,60,0.12))' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, #7C3AED 0%, transparent 65%)' }}
              />
              <div className="mb-4" style={{ filter: 'drop-shadow(0 0 12px #7C3AED)' }}>
                <GalaxyIcon size={64} />
              </div>
              <h2
                className="text-2xl font-bold text-violet-300 mb-2"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Carte du ciel
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                Carte interactive du ciel de nuit de la semaine — projection stéréographique
                depuis Paris avec les étoiles brillantes, les constellations et les planètes visibles.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Étoiles', 'Constellations', 'Planètes', 'Temps réel'].map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-sm border"
                    style={{ background: 'rgba(139,92,246,0.15)', color: '#C4B5FD', borderColor: 'rgba(139,92,246,0.3)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-violet-400">
                Voir la carte →
              </div>
            </Link>

            {/* Etoiles et constellations */}
            <Link
              href="/solar-system/stars"
              className="group relative block rounded-2xl border border-cyan-500/30 p-8 transition-all hover:scale-[1.02] hover:brightness-110 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(37,99,235,0.12))' }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 35% 50%, #ccee22 0%, transparent 65%)' }}
              />
              <div className="mb-4" style={{ filter: 'drop-shadow(0 0 12px #FBBF24)' }}>
                <MapIcon size={64} />
              </div>
              <h2
                className="text-2xl font-bold text-cyan-300 mb-2"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Etoiles
              </h2>
              <p className="text-gray-400 text-md leading-relaxed mb-4">
                13 Constellations et 96 étoiles cataloguées
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Betelgeuse', 'Proxima', 'Vega', 'Etoile Polaire', 'Sirius', 'Rigel'].map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-sm border"
                    style={{ background: 'rgba(6,182,212,0.12)', color: '#67E8F9', borderColor: 'rgba(6,182,212,0.3)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm text-cyan-400">
                Voir les étoiles →
              </div>
            </Link>
          </div>
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
                  <inst.Icon size={32} />
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
