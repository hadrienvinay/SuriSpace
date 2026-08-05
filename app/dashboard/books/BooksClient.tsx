'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BookFormModal from '@/components/modal/BookFormModal';

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

type SortKey = 'title' | 'author' | 'date' | 'dateRead' | 'rating';
type SortDir = 'asc' | 'desc';

const COLUMNS: { label: string; key: SortKey | null }[] = [
  { label: 'Titre',  key: 'title'    },
  { label: 'Auteur', key: 'author'   },
  { label: 'Publié', key: 'date'     },
  { label: 'Lu en',  key: 'dateRead' },
  { label: 'Note',   key: 'rating'   },
  { label: '',       key: null       },
];

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 13 }}>—</span>;
  return (
    <span style={{ letterSpacing: 1, whiteSpace: 'nowrap' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#F59E0B' : 'rgba(255,255,255,0.13)', fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}

function formatDateRead(dateRead: string) {
  try {
    const [y, m] = dateRead.split('-');
    return new Date(Number(y), Number(m) - 1).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  } catch {
    return dateRead;
  }
}

export default function BooksClient({ books: initialBooks }: { books: Book[] }) {
  const [modalOpen, setModalOpen]     = useState(false);
  const [books, setBooks]             = useState(initialBooks);
  const [search, setSearch]           = useState('');
  const [deletingId, setDeletingId]   = useState<number | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [sortKey, setSortKey]         = useState<SortKey | null>(null);
  const [sortDir, setSortDir]         = useState<SortDir>('asc');
  const router = useRouter();

  const handleDelete = async (book: Book) => {
    if (!confirm(`Supprimer "${book.title}" ?`)) return;
    setDeletingId(book.id);
    await fetch(`/api/books/${book.id}`, { method: 'DELETE' });
    setBooks(prev => prev.filter(b => b.id !== book.id));
    setDeletingId(null);
    router.refresh();
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const openEdit = (book: Book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBook(null);
  };

  const handleSaved = (saved: Book) => {
    if (editingBook) {
      setBooks(prev => prev.map(b => b.id === saved.id ? { ...b, ...saved } : b));
    } else {
      setBooks(prev => [saved, ...prev]);
    }
  };

  const filtered = books.filter(b => {
    const q = search.toLowerCase();
    return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
  });

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      })
    : filtered;

  const avgRating = (() => {
    const rated = books.filter(b => b.rating);
    if (!rated.length) return null;
    return (rated.reduce((s, b) => s + (b.rating ?? 0), 0) / rated.length).toFixed(1);
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>

      {/* Back + Header */}
      <div className="mb-6">
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
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              Ma Bibliothèque 📚
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              {books.length} livre{books.length > 1 ? 's' : ''}
              {avgRating && ` · moyenne ${avgRating}/5`}
              {search && filtered.length !== books.length && ` · ${filtered.length} résultat${filtered.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            + Ajouter un livre
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Rechercher par titre ou auteur…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />
      </div>

      {/* Table */}
      {books.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <p style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            Aucun livre enregistré — ajoute ton premier livre !
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            + Ajouter un livre
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, padding: '40px 0', textAlign: 'center' }}>
          Aucun résultat pour &ldquo;{search}&rdquo;
        </p>
      ) : (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {COLUMNS.map(col => (
                  <th
                    key={col.label}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wider"
                    style={{
                      fontSize: 11,
                      color: col.key && sortKey === col.key ? 'rgba(167,139,250,0.9)' : 'rgba(255,255,255,0.28)',
                      whiteSpace: 'nowrap',
                      cursor: col.key ? 'pointer' : 'default',
                      userSelect: 'none',
                      transition: 'color 0.15s',
                    }}
                    onClick={() => col.key && handleSort(col.key)}
                  >
                    {col.label}
                    {col.key && (
                      <span style={{ marginLeft: 4, opacity: sortKey === col.key ? 1 : 0.3, fontSize: 10 }}>
                        {sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '⬍'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((book, i) => (
                <tr
                  key={book.id}
                  className="group transition-colors"
                  style={{
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(167,139,250,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)')}
                >
                  <td className="px-4 py-3 font-medium text-white" style={{ maxWidth: 300 }}>
                    {book.title}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                    {book.author}
                  </td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {book.date || '—'}
                  </td>
                  <td className="px-4 py-3" style={{ color: '#a78bfa', whiteSpace: 'nowrap', fontSize: 12 }}>
                    {formatDateRead(book.dateRead)}
                  </td>
                  <td className="px-4 py-3">
                    <Stars rating={book.rating} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(book)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)',
                          color: '#a78bfa', borderRadius: 6, padding: '2px 10px', fontSize: 11,
                          cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(book)}
                        disabled={deletingId === book.id}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                          color: '#f87171', borderRadius: 6, padding: '2px 10px', fontSize: 11,
                          cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap',
                        }}
                      >
                        {deletingId === book.id ? '…' : 'Supprimer'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BookFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        editBook={editingBook}
        onSaved={handleSaved}
      />
    </div>
  );
}
