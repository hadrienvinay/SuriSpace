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
import { QuillIcon, BookIcon } from '@/components/icons/ArticlesIcons';
import { JsonLd } from '@/components/common/JsonLd';
import { STATIC_POSTS } from '@/data/posts';

export default function Posts() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-12"
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
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#818CF8', boxShadow: '0 0 8px #818CF8' }} />
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-300/80">
            Journal — {STATIC_POSTS.length} article{STATIC_POSTS.length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-1"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Articles
          </h1>
          <div style={{ filter: 'drop-shadow(0 0 14px #6366F1)' }}>
            <QuillIcon size={40} />
          </div>
          <div style={{ filter: 'drop-shadow(0 0 14px #818CF8)' }}>
            <BookIcon size={40} />
          </div>
        </div>
        <p className="text-gray-400 text-base mt-2">
          Explorations scientifiques, technologiques et culturelles.
        </p>
      </div>

      {/* Rail list */}
      <div className="flex flex-col gap-2.5">
        {STATIC_POSTS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-stretch gap-5 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3.5 sm:px-5 transition-all duration-200 hover:bg-white/[0.045] hover:border-white/12 hover:translate-x-0.5"
          >
            <span className={`w-1 rounded-full shrink-0 ${p.rail}`} />
            <div className="hidden sm:flex w-20 h-14 shrink-0 rounded-lg overflow-hidden relative bg-white/5">
              <Image
                src={p.image}
                fill
                sizes="80px"
                alt={p.title}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h2 className="text-base font-bold text-white mb-1 leading-snug truncate">{p.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-1 sm:line-clamp-2 max-w-lg">{p.excerpt}</p>
            </div>
            <div className="shrink-0 flex flex-col items-end justify-center gap-1.5 pl-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.tagBg} ${p.accent} whitespace-nowrap`}>
                {p.tag}
              </span>
              <span className="text-xs text-gray-600 font-mono">{p.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
