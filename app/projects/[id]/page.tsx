// app/projects/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import DeleteProjectButton from '@/components/buttons/DeleteProjectButton';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: parseInt(id) }, select: { title: true, resume: true, image: true } });
  if (!project) return { title: 'Projet introuvable' };

  return {
    title: project.title,
    description: project.resume || `Projet : ${project.title} — Suri Space`,
    openGraph: {
      title: project.title,
      description: project.resume || `Projet : ${project.title}`,
      url: `https://suri-space.vercel.app/projects/${id}`,
      type: 'article',
      ...(project.image && { images: [{ url: project.image, alt: project.title }] }),
    },
    alternates: { canonical: `/projects/${id}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });
  if (!project) notFound();

  const dateStr = project.createdAt.toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Projets
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-600 font-mono">{dateStr}</span>

          {/* Lien du site en ligne */}
          {project.siteUrl && project.siteUrlPublic && (
            <Link
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold border border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-500/10 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3m0 0h-6m6 0v6M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
              </svg>
              Voir le site
            </Link>
          )}

          {/* GitHub link */}
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-300 hover:text-white hover:bg-white/6 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Link>
          )}

          {/* Admin actions */}
          {session && (
            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project.id}/edit`}
                className="px-3 py-1.5 rounded-xl text-sm font-semibold border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all"
              >
                Modifier
              </Link>
              <DeleteProjectButton projectId={project.id} />
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
        style={{ letterSpacing: '-0.5px' }}
      >
        {project.title}
      </h1>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Resume */}
      {project.resume && (
        <p className="text-lg text-gray-400 leading-relaxed mb-8 border-l-2 border-emerald-500/60 pl-4">
          {project.resume}
        </p>
      )}

      <div className="h-px bg-white/8 mb-8" />

      {/* Content block 1 */}
      {project.content && (
        <div className="text-gray-300 text-base leading-relaxed space-y-4 mb-8 whitespace-pre-wrap">
          {project.content}
        </div>
      )}

      {/* Image 1 */}
      {project.image && (
        <figure className="mb-10">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/8">
            <Image
              src={project.image}
              width={1200}
              height={600}
              alt={project.imageTitle || project.title}
              className="w-full object-cover"
              unoptimized
            />
          </div>
          {project.imageTitle && (
            <figcaption className="mt-2 text-sm text-center text-gray-500">
              {project.imageTitle}
            </figcaption>
          )}
        </figure>
      )}

      {/* Content block 2 + image 2 */}
      {project.content2 && (
        <div className="text-gray-300 text-base leading-relaxed space-y-4 mb-8 whitespace-pre-wrap">
          {project.content2}
        </div>
      )}
      {project.image2 && (
        <figure className="mb-10">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/8">
            <Image
              src={project.image2}
              width={1200}
              height={600}
              alt={project.image2Title || project.title}
              className="w-full object-cover"
              unoptimized
            />
          </div>
          {project.image2Title && (
            <figcaption className="mt-2 text-sm text-center text-gray-500">
              {project.image2Title}
            </figcaption>
          )}
        </figure>
      )}

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-white/8">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour aux projets
        </Link>
      </div>
    </div>
  );
}
