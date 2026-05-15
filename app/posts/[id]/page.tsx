// app/posts/[id]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import ReadingProgress, { readingTime } from '@/components/ReadingProgress';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) }, select: { title: true, resume: true, image: true } });
  if (!post) return { title: 'Article introuvable' };

  return {
    title: post.title,
    description: post.resume || `Article : ${post.title} — Suri Space`,
    openGraph: {
      title: post.title,
      description: post.resume || `Article : ${post.title}`,
      url: `https://suri-space.vercel.app/posts/${id}`,
      type: 'article',
      ...(post.image && { images: [{ url: post.image, alt: post.title }] }),
    },
    alternates: { canonical: `/posts/${id}` },
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  if (!post) notFound();

  const dateStr = post.createdAt.toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const mins = readingTime(`${post.title} ${post.resume ?? ''} ${post.content ?? ''}`);

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <ReadingProgress />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.resume || undefined,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: { '@type': 'Person', name: 'Hadrien Vinay' },
        url: `https://suri-space.vercel.app/posts/${id}`,
        ...(post.image && { image: post.image }),
      }} />
      {/* Header bar */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/posts"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Articles
        </Link>
        <span className="text-xs text-gray-600 font-mono">
          Hadrien Vinay · {dateStr} · {mins} min
        </span>
      </div>

      {/* Hero image */}
      {post.image && (
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-white/8">
          <Image
            src={post.image}
            fill
            alt={post.title}
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
        style={{ letterSpacing: '-0.5px' }}
      >
        {post.title}
      </h1>

      {/* Resume / lead */}
      {post.resume && (
        <p className="text-lg text-gray-400 leading-relaxed mb-8 border-l-2 border-violet-500/60 pl-4">
          {post.resume}
        </p>
      )}

      {/* Divider */}
      <div className="h-px bg-white/8 mb-8" />

      {/* Content */}
      {post.content ? (
        <div className="text-gray-300 text-base leading-relaxed space-y-4 whitespace-pre-wrap">
          {post.content}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center py-8">Contenu à venir…</p>
      )}

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-white/8">
        <Link
          href="/posts"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour aux articles
        </Link>
      </div>
    </div>
  );
}
