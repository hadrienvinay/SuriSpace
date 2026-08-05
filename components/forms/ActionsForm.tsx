'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionParams } from "@/lib/Action";    


interface ActionFormProps {
  initialData?: {
    id?: number
    name: string
    ticker: string
    price: string
    purchasePrice: string
    quantity: string
    pe?: string
  }
  mode: 'create' | 'edit'
}


export default function ActionsForm({ initialData, mode }: ActionFormProps) {
    const [form, setForm] = useState<Partial<ActionParams>>({ name: initialData?.name ?? '', ticker: initialData?.ticker ?? '', price: Number(initialData?.price ?? 0), purchasePrice: Number(initialData?.purchasePrice ?? 0), quantity: Number(initialData?.quantity ?? 1), pe: initialData?.pe ? Number(initialData.pe) : undefined });
    const [name, setName] = useState(initialData?.name ?? '')
    const [ticker, setTicker] = useState(initialData?.ticker ?? '')
    const [price, setPrice] = useState(Number(initialData?.price ?? 0))
    const [purchasePrice, setPurchasePrice] = useState(Number(initialData?.purchasePrice ?? 0))
    const [quantity, setQuantity] = useState(Number(initialData?.quantity ?? 1))
    const [pe, setPe] = useState(initialData?.pe ? Number(initialData.pe) : undefined)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    console.log('Initial data for form:', form)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const formData = new FormData();
        formData.append('name', form.name || '');
        formData.append('ticker', form.ticker || '');
        formData.append('price', String(form.price ?? 0));
        formData.append('purchasePrice', String(form.purchasePrice ?? 0));
        formData.append('quantity', String(form.quantity ?? 1));
        formData.append('pe', String(form.pe ?? ''));

        const url = mode === 'create' 
          ? '/api/actions' 
          : `/api/actions/${initialData?.id}`
        
        const method = mode === 'create' ? 'POST' : 'PUT'
        const response = await fetch(url, {
          method: method,
          body: formData,
        });
  
        if (response.ok) {
          const message = mode === 'create' 
            ? 'Action créée avec succès !' 
            : 'Action modifiée avec succès !'
          alert(message)        
          router.push('/dashboard/actions');
          router.refresh();
  
        } else {
          const data = await response.json();
          alert(`Erreur: ${data.error}`);
        }
      } catch (error) {
        console.error('Erreur:', error);
        const message = mode === 'create' 
            ? 'Erreur lors de la création de l\'action !' 
            : 'Erreur lors de la modification de l\'action !'
          alert(message)        
      } finally {
        setIsSubmitting(false);
      }
    };



return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input  value={form.name || ''} 
                onChange={(e) => setForm((s: Partial<ActionParams>) => ({ ...s, name: e.target.value }))}
                placeholder="Nom" 
                className="border px-2 py-1 rounded" />
        <input value={form.ticker || ''} onChange={(e) => setForm((s: Partial<ActionParams>) => ({ ...s, ticker: e.target.value }))} placeholder="Ticker" className="border px-2 py-1 rounded" />
        <input value={String(form.price ?? 0)} onChange={(e) => setForm((s: Partial<ActionParams>) => ({ ...s, price: Number(e.target.value || 0) }))} placeholder="Prix actuel" type="number" step="0.01" className="border px-2 py-1 rounded" />
        <input value={String(form.purchasePrice ?? 0)} onChange={(e) => setForm((s: Partial<ActionParams>) => ({ ...s, purchasePrice: Number(e.target.value || 0) }))} placeholder="Prix d'achat" type="number" step="0.01" className="border px-2 py-1 rounded" />
        <input value={String(form.quantity ?? 1)} onChange={(e) => setForm((s: Partial<ActionParams>) => ({ ...s, quantity: Number(e.target.value || 1) }))} placeholder="Quantité" type="number" step="1" className="border px-2 py-1 rounded" />
        <input value={String(form.pe ?? '')} onChange={(e) => setForm((s: Partial<ActionParams>) => ({ ...s, pe: e.target.value === '' ? undefined : Number(e.target.value) }))} placeholder="P/E (optionnel)" type="number" step="0.01" className="border px-2 py-1 rounded md:col-span-2" />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">{mode === 'create' ? 'Ajouter' : 'Modifier'}</button>
          <button type="button" onClick={() => { setForm({ name: '', ticker: '', price: 0, purchasePrice: 0, pe: undefined }); }} className="border px-3 py-1 rounded">Réinitialiser</button>
        </div>
      </form>

)

}