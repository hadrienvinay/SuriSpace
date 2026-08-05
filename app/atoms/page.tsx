// pages/atoms/index.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Atomes',
  description: "Tableau périodique interactif, histoire de la physique atomique, nucléosynthèse stellaire et abondance des éléments dans l'Univers.",
  keywords: ['atomes', 'tableau périodique', 'éléments chimiques', 'physique atomique', 'nucléosynthèse', 'chimie'],
  openGraph: {
    title: 'Atomes | Suri Space',
    description: "Tableau périodique interactif et histoire de la physique atomique.",
    url: 'https://suri-space.vercel.app/atoms',
  },
};
import AtomicLayout from '@/components/layout/AtomicLayout';
import { JsonLd } from '@/components/common/JsonLd';
import {
  FlaskIcon,
  RadiationIcon,
  ExplosionIcon,
  BarChartIcon,
  GalaxyIcon,
} from '@/components/icons/AtomsIcons';
import { AtomIcon } from '@/components/icons/UniverseIcons';

const features = [
  {
    href: '/atoms/tableau',
    Icon: FlaskIcon,
    title: 'Tableau Périodique',
    description: 'Les 118 éléments classés, avec couleurs par catégorie et données complètes.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
  },
  {
    href: '/atoms/particules',
    Icon: RadiationIcon,
    title: 'Particules Elémentaires',
    description: 'Les constituants fondamentaux de la matière',
    gradient: 'from-yellow-600/20 to-orange-600/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
  },
  {
    href: '/atoms/nucleosynthese',
    Icon: ExplosionIcon,
    title: 'Nucléosynthèse',
    description: 'Du Big Bang aux collisions d\'étoiles à neutrons — comment les atomes naissent.',
    gradient: 'from-orange-600/20 to-red-600/20',
    border: 'border-orange-500/30',
    accent: 'text-orange-300',
  },
  {
    href: '/atoms/abondance',
    Icon: BarChartIcon,
    title: 'Répartition de la matière',
    description: 'L\'hydrogène domine l\'univers. Mais sur Terre? Comparaison cosmique vs terrestre.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
  },
  {
    href: '/atoms/histoire',
    Icon: GalaxyIcon,
    title: 'Histoire Cosmique',
    description: 'Du Big Bang à aujourd\'hui — le voyage de 13.8 milliards d\'années des éléments.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
  },
];

const funFacts = [
  { value: '+98%', label: 'de la masse de l\'univers visible est composé d\'Hydrogène et d\'Helium' },
  { value: "4.6 Milliards d'années", label: 'âge de notre Système Solaire, nos atomes sont encore plus vieux' },
  { value: "13.8 Milliards d'années", label: 'après le Big Bang, H et He ont été formés en 3 minutes' },
  { value: '~57kg', label: 'd\'or produit lors d\'une seule kilonova' },
  { value: 'Fe', label: 'dernière étape de la fusion au coeur d\'une étoile' },
  { value: '≈50%', label: 'des éléments >Fe viennent des collisions d\'étoiles à neutrons' },
];

export default function AtomsHome() {
  return (
    <AtomicLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Atomes', item: 'https://suri-space.vercel.app/atoms' },
        ]},
        { '@type': 'CollectionPage', name: "L'Univers des Atomes", url: 'https://suri-space.vercel.app/atoms',
          description: "Tableau périodique interactif, histoire de la physique atomique, nucléosynthèse stellaire et abondance des éléments.",
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />
      {/* Hero immersif */}
      <div className="relative min-h-[58vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-16">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 620, height: 620, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: '#A78BFA', opacity: 0.28, filter: 'blur(110px)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 30px #7C3AED)' }}>
            <AtomIcon size={112} />
          </div>
          <div className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#A78BFA' }}>
            Encyclopédie · Atomes
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #A78BFA, #60A5FA, #F472B6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            L'Univers des Atomes
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Tout ce qui vous entoure — vos mains, l'air, les étoiles — est fait d'atomes forgés
            dans des explosions cosmiques. Explorez leur naissance, leur abondance et leur histoire.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* En bref — faits remarquables */}
        <div className="pb-9 mb-11" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            En bref
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {funFacts.map((fact, i) => (
              <div
                key={i}
                className="text-center rounded-xl border py-3.5 px-3"
                style={{ background: 'rgba(167,139,250,0.04)', borderColor: 'rgba(167,139,250,0.16)' }}
              >
                <div
                  className="text-[15px] font-extrabold"
                  style={{ color: '#A78BFA', fontFamily: "'Exo 2', monospace" }}
                >
                  {fact.value}
                </div>
                <div className="text-[10.5px] text-gray-500 leading-snug mt-0.5">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards — doors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(f => (
            <Link key={f.href} href={f.href}
              className={`group relative block rounded-2xl border ${f.border} bg-gradient-to-br ${f.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}>
              <div className="mb-3 flex justify-center transition-transform duration-500 group-hover:scale-110">
                <f.Icon />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${f.accent} text-center`}>{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed text-center">{f.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </AtomicLayout>
  );
}
