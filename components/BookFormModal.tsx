'use client';

import { useState, useEffect } from 'react';
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
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 22, lineHeight: 1, padding: '0 4px' }}
          >
            ×
          </button>
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
  );
}
