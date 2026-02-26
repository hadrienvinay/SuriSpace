'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

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
}

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

const ORDER_TYPES = [
  'ACTIONS', 'METAUX', 'ENERGIE', 'MATIERES_PREMIERES', 'CRYPTO', 'ETF', 'OBLIGATIONS',
];

const EMPTY_FORM = {
  name: '', ticker: '', type: 'ACTIONS',
  montant: '', investmentDate: new Date().toISOString().slice(0, 10), prix: '',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editOrder?: BourseOrder | null;
  onSaved?: (order: BourseOrder) => void;
}

export default function BourseOrderModal({ isOpen, onClose, editOrder, onSaved }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  const isEdit = !!editOrder;

  useEffect(() => {
    if (!isOpen) return;
    if (editOrder) {
      const dateStr = editOrder.investmentDate
        ? new Date(editOrder.investmentDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
      setForm({
        name: editOrder.name,
        ticker: editOrder.ticker,
        type: editOrder.type,
        montant: String(editOrder.montant),
        investmentDate: dateStr,
        prix: String(editOrder.prixAchat),
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
  }, [editOrder, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: form.name,
      ticker: form.ticker.trim().toUpperCase(),
      type: form.type,
      montant: Number(form.montant),
      investmentDate: form.investmentDate,
      prix: form.prix ? Number(form.prix) : undefined,
    };

    try {
      const url = isEdit ? `/api/bourse/${editOrder!.id}` : '/api/bourse';
      const method = isEdit ? 'PUT' : 'POST';

      let body: object = payload;
      if (isEdit) {
        body = {
          name: form.name,
          ticker: form.ticker.trim().toUpperCase(),
          type: form.type,
          montant: Number(form.montant),
          prixAchat: Number(form.prix) || editOrder!.prixAchat,
          prixActuel: editOrder!.prixActuel,
          quantity: Number(form.montant) / (Number(form.prix) || editOrder!.prixAchat),
          investmentDate: form.investmentDate,
        };
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur lors de la sauvegarde');
        return;
      }

      onSaved?.(data.order);
      onClose();
      router.refresh();
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,8,0.88)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 540,
          background: 'rgba(8,12,28,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: 32,
          boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
            {isEdit ? 'Modifier l\'ordre' : 'Nouvel ordre boursier'}
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}
          >×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Nom + Ticker */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={LABEL_STYLE}>Nom</label>
              <input
                style={FIELD_STYLE} required value={form.name}
                placeholder="ex: Apple Inc."
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Ticker</label>
              <input
                style={FIELD_STYLE} required value={form.ticker}
                placeholder="ex: AAPL, XAUUSD=X, BTC-USD, GC=F"
                onChange={e => setForm(f => ({ ...f, ticker: e.target.value }))}
              />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
                Or: <code style={{ color: 'rgba(255,255,255,0.4)' }}>XAUUSD=X</code> ou <code style={{ color: 'rgba(255,255,255,0.4)' }}>GC=F</code> · Argent: <code style={{ color: 'rgba(255,255,255,0.4)' }}>XAGUSD=X</code> ou <code style={{ color: 'rgba(255,255,255,0.4)' }}>SI=F</code>
              </p>
            </div>
          </div>

          {/* Type */}
          <div>
            <label style={LABEL_STYLE}>Type</label>
            <select
              style={{ ...FIELD_STYLE, appearance: 'none' }}
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            >
              {ORDER_TYPES.map(t => (
                <option key={t} value={t} style={{ background: '#0a0e1f' }}>
                  {t.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Montant + Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={LABEL_STYLE}>Montant investi (€)</label>
              <input
                style={FIELD_STYLE} type="number" min="0" step="0.01" required
                value={form.montant} placeholder="ex: 1000"
                onChange={e => setForm(f => ({ ...f, montant: e.target.value }))}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Date d'investissement</label>
              <input
                style={FIELD_STYLE} type="date"
                value={form.investmentDate}
                onChange={e => setForm(f => ({ ...f, investmentDate: e.target.value }))}
              />
            </div>
          </div>

          {/* Prix manuel */}
          <div>
            <label style={LABEL_STYLE}>
              Prix unitaire (optionnel — Yahoo Finance par défaut)
            </label>
            <input
              style={FIELD_STYLE} type="number" min="0" step="any"
              value={form.prix} placeholder="Laisser vide pour récupérer automatiquement"
              onChange={e => setForm(f => ({ ...f, prix: e.target.value }))}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#F87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '8px 12px' }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4, padding: '12px 24px', borderRadius: 12,
              background: loading ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              border: 'none', color: '#fff', fontSize: 14, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            }}
          >
            {loading
              ? (isEdit ? 'Mise à jour…' : 'Récupération du prix…')
              : (isEdit ? 'Enregistrer les modifications' : 'Passer l\'ordre')
            }
          </button>
        </form>
      </div>
    </div>
  );
}
