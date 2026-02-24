'use client';
// app/sciences/formules/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import ScienceLayout from '@/components/ScienceLayout';
import {
  PHYSICS_CATEGORIES,
  type Formula,
  type PhysicsCategory,
} from '@/data/physics';
import { scientists } from '@/data/scientists';

const totalFormulas = PHYSICS_CATEGORIES.reduce((n, c) => n + c.formulas.length, 0);

export default function FormulesPage() {
  const [activeCategory, setActiveCategory] = useState<PhysicsCategory>(PHYSICS_CATEGORIES[0]);
  const [selected, setSelected] = useState<Formula | null>(null);

  const handleCatClick = (cat: PhysicsCategory) => {
    setActiveCategory(cat);
    setSelected(null);
  };

  const handleFormulaClick = (f: Formula) => {
    setSelected(prev => prev?.id === f.id ? null : f);
  };

  const linkedScientists = selected?.scientistIds
    ?.map(id => scientists.find(s => s.id === id))
    .filter(Boolean) ?? [];

  return (
    <ScienceLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Formules & Lois de la Physique
          </h1>
          <p className="text-base text-gray-500">
            {totalFormulas} formules · {PHYSICS_CATEGORIES.length} domaines · Cliquer pour le détail
          </p>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex gap-2 flex-wrap mb-6">
          {PHYSICS_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCatClick(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                activeCategory.id === cat.id
                  ? 'text-white border-current scale-105'
                  : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
              }`}
              style={activeCategory.id === cat.id
                ? { background: `${cat.color}20`, borderColor: `${cat.color}60`, color: cat.color }
                : {}}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Category description ── */}
        <p className="text-sm text-gray-500 mb-5 italic">{activeCategory.description}</p>

        <div className="flex flex-col xl:flex-row gap-6">

          {/* ── Formula grid ── */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategory.formulas.map((f) => {
                const isSel = selected?.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => handleFormulaClick(f)}
                    className="group text-left rounded-2xl border transition-all duration-200 hover:scale-[1.02] focus:outline-none"
                    style={{
                      background: isSel ? `${f.color}12` : 'rgba(255,255,255,0.02)',
                      borderColor: isSel ? `${f.color}55` : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Formula display box */}
                    <div
                      className="relative rounded-t-2xl px-5 py-7 flex items-center justify-center min-h-[90px]"
                      style={{
                        background: isSel
                          ? `${f.color}18`
                          : `${activeCategory.color}09`,
                        borderBottom: `1px solid ${isSel ? `${f.color}30` : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <span
                        className="text-xl font-bold text-center leading-snug"
                        style={{
                          fontFamily: "'Courier New', 'Liberation Mono', monospace",
                          color: isSel ? f.color : 'rgba(255,255,255,0.88)',
                          textShadow: isSel ? `0 0 20px ${f.color}55` : 'none',
                        }}
                      >
                        {f.formula}
                      </span>
                    </div>

                    {/* Card info */}
                    <div className="px-4 py-3">
                      <div className="text-sm font-semibold text-white mb-1 group-hover:text-current transition-colors"
                        style={{ color: isSel ? f.color : undefined }}>
                        {f.name}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {f.year !== undefined && (
                          <span className="text-xs font-mono text-gray-600">
                            {f.year < 0 ? `${Math.abs(f.year)} av. J.-C.` : f.year}
                          </span>
                        )}
                        {f.scientistIds && f.scientistIds.length > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: `${f.color}15`, color: f.color }}>
                            {f.scientistIds.map(id => {
                              const s = scientists.find(sc => sc.id === id);
                              return s ? s.name.split(' ').pop() : id;
                            }).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Detail panel ── */}
          <div className="xl:w-[380px] shrink-0">
            <div className="xl:sticky xl:top-20 space-y-4">
              {selected ? (
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    background: `${selected.color}0C`,
                    borderColor: `${selected.color}40`,
                  }}
                >
                  {/* Formula display */}
                  <div
                    className="rounded-xl py-6 px-4 text-center mb-5"
                    style={{ background: `${selected.color}14` }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "'Courier New', 'Liberation Mono', monospace",
                        color: selected.color,
                        textShadow: `0 0 24px ${selected.color}55`,
                      }}
                    >
                      {selected.formula}
                    </div>
                  </div>

                  {/* Name + meta */}
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-white mb-1">{selected.name}</h2>
                    <div className="flex items-center gap-3 flex-wrap text-xs font-mono text-gray-500">
                      {selected.year !== undefined && (
                        <span>{selected.year < 0 ? `${Math.abs(selected.year)} av. J.-C.` : selected.year}</span>
                      )}
                      <span
                        className="px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold"
                        style={{ background: `${selected.color}20`, color: selected.color }}
                      >
                        {selected.domain}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {selected.description}
                  </p>

                  {/* Key fact */}
                  {selected.keyFact && (
                    <div
                      className="rounded-xl px-4 py-3 mb-4 text-sm leading-relaxed"
                      style={{ background: `${selected.color}15`, borderLeft: `3px solid ${selected.color}` }}
                    >
                      <span className="font-semibold" style={{ color: selected.color }}>✦ </span>
                      <span className="text-gray-300">{selected.keyFact}</span>
                    </div>
                  )}

                  {/* Variables table */}
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Variables</div>
                    <div className="rounded-xl overflow-hidden border border-white/6">
                      {selected.variables.map((v, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 px-3 py-2.5 ${i < selected.variables.length - 1 ? 'border-b border-white/5' : ''}`}
                          style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                        >
                          <code
                            className="text-sm font-bold shrink-0 w-14 pt-0.5"
                            style={{
                              fontFamily: "'Courier New', monospace",
                              color: selected.color,
                            }}
                          >
                            {v.symbol}
                          </code>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-300">{v.meaning}</div>
                            {v.unit && (
                              <div className="text-xs text-gray-600 font-mono">{v.unit}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked scientists */}
                  {linkedScientists.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Scientifiques</div>
                      <div className="space-y-1">
                        {linkedScientists.map(s => s && (
                          <Link
                            key={s.id}
                            href={`/sciences/scientists/${s.id}`}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/6 transition-all group"
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                              style={{
                                background: `${s.color}18`,
                                borderColor: `${s.color}40`,
                              }}
                            >
                              {s.emoji}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover:underline">{s.name}</div>
                              <div className="text-xs text-gray-500">{s.domains[0]} · {s.born < 0 ? `${Math.abs(s.born)} av. J.-C.` : s.born}</div>
                            </div>
                            <span className="ml-auto text-gray-600 text-xs">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Default: category overview */
                <div
                  className="rounded-2xl border border-white/8 p-5"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="text-3xl mb-3 text-center py-3 rounded-xl"
                    style={{ background: `${activeCategory.color}12` }}
                  >
                    {activeCategory.icon}
                  </div>
                  <h2 className="text-base font-bold text-white mb-1">{activeCategory.label}</h2>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{activeCategory.description}</p>
                  <div className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                    {activeCategory.formulas.length} formules dans ce domaine
                  </div>
                  <div className="space-y-1">
                    {activeCategory.formulas.map(f => (
                      <button
                        key={f.id}
                        onClick={() => handleFormulaClick(f)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all text-left group"
                      >
                        <code
                          className="text-xs font-mono shrink-0 w-24 truncate"
                          style={{ color: activeCategory.color }}
                        >
                          {f.formula}
                        </code>
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex-1 truncate">
                          {f.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Nav to other sections */}
                  <div className="mt-5 pt-4 border-t border-white/8 grid grid-cols-2 gap-2">
                    <Link
                      href="/sciences/constantes"
                      className="text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                      📐 Constantes
                    </Link>
                    <Link
                      href="/sciences/scientists"
                      className="text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-indigo-700/40 text-indigo-400 hover:bg-indigo-900/20 transition-all"
                    >
                      🔬 Scientifiques
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScienceLayout>
  );
}
