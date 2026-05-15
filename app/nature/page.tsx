import type { Metadata } from 'next';
import Link from 'next/link';
import NatureLayout from '@/components/NatureLayout';
import { LeafIcon, SproutIcon, SunIcon, AppleIcon, GardenIcon } from '@/components/NatureIcons';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Nature',
  description: "Plantes, jardinage, saisons et nutrition — explorez le monde du vivant et prenez soin de vous et de votre jardin.",
  keywords: ['nature', 'plantes', 'jardinage', 'nutrition', 'saisons', 'potager'],
  openGraph: {
    title: 'Nature | Suri Space',
    description: "Jardinage, plantes, saisons et nutrition — guide du monde du vivant.",
    url: 'https://suri-space.vercel.app/nature',
  },
};

const sections = [
  {
    href: '/nature/plantes',
    Icon: LeafIcon,
    title: 'Plantes & Jardinage',
    description: 'Calendrier de plantation, arrosage, germination et étapes de croissance pour légumes, arbres, aromates et fruits.',
    gradient: 'from-emerald-600/20 to-green-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    glow: '#34D399',
  },
  {
    href: '/nature/mon-potager',
    Icon: GardenIcon,
    title: 'Mon Potager',
    description: 'Suivi personnalisé de vos cultures — planifiez, semez et récoltez en suivant le calendrier de votre potager.',
    gradient: 'from-lime-600/20 to-green-600/20',
    border: 'border-lime-500/30',
    accent: 'text-lime-300',
    glow: '#86EFAC',
  },
  {
    href: '/nature/saison',
    Icon: SunIcon,
    title: 'Saisons',
    description: 'Comprendre les rythmes naturels des saisons — plantes de saison, calendrier lunaire et conseils de jardinage.',
    gradient: 'from-yellow-600/20 to-amber-600/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-300',
    glow: '#FCD34D',
  },
  {
    href: '/nature/nutrition',
    Icon: AppleIcon,
    title: 'Nutrition',
    description: 'Besoins nutritionnels du corps humain — calories, protéines, glucides, lipides, vitamines et minéraux.',
    gradient: 'from-red-600/20 to-orange-600/20',
    border: 'border-red-500/30',
    accent: 'text-red-300',
    glow: '#F87171',
  },
];

const facts = [
  { value: '~390 000', label: 'espèces végétales recensées sur Terre' },
  { value: '71 %', label: 'de la surface terrestre couverte de végétation potentielle' },
  { value: '2 000 kcal', label: 'besoin calorique journalier moyen adulte' },
  { value: '13', label: 'vitamines essentielles pour le corps humain' },
  { value: '30 min', label: 'de jardinage = activité physique modérée' },
  { value: '1,5 L', label: 'd\'eau minimale à boire par jour' },
];

const highlights = [
  { Icon: SproutIcon, label: 'Tomate', sub: 'Juin – Septembre' },
  { Icon: LeafIcon,   label: 'Basilic', sub: 'Mai – Août' },
  { Icon: SunIcon,    label: 'Tournesol', sub: 'Juillet – Septembre' },
  { Icon: AppleIcon,  label: 'Pomme', sub: 'Août – Novembre' },
];

export default function NatureHome() {
  return (
    <NatureLayout>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Nature', item: 'https://suri-space.vercel.app/nature' },
        ]},
        { '@type': 'CollectionPage', name: 'La Nature', url: 'https://suri-space.vercel.app/nature',
          description: "Plantes, jardinage, saisons et nutrition — explorez le monde du vivant.",
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 40px #22C55E)' }}>
            <SproutIcon size={130} />
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #4ADE80, #86EFAC, #FCD34D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            La Nature
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Du jardin à l'assiette — explorez le monde du vivant, cultivez vos plantes,
            suivez les rythmes des saisons et comprenez les besoins de votre corps.
          </p>
        </div>

        {/* Quick highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="text-center rounded-2xl border border-white/6 py-4 px-3"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex justify-center mb-1">
                <h.Icon size={36} />
              </div>
              <div className="text-sm font-bold text-white">{h.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{h.sub}</div>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group relative block rounded-2xl border ${s.border} bg-gradient-to-br ${s.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div
                className="mb-3 flex justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ filter: `drop-shadow(0 0 14px ${s.glow})` }}
              >
                <s.Icon />
              </div>
              <h2 className={`text-xl font-bold mb-2 ${s.accent} text-center`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {s.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed text-center">{s.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Fun facts */}
        <div
          className="rounded-2xl border border-white/10 p-8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
            Quelques repères
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {facts.map((f, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #4ADE80, #86EFAC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Exo 2', monospace",
                  }}
                >
                  {f.value}
                </div>
                <div className="text-xs text-gray-500 leading-tight">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </NatureLayout>
  );
}
