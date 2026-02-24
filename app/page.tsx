// app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Suri Space',
  description: "Portfolio et blog d'Hadrien Vinay — Espace, physique atomique, sciences, projets personnels et plus encore.",
  keywords: ['portfolio', 'Hadrien Vinay', 'espace', 'sciences', 'astronomie', 'physique', 'aéronautique'],
  openGraph: {
    title: 'Suri Space — Portfolio d\'Hadrien Vinay',
    description: "Explorez l'espace, la chimie atomique, les sciences et mes projets personnels.",
    url: 'https://surispace.fr',
  },
};
import Weather from '@/components/Weather';
import Ratp from '@/components/Ratp';
import Links from '@/components/ShowLinks';

const universeCards = [
  {
    href: '/solar-system',
    icon: '🪐',
    title: 'Espace',
    description: 'Système solaire, galaxies, missions spatiales et carte du ciel.',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
    glow: '#60A5FA',
  },
  {
    href: '/sciences',
    icon: '🔬',
    title: 'Sciences',
    description: 'Timeline interactive, grands scientifiques, formules et constantes.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
    glow: '#A78BFA',
  },
  {
    href: '/atoms',
    icon: '⚛️',
    title: 'Atomes',
    description: 'Tableau périodique, nucléosynthèse, abondance et histoire cosmique.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    glow: '#34D399',
  },
];

const skills = ['C / C++', 'Python', 'Next.js', 'SQL', 'Embarqué', 'Git','LLM'];

const projects = [
  {
    title: 'Site Web dynamique',
    desc: 'Site internet moderne en Next.js, mis à jour régulièrement.',
    color: 'border-blue-500/40',
  },
  {
    title: 'Belote Coinchée',
    desc: 'Jeu de coinche en Python — entraînement contre l\'IA, bientôt multijoueur.',
    color: 'border-violet-500/40',
  },
  {
    title: 'Simulation système solaire',
    desc: 'Modèle gravitationnel 2D/3D avec les lois de Newton, système Terre-Lune et système solaire complet.',
    color: 'border-cyan-500/40',
  },
  {
    title: 'Bot de trading',
    desc: 'En cours — reconnaissance de patterns sur or et argent.',
    color: 'border-emerald-500/40',
  },
];

export default function Home() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 py-10 space-y-20"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >

      {/* ── Hero ── */}
      <div className="text-center pt-6">
        <h1
          className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 pb-2"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Suri&apos;s Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-3">
          Un espace pour centraliser mes projets, mes explorations scientifiques et mes idées.
          Réalisé avec Next.js, Prisma, NextAuth et diverses API.
        </p>
        <p className="text-gray-600 text-sm max-w-3xl mx-auto italic mb-8 leading-relaxed">
          &ldquo;Pour découvrir les meilleures règles de société qui conviennent aux nations, il faudrait une intelligence supérieure
          qui vît toutes les passions des hommes et qui n&apos;en éprouvât aucune.&rdquo;{' '}
          <span className="text-gray-500 not-italic">— Rousseau, Du contrat social, 1762</span>
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/Hadrien-Vinay-Resume.pdf"
            className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          >
            Voir mon CV
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-xl font-semibold text-white border border-white/10 hover:bg-white/6 transition-all"
          >
            Qui suis-je ?
          </Link>
        </div>
      </div>

      {/* ── Universe sections ── */}
      <div>
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
          Univers à explorer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {universeCards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative block rounded-2xl border ${c.border} bg-linear-to-br ${c.gradient} p-6 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div
                className="text-5xl mb-3"
                style={{ filter: `drop-shadow(0 0 16px ${c.glow})` }}
              >
                {c.icon}
              </div>
              <h3 className={`text-xl font-bold mb-1.5 ${c.accent}`}>{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.description}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Explorer →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Widgets ── */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Météo */}
        <div
          className="p-5 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h3 className="text-base font-bold text-gray-300 mb-3">🌅 Météo</h3>
          <div className="space-y-2">
            <Weather city="Paris" />
            <Weather city="Madrid" />
            <Weather city="Arcachon" />
          </div>
        </div>

        {/* Transports */}
        <div
          className="p-5 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h3 className="text-base font-bold text-gray-300 mb-3">🚇 Transports</h3>
          <Ratp />
        </div>

        {/* Compétences */}
        <div
          className="p-5 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <h3 className="text-base font-bold text-gray-300 mb-3">⚡ Compétences</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-xl text-sm font-semibold border border-violet-500/30 text-violet-300"
                style={{ background: 'rgba(139,92,246,0.10)' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent projects ── */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">Projets récents</h2>
          <div className="flex-1 h-px bg-white/6" />
          <Link href="/projects" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            Tous les projets →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`p-5 rounded-2xl border ${p.color}`}
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <h3 className="text-base font-bold text-white mb-1">{p.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Media / links ── */}
      <div className="border-t border-white/6 pt-10">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
          Médias et ressources utiles
        </h2>
        <Links />
      </div>

    </div>
  );
}
