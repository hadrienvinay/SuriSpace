'use client';

import Link from "next/link";
import { useState } from "react";

const TAG_COLORS: Record<string, string> = {
  Sciences: '#60A5FA', Education: '#34D399', Actualité: '#FBBF24',
  Economie: '#A78BFA', Religion: '#F472B6', Musique: '#FB923C',
  Politique: '#F87171', Maths: '#22D3EE', Technologie: '#818CF8',
  Histoire: '#A3E635', Philosophie: '#2DD4BF', Sport: '#FCD34D',
};

type LinkItem = {
  id: number;
  title: string;
  description: string | null;
  tag: string | null;
  link: string | null;
};

function TagBadges({ tag }: { tag: string | null }) {
  const tags = (tag ?? '').split(',').map(t => t.trim()).filter(Boolean);
  if (tags.length === 0) return <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map(t => (
        <span key={t} style={{
          padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600,
          background: `${TAG_COLORS[t] ?? '#6B7280'}18`,
          color: TAG_COLORS[t] ?? '#9CA3AF',
          border: `1px solid ${TAG_COLORS[t] ?? '#6B7280'}35`,
        }}>{t}</span>
      ))}
    </div>
  );
}

export default function ShowLinksClient({ links: initialLinks }: { links: LinkItem[] }) {
  const [sortKey, setSortKey] = useState<'title' | 'tag' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: 'title' | 'tag') => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...initialLinks].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (a[sortKey] ?? '').toLowerCase();
    const vb = (b[sortKey] ?? '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb, 'fr') : vb.localeCompare(va, 'fr');
  });

  const SortIcon = ({ col }: { col: 'title' | 'tag' }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === col ? 0.9 : 0.3 }}>
      {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}
    </span>
  );

  return (
    <div style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>
      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <th
                onClick={() => toggleSort('title')}
                className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}
              >
                Titre <SortIcon col="title" />
              </th>
              {['Description', 'Lien'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
              <th
                onClick={() => toggleSort('tag')}
                className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}
              >
                Tags <SortIcon col="tag" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, i) => (
              <tr
                key={item.id}
                style={{
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <td className="px-4 py-3 font-medium text-white" style={{ maxWidth: 180 }}>{item.title}</td>
                <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 260 }}>{item.description}</td>
                <td className="px-4 py-3">
                  <Link
                    href={item.link ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors"
                    style={{ color: '#60A5FA', display: 'block', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {item.link}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <TagBadges tag={item.tag} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3 mt-4">
        {sorted.map(item => (
          <div
            key={item.id}
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="font-semibold text-white mb-1">{item.title}</p>
            <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.description}</p>
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-blue-300 transition-colors mb-2 block"
                style={{ color: '#60A5FA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {item.link}
              </Link>
            )}
            <TagBadges tag={item.tag} />
          </div>
        ))}
      </div>
    </div>
  );
}
