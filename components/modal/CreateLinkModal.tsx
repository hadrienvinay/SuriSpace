// components/CreateLinkModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LINK_TAGS = [
  'Sciences', 'Education', 'Actualité', 'Economie',
  'Religion', 'Musique', 'Politique', 'Maths',
  'Technologie', 'Histoire', 'Philosophie', 'Sport',
];

const TAG_COLORS: Record<string, string> = {
  Sciences: '#60A5FA', Education: '#34D399', Actualité: '#FBBF24',
  Economie: '#A78BFA', Religion: '#F472B6', Musique: '#FB923C',
  Politique: '#F87171', Maths: '#22D3EE', Technologie: '#818CF8',
  Histoire: '#A3E635', Philosophie: '#2DD4BF', Sport: '#FCD34D',
};

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

interface LinkItem {
  id: number;
  title: string;
  description: string;
  tag: string;
  link: string;
}

interface CreateLinkModalProps {
  isOpen: boolean
  onClose: () => void
  editLink?: LinkItem | null
  onSaved?: (link: LinkItem) => void
}

const EMPTY = { titre: '', description: '', tag: '', link: '' };

export function CreateLinkModal({ isOpen, onClose, editLink, onSaved }: CreateLinkModalProps) {
  const [form, setForm] = useState(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (editLink) {
      setForm({
        titre: editLink.title,
        description: editLink.description,
        tag: editLink.tag,
        link: editLink.link,
      });
    } else {
      setForm(EMPTY);
    }
  }, [editLink, isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const isEdit = !!editLink;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('titre', form.titre)
      formData.append('description', form.description)
      formData.append('tag', form.tag)
      formData.append('link', form.link)

      const url = isEdit ? `/api/link/${editLink.id}` : '/api/link';
      const response = await fetch(url, { method: isEdit ? 'PUT' : 'POST', body: formData })

      if (response.ok) {
        const data = await response.json();
        onSaved?.(isEdit ? data : { id: data.id, title: form.titre, description: form.description, tag: form.tag, link: form.link });
        if (!isEdit) setForm(EMPTY)
        onClose()
        router.refresh()
      } else {
        const data = await response.json()
        alert(`Erreur: ${data.error}`)
      }
    } catch {
      alert('Erreur lors de la sauvegarde du lien')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 8px #60A5FA' }} />
            <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.05em' }}>
              {isEdit ? 'Modifier la ressource' : 'Nouvelle ressource'}
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
                placeholder="Ex : MDN Web Docs"
                value={form.titre}
                onChange={e => setForm(p => ({ ...p, titre: e.target.value }))}
                style={FIELD_STYLE}
              />
            </div>
            <div>
              <label style={LABEL_STYLE}>Tags</label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {LINK_TAGS.map(t => {
                  const active = form.tag.split(',').map(s => s.trim()).filter(Boolean).includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        const current = form.tag.split(',').map(s => s.trim()).filter(Boolean);
                        const next = active ? current.filter(x => x !== t) : [...current, t];
                        setForm(p => ({ ...p, tag: next.join(',') }));
                      }}
                      style={{
                        padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s', border: 'none',
                        outline: `1px solid ${TAG_COLORS[t]}${active ? '88' : '22'}`,
                        background: active ? `${TAG_COLORS[t]}22` : 'rgba(255,255,255,0.03)',
                        color: active ? TAG_COLORS[t] : 'rgba(255,255,255,0.35)',
                      }}
                    >{t}</button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label style={LABEL_STYLE}>Lien *</label>
            <input
              type="url"
              required
              placeholder="https://example.com"
              value={form.link}
              onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
              style={FIELD_STYLE}
            />
          </div>

          <div>
            <label style={LABEL_STYLE}>Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Quelques mots sur cette ressource…"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              style={{ ...FIELD_STYLE, resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '11px 0', borderRadius: 10, border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '0.03em',
              opacity: isSubmitting ? 0.7 : 1, transition: 'opacity 0.2s',
            }}
          >
            {isSubmitting
              ? (isEdit ? 'Enregistrement…' : 'Ajout en cours…')
              : (isEdit ? '✓ Enregistrer les modifications' : '+ Ajouter la ressource')}
          </button>
        </form>
      </div>
    </div>
  )
}
