"use client";
import { useEffect, useState } from 'react';
import Action, { ActionParams } from '@/lib/Action';
import Link from 'next/link';
import { useRouter } from "next/navigation";

type Stored = ReturnType<Action['toJSON']> & { id: number; createdAt?: string };
type SortField = 'ticker' | 'name' | 'price' | 'gain' | 'invested' | 'pe' | 'currentvalue' | 'dividendYield' | 'where' | 'purchasePrice';
type SortDirection = 'asc' | 'desc';
const STORAGE_KEY = 'suri_actions';

const WHERE_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  PEA:     { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)',  color: '#34D399' },
  AV:      { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)',  color: '#FBBF24' },
  BINANCE: { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', color: '#A78BFA' },
  SCPI:    { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)',  color: '#60A5FA' },
  PS:      { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   color: '#F87171' },
  TITRES:  { bg: 'rgba(20,184,166,0.12)',  border: 'rgba(20,184,166,0.3)',  color: '#2DD4BF' },
};

const FIELD_STYLE = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff', fontSize: 14, outline: 'none',
};
const LABEL_STYLE = {
  display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 6,
};

const COLUMNS: { label: string; field: SortField | null }[] = [
  { label: 'Action',      field: 'name'          },
  { label: 'Type',        field: 'where'         },
  { label: 'Prix achat',  field: 'purchasePrice' },
  { label: 'Prix actuel', field: 'price'         },
  { label: 'Gain',        field: 'gain'          },
  { label: 'P/E',         field: 'pe'            },
  { label: 'Dividende',   field: 'dividendYield' },
  { label: 'Investi',     field: 'invested'      },
  { label: 'Valeur act.', field: 'currentvalue'  },
  { label: '',            field: null            },
];

const EMPTY_FORM: Partial<ActionParams> = {
  name: '', ticker: '', price: 0, purchasePrice: 0, quantity: 1,
  pe: undefined, dividendYield: undefined, where: '',
};

function loadStored(): Stored[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Stored[];
  } catch { return []; }
}

function saveStored(list: Stored[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* noop */ }
}

