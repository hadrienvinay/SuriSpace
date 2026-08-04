'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// ── Search index ────────────────────────────────────────────────────────────
type Result = { href: string; title: string; desc: string; category: string; color: string };

const INDEX: Result[] = [
  // Articles (static)
  { href: '/posts/astro',       title: 'Le ciel en 2026',           desc: 'Éclipses, comètes, Perséides, calendrier astronomique.', category: 'Article', color: '#818CF8' },
  { href: '/posts/space',       title: "L'actualité spatiale 2026",  desc: 'Artemis II, SpaceX Starship, missions en cours.', category: 'Article', color: '#818CF8' },
  { href: '/posts/negative',    title: 'La masse négative',          desc: 'Hypothèse cosmologique — énergie noire et structure de l\'univers.', category: 'Article', color: '#818CF8' },
  { href: '/posts/hydrogene',   title: "L'hydrogène vert marin",    desc: 'Énergie des océans pour la transition énergétique.', category: 'Article', color: '#818CF8' },
  { href: '/posts/algoculture', title: "L'algoculture",             desc: 'Culture des algues et essor mondial.', category: 'Article', color: '#818CF8' },
  // Sections
  { href: '/space',       title: 'Espace',        desc: 'Système solaire, galaxies, missions, étoiles.', category: 'Section', color: '#60A5FA' },
  { href: '/space/carte', title: 'Carte du système solaire', desc: 'Carte interactive en échelle logarithmique.', category: 'Espace', color: '#60A5FA' },
  { href: '/space/bodys', title: 'Corps célestes', desc: 'Planètes, lunes et naines du système solaire.', category: 'Espace', color: '#60A5FA' },
  { href: '/space/missions', title: 'Missions & Sondes', desc: 'Apollo, Voyager, JWST, Artemis…', category: 'Espace', color: '#60A5FA' },
  { href: '/space/galaxies', title: 'Galaxies', desc: 'Voie Lactée, Andromède, 15 galaxies remarquables.', category: 'Espace', color: '#60A5FA' },
  { href: '/space/astronomie', title: 'Astronomie', desc: 'Histoire, instruments, catalogue Messier.', category: 'Espace', color: '#60A5FA' },
  { href: '/space/stars', title: 'Carte du ciel', desc: 'Étoiles et constellations visibles.', category: 'Espace', color: '#60A5FA' },
  { href: '/sciences',          title: 'Sciences',      desc: 'Timeline, scientifiques, formules, constantes.', category: 'Section', color: '#A78BFA' },
  { href: '/sciences/timeline', title: 'Timeline scientifique', desc: 'De l\'Antiquité à l\'ère spatiale.', category: 'Sciences', color: '#A78BFA' },
  { href: '/sciences/scientists', title: 'Scientifiques', desc: 'Newton, Einstein, Curie, Darwin et autres.', category: 'Sciences', color: '#A78BFA' },
  { href: '/sciences/formules', title: 'Formules fondamentales', desc: 'Mécanique, relativité, thermodynamique, électromagnétisme.', category: 'Sciences', color: '#A78BFA' },
  { href: '/sciences/constantes', title: 'Constantes physiques', desc: 'Vitesse de la lumière, constante de Planck, nombre d\'Avogadro…', category: 'Sciences', color: '#A78BFA' },
  { href: '/atoms',             title: 'Atomes',        desc: 'Tableau périodique, nucléosynthèse, particules.', category: 'Section', color: '#34D399' },
  { href: '/atoms/tableau',     title: 'Tableau périodique', desc: '118 éléments classés par catégorie.', category: 'Atomes', color: '#34D399' },
  { href: '/atoms/nucleosynthese', title: 'Nucléosynthèse', desc: 'Comment les atomes naissent dans les étoiles.', category: 'Atomes', color: '#34D399' },
  { href: '/atoms/abondance',   title: 'Abondance des éléments', desc: 'Comparaison cosmique vs terrestre.', category: 'Atomes', color: '#34D399' },
  { href: '/nature',            title: 'Nature',        desc: 'Plantes, jardinage, saisons, nutrition.', category: 'Section', color: '#4ADE80' },
  { href: '/nature/plantes',    title: 'Plantes & Jardinage', desc: 'Calendrier de plantation, arrosage, germination.', category: 'Nature', color: '#4ADE80' },
  { href: '/nature/nutrition',  title: 'Nutrition',     desc: 'Besoins caloriques, vitamines, minéraux, programme sportif.', category: 'Nature', color: '#4ADE80' },
  { href: '/projects',          title: 'Projets',       desc: 'Applications web, simulations, outils.', category: 'Section', color: '#F59E0B' },
  { href: '/posts',             title: 'Articles',      desc: 'Explorations scientifiques et culturelles.', category: 'Section', color: '#C4B5FD' },
  { href: '/about',             title: 'À propos',      desc: 'Profil et parcours d\'Hadrien Vinay.', category: 'Page', color: '#9CA3AF' },
];

