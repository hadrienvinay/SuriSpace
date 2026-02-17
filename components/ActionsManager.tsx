"use client";
import { useEffect, useState } from 'react';
import Action, { ActionParams } from '@/lib/Action';
import Link from 'next/link';
import { useRouter } from "next/navigation";

type Stored = ReturnType<Action['toJSON']> & { id: number; createdAt?: string };
type SortField = 'ticker' | 'name' | 'price' | 'gain' | 'invested' | 'pe' | 'currentvalue' | 'dividendYield' | 'where';
type SortDirection = 'asc' | 'desc';
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
  const [form, setForm] = useState<Partial<ActionParams>>({ name: '', ticker: '', price: 0, purchasePrice: 0, quantity: 1, pe: undefined });
  const [usingServer, setUsingServer] = useState(true);
  const [totalGain, setTotalGain] = useState(Number(0));
  const [totalInvested, setTotalInvested] = useState(Number(0));
  const [totalCurrentValue, setTotalCurrentValue] = useState(Number(0));


  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter()

  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  function calculateTotalGain(actions: Stored[]) {
    const total = actions.reduce((acc, a) => {
      const gain = (a.price - a.purchasePrice) * a.quantity;
      const invested = a.purchasePrice * a.quantity;
      const currentValue = a.price * a.quantity;
      setTotalInvested((prev) => prev + invested);
      setTotalCurrentValue((prev) => prev + currentValue);
      console.log(`Calculating gain for ${a.name}: (${a.price} - ${a.purchasePrice}) * ${a.quantity} = ${gain}`);
      return acc + gain;
    }, 0);
    setTotalGain(total);
  }

  //Tri du tableau
    // Trie la liste
  const sortList = (list: Stored[]) => {
    return [...list].sort((a, b) => {
      const aAction = new Action({ name: a.name, ticker: a.ticker, price: a.price, purchasePrice: a.purchasePrice, quantity: a.quantity, pe: a.pe, dividendYield: a.dividendYield, where: a.where });
      const bAction = new Action({ name: b.name, ticker: b.ticker, price: b.price, purchasePrice: b.purchasePrice, quantity: b.quantity, pe: b.pe, dividendYield: b.dividendYield, where: b.where });

      let aValue: number, bValue: number;

      switch (sortField) {
        case 'gain':
          aValue = aAction.getGainPercent() ?? 0;
          bValue = bAction.getGainPercent() ?? 0;
          break;
        case 'invested':
          aValue = aAction.purchasePrice * aAction.quantity;
          bValue = bAction.purchasePrice * bAction.quantity;
          break;
        case 'currentvalue':
          aValue = aAction.price * aAction.quantity;
          bValue = bAction.price * bAction.quantity;
          break;
        case 'price':
          aValue = aAction.price;
          bValue = bAction.price;
          break;
        case 'pe':
          aValue = aAction.pe || 0;
          bValue = bAction.pe || 0;
          break;
        case 'dividendYield':
          aValue = aAction.dividendYield || 0;
          bValue = bAction.dividendYield || 0;
          break;
        default:
          // @ts-ignore
          aValue = a[sortField] || '';
          // @ts-ignore
          bValue = b[sortField] || '';
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };


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
          calculateTotalGain(data.items as Stored[]);
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
      quantity: form.quantity ? Number(form.quantity) : 1,
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

  async function updatePrices() {
    try {
      const res = await fetch('/api/actions/update', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to update prices');
      const data = await res.json();
      setList(data.items as Stored[]);
      router.push('/dashboard/actions');
      router.refresh();
    } catch (err) {
      console.error('Failed to update prices', err);
    }
  }

  const handleDelete = async (id: number | string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
      return;
    }

    setIsDeleting(true);
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
      finally {
      setIsDeleting(false);
    }
    }

    const next = list.filter((l) => String(l.id) !== String(id));
    setList(next);
    saveStored(next);
}

  const sortedList = sortList(list);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  
  return (
    <div className="p-4">
      <form onSubmit={addAction} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input value={form.name || ''} onChange={(e) => onChange('name', e.target.value)} placeholder="Nom" className="border px-2 py-1 rounded" />
        <input value={form.ticker || ''} onChange={(e) => onChange('ticker', e.target.value)} placeholder="Ticker" className="border px-2 py-1 rounded" />
        <input value={String(form.price ?? 0)} onChange={(e) => onChange('price', Number(e.target.value || 0))} placeholder="Prix actuel" type="number" step="0.01" className="border px-2 py-1 rounded" />
        <input value={String(form.purchasePrice ?? 0)} onChange={(e) => onChange('purchasePrice', Number(e.target.value || 0))} placeholder="Prix d'achat" type="number" step="0.01" className="border px-2 py-1 rounded" />
        <input value={String(form.quantity ?? 1)} onChange={(e) => onChange('quantity', Number(e.target.value || 1))} placeholder="Quantité" type="number" step="1" className="border px-2 py-1 rounded" />
        <input value={String(form.pe ?? '')} onChange={(e) => onChange('pe', e.target.value === '' ? undefined : Number(e.target.value))} placeholder="P/E (optionnel)" type="number" step="0.01" className="border px-2 py-1 rounded md:col-span-2" />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">Ajouter</button>
          <button type="button" onClick={() => { setForm({ name: '', ticker: '', price: 0, purchasePrice: 0, pe: undefined }); }} className="border px-3 py-1 rounded cursor-pointer">Réinitialiser</button>
          <button onClick={updatePrices} className="border bg-blue-400 px-3 py-1 rounded hover:bg-blue-500  cursor-pointer">Mettre à jour les prix</button>
        </div>
      </form>


      <div className="space-y-3 sm:grid lg:grid-cols-3 sm:grid-cols-1 gap-1">
        {list.length === 0 && <div>Aucune action ajoutée.</div>}

        {list.map((l) => {
          const a = new Action({ name: l.name, ticker: l.ticker, price: l.price, purchasePrice: l.purchasePrice, quantity: l.quantity, pe: l.pe ?? undefined, dividendYield: l.dividendYield ?? undefined, where: l.where ?? undefined });
          return (
            <div key={String(l.id)} className={`p-3 border rounded flex justify-between items-center ${a.where ==='PEA' ? 'bg-green-200 text-black' : a.where === 'AV' ? 'bg-yellow-200 text-black' : a.where === 'BINANCE' ? 'bg-purple-300 text-black' : a.where === 'SCPI' ? 'bg-blue-300 text-black' : a.where === 'PS' ? 'bg-red-400 text-black' : a.where === 'TITRES' ? 'bg-green-300 text-black' : ''}`}>
              <div>
                <div className="font-semibold items-center">{a.name} <span className="text-sm ">({a.ticker})</span></div>
                <div className="flex text-sm ">Prix: {a.price.toFixed(2)} € — Achat: {a.purchasePrice.toFixed(2)} € </div>
                <div className="flex text-sm "> Quantité : {a.quantity} </div>
                {a.pe != null && <div className="text-xs flex ">P/E: {a.pe}</div>}
                <div className="flex text-sm ">Gain: <div className={a.getGain() > 0 ? 'flex text-green-500' : 'flex text-red-500'}>{(a.getGain() * a.quantity).toFixed(2)} € {a.getGainPercent() !== null ? `(${a.getGainPercent()!.toFixed(2)}%)` : ''}</div></div>
                <div className="text-xs flex "> Investi: {(a.price * a.quantity).toFixed(2)} €</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Link href={`/dashboard/actions/${l.id}/edit`} className="cursor-pointer text-blue-600">
                  Edit 
                </Link>
                <button onClick={() => handleDelete(l.id)}
                        disabled={isDeleting} 
                        className="cursor-pointer text-red-600">{isDeleting ? 'Suppression en cours...' : 'Supprimer'}
                  </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 font-bold text-lg mb-2">
        Total Gain: <span className={totalGain > 0 ? 'text-green-500' : 'text-red-500'}>{totalGain.toFixed(2)} €</span>
      </div>

    <div className="">
      <table className="w-full divide-y divide-gray-200 text-black">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
              Action
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('where')}>
              Types
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400   uppercase tracking-wider cursor-pointer" onClick={() => handleSort('gain')}>
              Gain
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400  uppercase tracking-wider cursor-pointer" onClick={() => handleSort('pe')}>
              P/E
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400  uppercase tracking-wider cursor-pointer" onClick={() => handleSort('dividendYield')}>
              Dividende
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400  uppercase tracking-wider cursor-pointer" onClick={() => handleSort('invested')}>
              Montant investi
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400  uppercase tracking-wider cursor-pointer" onClick={() => handleSort('currentvalue')}>
              Valeur actuelle
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium border border-gray-400  uppercase tracking-wider cursor-pointer" >
              Edit
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedList.map((item, index) => {
            
            const a = new Action({ name: item.name, ticker: item.ticker, price: item.price, purchasePrice: item.purchasePrice, quantity: item.quantity, pe: item.pe ?? undefined , dividendYield: item.dividendYield?? undefined , where: item.where ?? undefined });
          return (

            <tr key={index} className={`${a.where ==='PEA' ? 'bg-green-100' : a.where === 'AV' ? 'bg-yellow-100' : a.where === 'BINANCE' ? 'bg-purple-100' : a.where === 'SCPI' ? 'bg-blue-100' : a.where === 'PS' ? 'bg-red-400' : a.where === 'TITRES' ? 'bg-green-100' : ''}`}>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="font-semibold">{item.name} <span className="text-sm ">({item.ticker})</span></div>
              </td>
               <td className="px-6 py-3 whitespace-nowrap">
                <div className="font-semibold">{item.where}</div>
              </td>
              <td className={`whitespace-nowrap text-sm ${a.getGain() < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {(a.getGain()*a.quantity).toFixed(2)} € ({a.getGainPercent() !== null ? `${a.getGainPercent()!.toFixed(2)}%` : 'N/A'})
              </td>
              <td className="whitespace-nowrap text-sm ">
                {item.pe !== undefined ? item.pe?.toFixed(2) : 'N/A'}
              </td>
              <td className="whitespace-nowrap text-sm ">
                {item.dividendYield !== undefined && item.dividendYield !== null ? (item.dividendYield * 100).toFixed(2) + '%' : 'N/A'} 
              </td>
              <td className="whitespace-nowrap text-sm "> 
                {(a.purchasePrice * a.quantity).toFixed(2)} €
              </td>
              <td className="whitespace-nowrap text-sm "> 
                {(a.price * a.quantity).toFixed(2)} €
              </td>
              <td className="px-6 py-3whitespace-nowrap text-right text-sm font-medium">
                <div className="flex flex-col items-end gap-2">
                  <a href={`/dashboard/actions/${item.id}/edit`} className="cursor-pointer text-blue-600">Edit</a>
                  <button className="cursor-pointer text-red-600">Supprimer</button>
                </div>
              </td>
            </tr>
          )
          })
          }
          <tr key='total' className="bg-purple-200 text-md">
            <td className="px-6 py-4 whitespace-nowrap border font-bold">
              TOTAL
            </td>
            <td className="px-6 py-4 whitespace-nowrap border font-bold">
            </td>
            <td className="px-6 py-4 whitespace-nowrap border font-bold">
            </td>
            <td className="px-6 py-4 whitespace-nowrap border font-bold">
            </td>
            <td className="px-6 py-4 whitespace-nowrap border font-bold">
              Investi : {totalInvested.toFixed(2)} €
            </td>
            <td className="px-6 py-4 whitespace-nowrap border font-bold">
              Valeur actuelle: {totalCurrentValue.toFixed(2)} €
            </td>
            <td className={`px-6 py-4 whitespace-nowrap border font-bold ${totalGain < 0 ? 'text-red-500' : 'text-green-500'}`}>
              Gain : {totalGain.toFixed(2)} €
            </td>

          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}
