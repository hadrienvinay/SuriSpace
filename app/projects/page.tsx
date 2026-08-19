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
import DeleteProjectButton from '@/components/buttons/DeleteProjectButton';
import { ToolsIcon, CodeIcon } from '@/components/icons/ProjectsIcons';
import { JsonLd } from '@/components/common/JsonLd';

type Status = 'En ligne' | 'En cours' | 'Terminé';

const STATUS_COLOR: Record<Status, string> = {
  'En ligne': '#34D399',
  'En cours': '#FBBF24',
  'Terminé': '#22D3EE',
};

const STATIC_PROJECTS = [
  {
    href: '/projects/gameoflife',
    image: '/uploads/gameoflife.jpg',
    title: 'Jeu de la Vie',
    desc: "Simulation du Game of Life imaginé par John Horton Conway en 1970 — automate cellulaire interactif.",
    tag: 'Simulation',
    stack: ['Python', 'Simulation'],
    status: 'Terminé' as Status,
    year: '2024',
    accent: '#34D399',
  },
];

const DYNAMIC_ACCENT = '#60A5FA';

export default async function Projects() {
  const session = await auth();
  const projects = await prisma.project.findMany({ where: { visible: true }, orderBy: { createdAt: 'desc' } });

  const items = [
    ...STATIC_PROJECTS.map(p => ({
      key: p.href, href: p.href, image: p.image, title: p.title, desc: p.desc,
      tag: p.tag, stack: p.stack, status: p.status, year: p.year, accent: p.accent,
      isDb: false as const, id: undefined as number | undefined,
    })),
    ...projects.map(p => ({
      key: `db-${p.id}`, href: `/projects/${p.id}`, image: p.image ?? '/default.png', title: p.title,
      desc: p.resume ?? '', tag: p.tags[0] ?? 'Projet', stack: p.tags.slice(0, 3),
      status: (p.siteUrl && p.siteUrlPublic ? 'En ligne' : 'Terminé') as Status,
      year: String(p.createdAt.getUTCFullYear()), accent: DYNAMIC_ACCENT,
      isDb: true as const, id: p.id,
    })),
  ];

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Projets', item: 'https://suri-space.vercel.app/projects' },
        ]},
        { '@type': 'CollectionPage', name: 'Projets — Suri Space', url: 'https://suri-space.vercel.app/projects',
          description: "Projets personnels et professionnels — applications web, outils et expérimentations techniques.",
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300/80">
            Portfolio — {items.length} réalisation{items.length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-1"
            style={{
              background: 'linear-gradient(135deg, #34D399, #60A5FA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Projets
          </h1>
          <div style={{ filter: 'drop-shadow(0 0 14px #34D399)' }}>
            <ToolsIcon size={40} />
          </div>
          <div style={{ filter: 'drop-shadow(0 0 14px #60A5FA)' }}>
            <CodeIcon size={40} />
          </div>
        </div>
        <p className="text-gray-400 text-base mt-2">
          Simulations, outils et expérimentations développés ces dernières années.
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

      {/* Empty state */}
      {items.length === 0 && (
        <div className="rounded-2xl border border-white/6 p-10 text-center bg-white/[0.01]">
          <div className="text-3xl mb-3 opacity-30">🔧</div>
          <p className="text-sm text-gray-600">Aucun projet publié pour l&apos;instant.</p>
        </div>
      )}

      {/* Polaroid grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const statusColor = STATUS_COLOR[item.status];
            const rotate = i % 2 === 0 ? 'hover:-rotate-[0.6deg]' : 'hover:rotate-[0.6deg]';

            return (
              <div
                key={item.key}
                className={`group relative rounded-2xl border border-white/7 bg-white/[0.025] p-3 pb-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/16 ${rotate}`}
              >
                {/* Image */}
                <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute -top-1/4 -right-1/4 w-3/5 h-3/5 rounded-full pointer-events-none transition-opacity duration-200 opacity-[0.16] group-hover:opacity-[0.26]"
                    style={{ background: `radial-gradient(circle, ${item.accent}, transparent 70%)` }}
                  />

                  {/* Delete button (admin only, DB projects) */}
                  {session && item.isDb && item.id !== undefined && (
                    <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DeleteProjectButton projectId={item.id} />
                    </div>
                  )}

                  {/* Status pill */}
                  {!(session && item.isDb) && (
                    <div
                      className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full pointer-events-none"
                      style={{ color: statusColor, background: 'rgba(5,6,10,0.6)', backdropFilter: 'blur(4px)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
                      {item.status}
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="relative pointer-events-none px-1 pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: item.accent }}>
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-mono text-gray-600">{item.year}</span>
                  </div>
                  <h2 className="text-[15px] font-extrabold text-white leading-snug mb-1">{item.title}</h2>
                  {item.desc && (
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.desc}</p>
                  )}
                </div>

                <Link href={item.href} className="absolute inset-0 z-10 rounded-2xl" aria-label={item.title} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