function searchIndex(q: string): Result[] {
  if (!q.trim()) return [];
  const terms = q.toLowerCase().split(/\s+/);
  return INDEX.filter(r => {
    const hay = `${r.title} ${r.desc} ${r.category}`.toLowerCase();
    return terms.every(t => hay.includes(t));
  }).slice(0, 8);
}

// ── Component ────────────────────────────────────────────────────────────────
export default function SearchModal() {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchIndex(query);

  const close = useCallback(() => { setOpen(false); setQuery(''); setActive(0); }, []);

  // Cmd/Ctrl+K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(v => !v); }
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  // Keyboard nav in results
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === 'Enter' && results[active]) {
        window.location.href = results[active].href;
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, active, close]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { setActive(0); }, [query]);

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 transition-colors border border-white/8 hover:border-white/15"
      style={{ background: 'rgba(255,255,255,0.03)', fontFamily: "'Exo 2', sans-serif" }}
      aria-label="Rechercher"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <span className="hidden sm:block">Rechercher</span>
      <kbd className="hidden sm:flex items-center gap-0.5 text-xs opacity-50 font-mono">
        <span>⌘</span><span>K</span>
      </kbd>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,8,0.80)', backdropFilter: 'blur(12px)' }}
      onClick={close}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(8,12,28,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher une page, un article, une section…"
            className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm focus:outline-none"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-600 hover:text-gray-300 text-xs">✕</button>
          )}
          <kbd className="text-xs text-gray-700 font-mono border border-white/10 rounded px-1.5 py-0.5">Esc</kbd>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((r, i) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  onClick={close}
                  className="flex items-start gap-3 px-4 py-2.5 transition-all"
                  style={{ background: i === active ? 'rgba(167,139,250,0.10)' : 'transparent' }}
                  onMouseEnter={() => setActive(i)}
                >
                  <div className="w-1 h-5 rounded-full shrink-0 mt-0.5" style={{ background: r.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">{r.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0"
                        style={{ background: `${r.color}20`, color: r.color }}>
                        {r.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{r.desc}</p>
                  </div>
                  {i === active && <span className="text-gray-600 text-xs shrink-0 mt-1">↵</span>}
                </Link>
              </li>
            ))}
          </ul>
        ) : query ? (
          <div className="px-4 py-8 text-center text-gray-600 text-sm">
            Aucun résultat pour &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div className="px-4 py-6">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {['Artemis', 'Tableau périodique', 'Étoiles', 'Nutrition', 'Constantes', 'JWST'].map(s => (
                <button key={s} onClick={() => setQuery(s)}
                  className="px-3 py-1 rounded-lg text-xs text-gray-400 hover:text-white border border-white/8 hover:border-white/15 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/6 text-[10px] text-gray-700 font-mono">
          <span>↑↓ naviguer</span>
          <span>↵ ouvrir</span>
          <span>Esc fermer</span>
        </div>
      </div>
    </div>
  );
}
