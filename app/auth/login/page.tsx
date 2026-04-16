'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(96,165,250,0.06) 0%, transparent 70%)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 p-8 text-center"
        style={{ background: 'rgba(8,12,28,0.97)', backdropFilter: 'blur(10px)' }}
      >
        <h1
          className="text-2xl font-extrabold mb-2"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Connexion
        </h1>
        <p className="text-gray-400 text-sm mb-8">Accès réservé — identifie-toi via GitHub.</p>

        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold text-white border border-white/10 hover:bg-white/6 transition-all"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.046.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.12 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.805 5.628-5.476 5.921.43.372.814 1.103.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.216.696.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          Continuer avec GitHub
        </button>
      </div>
    </div>
  );
}
