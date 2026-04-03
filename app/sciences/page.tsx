// app/sciences/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sciences',
  description: "Timeline des découvertes scientifiques, formules fondamentales, constantes physiques et portraits des grands scientifiques de l'histoire.",
  keywords: ['sciences', 'physique', 'formules', 'constantes physiques', 'scientifiques', 'histoire des sciences'],
  openGraph: {
    title: 'Sciences | Suri Space',
    description: "Timeline scientifique, formules, constantes et portraits des grands scientifiques.",
    url: 'https://suri-space.vercel.app/sciences',
  },
};
import ScienceLayout from '@/components/ScienceLayout';

const sections = [
  {
    href: '/sciences/timeline',
    icon: '⏱️',
    title: 'Timeline Interactive',
    description: 'De l\'Antiquité à aujourd\'hui — révolutions scientifiques, grands scientifiques et découvertes sur une frise chronologique.',
    gradient: 'from-indigo-600/20 to-violet-600/20',
    border: 'border-indigo-500/30',
    accent: 'text-indigo-300',
  },
  {
    href: '/sciences/scientists',
    icon: '👨‍🔬',
    title: 'Scientifiques',
    description: 'Portraits et biographies des plus grands esprits scientifiques — Newton, Einstein, Curie, Darwin et bien d\'autres.',
    gradient: 'from-purple-600/20 to-pink-600/20',
    border: 'border-purple-500/30',
    accent: 'text-purple-300',
  },
  {
    href: '/sciences/formules',
    icon: '∑',
    title: 'Formules',
    description: 'Les équations fondamentales qui gouvernent l\'univers — mécanique, thermodynamique, électromagnétisme, relativité.',
    gradient: 'from-cyan-600/20 to-teal-600/20',
    border: 'border-cyan-500/30',
    accent: 'text-cyan-300',
  },
  {
    href: '/sciences/constantes',
    icon: '∞',
    title: 'Constantes',
    description: 'Vitesse de la lumière, constante de Planck, nombre d\'Avogadro… les valeurs immuables qui structurent la physique.',
    gradient: 'from-emerald-600/20 to-green-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
  },
];

const facts = [
  { value: '~2 500', label: 'ans d\'histoire des sciences documentée' },
  { value: '1687', label: 'Principia Mathematica de Newton' },
  { value: 'E=mc²', label: 'formule la plus célèbre du monde' },
  { value: '1905', label: 'année miraculeuse d\'Einstein — 4 articles fondateurs' },
  { value: '~130', label: 'prix Nobel scientifiques depuis 1901' },
  { value: '6,022×10²³', label: 'nombre d\'Avogadro — atomes par mole' },
];

const highlights = [
  { emoji: '🍎', label: 'Newton', sub: 'Gravitation, 1687' },
  { emoji: '⚡', label: 'Einstein', sub: 'Relativité, 1905' },
  { emoji: '☢️', label: 'Curie', sub: 'Radioactivité, 1898' },
  { emoji: '🧬', label: 'Darwin', sub: 'Évolution, 1859' },
];

export default function SciencesHome() {
  return (
    <ScienceLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-7xl mb-6" style={{ filter: 'drop-shadow(0 0 40px #A78BFA)' }}>
            🔬
          </div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #A78BFA, #60A5FA, #34D399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            Les Sciences
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Des premières observations de l'Antiquité aux lois de la physique moderne —
            explorez l'histoire, les formules et les grandes figures qui ont façonné notre compréhension du monde.
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
              <div className="text-3xl mb-1">{h.emoji}</div>
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
              className={`group relative block rounded-2xl border ${s.border} bg-linear-to-br ${s.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h2 className={`text-xl font-bold mb-2 ${s.accent}`} style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {s.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
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
                    background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
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
    </ScienceLayout>
  );
}
