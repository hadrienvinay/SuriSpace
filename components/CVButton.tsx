'use client';

import { useState, useEffect } from 'react';

export function CVModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center mt-16"
      style={{ background: 'rgba(0,0,8,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full mx-4 rounded-2xl overflow-hidden flex flex-col"
        style={{
          maxWidth: 900, height: '90vh',
          background: 'rgba(8,12,28,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 8px #60a5fa' }} />
            <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 15, letterSpacing: '0.05em' }}>
              CV — Hadrien Vinay
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a
              href="/Hadrien-Vinay-Resume.pdf"
              download
              style={{
                fontSize: 15, padding: '6px 16px', borderRadius: 8, textDecoration: 'none',
                background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.35)',
                color: '#60a5fa', transition: 'all 0.2s',
              }}
            >
              ↓ Télécharger
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)', fontSize: 24, lineHeight: 1,
                padding: '0 4px', transition: 'color 0.2s',
              }}
              title="Fermer"
            >
              ×
            </button>
          </div>
        </div>
        <iframe
          src="/Hadrien-Vinay-CV.pdf"
          style={{ flex: 1, border: 'none', minHeight: 0 }}
          title="CV Hadrien Vinay"
        />
      </div>
    </div>
  );
}

export default function CVButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <CVModal onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:brightness-110"
        style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
      >
        Voir mon CV
      </button>
    </>
  );
}
