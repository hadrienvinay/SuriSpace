// app/projects/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projets',
  description: "Projets personnels et professionnels d'Hadrien Vinay — applications web, outils interactifs et expérimentations techniques.",
  keywords: ['projets', 'développement web', 'Next.js', 'portfolio', 'Hadrien Vinay'],
  openGraph: {
    title: 'Projets | Suri Space',
    description: "Applications web, outils et expérimentations techniques.",
    url: 'https://suri-space.vercel.app/projects',
  },
};
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import DeleteProjectButton from '@/components/DeleteProjectButton';

const STATIC_PROJECTS = [
  {
    href: '/projects/gameoflife',
    image: '/uploads/gameoflife.jpg',
    title: 'Jeu de la Vie',
    desc: "Simulation du Game of Life imaginé par John Horton Conway en 1970 — automate cellulaire interactif.",
    tag: 'Simulation',
    year: '2024',
    color: 'border-emerald-500/30',
    accent: 'text-emerald-400',
    tagBg: 'bg-emerald-500/10',
  },
];

export default async function Projects() {
  const session = await auth();
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4" style={{ filter: 'drop-shadow(0 0 24px #34D399)' }}>🛠️</div>
        <h1
          className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-3 pb-2"
          style={{
            background: 'linear-gradient(135deg, #34D399, #60A5FA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Projets
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Simulations, outils et expérimentations développés au fil du temps.
        </p>
      </div>

      {/* New project button (admin only) */}
      {session && (
        <div className="flex justify-end mb-6">
          <Link
            href="/projects/create"
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #10B981, #3B82F6)' }}
          >
            + Nouveau projet
          </Link>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Static projects */}
        {STATIC_PROJECTS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`group relative block rounded-2xl border ${p.color} overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={p.image}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                alt={p.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.tagBg} ${p.accent} border ${p.color}`}>
                  {p.tag}
                </span>
                <span className="text-xs text-gray-600 font-mono">{p.year}</span>
              </div>
              <h2 className="text-base font-bold text-white mb-1.5 leading-snug">{p.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          </Link>
        ))}

        {/* Dynamic projects from DB */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group block rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
          >
            {session && (
              <div className="absolute top-3 right-3 z-10">
                <DeleteProjectButton projectId={project.id} />
              </div>
            )}
            <Link href={`/projects/${project.id}`} className="block">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={project.image ?? '/python_img.webp'}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Projet
                  </span>
                  <span className="text-xs text-gray-600 font-mono">{project.createdAt.getUTCFullYear()}</span>
                </div>
                <h2 className="text-base font-bold text-white mb-1.5 leading-snug">{project.title}</h2>
                {project.resume && (
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{project.resume}</p>
                )}
              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}
