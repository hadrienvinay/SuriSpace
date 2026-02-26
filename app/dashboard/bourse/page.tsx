'use client';

import { useEffect, useState } from 'react';
import BourseOrderModal from '@/components/BourseOrderModal';
import BourseChart from '@/components/BourseChart';
import Link from 'next/link';

interface BourseOrder {
  id: number;
  name: string;
  ticker: string;
  type: string;
  montant: number;
  prixAchat: number;
  prixActuel: number;
  quantity: number;
  investmentDate?: string | Date;
  createdAt?: string;
}

type SortKey = 'name' | 'ticker' | 'type' | 'montant' | 'prixAchat' | 'prixActuel' | 'plusValue' | 'pct';
type SortDir = 'asc' | 'desc';

const TYPE_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  ACTIONS:            { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)',  color: '#60A5FA' },
  METAUX:             { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)',  color: '#FBBF24' },
  ENERGIE:            { bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.3)',  color: '#FB923C' },
  MATIERES_PREMIERES: { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)',  color: '#34D399' },
  CRYPTO:             { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', color: '#A78BFA' },
  ETF:                { bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)',  color: '#22D3EE' },
  OBLIGATIONS:        { bg: 'rgba(45,212,191,0.12)',  border: 'rgba(45,212,191,0.3)',  color: '#2DD4BF' },
};

const COLUMNS: { label: string; field: SortKey | null }[] = [
  { label: 'Nom',          field: 'name'       },
  { label: 'Ticker',       field: 'ticker'     },
  { label: 'Type',         field: 'type'       },
  { label: 'Montant',      field: 'montant'    },
  { label: 'Prix achat',   field: 'prixAchat'  },
  { label: 'Prix actuel',  field: 'prixActuel' },
  { label: '+/- (€)',      field: 'plusValue'  },
  { label: '%',            field: 'pct'        },
  { label: '',             field: null         },
];

