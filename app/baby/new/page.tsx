'use client';
// app/baby/new/page.tsx
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

/* ── Floating decoration ───────────────────────────────────── */
const FLOATS = [
  { emoji: '👶', x: '5%',  y: '8%',  size: 'text-3xl', delay: '0s',   dur: '4s'  },
  { emoji: '💖', x: '88%', y: '6%',  size: 'text-2xl', delay: '0.5s', dur: '5s'  },
  { emoji: '⭐', x: '15%', y: '18%', size: 'text-xl',  delay: '1s',   dur: '3.5s'},
  { emoji: '🍼', x: '80%', y: '20%', size: 'text-2xl', delay: '1.5s', dur: '4.5s'},
  { emoji: '💛', x: '3%',  y: '42%', size: 'text-xl',  delay: '0.8s', dur: '6s'  },
  { emoji: '🌸', x: '92%', y: '40%', size: 'text-xl',  delay: '2s',   dur: '4s'  },
  { emoji: '🧸', x: '8%',  y: '65%', size: 'text-2xl', delay: '0.3s', dur: '5.5s'},
  { emoji: '💜', x: '85%', y: '62%', size: 'text-xl',  delay: '1.2s', dur: '3.8s'},
  { emoji: '🌈', x: '20%', y: '80%', size: 'text-2xl', delay: '0.7s', dur: '4.2s'},
  { emoji: '✨', x: '75%', y: '82%', size: 'text-xl',  delay: '1.8s', dur: '3s'  },
  { emoji: '🎀', x: '45%', y: '4%',  size: 'text-2xl', delay: '2.5s', dur: '4.8s'},
  { emoji: '💕', x: '50%', y: '88%', size: 'text-xl',  delay: '0.2s', dur: '5.2s'},
];

/* ── Input style ───────────────────────────────────────────── */
const inputClass =
  'w-full px-4 py-3 rounded-2xl border-2 text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm';

const inputStyle = {
  borderColor: '#F9A8D4',
};

