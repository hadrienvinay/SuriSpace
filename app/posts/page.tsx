// app/posts/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Articles',
  description: "Articles et explorations sur l'espace, la nature, les sciences et la culture — blog d'Hadrien Vinay.",
  keywords: ['articles', 'blog', 'espace', 'sciences', 'culture', 'Hadrien Vinay'],
  openGraph: {
    title: 'Articles | Suri Space',
    description: "Blog d'Hadrien Vinay — explorations et réflexions sur l'espace et les sciences.",
    url: 'https://suri-space.vercel.app/posts',
  },
};
import Image from 'next/image';
import prisma from '@/lib/prisma';
import DeletePostButton from '@/components/DeletePostButton';
import { auth } from '@/lib/auth';
import { QuillIcon, BookIcon } from '@/components/ArticlesIcons';
import { JsonLd } from '@/components/JsonLd';

const STATIC_POSTS = [
  {
    href: '/posts/algoculture',
    image: '/uploads/image-1769438168655-893060458.jpg',
    title: "L'algoculture",
    excerpt: "La culture des algues est vieille de plusieurs siècles, mais connaît aujourd'hui une croissance rapide à l'échelle mondiale.",
    tag: 'Environnement',
    year: '2025',
    color: 'border-emerald-500/30',
    accent: 'text-emerald-400',
    tagBg: 'bg-emerald-500/10',
  },
  {
    href: '/posts/negative',
    image: '/univers.webp',
    title: 'La masse négative',
    excerpt: "Réfutée dans les années 50, l'hypothèse de la masse négative pourrait s'avérer un candidat sérieux pour expliquer la structure de l'univers.",
    tag: 'Physique',
    year: '2026',
    color: 'border-violet-500/30',
    accent: 'text-violet-400',
    tagBg: 'bg-violet-500/10',
  },
  {
    href: '/posts/space',
    image: '/artemis.jpg',
    title: "L'actualité spatiale 2026",
    excerpt: "Un panorama des dernières nouvelles et missions prévues pour le spatial en 2026.",
    tag: 'Espace',
    year: '2026',
    color: 'border-blue-500/30',
    accent: 'text-blue-400',
    tagBg: 'bg-blue-500/10',
  },
  {
    href: '/posts/hydrogene',
    image: '/hydrogene.png',
    title: "L'hydrogène vert marin",
    excerpt: "Produire de l'hydrogène grâce aux courants marins et à la houle : le potentiel des océans pour la transition énergétique.",
    tag: 'Energie',
    year: '2026',
    color: 'border-yellow-500/30',
    accent: 'text-yellow-400',
    tagBg: 'bg-yellow-500/10',
  },
  {
    href: '/posts/astro',
    image: '/astro.jpg',
    title: 'Le ciel en 2026',
    excerpt: "Éclipses, comètes, étoiles filantes et rendez-vous planétaires : le calendrier astronomique complet de 2026.",
    tag: 'Astronomie',
    year: '2026',
    color: 'border-indigo-500/30',
    accent: 'text-indigo-400',
    tagBg: 'bg-indigo-500/10',
  },
];

export default async function Posts() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  const session = await auth();

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://suri-space.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://suri-space.vercel.app/posts' },
        ]},
        { '@type': 'Blog', name: 'Articles — Suri Space', url: 'https://suri-space.vercel.app/posts',
          description: "Articles et explorations sur l'espace, la nature, les sciences et la culture.",
          inLanguage: 'fr', isPartOf: { '@type': 'WebSite', name: 'Suri Space', url: 'https://suri-space.vercel.app' } },
      ]}} />

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-between gap-4 mb-3 max-w-2xl mx-auto">
          <div style={{ filter: 'drop-shadow(0 0 16px #6366F1)' }}>
            <QuillIcon size={72} />
          </div>
          <h1
            className="text-5xl sm:text-6xl font-extrabold tracking-tight pb-2"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Articles
          </h1>
          <div style={{ filter: 'drop-shadow(0 0 16px #818CF8)' }}>
            <BookIcon size={72} />
          </div>
        </div>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Explorations scientifiques, technologiques et culturelles.
        </p>
      </div>

      {/* New post button (admin only) */}
      {session && (
        <div className="flex justify-end mb-6">
          <Link
            href="/posts/new"
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          >
            + Nouvel article
          </Link>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Static posts */}
        {STATIC_POSTS.map((p) => (
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
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{p.excerpt}</p>
            </div>
          </Link>
        ))}

        {/* Dynamic posts from DB — empty state */}
        {posts.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/6 p-10 text-center" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <div className="text-3xl mb-3 opacity-30">📝</div>
            <p className="text-sm text-gray-600">Aucun article publié pour l&apos;instant.</p>
          </div>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative group block rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
            style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}
          >
            {session && (
              <div className="absolute top-3 right-3 z-10">
                <DeletePostButton postId={post.id} />
              </div>
            )}
            <Link href={`/posts/${post.id}`} className="block">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.image || '/default.png'}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={post.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                    Article
                  </span>
                  <span className="text-xs text-gray-600 font-mono">{post.createdAt.getUTCFullYear()}</span>
                </div>
                <h2 className="text-base font-bold text-white mb-1.5 leading-snug">{post.title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                  Lire l&apos;article complet →
                </p>
              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}
