'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const FIELD_STYLE = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
};

const LABEL_STYLE = {
  display: 'block',
  fontSize: 12,
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: 6,
};

interface Book {
  id: number;
  title: string;
  author: string;
  date: string;
  dateRead: string;
  rating: number | null;
  notes: string | null;
  createdAt?: Date;
}

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editBook?: Book | null;
  onSaved?: (book: Book) => void;
}

const EMPTY = { title: '', author: '', date: '', dateRead: '', rating: 0, notes: '' };

export default function BookFormModal({ isOpen, onClose, editBook, onSaved }: BookFormModalProps) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (editBook) {
      setForm({
        title: editBook.title,
        author: editBook.author,
        date: editBook.date,
        dateRead: editBook.dateRead,
        rating: editBook.rating ?? 0,
        notes: editBook.notes ?? '',
      });
    } else {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      setForm({ ...EMPTY, dateRead: currentMonth });
    }
  }, [editBook, isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/books/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        const titleCase = (s: string) =>
          s.toLowerCase().replace(/(?:^|\s|-|')\S/g, c => c.toUpperCase());
        setForm(prev => ({
          ...prev,
          title: data.title ? titleCase(data.title) : prev.title,
          author: data.author ? titleCase(data.author) : prev.author,
          date: data.date || prev.date,
        }));
      } else {
        const data = await res.json();
        alert(data.error ?? 'Erreur lors du scan');
      }
    } catch {
      alert('Erreur lors de l\'analyse de la photo');
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  const isEdit = !!editBook;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(isEdit ? `/api/books/${editBook.id}` : '/api/books', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: form.rating || null }),
      });
      if (res.ok) {
        const data = await res.json();
        onSaved?.(data.book);
        if (!isEdit) setForm(EMPTY);
        router.refresh();
        onClose();
      } else {
        const data = await res.json();
        alert(data.error ?? 'Erreur');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,8,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full mx-4 rounded-2xl flex flex-col"
        style={{
          maxWidth: 520,
          background: 'rgba(8,12,28,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
            <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.05em' }}>
              {isEdit ? 'Modifier le livre' : 'Ajouter un livre'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {!isEdit && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleScan}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={scanning}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: scanning ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.1)',
                    border: '1px solid rgba(167,139,250,0.25)',
                    color: '#a78bfa', borderRadius: 8, padding: '5px 12px', fontSize: 12,
                    cursor: scanning ? 'not-allowed' : 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {scanning ? (
                    <>
                      <svg style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93" />
                      </svg>
                      Analyse...
                    </>
                  ) : (
                    <>
                      <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.9 47.9 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                      </svg>
                      Scanner
                    </>
                  )}
                </button>
              </>
            )}
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 22, lineHeight: 1, padding: '0 4px' }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={LABEL_STYLE}>Titre *</label>
              <input
                type="text"
                required
                placeholder="Ex : Dune"
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                style={FIELD_STYLE}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Auteur *</label>
              <input
                type="text"
                required
                placeholder="Ex : Frank Herbert"
                value={form.author}
                onChange={e => setForm(p => ({ ...p, author: e.target.value }))}
                style={FIELD_STYLE}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={LABEL_STYLE}>Année de publication *</label>
              <input
                type="text"
                required
                placeholder="Ex : 1965"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                style={FIELD_STYLE}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Date de lecture *</label>
              <input
                type="month"
                required
                value={form.dateRead}
                onChange={e => setForm(p => ({ ...p, dateRead: e.target.value }))}
                style={{ ...FIELD_STYLE, colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Star rating */}
          <div>
            <label style={LABEL_STYLE}>Note</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, rating: p.rating === star ? 0 : star }))}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 24, lineHeight: 1, padding: 0,
                    color: star <= form.rating ? '#F59E0B' : 'rgba(255,255,255,0.2)',
                    transition: 'color 0.15s',
                  }}
                >
                  ★
                </button>
              ))}
              {form.rating > 0 && (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', alignSelf: 'center', marginLeft: 4 }}>
                  {form.rating}/5
                </span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={LABEL_STYLE}>Notes / Avis <span style={{ textTransform: 'none', opacity: 0.5 }}>(optionnel)</span></label>
            <textarea
              rows={3}
              placeholder="Quelques mots sur ce livre…"
              value={form.notes}
              onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              style={{ ...FIELD_STYLE, resize: 'vertical' }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '11px 0', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
              color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '0.03em',
              opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
            }}
          >
            {loading
              ? (isEdit ? 'Enregistrement…' : 'Ajout en cours…')
              : (isEdit ? '✓ Enregistrer les modifications' : '+ Ajouter le livre')}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