export default function BabyBetPage() {
  const [formData, setFormData] = useState({
    sexe: '',
    poids: '',
    taille: '',
    yeux: '',
    cheveux: '',
    date: '2026-05-01',
    prenom: '',
    autres: '',
    parieurName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataPari = new FormData();
    Object.entries(formData).forEach(([key, val]) => formDataPari.append(key, val));

    try {
      const response = await fetch('/api/baby', { method: 'POST', body: formDataPari });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => { router.push('/baby'); router.refresh(); }, 2200);
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.error}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success screen ────────────────────────────────────── */
  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #F8EDFF 40%, #EEF4FF 100%)' }}
      >
        {FLOATS.map((f, i) => (
          <div
            key={i}
            className={`absolute ${f.size} select-none pointer-events-none`}
            style={{ left: f.x, top: f.y, animation: `float ${f.dur} ${f.delay} ease-in-out infinite alternate` }}
          >
            {f.emoji}
          </div>
        ))}
        <div className="text-center relative z-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-2 border-pink-200 px-10 py-12 max-w-md mx-auto">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-extrabold text-pink-500 mb-3">Pari enregistré !</h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Merci pour ta participation !<br />
            On verra si tu avais vu juste 🍀
          </p>
          <p className="text-xs text-gray-400 mt-4">Redirection en cours…</p>
        </div>
        <style>{`@keyframes float { from { transform: translateY(0); } to { transform: translateY(-12px); } }`}</style>
      </div>
    );
  }

  /* ── Main form ─────────────────────────────────────────── */
  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4"
      style={{ background: 'linear-gradient(135deg, rgb(255, 100, 245) 0%, rgb(100, 150, 200) 45%, rgb(0, 0, 100) 100%)' }}
    >
      {/* Floating decorations */}
      {FLOATS.map((f, i) => (
        <div
          key={i}
          className={`absolute ${f.size} select-none pointer-events-none opacity-80`}
          style={{ left: f.x, top: f.y, animation: `float ${f.dur} ${f.delay} ease-in-out infinite alternate` }}
        >
          {f.emoji}
        </div>
      ))}

      <style>{`
        @keyframes float { from { transform: translateY(0px) rotate(-2deg); } to { transform: translateY(-14px) rotate(2deg); } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(50%) sepia(1) saturate(5) hue-rotate(300deg); }
      `}</style>

      {/* Card */}
      <div
        className="relative z-10 max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden border-2"
        style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderColor: '#FBCFE8' }}
      >
        {/* Card header */}
        <div
          className="px-8 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(135deg, #FDE8F0, #F0E4FF)' }}
        >
          <h1
            className="text-3xl sm:text-4xl font-extrabold mb-2"
            style={{
              background: 'linear-gradient(135deg, #EC4899, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Le Bébé des Babes
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Laura & Flavien attendent l&apos;heureux événement 🌸<br />
            <span className="font-semibold text-pink-400">Pariez sur le futur bébé</span> et tentez de gagner un super cadeau !
          </p>
          <Link
              href="/baby"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl mt-2 text-white text-md font-bold transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7)', boxShadow: '0 4px 18px rgba(236,72,153,0.3)' }}
            >
              Voir les paris déjà réalisés
            </Link>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-10 py-8 space-y-6">

          {/* Ton nom */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              👤 Ton prénom / pseudo
            </label>
            <input
              type="text"
              name="parieurName"
              value={formData.parieurName}
              onChange={handleChange}
              required
              placeholder="Ex : FlavB, Pivette, Arthur..."
              className={inputClass}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
              onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
            />
          </div>

          {/* Sexe */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-3">
              👶 C&apos;est un garçon ou une fille ?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'garçon', emoji: '👦', label: 'Garçon', color: '#DBEAFE', border: '#93C5FD', text: '#1D4ED8' },
                { value: 'fille',  emoji: '👧', label: 'Fille',  color: '#FCE7F3', border: '#F9A8D4', text: '#BE185D' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 font-semibold text-sm select-none"
                  style={{
                    background: formData.sexe === opt.value ? opt.color : 'white',
                    borderColor: formData.sexe === opt.value ? opt.border : '#E5E7EB',
                    color: formData.sexe === opt.value ? opt.text : '#9CA3AF',
                    boxShadow: formData.sexe === opt.value ? `0 0 12px ${opt.border}80` : 'none',
                    transform: formData.sexe === opt.value ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  <input
                    type="radio"
                    name="sexe"
                    value={opt.value}
                    checked={formData.sexe === opt.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-3xl">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              📅 Date de naissance prévue
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              max="2026-05-30"
              className={inputClass}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
              onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              ✨ Prénom du bébé selon toi
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Ex : Flau Junior, Pesto Vert, Marlo…"
              className={inputClass}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
              onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
            />
          </div>

          {/* Poids + Taille */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                ⚖️ Poids (grammes)
              </label>
              <input
                type="number"
                name="poids"
                value={formData.poids}
                onChange={handleChange}
                placeholder="Ex : 3 200"
                className={inputClass}
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                📏 Taille (cm)
              </label>
              <input
                type="number"
                name="taille"
                value={formData.taille}
                onChange={handleChange}
                placeholder="Ex : 50"
                className={inputClass}
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
              />
            </div>
          </div>

          {/* Yeux + Cheveux */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                👁️ Yeux
              </label>
              <select
                name="yeux"
                value={formData.yeux}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
              >
                <option value="">-- Choisir --</option>
                <option value="bleu">Bleu 💙</option>
                <option value="marron">Marron 🤎</option>
                <option value="vert">Vert 💚</option>
                <option value="gris">Gris ⚪</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                💇 Cheveux
              </label>
              <select
                name="cheveux"
                value={formData.cheveux}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
                onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
              >
                <option value="">-- Choisir --</option>
                <option value="blond">Blond 💛</option>
                <option value="brun">Brun 🤎</option>
                <option value="roux">Roux 🧡</option>
                <option value="noir">Noir ⚫</option>
                <option value="chauve">Chauve 😄</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          {/* Autres paris */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              🎯 Autres paris <span className="font-normal text-gray-400">(optionnel)</span>
            </label>
            <textarea
              name="autres"
              value={formData.autres}
              onChange={handleChange}
              rows={3}
              placeholder="Ex : il aura les oreilles de Flavien, elle sera blonde comme Laura, il rira dès la première heure…"
              className={`${inputClass} resize-none`}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = '#C084FC'}
              onBlur={e => e.currentTarget.style.borderColor = '#F9A8D4'}
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 cursor-pointer rounded-2xl text-white text-base font-extrabold tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                boxShadow: '0 6px 24px rgba(236,72,153,0.35)',
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Envoi en cours…
                </span>
              ) : (
                '🎉 Valider mes paris !'
              )}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 pt-1">
            💌 Avec tout notre amour pour Laura & Flavien
          </p>
        </form>
      </div>
    </div>
  );
}
