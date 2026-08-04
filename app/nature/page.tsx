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

      {/* Hero immersif */}
      <div className="relative min-h-[58vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 py-16">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 620, height: 620, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: '#22C55E', opacity: 0.28, filter: 'blur(110px)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-6 flex justify-center" style={{ filter: 'drop-shadow(0 0 40px #22C55E)' }}>
            <SproutIcon size={112} />
          </div>
          <div className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: '#4ADE80' }}>
            Encyclopédie · Nature
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight"
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
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* En bref — chiffres clés + highlights */}
        <div className="pb-9 mb-11" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            En bref
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {facts.map((f, i) => (
              <div
                key={i}
                className="text-center rounded-xl border py-3.5 px-3"
                style={{ background: 'rgba(74,222,128,0.04)', borderColor: 'rgba(74,222,128,0.16)' }}
              >
                <div
                  className="text-[15px] font-extrabold"
                  style={{ color: '#4ADE80', fontFamily: "'Exo 2', monospace" }}
                >
                  {f.value}
                </div>
                <div className="text-[10.5px] text-gray-500 leading-snug mt-0.5">{f.label}</div>
              </div>
            ))}
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/8 py-3 px-3.5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="shrink-0"><h.Icon size={22} /></span>
                <div>
                  <div className="text-xs font-bold text-white">{h.label}</div>
                  <div className="text-[10.5px] text-gray-500">{h.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section cards — doors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <h3 className={`text-xl font-bold mb-2 ${s.accent} text-center`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed text-center">{s.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </NatureLayout>
  );
}
