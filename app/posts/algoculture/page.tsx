// app/posts/algoculture/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Algo from '@/components/algo';
import { JsonLd } from '@/components/JsonLd';
import ReadingProgress from '@/components/ReadingProgress';

export const metadata: Metadata = {
  title: "L'algoculture",
  description: "La culture des algues est vieille de plusieurs siècles, mais connaît aujourd'hui une croissance rapide à l'échelle mondiale.",
  keywords: ['algoculture', 'algues', 'aquaculture', 'environnement', 'alimentation durable'],
  openGraph: { title: "L'algoculture", description: "La culture des algues et son essor mondial.", type: 'article', url: 'https://suri-space.vercel.app/posts/algoculture' },
  alternates: { canonical: '/posts/algoculture' },
};

const JSONLD = {
  '@context': 'https://schema.org', '@type': 'BlogPosting',
  headline: "L'algoculture",
  description: "La culture des algues est vieille de plusieurs siècles, mais connaît aujourd'hui une croissance rapide à l'échelle mondiale.",
  datePublished: '2025-11-10', inLanguage: 'fr',
  author: { '@type': 'Person', name: 'Hadrien Vinay' },
  url: 'https://suri-space.vercel.app/posts/algoculture',
  isPartOf: { '@type': 'Blog', name: 'Suri Space', url: 'https://suri-space.vercel.app' },
};

export default function Algoculture() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <ReadingProgress />
      <JsonLd data={JSONLD} />
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
        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Environnement
          </span>
          Hadrien Vinay · 18 Janvier 2026 · 2 min
        </div>
      </div>

      <Algo />

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
