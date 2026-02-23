// app/sciences/scientists/page.tsx
import Link from 'next/link';
import ScienceLayout from '@/components/ScienceLayout';
import { scientists, DOMAIN_COLORS, ERA_LABELS } from '@/data/scientists';

export default function ScientistsPage() {
  return (
    <ScienceLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6">
          <Link href="/sciences" className="hover:text-white transition-colors">⏱️ Timeline</Link>
          <span>›</span>
          <span className="text-gray-400">Scientifiques</span>
        </div>

        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            Grands Scientifiques
          </h1>
          <p className="text-gray-500">{scientists.length} figures qui ont changé notre vision du monde</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scientists.map(s => (
            <Link
              key={s.id}
              href={`/sciences/scientists/${s.id}`}
              className="rounded-2xl border p-5 hover:border-white/20 transition-all group"
              style={{ background: `${s.color}08`, borderColor: `${s.color}25` }}
            >
              <div className="flex items-start gap-4 mb-3">
                <div
                  className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl shrink-0"
                  style={{ borderColor: s.color + '44', background: s.color + '15' }}
                >
                  {s.emoji}
                </div>
                <div className="min-w-0">
                  <div
                    className="text-xs uppercase tracking-widest mb-0.5 font-semibold"
                    style={{ color: s.color }}
                  >
                    {ERA_LABELS[s.era]}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:brightness-110 transition-all">
                    {s.name}
                  </h3>
                  <div className="text-xs text-gray-500 font-mono">
                    {s.born < 0 ? `${Math.abs(s.born)} av. J.-C.` : s.born}
                    {s.died ? ` — ${s.died}` : ''}
                    {' · '}{s.nationality}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
                {s.shortBio}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {s.domains.map(d => (
                  <span
                    key={d}
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: (DOMAIN_COLORS[d] || '#888') + '20',
                      color: DOMAIN_COLORS[d] || '#888',
                      border: `1px solid ${(DOMAIN_COLORS[d] || '#888')}35`,
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ScienceLayout>
  );
}
