// components/ProjectLinkModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

const FIELD_STYLE_DISABLED = {
  ...FIELD_STYLE,
  color: 'rgba(255,255,255,0.45)',
  cursor: 'not-allowed',
};

const LABEL_STYLE = {
  display: 'block',
  fontSize: 12,
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: 6,
};

interface ProjectItem {
  id: number;
  title: string;
  siteUrl?: string | null;
  siteUrlPublic: boolean;
  link?: string | null;
  tags: string[];
}

interface ProjectLinkModalProps {
  isOpen: boolean
  onClose: () => void
  editProject?: ProjectItem | null
  onSaved?: (project: ProjectItem) => void
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('');

  const add = (raw: string) => {
    const trimmed = raw.trim().replace(/,+$/, '');
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
    setInput('');
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input); }
    if (e.key === 'Backspace' && !input && tags.length) onChange(tags.slice(0, -1));
  };

  return (
    <div
      className="flex flex-wrap gap-1.5 px-3 py-2 rounded-xl cursor-text"
      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', minHeight: 42 }}
      onClick={() => (document.getElementById('project-tag-input') as HTMLInputElement)?.focus()}
    >
      {tags.map(t => (
        <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold" style={{ background: 'rgba(96,165,250,0.15)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.25)' }}>
          {t}
          <button type="button" onClick={() => onChange(tags.filter(x => x !== t))} className="opacity-60 hover:opacity-100 leading-none">×</button>
        </span>
      ))}
      <input
        id="project-tag-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={() => input.trim() && add(input)}
        placeholder={tags.length === 0 ? 'Next.js, TypeScript… (Entrée pour valider)' : ''}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-white placeholder-gray-500"
      />
    </div>
  );
}

const EMPTY = { title: '', resume: '', siteUrl: '' };

export function ProjectLinkModal({ isOpen, onClose, editProject, onSaved }: ProjectLinkModalProps) {
  const [form, setForm] = useState(EMPTY)
  const [tags, setTags] = useState<string[]>([])
  const [siteUrlPublic, setSiteUrlPublic] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (editProject) {
      setForm({ title: editProject.title, resume: '', siteUrl: editProject.siteUrl ?? '' });
      setTags(editProject.tags ?? []);
      setSiteUrlPublic(editProject.siteUrlPublic ?? false);
    } else {
      setForm(EMPTY);
      setTags([]);
      setSiteUrlPublic(false);
    }
  }, [editProject, isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const isEdit = !!editProject;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('siteUrl', form.siteUrl)
      formData.append('siteUrlPublic', siteUrlPublic ? 'true' : 'false')
      formData.append('tagsTouched', '1')
      tags.forEach(t => formData.append('tags', t))
      if (!isEdit) {
        formData.append('title', form.title)
        formData.append('resume', form.resume)
      }

      const url = isEdit ? `/api/projects/${editProject.id}` : '/api/projects';
      const response = await fetch(url, { method: isEdit ? 'PUT' : 'POST', body: formData })

      if (response.ok) {
        const data = await response.json();
        const saved: ProjectItem = isEdit
          ? { id: data.id, title: data.title, siteUrl: data.siteUrl, siteUrlPublic: data.siteUrlPublic, link: data.link, tags: data.tags }
          : { id: data.post.id, title: data.post.title, siteUrl: data.post.siteUrl, siteUrlPublic: data.post.siteUrlPublic, link: data.post.link, tags: data.post.tags };
        onSaved?.(saved);
        if (!isEdit) { setForm(EMPTY); setTags([]); }
        onClose()
        router.refresh()
      } else {
        const data = await response.json()
        alert(`Erreur: ${data.error}`)
      }
    } catch {
      alert('Erreur lors de la sauvegarde du projet')
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
              {isEdit ? 'Modifier le lien du site' : 'Nouveau projet'}
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

          <div>
            <label style={LABEL_STYLE}>Titre {!isEdit && '*'}</label>
            <input
              type="text"
              required={!isEdit}
              disabled={isEdit}
              placeholder="Ex : Suri Space"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              style={isEdit ? FIELD_STYLE_DISABLED : FIELD_STYLE}
            />
          </div>

          {!isEdit && (
            <div>
              <label style={LABEL_STYLE}>Résumé court *</label>
              <textarea
                required
                rows={2}
                placeholder="Quelques mots sur ce projet…"
                value={form.resume}
                onChange={e => setForm(p => ({ ...p, resume: e.target.value }))}
                style={{ ...FIELD_STYLE, resize: 'vertical' }}
              />
            </div>
          )}

          <div>
            <label style={LABEL_STYLE}>Lien du site en ligne</label>
            <input
              type="url"
              placeholder="https://mon-projet.vercel.app"
              value={form.siteUrl}
              onChange={e => setForm(p => ({ ...p, siteUrl: e.target.value }))}
              style={FIELD_STYLE}
            />
            <label className="flex items-center gap-2 mt-2" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              <input
                type="checkbox"
                checked={siteUrlPublic}
                onChange={e => setSiteUrlPublic(e.target.checked)}
              />
              Visible sur la page publique du projet
            </label>
          </div>

          <div>
            <label style={LABEL_STYLE}>Tags</label>
            <TagInput tags={tags} onChange={setTags} />
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
              ? (isEdit ? 'Enregistrement…' : 'Création en cours…')
              : (isEdit ? '✓ Enregistrer le lien' : '+ Créer le projet')}
          </button>
        </form>
      </div>
    </div>
  )
}
