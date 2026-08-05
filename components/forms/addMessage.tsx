// components/addMessage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const INPUT_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  color: '#F9FAFB',
  fontFamily: "'Exo 2', sans-serif",
} as React.CSSProperties;

const INPUT_CLASS =
  'w-full pl-10 pr-4 py-3 rounded-xl text-sm placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-200';

export default function CreateMessageForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => router.push('/'), 2000);
      } else {
        const data = await response.json();
        setErrorMsg(data.error ?? 'Une erreur est survenue.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Impossible d\'envoyer le message. Réessayez.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Name */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-600 text-sm pointer-events-none">
          👤
        </span>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Nom"
          className={INPUT_CLASS}
          style={{
            ...INPUT_STYLE,
            borderColor: 'rgba(255,255,255,0.10)',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-600 text-sm pointer-events-none">
          ✉️
        </span>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Adresse email"
          className={INPUT_CLASS}
          style={INPUT_STYLE}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Message */}
      <div className="relative">
        <span className="absolute top-3.5 left-3 text-gray-600 text-sm pointer-events-none">
          💬
        </span>
        <textarea
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          placeholder="Votre message…"
          className={`${INPUT_CLASS} resize-none`}
          style={INPUT_STYLE}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Feedback */}
      {status === 'success' && (
        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm"
          style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', color: '#6EE7B7' }}
        >
          <span>✓</span>
          Message envoyé ! Redirection en cours…
        </div>
      )}
      {status === 'error' && (
        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5' }}
        >
          <span>✕</span>
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
        style={{
          background: isSubmitting
            ? 'rgba(99,102,241,0.4)'
            : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(99,102,241,0.25)',
          fontFamily: "'Exo 2', sans-serif",
        }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Envoi en cours…
          </span>
        ) : (
          'Envoyer le message'
        )}
      </button>
    </form>
  );
}
