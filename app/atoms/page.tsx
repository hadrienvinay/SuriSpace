// pages/atoms/index.tsx
import Link from 'next/link';
import AtomicLayout from '@/components/AtomicLayout';

const features = [
  {
    href: '/atoms/tableau',
    icon: '🧪',
    title: 'Tableau Périodique',
    description: 'Les 118 éléments classés, avec couleurs par catégorie et données complètes.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
  },
  {
    href: '/atoms/nucleosynthese',
    icon: '💥',
    title: 'Nucléosynthèse',
    description: 'Du Big Bang aux collisions d\'étoiles à neutrons — comment les atomes naissent.',
    gradient: 'from-orange-600/20 to-red-600/20',
    border: 'border-orange-500/30',
    accent: 'text-orange-300',
  },
  {
    href: '/atoms/abondance',
    icon: '📊',
    title: 'Abondance',
    description: 'L\'hydrogène domine l\'univers. Mais sur Terre? Comparaison cosmique vs terrestre.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
  },
  {
    href: '/atoms/histoire',
    icon: '🌌',
    title: 'Histoire Cosmique',
    description: 'Du Big Bang à aujourd\'hui — le voyage de 13.8 milliards d\'années des éléments.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
  },
];

const funFacts = [
  { value: '99.9%', label: 'de la masse de l\'univers visible est H et He' },
  { value: "4.6 Milliards d'années", label: 'âge du Système Solaire — nos atomes sont plus vieux' },
  { value: "13.8 Milliards d'années", label: 'après le Big Bang, H et He sont nés en 3 minutes' },
  { value: '~57kg', label: 'd\'or produit lors d\'une seule kilonova' },
  { value: 'Fe', label: 'terminus de la fusion — le fer tue les étoiles massives' },
  { value: '≈50%', label: 'des éléments >Fe viennent des collisions d\'étoiles à neutrons' },
];

export default function AtomsHome() {
  return (
    <AtomicLayout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-6">
            <div className="text-8xl animate-pulse" style={{ filter: 'drop-shadow(0 0 30px #7C3AED)' }}>⚛️</div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight"
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

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {features.map(f => (
            <Link key={f.href} href={f.href}
              className={`group relative block rounded-2xl border ${f.border} bg-gradient-to-br ${f.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}>
              <div className="text-4xl mb-3">{f.icon}</div>
              <h2 className={`text-xl font-bold mb-2 ${f.accent}`}>{f.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Fun facts */}
        <div className="rounded-2xl border border-white/10 p-8"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">Faits remarquables</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {funFacts.map((fact, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {fact.value}
                </div>
                <div className="text-xs text-gray-500 leading-tight">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AtomicLayout>
  );
}