export default function ActionsManager() {
  const [list, setList]                           = useState<Stored[]>([]);
  const [form, setForm]                           = useState<Partial<ActionParams>>(EMPTY_FORM);
  const [usingServer, setUsingServer]             = useState(true);
  const [isDeleting, setIsDeleting]               = useState(false);
  const [isUpdating, setIsUpdating]               = useState(false);
  const [modalOpen, setModalOpen]                 = useState(false);
  const [editingAction, setEditingAction]         = useState<Stored | null>(null);
  const [sortField, setSortField]                 = useState<SortField>('name');
  const [sortDirection, setSortDirection]         = useState<SortDirection>('desc');
  const [activeFilter, setActiveFilter]           = useState<string | null>(null);
  const router = useRouter();

const sortList = (items: Stored[]) => {
    return [...items].sort((a, b) => {
      const aA = new Action({ name: a.name, ticker: a.ticker, price: a.price, purchasePrice: a.purchasePrice, quantity: a.quantity, pe: a.pe, dividendYield: a.dividendYield, where: a.where });
      const bA = new Action({ name: b.name, ticker: b.ticker, price: b.price, purchasePrice: b.purchasePrice, quantity: b.quantity, pe: b.pe, dividendYield: b.dividendYield, where: b.where });
      let av: number | string, bv: number | string;
      switch (sortField) {
        case 'gain':          av = aA.getGainPercent() ?? 0;      bv = bA.getGainPercent() ?? 0;      break;
        case 'invested':      av = aA.purchasePrice * aA.quantity; bv = bA.purchasePrice * bA.quantity; break;
        case 'currentvalue':  av = aA.price * aA.quantity;         bv = bA.price * bA.quantity;         break;
        case 'price':         av = aA.price;                       bv = bA.price;                       break;
        case 'purchasePrice': av = aA.purchasePrice;                bv = bA.purchasePrice;                break;
        case 'pe':            av = aA.pe || 0;                     bv = bA.pe || 0;                     break;
        case 'dividendYield': av = aA.dividendYield || 0;          bv = bA.dividendYield || 0;          break;
        // @ts-ignore
        default:              av = a[sortField] || '';             bv = b[sortField] || '';
      }
      if (av < bv) return sortDirection === 'asc' ? -1 : 1;
      if (av > bv) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/actions');
        if (!res.ok) throw new Error('no server');
        const data = await res.json();
        if (data.items) {
          setList(data.items as Stored[]);
          setUsingServer(true);
        }
      } catch {
        setUsingServer(false);
        setList(loadStored());
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!modalOpen) { setForm(EMPTY_FORM); setEditingAction(null); }
  }, [modalOpen]);

  function openEdit(item: Stored) {
    setForm({
      name: item.name, ticker: item.ticker,
      price: item.price, purchasePrice: item.purchasePrice,
      quantity: item.quantity,
      pe: item.pe ?? undefined,
      dividendYield: item.dividendYield ?? undefined,
      where: item.where ?? '',
    });
    setEditingAction(item);
    setModalOpen(true);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function onChange<K extends keyof ActionParams>(key: K, value: ActionParams[K] | undefined) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function addAction(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (!form.name || !form.ticker) return;
    const params: ActionParams = {
      name: String(form.name), ticker: String(form.ticker),
      price: Number(form.price || 0), purchasePrice: Number(form.purchasePrice || 0),
      quantity: form.quantity ? Number(form.quantity) : 1,
      pe: form.pe ? Number(form.pe) : undefined,
      dividendYield: form.dividendYield ? Number(form.dividendYield) : undefined,
      where: form.where || undefined,
    };

    // Mode édition
    if (editingAction) {
      try {
        const res = await fetch(`/api/actions/${editingAction.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
        if (!res.ok) throw new Error('Failed to update');
        const data = await res.json();
        setList((s) => s.map((l) => l.id === editingAction.id ? { ...l, ...data.item } : l));
      } catch { /* noop */ }
      setModalOpen(false);
      return;
    }

    // Mode ajout
    const a = new Action(params);
    if (usingServer) {
      try {
        const res = await fetch('/api/actions', { method: 'POST', body: JSON.stringify(a.toJSON()), headers: { 'Content-Type': 'application/json' } });
        if (!res.ok) throw new Error('Failed to save');
        const data = await res.json();
        setList((s) => [data.item as Stored, ...s]);
      } catch {
        const stored = { ...(a.toJSON() as any), id: Date.now() } as Stored;
        setList((prev) => [stored, ...prev]);
        saveStored([stored, ...list]);
        setUsingServer(false);
      }
    } else {
      const stored = { ...(a.toJSON() as any), id: Date.now() } as Stored;
      const next = [stored, ...list];
      setList(next);
      saveStored(next);
    }
    setModalOpen(false);
  }

  async function updatePrices() {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/actions/update', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to update prices');
      const data = await res.json();
      setList(data.items as Stored[]);
      router.push('/dashboard/actions');
      router.refresh();
    } catch { /* noop */ }
    finally { setIsUpdating(false); }
  }

  async function handleDelete(id: number | string) {
    if (!confirm('Supprimer cette action ?')) return;
    setIsDeleting(true);
    if (usingServer && typeof id === 'number') {
      try {
        const res = await fetch(`/api/actions/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        setList((s) => s.filter((l) => l.id !== id));
        return;
      } catch { setUsingServer(false); }
      finally { setIsDeleting(false); }
    }
    const next = list.filter((l) => String(l.id) !== String(id));
    setList(next);
    saveStored(next);
    setIsDeleting(false);
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('desc'); }
  };

  const sortedList = sortList(
    activeFilter ? list.filter(l => l.where === activeFilter) : list
  );

  const whereKeys = Object.keys(WHERE_COLORS).filter(w => list.some(l => l.where === w));

  const filteredInvested     = sortedList.reduce((s, l) => s + l.purchasePrice * l.quantity, 0);
  const filteredCurrentValue = sortedList.reduce((s, l) => s + l.price * l.quantity, 0);
  const filteredGain         = sortedList.reduce((s, l) => s + (l.price - l.purchasePrice) * l.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm mb-4 transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
        >
          ← Dashboard
        </Link>
        <div className="flex items-center justify-between">
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
              Portefeuille 
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              {sortedList.length} action{sortedList.length > 1 ? 's' : ''}
              {activeFilter && <span style={{ color: WHERE_COLORS[activeFilter]?.color, marginLeft: 4 }}>({activeFilter})</span>}
              {' · '}
              <span style={{ color: filteredGain >= 0 ? '#34D399' : '#F87171' }}>
                {filteredGain >= 0 ? '+' : ''}{filteredGain.toFixed(2)} €
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={updatePrices}
              disabled={isUpdating}
              className="px-4 py-2 cursor-pointer rounded-xl text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-wait"
              style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)', color: '#60A5FA' }}
            >
              {isUpdating ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Mise à jour…
                </span>
              ) : '↻ Mettre à jour les prix'}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-2.5 cursor-pointer rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              + Ajouter une action
            </button>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      {list.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Montant investi', value: `${filteredInvested.toFixed(2)} €`, color: '#60A5FA', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
            { label: 'Valeur actuelle', value: `${filteredCurrentValue.toFixed(2)} €`, color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
            {
              label: 'Gain total',
              value: `${filteredGain >= 0 ? '+' : ''}${filteredGain.toFixed(2)} €`,
              color: filteredGain >= 0 ? '#34D399' : '#F87171',
              bg: filteredGain >= 0 ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)',
              border: filteredGain >= 0 ? 'rgba(52,211,153,0.2)' : 'rgba(239,68,68,0.2)',
            },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filtres */}
      {list.length > 0 && whereKeys.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter(null)}
            style={{
              padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s',
              background: !activeFilter ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: !activeFilter ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.1)',
              color: !activeFilter ? '#fff' : 'rgba(255,255,255,0.4)',
            }}
          >
            Tous ({list.length})
          </button>
          {whereKeys.map(w => {
            const s = WHERE_COLORS[w];
            const count = list.filter(l => l.where === w).length;
            const active = activeFilter === w;
            return (
              <button
                key={w}
                onClick={() => setActiveFilter(active ? null : w)}
                style={{
                  padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: active ? s.bg : 'transparent',
                  border: `1px solid ${active ? s.border : 'rgba(255,255,255,0.1)'}`,
                  color: active ? s.color : 'rgba(255,255,255,0.4)',
                }}
              >
                {w} <span style={{ opacity: 0.6 }}>({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Table */}
      {list.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📈</div>
          <p style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Aucune action — ajoute ta première position !</p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            + Ajouter une action
          </button>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {COLUMNS.map(col => (
                  <th
                    key={col.label}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                    style={{
                      fontSize: 11,
                      color: col.field && sortField === col.field ? 'rgba(167,139,250,0.9)' : 'rgba(255,255,255,0.28)',
                      whiteSpace: 'nowrap',
                      cursor: col.field ? 'pointer' : 'default',
                      userSelect: 'none',
                      transition: 'color 0.15s',
                    }}
                    onClick={() => col.field && handleSort(col.field)}
                  >
                    {col.label}
                    {col.field && (
                      <span style={{ marginLeft: 4, opacity: sortField === col.field ? 1 : 0.3, fontSize: 10 }}>
                        {sortField === col.field ? (sortDirection === 'asc' ? '▲' : '▼') : '⬍'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Ligne total filtrée */}
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <td className="px-4 py-3" style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Total
                  {activeFilter && <span style={{ marginLeft: 6, color: WHERE_COLORS[activeFilter]?.color }}>{activeFilter}</span>}
                  <span style={{ marginLeft: 6, opacity: 0.5 }}>({sortedList.length})</span>
                </td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3" />
                <td className="px-4 py-3" />
                <td className="px-4 py-3 font-semibold" style={{ color: filteredGain >= 0 ? '#34D399' : '#F87171', whiteSpace: 'nowrap' }}>
                  {filteredGain >= 0 ? '+' : ''}{filteredGain.toFixed(2)} €
                </td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3" />
                <td className="px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>
                  {filteredInvested.toFixed(2)} €
                </td>
                <td className="px-4 py-3 font-semibold" style={{ color: '#a78bfa', whiteSpace: 'nowrap' }}>
                  {filteredCurrentValue.toFixed(2)} €
                </td>
                <td className="px-4 py-3" />
              </tr>
              {sortedList.map((item, i) => {
                const a = new Action({ name: item.name, ticker: item.ticker, price: item.price, purchasePrice: item.purchasePrice, quantity: item.quantity, pe: item.pe ?? undefined, dividendYield: item.dividendYield ?? undefined, where: item.where ?? undefined });
                const gain = a.getGain() * a.quantity;
                const gainPct = a.getGainPercent();
                const whereStyle = item.where ? (WHERE_COLORS[item.where] ?? { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }) : null;
                return (
                  <tr
                    key={String(item.id)}
                    className="group transition-colors"
                    style={{
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(167,139,250,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{item.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontFamily: 'monospace' }}>{item.ticker}</div>
                    </td>
                    <td className="px-4 py-3">
                      {whereStyle && item.where ? (
                        <span className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: whereStyle.bg, border: `1px solid ${whereStyle.border}`, color: whereStyle.color }}>
                          {item.where}
                        </span>
                      ) : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {a.purchasePrice.toFixed(2)} €
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {a.price.toFixed(2)} €
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: gain >= 0 ? '#34D399' : '#F87171', whiteSpace: 'nowrap' }}>
                      {gain >= 0 ? '+' : ''}{gain.toFixed(2)} €
                      {gainPct !== null && (
                        <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 4 }}>
                          ({gainPct >= 0 ? '+' : ''}{gainPct.toFixed(1)}%)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                      {item.pe != null ? item.pe.toFixed(2) : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                      {item.dividendYield != null ? `${(item.dividendYield * 100).toFixed(2)}%` : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {(a.purchasePrice * a.quantity).toFixed(2)} €
                    </td>
                    <td className="px-4 py-3 font-mono" style={{ color: '#a78bfa', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {(a.price * a.quantity).toFixed(2)} €
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
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                            color: '#f87171', borderRadius: 6, padding: '2px 10px', fontSize: 11,
                            cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
                          }}
                        >
                          {isDeleting ? '…' : 'Supprimer'}
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

      {/* Modal ajout */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0,0,8,0.88)', backdropFilter: 'blur(10px)' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full mx-4 rounded-2xl flex flex-col"
            style={{ maxWidth: 560, background: 'rgba(8,12,28,0.97)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 90px rgba(0,0,0,0.7)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A78BFA', boxShadow: '0 0 8px #A78BFA' }} />
                <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.05em' }}>
                  {editingAction ? `Modifier — ${editingAction.name}` : 'Ajouter une action'}
                </span>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 22, lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>

            <form onSubmit={addAction} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={LABEL_STYLE}>Nom *</label>
                  <input type="text" required placeholder="Ex : Apple" value={form.name || ''} onChange={e => onChange('name', e.target.value)} style={FIELD_STYLE} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Ticker *</label>
                  <input type="text" required placeholder="Ex : AAPL" value={form.ticker || ''} onChange={e => onChange('ticker', e.target.value)} style={{ ...FIELD_STYLE, fontFamily: 'monospace' }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label style={LABEL_STYLE}>Prix actuel *</label>
                  <input type="number" step="0.01" required value={String(form.price ?? 0)} onChange={e => onChange('price', Number(e.target.value || 0))} style={FIELD_STYLE} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Prix d&apos;achat *</label>
                  <input type="number" step="0.01" required value={String(form.purchasePrice ?? 0)} onChange={e => onChange('purchasePrice', Number(e.target.value || 0))} style={FIELD_STYLE} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Quantité *</label>
                  <input type="number" step="1" required value={String(form.quantity ?? 1)} onChange={e => onChange('quantity', Number(e.target.value || 1))} style={FIELD_STYLE} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label style={LABEL_STYLE}>P/E <span style={{ textTransform: 'none', opacity: 0.5 }}>(opt.)</span></label>
                  <input type="number" step="0.01" value={String(form.pe ?? '')} onChange={e => onChange('pe', e.target.value === '' ? undefined : Number(e.target.value))} style={FIELD_STYLE} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Dividende <span style={{ textTransform: 'none', opacity: 0.5 }}>(opt.)</span></label>
                  <input type="number" step="0.0001" placeholder="Ex : 0.023" value={String(form.dividendYield ?? '')} onChange={e => onChange('dividendYield', e.target.value === '' ? undefined : Number(e.target.value))} style={FIELD_STYLE} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Compte</label>
                  <select
                    value={form.where || ''}
                    onChange={e => onChange('where', e.target.value || undefined)}
                    style={{ ...FIELD_STYLE, cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#0a0f1e' }}>—</option>
                    {Object.keys(WHERE_COLORS).map(w => (
                      <option key={w} value={w} style={{ background: '#0a0f1e' }}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: '11px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                  color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '0.03em',
                }}
              >
                {editingAction ? '✓ Enregistrer les modifications' : '+ Ajouter l\'action'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
