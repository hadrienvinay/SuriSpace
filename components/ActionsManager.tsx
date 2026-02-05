"use client";
import { useEffect, useState } from 'react';
import Action, { ActionParams } from '@/lib/Action';

type Stored = ReturnType<Action['toJSON']> & { id: number; createdAt?: string };

const STORAGE_KEY = 'suri_actions';

function loadStored(): Stored[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Stored[];
  } catch (err) {
    console.error('Failed to load actions', err);
    return [];
  }
}

function saveStored(list: Stored[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save actions', err);
  }
}

export default function ActionsManager() {
  const [list, setList] = useState<Stored[]>([]);
  const [form, setForm] = useState<Partial<ActionParams>>({ name: '', ticker: '', price: 0, purchasePrice: 0, pe: undefined });
  const [usingServer, setUsingServer] = useState(true);

  useEffect(() => {
    // try load from server, fallback to localStorage
    async function init() {
      try {
        const res = await fetch('/api/actions');
        if (!res.ok) throw new Error('no server');
        const data = await res.json();
        if (data.items) {
          setList(data.items as Stored[]);
          setUsingServer(true);
          return;
        }
      } catch (err) {
        setUsingServer(false);
        setList(loadStored());
      }
    }
    init();
  }, []);

  function onChange<K extends keyof ActionParams>(key: K, value: ActionParams[K] | undefined) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function addAction(e?: React.FormEvent) {
    e?.preventDefault();
    if (!form.name || !form.ticker) return;
    const params: ActionParams = {
      name: String(form.name),
      ticker: String(form.ticker),
      price: Number(form.price || 0),
      purchasePrice: Number(form.purchasePrice || 0),
      pe: form.pe ? Number(form.pe) : undefined,
    };

    const a = new Action(params);

    if (usingServer) {
      try {
        const res = await fetch('/api/actions', { method: 'POST', body: JSON.stringify(a.toJSON()), headers: { 'Content-Type': 'application/json' } });
        if (!res.ok) throw new Error('Failed to save');
        const data = await res.json();
        setList((s) => [data.item as Stored, ...s]);
      } catch (err) {
        console.error('Server save failed, falling back to local', err);
        const stored = { ...(a.toJSON() as any), id: Date.now() } as Stored;
        const next = [stored, ...list];
        setList(next);
        saveStored(next);
        setUsingServer(false);
      }
    } else {
      const stored = { ...(a.toJSON() as any), id: Date.now() } as Stored;
      const next = [stored, ...list];
      setList(next);
      saveStored(next);
    }

    setForm({ name: '', ticker: '', price: 0, purchasePrice: 0, pe: undefined });
  }

  async function remove(id: number | string) {
    if (usingServer && typeof id === 'number') {
      try {
        const res = await fetch(`/api/actions/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        setList((s) => s.filter((l) => l.id !== id));
        return;
      } catch (err) {
        console.error('Server delete failed, falling back to local', err);
        setUsingServer(false);
      }
    }

    const next = list.filter((l) => String(l.id) !== String(id));
    setList(next);
    saveStored(next);
  }

  return (
    <div className="p-4">
      <form onSubmit={addAction} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input value={form.name || ''} onChange={(e) => onChange('name', e.target.value)} placeholder="Nom" className="border px-2 py-1 rounded" />
        <input value={form.ticker || ''} onChange={(e) => onChange('ticker', e.target.value)} placeholder="Ticker" className="border px-2 py-1 rounded" />
        <input value={String(form.price ?? 0)} onChange={(e) => onChange('price', Number(e.target.value || 0))} placeholder="Prix actuel" type="number" step="0.01" className="border px-2 py-1 rounded" />
        <input value={String(form.purchasePrice ?? 0)} onChange={(e) => onChange('purchasePrice', Number(e.target.value || 0))} placeholder="Prix d'achat" type="number" step="0.01" className="border px-2 py-1 rounded" />
        <input value={String(form.pe ?? '')} onChange={(e) => onChange('pe', e.target.value === '' ? undefined : Number(e.target.value))} placeholder="P/E (optionnel)" type="number" step="0.01" className="border px-2 py-1 rounded md:col-span-2" />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Ajouter</button>
          <button type="button" onClick={() => { setForm({ name: '', ticker: '', price: 0, purchasePrice: 0, pe: undefined }); }} className="border px-3 py-1 rounded">Réinitialiser</button>
        </div>
      </form>

      <div className="space-y-3">
        {list.length === 0 && <div>Aucune action ajoutée.</div>}

        {list.map((l) => {
          const a = new Action({ name: l.name, ticker: l.ticker, price: l.price, purchasePrice: l.purchasePrice, pe: l.pe ?? undefined });
          return (
            <div key={String(l.id)} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{a.name} <span className="text-sm text-gray-600">({a.ticker})</span></div>
                <div className="text-sm text-gray-700">Prix: {a.price.toFixed(2)} € — Achat: {a.purchasePrice.toFixed(2)} €</div>
                <div className="text-sm text-gray-600">Gain: {a.getGain().toFixed(2)} € {a.getGainPercent() !== null ? `(${a.getGainPercent()!.toFixed(2)}%)` : ''}</div>
                {a.pe != null && <div className="text-xs text-gray-500">P/E: {a.pe}</div>}
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => remove(l.id)} className="text-red-600">Supprimer</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