const FIELD_STYLE = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff', fontSize: 14, outline: 'none',
};

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function BoursePage() {
  const [orders, setOrders]             = useState<BourseOrder[]>([]);
  const [loading, setLoading]           = useState(true);
  const [modalOpen, setModalOpen]       = useState(false);
  const [editingOrder, setEditingOrder] = useState<BourseOrder | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortKey, setSortKey]           = useState<SortKey>('investmentDate' as SortKey);
  const [sortDir, setSortDir]           = useState<SortDir>('desc');
  const [searchQ, setSearchQ]           = useState('');
  const [updating, setUpdating]         = useState(false);
  const [chartKey, setChartKey]         = useState(0);

  useEffect(() => {
    fetch('/api/bourse')
      .then(r => r.json())
      .then(d => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdatePrices = async () => {
    setUpdating(true);
    try {
      await fetch('/api/bourse/update');
      const res = await fetch('/api/bourse');
      const data = await res.json();
      setOrders(data.orders || []);
      setChartKey(k => k + 1); // remount BourseChart → refetch history
    } finally {
      setUpdating(false);
    }
  };

  const openEdit = (o: BourseOrder) => { setEditingOrder(o); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingOrder(null); };

  const handleSaved = (saved: BourseOrder) => {
    if (editingOrder) {
      setOrders(prev => prev.map(o => o.id === saved.id ? { ...o, ...saved } : o));
    } else {
      setOrders(prev => [saved, ...prev]);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/bourse/${id}`, { method: 'DELETE' });
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleSort = (field: SortKey | null) => {
    if (!field) return;
    if (sortKey === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(field); setSortDir('asc'); }
  };

  // Present types for filter buttons
  const typeKeys = Object.keys(TYPE_COLORS).filter(t => orders.some(o => o.type === t));

  // Filtered
  const filtered = orders
    .filter(o => !activeFilter || o.type === activeFilter)
    .filter(o => !searchQ || o.name.toLowerCase().includes(searchQ.toLowerCase()) || o.ticker.toLowerCase().includes(searchQ.toLowerCase()));

  // Sorted
  const sorted = [...filtered].sort((a, b) => {
    let av: number, bv: number;
    const getPlusValue = (o: BourseOrder) => (o.prixActuel - o.prixAchat) * o.quantity;
    const getPct = (o: BourseOrder) => o.prixAchat ? ((o.prixActuel - o.prixAchat) / o.prixAchat) * 100 : 0;
    switch (sortKey) {
      case 'plusValue': av = getPlusValue(a); bv = getPlusValue(b); break;
      case 'pct':       av = getPct(a);       bv = getPct(b);       break;
      case 'name':      return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      case 'ticker':    return sortDir === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker);
      case 'type':      return sortDir === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
      default:          av = (a as any)[sortKey] ?? 0; bv = (b as any)[sortKey] ?? 0;
    }
    return sortDir === 'asc' ? av - bv : bv - av;
  });

  // Stats from filtered list
  const totalInvesti    = sorted.reduce((s, o) => s + o.montant, 0);
  const totalActuel     = sorted.reduce((s, o) => s + o.prixActuel * o.quantity, 0);
  const totalPlusValue  = totalActuel - totalInvesti;
  const totalPct        = totalInvesti ? (totalPlusValue / totalInvesti) * 100 : 0;

  const stats = [
    { label: 'Total investi',    value: `${fmt(totalInvesti)} €`,    icon: '💰', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
    { label: 'Valeur actuelle',  value: `${fmt(totalActuel)} €`,     icon: '📈', color: '#34D399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)'  },
    {
      label: 'Plus-value',
      value: `${totalPlusValue >= 0 ? '+' : ''}${fmt(totalPlusValue)} € (${totalPlusValue >= 0 ? '+' : ''}${fmt(totalPct, 1)}%)`,
      icon: totalPlusValue >= 0 ? '🚀' : '📉',
      color: totalPlusValue >= 0 ? '#34D399' : '#F87171',
      bg: totalPlusValue >= 0 ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)',
      border: totalPlusValue >= 0 ? 'rgba(52,211,153,0.2)' : 'rgba(239,68,68,0.2)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>
      {/* Back link */}
      <Link
        href="/dashboard"
        style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
      >
        ← Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #22D3EE, #60A5FA)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Bourse
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            {sorted.length} ordre{sorted.length !== 1 ? 's' : ''} · portefeuille simulé
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', flexShrink: 0 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvel ordre
        </button>
        <button
          onClick={handleUpdatePrices}
          disabled={updating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-50"
          style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34D399', flexShrink: 0 }}
        >
          {updating ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          {updating ? 'Mise à jour…' : 'Actualiser les prix'}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Portfolio chart */}
      <BourseChart key={chartKey} />

      {/* Filters + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        {typeKeys.length > 1 && (
          <>
            <button
              onClick={() => setActiveFilter(null)}
              style={{
                padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: !activeFilter ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: !activeFilter ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.1)',
                color: !activeFilter ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            >
              Tous
            </button>
            {typeKeys.map(t => {
              const c = TYPE_COLORS[t] || { bg: 'transparent', border: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' };
              const active = activeFilter === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveFilter(active ? null : t)}
                  style={{
                    padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: active ? c.bg : 'transparent',
                    border: `1px solid ${active ? c.border : 'rgba(255,255,255,0.1)'}`,
                    color: active ? c.color : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {t.replace('_', ' ')}
                </button>
              );
            })}
          </>
        )}
        <div style={{ flex: 1, minWidth: 180 }}>
          <input
            style={{ ...FIELD_STYLE, padding: '7px 12px' }}
            placeholder="Rechercher…"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        {loading ? (
          <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>Chargement…</div>
        ) : sorted.length === 0 ? (
          <div className="p-10 text-center" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
            Aucun ordre enregistré —{' '}
            <button onClick={() => setModalOpen(true)} style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', fontSize: 14 }}>
              passer le premier ordre
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="w-full text-sm" style={{ minWidth: 720 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {/* TOTAL row header */}
                  {COLUMNS.map(col => (
                    <th
                      key={col.label}
                      onClick={() => handleSort(col.field)}
                      className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                      style={{
                        fontSize: 11,
                        color: sortKey === col.field ? '#60A5FA' : 'rgba(255,255,255,0.28)',
                        cursor: col.field ? 'pointer' : 'default',
                        whiteSpace: 'nowrap', userSelect: 'none',
                      }}
                    >
                      {col.label}
                      {col.field && sortKey === col.field && (
                        <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '▲' : '▼'}</span>
                      )}
                      {col.field && sortKey !== col.field && <span style={{ marginLeft: 4, opacity: 0.3 }}>⬍</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* TOTAL row */}
                <tr style={{ background: 'rgba(96,165,250,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <td className="px-4 py-2" colSpan={3} style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    TOTAL ({sorted.length})
                  </td>
                  <td className="px-4 py-2" style={{ color: '#60A5FA', fontWeight: 700 }}>{fmt(totalInvesti)} €</td>
                  <td className="px-4 py-2" />
                  <td className="px-4 py-2" style={{ color: '#60A5FA', fontWeight: 700 }}>{fmt(totalActuel)} €</td>
                  <td className="px-4 py-2" style={{ color: totalPlusValue >= 0 ? '#34D399' : '#F87171', fontWeight: 700 }}>
                    {totalPlusValue >= 0 ? '+' : ''}{fmt(totalPlusValue)} €
                  </td>
                  <td className="px-4 py-2" style={{ color: totalPct >= 0 ? '#34D399' : '#F87171', fontWeight: 700 }}>
                    {totalPct >= 0 ? '+' : ''}{fmt(totalPct, 1)}%
                  </td>
                  <td />
                </tr>

                {/* Data rows */}
                {sorted.map((o, i) => {
                  const plusValue = (o.prixActuel - o.prixAchat) * o.quantity;
                  const pct = o.prixAchat ? ((o.prixActuel - o.prixAchat) / o.prixAchat) * 100 : 0;
                  const tc = TYPE_COLORS[o.type] || { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' };
                  const dateStr = o.investmentDate ? new Date(o.investmentDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

                  return (
                    <tr
                      key={o.id}
                      className="group transition-colors"
                      style={{
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(96,165,250,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                    >
                      <td className="px-4 py-3" style={{ fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
                        <div>{o.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{dateStr}</div>
                      </td>
                      <td className="px-4 py-3" style={{ color: '#60A5FA', fontWeight: 700, fontFamily: 'monospace' }}>{o.ticker}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}>
                          {o.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>{fmt(o.montant)} €</td>
                      <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{fmt(o.prixAchat)}</td>
                      <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>{fmt(o.prixActuel)}</td>
                      <td className="px-4 py-3" style={{ color: plusValue >= 0 ? '#34D399' : '#F87171', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {plusValue >= 0 ? '+' : ''}{fmt(plusValue)} €
                      </td>
                      <td className="px-4 py-3" style={{ color: pct >= 0 ? '#34D399' : '#F87171', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {pct >= 0 ? '+' : ''}{fmt(pct, 1)}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(o)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', color: '#60A5FA', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(o.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BourseOrderModal
        isOpen={modalOpen}
        onClose={closeModal}
        editOrder={editingOrder}
        onSaved={handleSaved}
      />
    </div>
  );
}
