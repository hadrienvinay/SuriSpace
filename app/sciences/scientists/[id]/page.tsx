// app/sciences/scientists/[id]/page.tsx
import Link from 'next/link';
import ScienceLayout from '@/components/ScienceLayout';
import { scientists, revolutions, DOMAIN_COLORS, ERA_LABELS } from '@/data/scientists';

export default async function ScientistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scientist = scientists.find(s => s.id === id);

  if (!scientist) {
    return (
      <ScienceLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">🔬</p>
            <p className="text-gray-500 mb-3">Scientifique introuvable</p>
            <Link href="/sciences/scientists" className="text-indigo-400 underline">
              Retour aux scientifiques
            </Link>
          </div>
        </div>
      </ScienceLayout>
    );
  }

  const color = scientist.color;
  const relatedRevolutions = revolutions.filter(r => r.scientistIds.includes(scientist.id));
  const idx  = scientists.findIndex(s => s.id === scientist.id);
  const prev = scientists[idx - 1];
  const next = scientists[idx + 1];

  return (
    <ScienceLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6">
          <Link href="/sciences" className="hover:text-white transition-colors">⏱️ Timeline</Link>
          <span>›</span>
          <Link href="/sciences/scientists" className="hover:text-white transition-colors">Scientifiques</Link>
          <span>›</span>
          <span className="text-gray-400">{scientist.name}</span>
        </div>

        {/* ── Header card ── */}
        <div
          className="rounded-2xl border p-6 mb-8"
          style={{ background: `${color}0A`, borderColor: `${color}35` }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className="w-24 h-24 rounded-3xl border-2 flex items-center justify-center text-5xl shrink-0"
              style={{ borderColor: color + '50', background: color + '18' }}
            >
              {scientist.emoji}
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest mb-1 font-semibold" style={{ color }}>
                {ERA_LABELS[scientist.era]}
              </div>
              <h1
                className="text-4xl font-bold text-white mb-1"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                {scientist.name}
              </h1>
              <div className="text-gray-400 font-mono text-sm mb-3">
                {scientist.born < 0 ? `${Math.abs(scientist.born)} av. J.-C.` : scientist.born}
                {scientist.died ? ` — ${scientist.died}` : ''}
                {' · '}{scientist.nationality}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {scientist.domains.map(d => (
                  <span
                    key={d}
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      background: (DOMAIN_COLORS[d] || '#888') + '22',
                      color: DOMAIN_COLORS[d] || '#888',
                      border: `1px solid ${(DOMAIN_COLORS[d] || '#888')}44`,
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-base leading-relaxed">{scientist.shortBio}</p>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: biography + discoveries + quotes */}
          <div className="lg:col-span-2 space-y-6">

            {/* Biography */}
            <div
              className="rounded-2xl border border-white/8 p-6"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Biographie</h2>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {scientist.biography}
              </p>
            </div>

            {/* Discoveries */}
            <div
              className="rounded-2xl border p-6"
              style={{ background: `${color}08`, borderColor: `${color}25` }}
            >
              <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                Découvertes & Contributions
              </h2>
              <div className="space-y-2">
                {scientist.discoveries.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: color + '10' }}
                  >
                    <span
                      className="shrink-0 font-mono text-xs mt-0.5 font-bold"
                      style={{ color }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-200 text-sm">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quotes */}
            {scientist.quotes && scientist.quotes.length > 0 && (
              <div
                className="rounded-2xl border border-white/8 p-6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Citations</h2>
                <div className="space-y-4">
                  {scientist.quotes.map((q, i) => (
                    <blockquote
                      key={i}
                      className="border-l-2 pl-4 italic text-gray-300 text-sm leading-relaxed"
                      style={{ borderColor: color }}
                    >
                      "{q}"
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-4">

            {/* Key works */}
            {scientist.keyWorks && scientist.keyWorks.length > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: `${color}08`, borderColor: `${color}25` }}
              >
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Œuvres majeures</h3>
                <div className="space-y-2.5">
                  {scientist.keyWorks.map((w, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <span style={{ color }}>📖</span>
                      <span className="text-gray-300">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related revolutions */}
            {relatedRevolutions.length > 0 && (
              <div
                className="rounded-2xl border border-white/8 p-5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Révolutions scientifiques
                </h3>
                <div className="space-y-2">
                  {relatedRevolutions.map(r => (
                    <Link
                      key={r.id}
                      href="/sciences"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all"
                    >
                      <div
                        className="w-3 h-3 rounded-sm shrink-0 mt-0.5"
                        style={{ background: r.color }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-300">{r.title}</div>
                        <div className="text-xs text-gray-600 font-mono">
                          {r.year}{r.endYear ? ` — ${r.endYear}` : ''}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation prev/next */}
            <div className="flex gap-3">
              {prev && (
                <Link
                  href={`/sciences/scientists/${prev.id}`}
                  className="flex-1 p-3 rounded-xl border border-white/8 hover:border-white/20 transition-all text-center"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-xl mb-1">{prev.emoji}</div>
                  <div className="text-xs text-gray-500">← {prev.name.split(' ').pop()}</div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/sciences/scientists/${next.id}`}
                  className="flex-1 p-3 rounded-xl border border-white/8 hover:border-white/20 transition-all text-center"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-xl mb-1">{next.emoji}</div>
                  <div className="text-xs text-gray-500">{next.name.split(' ').pop()} →</div>
                </Link>
              )}
            </div>

            {/* Back links */}
            <div className="space-y-2">
              <Link
                href="/sciences/scientists"
                className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider border border-white/10 text-gray-400 hover:bg-white/6 transition-all"
              >
                ← Tous les scientifiques
              </Link>
              <Link
                href="/sciences"
                className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider border border-indigo-800/40 text-indigo-400 hover:bg-indigo-900/20 transition-all"
              >
                ⏱️ Voir la timeline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScienceLayout>
  );
}
