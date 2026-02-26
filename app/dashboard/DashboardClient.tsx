'use client'

import Link from "next/link";
import { CreateLinkModal } from "@/components/CreateLinkModal";
import { useState } from "react";
import DeleteLinkButton from "@/components/DeleteLinkButton";

const TAG_COLORS: Record<string, string> = {
  Sciences: '#60A5FA', Education: '#34D399', Actualité: '#FBBF24',
  Economie: '#A78BFA', Religion: '#F472B6', Musique: '#FB923C',
  Politique: '#F87171', Maths: '#22D3EE', Technologie: '#818CF8',
  Histoire: '#A3E635', Philosophie: '#2DD4BF', Sport: '#FCD34D',
};

const NAV_CARDS = [
  {
    href: '/dashboard/actions',
    icon: '📈',
    label: 'Actions',
    desc: 'Suivi portefeuille Suri',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-300',
    glow: '#60A5FA',
  },
  {
    href: '/dashboard/bourse',
    icon: '💹',
    label: 'Bourse',
    desc: 'Marchés financiers',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    glow: '#34D399',
  },
  {
    href: '/dashboard/books',
    icon: '📚',
    label: 'Bibliothèque',
    desc: 'Livres lus et notes',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
    glow: '#A78BFA',
  },
];

export default function DashboardClient({
  messages, articleCount, projectCount, messageCount, bookCount, links: initialLinks,
}: {
  messages: any[];
  articleCount: any;
  projectCount: any;
  messageCount: any;
  bookCount: any;
  links: any[];
}) {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [editingLink, setEditingLink]   = useState<any | null>(null);
  const [links, setLinks]               = useState(initialLinks);
  const [sortKey, setSortKey]           = useState<'title' | 'tag' | null>(null);
  const [sortDir, setSortDir]           = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: 'title' | 'tag') => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sortedLinks = [...links].sort((a, b) => {
    if (!sortKey) return 0;
    const va = (a[sortKey] ?? '').toLowerCase();
    const vb = (b[sortKey] ?? '').toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb, 'fr') : vb.localeCompare(va, 'fr');
  });

  const openEdit = (item: any) => { setEditingLink(item); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingLink(null); };
  const handleLinkSaved = (saved: any) => {
    if (editingLink) {
      setLinks(prev => prev.map((l: any) => l.id === saved.id ? { ...l, ...saved } : l));
    } else {
      setLinks(prev => [saved, ...prev]);
    }
  };

  const stats = [
    { label: 'Articles', value: articleCount, icon: '✍️', color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
    { label: 'Projets',  value: projectCount, icon: '🚀', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
    { label: 'Messages', value: messageCount, icon: '💬', color: '#34D399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)'  },
    { label: 'Livres',   value: bookCount,    icon: '📚', color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)'  },
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-10 space-y-10"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      {/* Header */}
      <div>
        <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Dashboard
          </h1>        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Vue d&apos;ensemble du site</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div
            key={s.label}
            className="rounded-2xl p-5"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              {s.label}
            </p>
            <p style={{ fontSize: 34, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Navigation cards */}
      <div>
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {NAV_CARDS.map(c => (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative block rounded-2xl border ${c.border} bg-linear-to-br ${c.gradient} p-5 transition-all duration-300 hover:scale-[1.02] hover:brightness-110`}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div className="text-4xl mb-3" style={{ filter: `drop-shadow(0 0 12px ${c.glow})` }}>
                {c.icon}
              </div>
              <h3 className={`text-base font-bold mb-1 ${c.accent}`}>{c.label}</h3>
              <p className="text-gray-400 text-sm">{c.desc}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Ouvrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div>
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Messages reçus</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {messages.length === 0 ? (
            <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
              Aucun message reçu
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Nom', 'Email', 'Message'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, i) => (
                  <tr
                    key={msg.id}
                    className="transition-colors"
                    style={{
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,211,153,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td className="px-4 py-3 font-medium text-white">{msg.name}</td>
                    <td className="px-4 py-3" style={{ color: '#60A5FA' }}>{msg.email}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.55)' }}>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Liens & Ressources */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500">Liens &amp; Ressources</h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle ressource
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {links.length === 0 ? (
            <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
              Aucun lien enregistré
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {(['Titre', 'Description', 'Lien'] as const).map(h => (
                    <th
                      key={h}
                      onClick={h === 'Titre' ? () => toggleSort('title') : undefined}
                      className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', cursor: h === 'Titre' ? 'pointer' : 'default', userSelect: 'none' }}
                    >
                      {h}
                      {h === 'Titre' && <span style={{ marginLeft: 4, opacity: sortKey === 'title' ? 0.9 : 0.3 }}>{sortKey === 'title' ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}</span>}
                    </th>
                  ))}
                  <th
                    onClick={() => toggleSort('tag')}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                    style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}
                  >
                    Tags
                    <span style={{ marginLeft: 4, opacity: sortKey === 'tag' ? 0.9 : 0.3 }}>{sortKey === 'tag' ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}</span>
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {sortedLinks.map((item, i) => (
                  <tr
                    key={item.id}
                    className="group transition-colors"
                    style={{
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(167,139,250,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td className="px-4 py-3 font-medium text-white" style={{ maxWidth: 180 }}>{item.title}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 240 }}>{item.description}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={item.link}
                        className="hover:text-blue-300 transition-colors"
                        style={{ color: '#60A5FA', display: 'block', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {item.link}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(item.tag ?? '').split(',').map((t: string) => t.trim()).filter(Boolean).map((t: string) => (
                          <span key={t} style={{
                            padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600,
                            background: `${TAG_COLORS[t] ?? '#6B7280'}18`,
                            color: TAG_COLORS[t] ?? '#9CA3AF',
                            border: `1px solid ${TAG_COLORS[t] ?? '#6B7280'}35`,
                          }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)',
                            color: '#a78bfa', borderRadius: 6, padding: '2px 10px', fontSize: 11,
                            fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer',
                          }}
                        >
                          Modifier
                        </button>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <DeleteLinkButton linkId={item.id} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editLink={editingLink}
        onSaved={handleLinkSaved}
      />
    </div>
  );
}
